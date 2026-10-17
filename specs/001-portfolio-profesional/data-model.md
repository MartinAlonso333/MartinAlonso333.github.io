# Phase 1 — Data Model: Portafolio profesional

**Feature**: `001-portfolio-profesional` | **Date**: 2026-10-17

El "modelo de datos" de este sitio es el **contenido tipado** que alimenta a los
componentes. Vive en `src/content/portfolio.ts` y se describe con las interfaces de
`src/types/content.ts`. Los tipos son el contrato verificable en tiempo de compilación
(Principio VI): si el contenido no cumple, `next build` falla.

El contenido es **bilingüe**: todo texto legible se modela como `LocalizedText`
(`{ es: string; en: string }`), de modo que el idioma se resuelve en tiempo de render sin
duplicar la página. Los nombres propios, las tecnologías y los datos de contacto no se
traducen (permanecen como `string`).

## Diagrama de relaciones

```text
PortfolioContent
├── profile: Profile
│   ├── professionalTitle/summary/location: LocalizedText
│   ├── languages: SpokenLanguage[]   (name/level: LocalizedText)
│   └── photo?: PhotoRef              (alt: LocalizedText)
├── skills: SkillCategory[]           (name: LocalizedText; skills: string[])
├── education: EducationItem[]        (program/institution/status: LocalizedText)
├── projects: Project[]               (name/description/highlights: LocalizedText)
│   └── repositories: RepositoryRef[] (label: LocalizedText)
├── contact: ContactLink[]            (label/value: LocalizedText)
└── cv: CvResource
```

## Tipos base

### Language (locale)
Idioma de la interfaz: `'es' | 'en'`. Por defecto `'es'`.

### LocalizedText
Texto disponible en ambos idiomas: `Record<Language, string>` (`{ es; en }`). Se resuelve
con `pick(text, language)` de `src/lib/i18n.ts`. Los textos de interfaz (navegación,
títulos de sección, etiquetas derivadas, metadatos, `aria-label`) viven en
`src/content/ui.ts` con la misma forma.

## Entidades

### PortfolioContent
Raíz del contenido. Agrupa todas las colecciones que consume la página.
- `profile: Profile` (requerido)
- `skills: SkillCategory[]` (requerido, ≥ 1)
- `education: EducationItem[]` (requerido, ≥ 1)
- `projects: Project[]` (requerido, ≥ 1)
- `contact: ContactLink[]` (requerido, ≥ 1)
- `cv: CvResource` (requerido)

### Profile
Presentación de Franco (FR-002, FR-003).
- `fullName: string` — "Franco Martín Alonso" (nombre propio, no se traduce)
- `professionalTitle: LocalizedText` — rol/título profesional
- `summary: LocalizedText` — descripción en dos párrafos; los párrafos se separan con una línea en blanco (`\n\n`) y el componente los renderiza como párrafos independientes
- `location: LocalizedText` — "Buenos Aires, Argentina"
- `languages: SpokenLanguage[]` — idiomas que habla
- `photo?: PhotoRef` — foto; **opcional** (aún no existe)

### PhotoRef
- `src: string` — ruta en `public/`
- `alt: LocalizedText` — texto alternativo (Principio IV)
- `available: boolean` — `false` mientras no exista el archivo; el componente muestra
  un espacio reservado (FR-003)

### SpokenLanguage
Idioma hablado por Franco.
- `name: LocalizedText` — "Español"/"Spanish", "Inglés"/"English", "Portugués"/"Portuguese"
- `level: LocalizedText` — "Nativo"/"Native", "Intermedio"/"Intermediate", "Básico"/"Basic"

### SkillCategory
Agrupación de habilidades (FR-004).
- `id: string` — identificador estable y único
- `name: LocalizedText` — "Lenguajes"/"Languages", "Backend", "Bases de datos"/"Databases",
  "Infraestructura y monitoreo"/"Infrastructure and monitoring", "Frontend"
- `skills: string[]` — tecnologías de la categoría (nombres propios, no se traducen)

### EducationItem
Formación (FR-005).
- `id: string` — único
- `program: LocalizedText` — nombre de la carrera o curso
- `institution: LocalizedText` — institución (p. ej. "FIUBA")
- `status: LocalizedText` — "Cursando 4.º año"/"Currently in 4th year", etc.
- `type: 'grado' | 'curso'` — etiqueta de tipo localizada en `ui.educationType`

