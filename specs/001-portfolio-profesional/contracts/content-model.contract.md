# Contract: Modelo de contenido (`src/content/portfolio.ts` ↔ componentes)

**Feature**: `001-portfolio-profesional` | **Type**: UI/data contract (interno)

Define la frontera entre el **contenido** (`src/content/portfolio.ts`) y la
**presentación** (`src/components/`). Los componentes MUST NOT contener texto de
contenido propio; todo texto visible MUST provenir de este contrato. Los tipos se
declaran en `src/types/content.ts` y son la referencia normativa.

El contenido es **bilingüe**: todo texto legible se declara como `LocalizedText`
(`Record<Language, string>`) y se resuelve con `pick(text, language)`. Los nombres
propios, las tecnologías y los correos/usuarios permanecen como `string` (no se
traducen); el nombre de una habilidad que sea una frase localizable se declara como
`LocalizedText` (`SkillItem = string | LocalizedText`). Los textos de interfaz viven en
`src/content/ui.ts` (mismo patrón) y se documentan en `language.contract.md`.

## Interface

```ts
export type Language = 'es' | 'en';
export type LocalizedText = Record<Language, string>;

export type ProjectStatus = 'in-progress' | 'completed';
export type RepositoryVisibility = 'public' | 'private';
export type ContactKind = 'email' | 'github' | 'linkedin';

export interface SpokenLanguage {
  name: LocalizedText;
  level: LocalizedText;
}

export interface PhotoRef {
  src: string;
  alt: LocalizedText;
  available: boolean;
}

export interface Profile {
  fullName: string; // nombre propio, no se traduce
  professionalTitle: LocalizedText;
  summary: LocalizedText; // párrafos separados por una línea en blanco ("\n\n"); se renderizan como <p> independientes
  location: LocalizedText;
  languages: SpokenLanguage[];
  photo?: PhotoRef;
}

export type SkillItem = string | LocalizedText;

export interface SkillCategory {
  id: string;
  name: LocalizedText;
  skills: SkillItem[]; // nombres propios como string (no se traducen) o frases localizables
}

export interface Certificate {
  id: string;
  title: LocalizedText;
  issuer: LocalizedText;
  date?: LocalizedText; // opcional
  url: string; // PDF en public/certificates/ o URL externa de verificación
}

export interface EducationItem {
  id: string;
  program: LocalizedText;
  institution: LocalizedText;
  status: LocalizedText;
  type: 'grado' | 'curso'; // la etiqueta visible se localiza en `ui.educationType`
  certificates?: Certificate[]; // opcional; 0..n certificados asociados
}

export interface RepositoryRef {
  label: LocalizedText;
  visibility: RepositoryVisibility;
  url?: string;
}

export interface Project {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  technologies: string[]; // no se traducen
  status: ProjectStatus;
  repositories: RepositoryRef[];
}

export interface ContactLink {
  kind: ContactKind;
  label: LocalizedText;
  value: LocalizedText;
  url?: string;
  available: boolean;
}

export interface CvResource {
  url: string;
  fileName: string;
  available: boolean;
}

export interface PortfolioContent {
  profile: Profile;
  skills: SkillCategory[];
  education: EducationItem[];
  projects: Project[];
  contact: ContactLink[];
  cv: CvResource;
}
```

## Derived labels (no se almacenan en el contenido)

Los siguientes textos se derivan en `src/lib/content.ts` a partir de `src/content/ui.ts`
según el idioma activo; no deben duplicarse en `portfolio.ts` (Principio V):

| Condición | Etiqueta mostrada |
|-----------|-------------------|
| `project.status === 'in-progress'` | `ui.projectStatus.in-progress` ("En desarrollo" / "In progress") |
| `project.status === 'completed'` | `ui.projectStatus.completed` ("Finalizado" / "Completed") |
| `repository.visibility === 'private'` | `ui.privateRepository` ("Repositorio privado" / "Private repository"), sin enlace |
| `repository.visibility === 'public' && repository.url` | Botón con el texto `pick(repository.label, language)` (p. ej. "Código backend") → `repository.url` |
| `repository.visibility === 'public' && !repository.url` | Estado "pendiente": no se renderiza botón ni etiqueta de privado |
| Cada `certificate` | Botón `ui.education.viewCertificate` ("Ver certificado" / "View certificate") cuyo texto accesible incluye el `title`; externo ⇒ pestaña nueva |

## Invariantes (verificables en compilación y en revisión)

1. `id` único dentro de `skills`, `education` y `projects`, y dentro de los `certificates` de
   cada `EducationItem`.
2. `repository.visibility === 'private'` ⇒ `repository.url` ausente y los componentes no
   renderizan enlace; se muestra la etiqueta de repositorio privado.
3. `repository.visibility === 'public' && repository.url` ⇒ la URL no es vacía y se
   renderiza un botón por repositorio.
4. `repository.visibility === 'public' && !repository.url` ⇒ estado "pendiente" válido:
   sin botón, sin enlace roto y sin la etiqueta de privado.
5. `contact` con `available === false` ⇒ sin `url` y sin enlace roto; se reserva espacio.
6. `cv.available === false` ⇒ el botón no conduce a error ni a enlace roto.
7. `photo` ausente o `available === false` ⇒ espacio reservado accesible.
8. Todo `alt` de imagen con significado es no vacío en ambos idiomas.
9. Todo `LocalizedText` define `es` y `en`; el compilador lo garantiza.
10. `certificate.url` no es vacía; si comienza con `http` es externa y se abre en una
    pestaña nueva con `rel="noopener noreferrer"`; en caso contrario apunta a un PDF en
    `public/certificates/` y se abre en la misma pestaña.

## Expectations

- **Agregar un proyecto**: añadir un objeto a `projects` que cumpla `Project`. No se
  modifica ningún componente (FR-014, SC-007).
- **Agregar o editar texto**: actualizar ambos idiomas del `LocalizedText` correspondiente.
- **Publicar un repositorio**: agregar `url` al repositorio correspondiente (el estado
  "pendiente" pasa a "enlace" sin tocar componentes).
- **Cambiar la visibilidad**: setear `visibility: 'private'` ⇒ quitar `url`; los
  componentes derivan la etiqueta.
- **Proyecto con varios repositorios**: usar un elemento de `repositories` por repo, cada
  uno con su `label` localizado ("Código backend", "Código frontend"); todos se muestran
  en la misma tarjeta.
- **Activar un recurso diferido**: poner `available: true` (y `url` cuando aplique).
- **Agregar una certificación**: añadir un objeto `Certificate` a `certificates` del
  `EducationItem` correspondiente (o crear el arreglo si no existe) y, si es un PDF,
  colocar el archivo en `public/certificates/`; no se modifica ningún componente (FR-014).
- **Orden de render**: `skills`, `education`, `projects`, `contact` y los `repositories`
  de cada proyecto se muestran en el orden del arreglo.
