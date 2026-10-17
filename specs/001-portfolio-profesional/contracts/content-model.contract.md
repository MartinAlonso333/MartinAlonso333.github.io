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
  label: string;
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
  repositories: RepositoryRef[];
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
| `repository.visibility === 'private'` | "Repositorio privado" (sin enlace) |
| `repository.visibility === 'public' && repository.url` | Botón "GitHub" con el texto `repository.label` (p. ej. "Código backend") → `repository.url` |
| `repository.visibility === 'public' && !repository.url` | Estado "pendiente": no se renderiza botón ni etiqueta de privado |

## Invariantes (verificables en compilación y en revisión)

1. `id` único dentro de `skills`, `education` y `projects`.
2. `repository.visibility === 'private'` ⇒ `repository.url` ausente y los componentes no
   renderizan enlace; se muestra la etiqueta "Repositorio privado".
3. `repository.visibility === 'public' && repository.url` ⇒ la URL no es vacía y se
   renderiza un botón por repositorio.
4. `repository.visibility === 'public' && !repository.url` ⇒ estado "pendiente" válido:
   sin botón, sin enlace roto y sin la etiqueta "Repositorio privado".
5. `contact` con `available === false` ⇒ sin `url` y sin enlace roto; se reserva espacio.
6. `cv.available === false` ⇒ el botón no conduce a error ni a enlace roto.
7. `photo` ausente o `available === false` ⇒ espacio reservado accesible.
8. Todo `alt` de imagen con significado es no vacío.

## Expectations

- **Agregar un proyecto**: añadir un objeto a `projects` que cumpla `Project`. No se
  modifica ningún componente (FR-014, SC-007).
- **Publicar un repositorio**: agregar `url` al repositorio correspondiente (el estado
  "pendiente" pasa a "enlace" sin tocar componentes).
- **Cambiar la visibilidad**: setear `visibility: 'private'` ⇒ quitar `url`; los
  componentes derivan la etiqueta.
- **Proyecto con varios repositorios**: usar un elemento de `repositories` por repo, cada
  uno con su `label` ("Código backend", "Código frontend"); todos se muestran en la misma
  tarjeta.
- **Activar un recurso diferido**: poner `available: true` (y `url` cuando aplique).
- **Orden de render**: `skills`, `education`, `projects`, `contact` y los `repositories`
  de cada proyecto se muestran en el orden del arreglo.