### Project
Proyecto destacado (FR-006, FR-007).
- `id: string` — único
- `name: LocalizedText` — nombre visible
- `description: LocalizedText`
- `highlights: LocalizedText[]` — puntos clave
- `technologies: string[]` — nombres propios, no se traducen
- `status: ProjectStatus` — `'in-progress' | 'completed'`
- `repositories: RepositoryRef[]` — uno o más repositorios

### RepositoryRef
Repositorio de un proyecto (FR-008).
- `label: LocalizedText` — etiqueta del repositorio: "Código fuente"/"Source code"
  (proyecto de un solo repo), "Código backend"/"Backend code" y
  "Código frontend"/"Frontend code" (PSA)
- `visibility: 'public' | 'private'`
- `url?: string` — presente solo cuando el enlace está disponible; su ausencia en un
  repositorio público representa el estado **pendiente**

#### Estados derivados de un repositorio
- **enlace** (`public` + `url`): se renderiza un botón etiquetado por repositorio.
- **pendiente** (`public` + sin `url`): sin botón, sin enlace roto, sin etiqueta de privado.
- **privado** (`private`): se muestra la etiqueta "Repositorio privado" / "Private repository" en lugar de botón.

### ContactLink
Canal de contacto (FR-010).
- `kind: 'email' | 'github' | 'linkedin'`
- `label: LocalizedText` — texto visible ("Correo"/"Email")
- `value: LocalizedText` — correo o usuario; LinkedIn pendiente ("Próximamente"/"Coming soon")
- `url?: string` — ausente cuando `available === false`
- `available: boolean` — `false` para LinkedIn por ahora (espacio reservado)

### CvResource
Botón de descarga del CV (FR-011).
- `url: string` — ruta objetivo (`/cv.pdf` o ancla de reserva)
- `fileName: string`
- `available: boolean` — `false` mientras no exista el PDF; el botón no lleva a error

## Reglas de validación (invariantes)

1. `id` único dentro de cada colección (`skills`, `education`, `projects`).
2. `repositories` tiene al menos un elemento por proyecto.
3. `repository.visibility === 'private'` ⇒ `url` ausente; no se renderiza enlace; se muestra
   la etiqueta "Repositorio privado" / "Private repository".
4. `repository.visibility === 'public' && repository.url` ⇒ la URL no es vacía y se
   renderiza un botón por repositorio.
5. `repository.visibility === 'public' && !repository.url` ⇒ estado "pendiente" válido:
   sin botón, sin enlace roto y sin la etiqueta de privado.
6. `status === 'in-progress'` ⇒ se muestra la etiqueta "En desarrollo" / "In progress".
7. `contact.available === false` ⇒ no se renderiza enlace; se reserva el espacio.
8. `cv.available === false` ⇒ el botón no conduce a error ni a enlace roto.
9. `photo` ausente o `photo.available === false` ⇒ se muestra espacio reservado.
10. Todas las imágenes con significado requieren `alt` no vacío (Principio IV).
11. Sin duplicación de datos: las etiquetas derivadas ("En desarrollo"/"Finalizado",
    "Repositorio privado") se calculan en `src/lib/content.ts` a partir de `src/content/ui.ts`,
    no se escriben en el contenido (Principio V).
12. Todo `LocalizedText` define ambos idiomas (`es` y `en`); el tipo lo garantiza en
    compilación.
13. El idioma activo por defecto es `es`; si no hay preferencia guardada, se muestra `es`
    (visible incluso sin JavaScript).

## Estados y transiciones

- **Proyecto**: `in-progress → completed` (cambio de contenido, sin tocar componentes).
- **Repositorio**: `pendiente → enlace` al agregar `url`; `public → private` al privatizar
  (quitar `url`). Ambos son cambios de datos.
- **Recursos diferidos** (`photo`, `cv`, LinkedIn): `available: false → true` al
  incorporar el recurso. Todos son cambios de datos.
- **Idioma**: `es ↔ en` por acción del visitante; se persiste en `localStorage` (contrato
  `language.contract.md`). No cambia la URL.

## Mapeo a requisitos

| Entidad | Requisitos |
|---------|-----------|
| Language / LocalizedText | FR-001, FR-017 |
| Profile / SpokenLanguage / PhotoRef | FR-002, FR-003 |
| SkillCategory | FR-004 |
| EducationItem | FR-005 |
| Project / RepositoryRef | FR-006, FR-007, FR-008, FR-009 |
| ContactLink | FR-010 |
| CvResource | FR-011 |
| Toda la raíz | FR-014 (editable sin tocar lógica), SC-007 |
