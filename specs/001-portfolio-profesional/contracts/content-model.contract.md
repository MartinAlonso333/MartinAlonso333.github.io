# Contract: Modelo de contenido (`src/content/portfolio.ts` ↔ componentes)

**Feature**: `001-portfolio-profesional` | **Type**: UI/data contract (interno)

Define la frontera entre el **contenido** (`src/content/portfolio.ts`) y la
**presentación** (`src/components/`). Los componentes MUST NOT contener texto de
contenido propio; todo texto visible MUST provenir de este contrato. Los tipos se
declaran en `src/types/content.ts` y son la referencia normativa.

## Interface

```ts
export type ProjectStatus = 'in-progress' | 'completed';
export type RepositoryVisibility = 'public' | 'private';
export type ContactKind = 'email' | 'github' | 'linkedin';

export interface Language {
  name: string;
  level: string;
}

export interface PhotoRef {
  src: string;
  alt: string;
  available: boolean;
}

export interface Profile {
  fullName: string;
  professionalTitle: string;
  summary: string;
  location: string;
  languages: Language[];
  photo?: PhotoRef;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  program: string;
  institution: string;
  status: string;
  type: 'grado' | 'curso';
}

export interface RepositoryRef {
  visibility: RepositoryVisibility;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  technologies: string[];
  status: ProjectStatus;
  repository: RepositoryRef;
}

export interface ContactLink {
  kind: ContactKind;
  label: string;
  value: string;
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

Los siguientes textos se derivan en `src/lib/content.ts` a partir de los datos; no
deben duplicarse en `portfolio.ts` (Principio V):

| Condición | Etiqueta mostrada |
|-----------|-------------------|
| `project.status === 'in-progress'` | "En desarrollo" |
| `project.status === 'completed'` | "Finalizado" |
| `project.repository.visibility === 'private'` | "Repositorio privado" (sin enlace) |
| `project.repository.visibility === 'public'` | Enlace "Ver repositorio" → `repository.url` |

## Invariantes (verificables en compilación y en revisión)

1. `id` único dentro de `skills`, `education` y `projects`.
2. `repository.visibility === 'public'` ⇒ `repository.url` definido y no vacío.
3. `repository.visibility === 'private'` ⇒ los componentes no renderizan enlace.
4. `contact` con `available === false` ⇒ sin `url` y sin enlace roto; se reserva espacio.
5. `cv.available === false` ⇒ el botón no conduce a error ni a enlace roto.
6. `photo` ausente o `available === false` ⇒ espacio reservado accesible.
7. Todo `alt` de imagen con significado es no vacío.

## Expectations

- **Agregar un proyecto**: añadir un objeto a `projects` que cumpla `Project`. No se
  modifica ningún componente (FR-014, SC-007).
- **Publicar un repositorio**: cambiar `visibility` a `'public'` y agregar `url`.
- **Activar un recurso diferido**: poner `available: true` (y `url` cuando aplique).
- **Orden de render**: `skills`, `education`, `projects` y `contact` se muestran en el
  orden del arreglo.
