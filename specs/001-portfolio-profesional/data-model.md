# Phase 1 — Data Model: Portafolio profesional

**Feature**: `001-portfolio-profesional` | **Date**: 2026-10-17

El "modelo de datos" de este sitio es el **contenido tipado** que alimenta a los
componentes. Vive en `src/content/portfolio.ts` y se describe con las interfaces de
`src/types/content.ts`. Los tipos son el contrato verificable en tiempo de compilación
(Principio VI): si el contenido no cumple, `next build` falla.

## Diagrama de relaciones

```text
PortfolioContent
├── profile: Profile
│   └── languages: Language[]
├── skills: SkillCategory[]
│   └── skills: string[]
├── education: EducationItem[]
├── projects: Project[]
│   └── repositories: RepositoryRef[]
├── contact: ContactLink[]
└── cv: CvResource
```

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
- `fullName: string` — "Franco Martín Alonso"
- `professionalTitle: string` — rol/título profesional
- `summary: string` — descripción breve
- `location: string` — "Buenos Aires, Argentina"
- `languages: Language[]` — idiomas
- `photo?: PhotoRef` — foto; **opcional** (aún no existe)

### PhotoRef
- `src: string` — ruta en `public/`
- `alt: string` — texto alternativo (Principio IV)
- `available: boolean` — `false` mientras no exista el archivo; el componente muestra
  un espacio reservado (FR-003)

### Language
- `name: string` — "Español", "Inglés", "Portugués"
- `level: string` — "Nativo", "Intermedio", "Básico"

### SkillCategory
Agrupación de habilidades (FR-004).
- `id: string` — identificador estable y único
- `name: string` — "Lenguajes", "Backend", "Bases de datos",
  "Infraestructura y monitoreo", "Frontend"
- `skills: string[]` — tecnologías de la categoría

### EducationItem
Formación (FR-005).
- `id: string` — único
- `program: string` — nombre de la carrera o curso
- `institution: string` — institución (p. ej. "FIUBA")
- `status: string` — "Cursando 4.º año", "Completado", etc.
- `type: 'grado' | 'curso'`

### Project
Proyecto destacado (FR-006, FR-007).
- `id: string` — único
- `name: string`
- `description: string`
- `highlights: string[]` — puntos clave
- `technologies: string[]`
- `status: ProjectStatus` — `'in-progress' | 'completed'`
- `repositories: RepositoryRef[]` — uno o más repositorios

### RepositoryRef
Repositorio de un proyecto (FR-008).
- `label: string` — etiqueta del repositorio: "Código fuente" (proyecto de un solo repo),
  "Código backend" / "Código frontend" (PSA)
- `visibility: 'public' | 'private'`
- `url?: string` — presente solo cuando el enlace está disponible; su ausencia en un
  repositorio público representa el estado **pendiente**

#### Estados derivados de un repositorio
- **enlace** (`public` + `url`): se renderiza un botón etiquetado por repositorio.
- **pendiente** (`public` + sin `url`): sin botón, sin enlace roto, sin etiqueta de privado.
- **privado** (`private`): se muestra la etiqueta "Repositorio privado" en lugar de botón.

### ContactLink
Canal de contacto (FR-010).
- `kind: 'email' | 'github' | 'linkedin'`
- `label: string` — texto visible
- `value: string` — correo o usuario
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
   la etiqueta "Repositorio privado".
4. `repository.visibility === 'public' && repository.url` ⇒ la URL no es vacía y se
   renderiza un botón por repositorio.
5. `repository.visibility === 'public' && !repository.url` ⇒ estado "pendiente" válido:
   sin botón, sin enlace roto y sin la etiqueta "Repositorio privado".
6. `status === 'in-progress'` ⇒ se muestra la etiqueta "En desarrollo".
7. `contact.available === false` ⇒ no se renderiza enlace; se reserva el espacio.
8. `cv.available === false` ⇒ el botón no conduce a error ni a enlace roto.
9. `photo` ausente o `photo.available === false` ⇒ se muestra espacio reservado.
10. Todas las imágenes con significado requieren `alt` no vacío (Principio IV).
11. Sin duplicación de datos: las etiquetas derivadas ("En desarrollo", "Finalizado",
    "Repositorio privado") se calculan en `src/lib/content.ts`, no se escriben en el
    contenido (Principio V).

## Estados y transiciones

- **Proyecto**: `in-progress → completed` (cambio de contenido, sin tocar componentes).
- **Repositorio**: `pendiente → enlace` al agregar `url`; `public → private` al privatizar
  (quitar `url`). Ambos son cambios de datos.
- **Recursos diferidos** (`photo`, `cv`, LinkedIn): `available: false → true` al
  incorporar el recurso. Todos son cambios de datos.

## Mapeo a requisitos

| Entidad | Requisitos |
|---------|-----------|
| Profile / Language / PhotoRef | FR-002, FR-003 |
| SkillCategory | FR-004 |
| EducationItem | FR-005 |
| Project / RepositoryRef | FR-006, FR-007, FR-008, FR-009 |
| ContactLink | FR-010 |
| CvResource | FR-011 |
| Toda la raíz | FR-014 (editable sin tocar lógica), SC-007 |
