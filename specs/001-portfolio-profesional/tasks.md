---

description: "Task list for the personal portfolio site"
---

# Tasks: Portafolio profesional de Franco Martín Alonso

**Input**: Design documents from `/specs/001-portfolio-profesional/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No se generan tareas de tests automatizados. La constitución (Principios I y
V, Flujo de Desarrollo) admite verificación manual mientras no exista suite
automatizada; la verificación se realiza con `tsc --noEmit`, ESLint, `next build`,
Lighthouse, axe y la guía `quickstart.md`.

**Organization**: Tareas agrupadas por historia de usuario para permitir implementación
y validación independientes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: puede ejecutarse en paralelo (archivo distinto, sin dependencias pendientes)
- **[Story]**: historia de usuario (US1–US6)
- Cada tarea incluye la ruta exacta del archivo

## Path Conventions

Proyecto único en la raíz del repositorio. Paths: `src/`, `public/`,
`.github/workflows/`, config en raíz (`next.config.ts`, etc.).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialización del proyecto Next.js + Tailwind y tooling.

- [ ] T001 Create the project directory structure per plan.md: `src/app/`, `src/components/`, `src/content/`, `src/types/`, `src/lib/`, `public/`, `.github/workflows/`
- [ ] T002 [P] Initialize `package.json` with exact pinned dependencies `next` (16.x), `react` (19.2.x), `react-dom` (19.2.x) and scripts `dev`, `build`, `start`, `lint`, `typecheck` (`tsc --noEmit`) — sin rangos `^`/`~` (contracts/static-export.contract.md)
- [ ] T003 [P] Configure Tailwind CSS v4: install `tailwindcss` + `@tailwindcss/postcss` (versions pinned), create `postcss.config.mjs`
- [ ] T004 [P] Configure TypeScript in `tsconfig.json` with `"strict": true` and path alias `@/*` → `src/*`
- [ ] T005 [P] Configure ESLint (`eslint-config-next`) and Prettier; add `.gitignore` ignoring `node_modules/`, `.next/`, `out/`
- [ ] T006 [P] Create `next.config.ts` with `output: 'export'` and `images: { unoptimized: true }`, sin `basePath` ni `assetPrefix` (contracts/static-export.contract.md)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Contrato de contenido, tema base y layout. Bloquea TODAS las historias.

**⚠️ CRITICAL**: Ninguna historia puede comenzar hasta terminar esta fase.

- [ ] T007 Create content interfaces in `src/types/content.ts` exactly as defined in contracts/content-model.contract.md (`PortfolioContent`, `Profile`, `Language`, `PhotoRef`, `SkillCategory`, `EducationItem`, `Project`, `RepositoryRef`, `ProjectStatus`, `RepositoryVisibility`, `ContactLink`, `ContactKind`, `CvResource`)
- [ ] T008 Populate `src/content/portfolio.ts` with all content (perfil de Franco, 5 categorías de habilidades, 2 ítems de formación, 4 proyectos, 3 contactos, recurso CV) satisfying all invariants of data-model.md: `id` único por colección; `visibility === 'public'` ⇒ `url` no vacío; `visibility === 'private'` ⇒ sin `url`; `available === false` (LinkedIn, CV) ⇒ sin `url`; `photo.available === false` (depende de T007)
- [ ] T009 [P] Create derived labels/selectors in `src/lib/content.ts`: función de etiqueta de estado (`'in-progress'` → "En desarrollo", `'completed'` → "Finalizado") y de repositorio (`'private'` → "Repositorio privado"), sin duplicar esos textos en `portfolio.ts` (contracts/content-model.contract.md)
- [ ] T010 [P] Create theme constants/helpers in `src/lib/theme.ts`: clave `theme` de `localStorage` como constante única, valores permitidos `['light','dark','system']`, y función de resolución de tema efectivo (contracts/theme.contract.md)
- [ ] T011 Configure `src/app/globals.css`: `@import "tailwindcss"`, tokens semánticos de color y `@custom-variant dark (&:where(.dark, .dark *));` (contracts/theme.contract.md)
- [ ] T012 Create `src/app/layout.tsx`: `<html lang="es">`, metadatos (title/description), y script en línea anti-parpadeo en `<head>` que lee `localStorage` + `prefers-color-scheme` y aplica la clase `dark`, validando el valor contra la lista blanca (contracts/theme.contract.md)
- [ ] T013 Create `src/components/Header.tsx` con navegación fija (sticky) por anclas a `#presentacion`, `#habilidades`, `#formacion`, `#proyectos`, `#contacto`, operable por teclado con foco visible, HTML semántico (`<header>`, `<nav>`), con marca y espacio para el conmutador de tema (FR-016)
- [ ] T014 Create `src/app/page.tsx` como composición de secciones, renderizando `Header` y un `<main>` preparado para las secciones (placeholders por historia) (depende de T013)

**Checkpoint**: Contrato de contenido, tema base y layout listos; las historias pueden comenzar.

---

## Phase 3: User Story 1 - Conocer el perfil profesional (Priority: P1) 🎯 MVP

**Goal**: La presentación muestra nombre, título, descripción, ubicación e idiomas, con espacio reservado para la foto.

**Independent Test**: Abrir la página y verificar que la sección de presentación muestra todos los campos de `profile` y la reserva de foto sin romper el layout (quickstart V1).

- [ ] T015 [P] [US1] Create `src/components/Hero.tsx` (server component) rendering `content.profile`: nombre, título, resumen, ubicación e idiomas con HTML semántico (`<section>`, `<h2>`, lista de idiomas) (FR-002)
- [ ] T016 [US1] Implement the photo reservation in `src/components/Hero.tsx`: si `profile.photo` falta o `photo.available === false`, mostrar un espacio reservado accesible (sin `<img>` roto); cuando esté disponible, usar `next/image` con `alt` no vacío (FR-003, contract invariante 6)
- [ ] T017 [US1] Integrate Hero into `src/app/page.tsx` dentro de `<section id="presentacion">` en el orden de secciones del plan

**Checkpoint**: US1 funcional y validable de forma independiente (MVP).

---

## Phase 4: User Story 2 - Explorar los proyectos destacados (Priority: P1)

**Goal**: Los cuatro proyectos se muestran con descripción, puntos clave, tecnologías, estado y repositorio.

**Independent Test**: Verificar que los 4 proyectos aparecen con sus datos; los privados/en curso muestran etiquetas y los públicos muestran enlace (quickstart V2).

- [ ] T018 [P] [US2] Create `src/components/ProjectCard.tsx` rendering name, description, `highlights` (lista), `technologies` (lista), etiqueta de estado derivada de `src/lib/content.ts`, y repositorio: si `visibility === 'public'` mostrar enlace `repository.url`; si `'private'` mostrar "Repositorio privado" sin enlace (FR-007, FR-008, FR-009; contract invariantes 2 y 3)
- [ ] T019 [US2] Create `src/components/Projects.tsx` mapping `content.projects` a `ProjectCard` en el orden del arreglo, con `<h2>` de sección (FR-006)
- [ ] T020 [US2] Integrate Projects into `src/app/page.tsx` dentro de `<section id="proyectos">`

**Checkpoint**: US1 y US2 funcionan de forma independiente.

---

## Phase 5: User Story 3 - Evaluar habilidades por categoría (Priority: P2)

**Goal**: Habilidades agrupadas en las 5 categorías con sus tecnologías.

**Independent Test**: Verificar las 5 categorías y sus tecnologías (quickstart V3).

- [ ] T021 [P] [US3] Create `src/components/Skills.tsx` rendering `content.skills` agrupadas por categoría (`name` + lista de `skills`), HTML semántico (FR-004)
- [ ] T022 [US3] Integrate Skills into `src/app/page.tsx` dentro de `<section id="habilidades">`

**Checkpoint**: US3 funcional de forma independiente.

---

## Phase 6: User Story 4 - Contactar a Franco (Priority: P2)

**Goal**: Correo y GitHub accesibles; LinkedIn con espacio reservado sin enlace roto.

**Independent Test**: Correo y GitHub funcionan; LinkedIn reservado sin enlace roto (quickstart V4).

- [ ] T023 [P] [US4] Create `src/components/Contact.tsx` rendering `content.contact`: enlaces `mailto:` (04francomartin@gmail.com) y GitHub (MartinAlonso333); si `available === false` (LinkedIn) mostrar espacio reservado sin enlace (FR-010, contract invariante 4)
- [ ] T024 [US4] Integrate Contact into `src/app/page.tsx` dentro de `<section id="contacto">`

**Checkpoint**: US4 funcional de forma independiente.

---

## Phase 7: User Story 5 - Conocer la formación (Priority: P3)

**Goal**: Formación académica y complementaria visible.

**Independent Test**: Verificar FIUBA (cursando 4.º año) y curso de JavaScript (quickstart V3).

- [ ] T025 [P] [US5] Create `src/components/Education.tsx` rendering `content.education` (programa, institución, estado, tipo) con HTML semántico (FR-005)
- [ ] T026 [US5] Integrate Education into `src/app/page.tsx` dentro de `<section id="formacion">`

**Checkpoint**: US5 funcional de forma independiente.

---

## Phase 8: User Story 6 - Descargar el CV y adaptar la experiencia (Priority: P3)

**Goal**: Botón de CV sin error si falta el PDF y conmutador de tema claro/oscuro con persistencia y sin parpadeo.

**Independent Test**: El botón de CV no lleva a error; alternar tema funciona, persiste y no parpadea (quickstart V5/V4).

- [ ] T027 [US6] Add the CV download button to `src/components/Hero.tsx` using `content.cv`: si `cv.available === false`, el botón no conduce a error ni a enlace roto (atributo deshabilitado o `href` a ancla de reserva); si está disponible, enlaza a `cv.url` (FR-011, contract invariante 5)
- [ ] T028 [P] [US6] Create `src/components/ThemeToggle.tsx` como client component (`'use client'`): `<button>` con etiqueta accesible que describa la acción, ícono SVG con `aria-hidden="true"`, operable por teclado, foco visible (contracts/theme.contract.md, Principio IV)
- [ ] T029 [US6] Integrate ThemeToggle into `src/components/Header.tsx`
- [ ] T030 [US6] Implement theme behavior in `src/components/ThemeToggle.tsx` + `src/lib/theme.ts`: alternar claro/oscuro, escribir `localStorage.theme`, restaurar al cargar, y escuchar cambios de `prefers-color-scheme` solo cuando la preferencia sea `'system'`; evitar hydration mismatch leyendo estado tras montar (FR-013, SC-005, contracts/theme.contract.md)
- [ ] T031 [P] [US6] Add static assets placeholders in `public/`: `favicon.ico` y carpeta lista para `foto.jpg` y `cv.pdf` (los archivos reales se agregan luego como cambio de contenido; sin enlaces rotos mientras falten)

**Checkpoint**: Todas las historias funcionan de forma independiente.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Despliegue, responsive, accesibilidad, performance y documentación.

- [ ] T032 [P] Create `.github/workflows/deploy.yml` (push a la rama principal): checkout, Node 20 LTS con caché npm, `npm ci`, `npm run build`, `actions/upload-pages-artifact` con `path: out`, `actions/deploy-pages`; permisos `contents: read`, `pages: write`, `id-token: write` (contracts/static-export.contract.md)
- [ ] T033 [P] Update `README.md` with project description, stack, scripts (`dev`/`build`/`lint`/`typecheck`), structure and deployment notes (Restricciones Adicionales de la constitución)
- [ ] T034 [P] Verify responsive layout and cross-browser rendering of the built site (`out/`, served via `npx serve out`) at 320, 375, 768, 1024, 1440 and 1920 px across all sections in `src/components/`, in Chrome and Firefox on desktop and using the browser devtools mobile emulation; treat Safari, Edge and iOS devices as NOT verified (no access to them), and record that as a known limitation; fix any scroll horizontal, overlap or touch targets < 44 px (FR-012, SC-003, SC-008, quickstart V6)
- [ ] T035 [P] Verify accessibility of `out/index.html`: keyboard operability, visible focus, contrast ≥ 4.5:1, semantic HTML, image `alt`; run axe DevTools and Lighthouse a11y with no A/AA violations (FR-015, SC-006, quickstart V7)
- [ ] T036 [P] Verify performance budget on locally served `out/`: total transfer < 500 KB and LCP < 2.5 s on mid-tier mobile; confirm no third-party scripts/fonts and only `ThemeToggle` as client island (SC-009, Principio II)
- [ ] T037 [P] Validate the static output: `npm run build` succeeds, `out/index.html` exists, `out/` contains no development artifacts, and HTML validates (Flujo de Desarrollo)
- [ ] T038 Run the full `quickstart.md` validation (V1–V7), remove any dead links/placeholders and ensure no `console.log` or dead code remains (Principio V)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sin dependencias; puede empezar ya.
- **Foundational (Phase 2)**: depende de Setup; BLOQUEA todas las historias.
- **User Stories (Phase 3+)**: dependen de Foundational; pueden ir en paralelo o en orden de prioridad.
- **Polish (Phase 9)**: depende de las historias deseadas.

### User Story Dependencies

- **US1 (P1)**: tras Foundational; sin dependencias.
- **US2 (P1)**: tras Foundational; sin dependencias. Integra en `page.tsx` (archivo compartido, ver nota).
- **US3 (P2)**: tras Foundational; sin dependencias.
- **US4 (P2)**: tras Foundational; sin dependencias.
- **US5 (P3)**: tras Foundational; sin dependencias.
- **US6 (P3)**: tras Foundational; T027 modifica `Hero.tsx` (creado en US1), T029/T030 modifican `Header.tsx` (Foundational). Por eso se recomienda ejecutar US6 después de US1.

### Within Each User Story

- Componente antes de integrarlo en `page.tsx`.
- Los datos invariantes se crean en Foundational (T008) antes de cualquier componente.

### Nota sobre archivos compartidos

`src/app/page.tsx` (T014, T017, T020, T022, T024, T026), `src/components/Hero.tsx`
(T015, T016, T027) y `src/components/Header.tsx` (T013, T029) son archivos compartidos:
las tareas que los tocan NO deben ejecutarse en paralelo entre sí.

---

## Parallel Opportunities

- Setup: T002, T003, T004, T005, T006 en paralelo (archivos distintos, luego de T001).
- Foundational: T009 y T010 en paralelo; T011/T012 dependen de T003/T010; T013 (Header) tras T011/T012, y T014 (page.tsx) tras T013.
- Historias: los componentes `Hero` (T015), `ProjectCard`/`Projects` (T018), `Skills` (T021), `Contact` (T023), `Education` (T025), `ThemeToggle` (T028) son archivos distintos y pueden desarrollarse en paralelo; sus integraciones en `page.tsx` se serializan.
- Polish: T032–T037 en paralelo (artefactos y verificaciones independientes).

## Parallel Example: componentes de historia

```bash
# Componentes de distintas historias (archivos independientes):
Task: "Create src/components/Hero.tsx (US1)"
Task: "Create src/components/ProjectCard.tsx and src/components/Projects.tsx (US2)"
Task: "Create src/components/Skills.tsx (US3)"
Task: "Create src/components/Contact.tsx (US4)"
Task: "Create src/components/Education.tsx (US5)"
Task: "Create src/components/ThemeToggle.tsx (US6)"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Completar Setup (Fase 1).
2. Completar Foundational (Fase 2) — CRÍTICO.
3. Completar US1 (Fase 3).
4. **PARAR y VALIDAR** con quickstart V1.
5. Desplegar/demostrar si está listo.

### Incremental Delivery

1. Setup + Foundational → base lista.
2. US1 → validar → demo (MVP).
3. US2 → validar → demo (proyectos: valor central para reclutadores).
4. US3, US4, US5, US6 → validar cada una y desplegar.
5. Polish (Fase 9): despliegue, responsive, accesibilidad, performance.

### Parallel Team Strategy

1. El equipo completa Setup + Foundational.
2. Luego: Dev A → US1; Dev B → US2; Dev C → US3/US4/US5; un Dev para US6 (tras US1).
3. Serializar solo las integraciones en `page.tsx`, `Hero.tsx` y `Header.tsx`.

---

## Notes

- [P] = archivos distintos, sin dependencias.
- Sin tareas de tests automatizados (decisión de la spec/constitución); la verificación es manual y con tooling.
- Respetar las rutas de archivo exactas del plan.md.
- No dejar código muerto ni `console.log` (Principio V).
- Commit tras cada tarea o grupo lógico.
