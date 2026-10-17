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
- **[Story]**: historia de usuario (US1–US7)
- Cada tarea incluye la ruta exacta del archivo

## Path Conventions

Proyecto único en la raíz del repositorio. Paths: `src/`, `public/`,
`.github/workflows/`, config en raíz (`next.config.ts`, etc.).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialización del proyecto Next.js + Tailwind y tooling.

- [x] T001 Create the project directory structure per plan.md: `src/app/`, `src/components/`, `src/content/`, `src/types/`, `src/lib/`, `public/`, `.github/workflows/`
- [x] T002 [P] Initialize `package.json` with exact pinned dependencies `next` (16.x), `react` (19.3.x), `react-dom` (19.3.x) and scripts `dev`, `build`, `start`, `lint`, `typecheck` (`tsc --noEmit`) — sin rangos `^`/`~` (contracts/static-export.contract.md)
- [x] T003 [P] Configure Tailwind CSS v4: install `tailwindcss` + `@tailwindcss/postcss` (versions pinned), create `postcss.config.mjs`
- [x] T004 [P] Configure TypeScript in `tsconfig.json` with `"strict": true` and path alias `@/*` → `src/*`
- [x] T005 [P] Configure ESLint (`eslint-config-next`) and Prettier; add `.gitignore` ignoring `node_modules/`, `.next/`, `out/`
- [x] T006 [P] Create `next.config.ts` with `output: 'export'` and `images: { unoptimized: true }`, sin `basePath` ni `assetPrefix` (contracts/static-export.contract.md)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Contrato de contenido, tema base y layout. Bloquea TODAS las historias.

**⚠️ CRITICAL**: Ninguna historia puede comenzar hasta terminar esta fase.

- [x] T007 Create content interfaces in `src/types/content.ts` exactly as defined in contracts/content-model.contract.md: tipos base `Language` (`'es' | 'en'`) y `LocalizedText` (`Record<Language, string>`); `PortfolioContent`, `Profile` (con campos localizados), `SpokenLanguage` (antes `Language`), `PhotoRef` (`alt` localizado), `SkillCategory` (`name` localizado), `EducationItem` (campos localizados), `Project` con `repositories: RepositoryRef[]`, `RepositoryRef` con `label` localizado/`visibility`/`url?`, `ProjectStatus`, `RepositoryVisibility`, `ContactLink` (`label`/`value` localizados), `ContactKind`, `CvResource`
- [x] T008 Populate `src/content/portfolio.ts` with all bilingual content (perfil de Franco, 6 categorías de habilidades, 2 ítems de formación, 4 proyectos, 3 contactos, recurso CV) satisfying all invariants of data-model.md: `id` único por colección; `repositories` con al menos un elemento por proyecto; `visibility === 'private'` ⇒ sin `url`; repositorio público con `url` ⇒ enlace disponible; repositorio público sin `url` ⇒ estado "pendiente"; `available === false` (LinkedIn, CV) ⇒ sin `url`; `photo.available === false`; PSA con dos repositorios ("Código backend"/"Backend code" y "Código frontend"/"Frontend code") y los de un solo repositorio con "Código fuente"/"Source code"; todo `LocalizedText` con `es` y `en`; dejar un comentario `TODO` con la URL a cargar en los repositorios pendientes (depende de T007)
- [x] T009 [P] Create derived labels/selectors in `src/lib/content.ts`: función de etiqueta de estado (`'in-progress'` → "En desarrollo"/"In progress", `'completed'` → "Finalizado"/"Completed") y de repositorio (`'private'` → "Repositorio privado"/"Private repository", público con `url` → enlace, público sin `url` → pendiente), tomando los textos de `src/content/ui.ts` y recibiendo el idioma activo, sin duplicar esos textos en `portfolio.ts` (contracts/content-model.contract.md, contracts/language.contract.md)
- [x] T010 [P] Create theme constants/helpers in `src/lib/theme.ts`: clave `theme` de `localStorage` como constante única, valores permitidos `['light','dark','system']`, y función de resolución de tema efectivo (contracts/theme.contract.md)
- [x] T011 Configure `src/app/globals.css`: `@import "tailwindcss"`, tokens semánticos de color y `@custom-variant dark (&:where(.dark, .dark *));` (contracts/theme.contract.md)
- [x] T012 Create `src/app/layout.tsx`: `<html lang={DEFAULT_LANGUAGE}>` (por defecto `en`), metadatos (title/description), y script en línea anti-parpadeo en `<head>` que lee `localStorage` + `prefers-color-scheme` y aplica la clase `dark`, validando el valor contra la lista blanca (contracts/theme.contract.md)
- [x] T013 Create `src/components/Header.tsx` con navegación fija (sticky) por anclas a `#about`, `#skills`, `#education`, `#projects`, `#contact`, operable por teclado con foco visible, HTML semántico (`<header>`, `<nav>`), con marca y espacio para el conmutador de tema (FR-016)
- [x] T014 Create `src/app/page.tsx` como composición de secciones, renderizando `Header` y un `<main>` preparado para las secciones (placeholders por historia) (depende de T013)

**Checkpoint**: Contrato de contenido, tema base y layout listos; las historias pueden comenzar.

---

## Phase 3: User Story 1 - Conocer el perfil profesional (Priority: P1) 🎯 MVP

**Goal**: La presentación muestra nombre, título, descripción, ubicación e idiomas, con espacio reservado para la foto.

**Independent Test**: Abrir la página y verificar que la sección de presentación muestra todos los campos de `profile` y la reserva de foto sin romper el layout (quickstart V1).

- [x] T015 [P] [US1] Create `src/components/Hero.tsx` (client) rendering `content.profile` en el idioma activo (`useLanguage()` + `pick`): nombre, título, resumen (párrafos de `summary` separados por `\n\n` como `<p>` independientes), ubicación e idiomas con HTML semántico (`<section>`, `<h2>`, lista de idiomas) (FR-002)
- [x] T016 [US1] Implement the photo reservation in `src/components/Hero.tsx`: si `profile.photo` falta o `photo.available === false`, mostrar un espacio reservado accesible (sin `<img>` roto); cuando esté disponible, usar `next/image` con `alt` no vacío (FR-003, contract invariante 6)
- [x] T017 [US1] Integrate Hero into `src/app/page.tsx` dentro de `<section id="about">` en el orden de secciones del plan

**Checkpoint**: US1 funcional y validable de forma independiente (MVP).

---

## Phase 4: User Story 2 - Explorar los proyectos destacados (Priority: P1)

**Goal**: Los cuatro proyectos se muestran con descripción, puntos clave, tecnologías, estado y sus repositorios.

**Independent Test**: Verificar que los 4 proyectos aparecen con sus datos; los privados/en curso muestran etiquetas, los públicos con enlace disponible muestran sus botones y los pendientes no generan enlaces rotos (quickstart V2).

- [x] T018 [P] [US2] Create `src/components/ProjectCard.tsx` rendering name, description, `highlights` (lista), `technologies` (lista), etiqueta de estado derivada de `src/lib/content.ts`, y todos los `repositories` del proyecto dentro de la misma tarjeta: repositorio público con `url` ⇒ botón con ícono de GitHub, uno al lado del otro (en columna si no entran en pantallas angostas), etiquetado con `repository.label` ("Código backend", "Código frontend") e indicando a qué repositorio lleva; repositorio privado ⇒ etiqueta "Repositorio privado" en lugar de botón; repositorio público sin `url` (pendiente) ⇒ sin botón ni enlace roto. Los botones MUST ser operables por teclado, con foco visible, contraste suficiente y objetivo táctil ≥ 44 px (FR-007, FR-008, FR-009; contract invariantes 2–5; Principio IV)
- [x] T019 [US2] Create `src/components/Projects.tsx` mapping `content.projects` a `ProjectCard` en el orden del arreglo, con `<h2>` de sección (FR-006)
- [x] T020 [US2] Integrate Projects into `src/app/page.tsx` dentro de `<section id="projects">`

**Checkpoint**: US1 y US2 funcionan de forma independiente.

---

## Phase 5: User Story 3 - Evaluar habilidades por categoría (Priority: P2)

**Goal**: Habilidades agrupadas en las 6 categorías con sus tecnologías.

**Independent Test**: Verificar las 6 categorías y sus tecnologías (quickstart V3).

- [x] T021 [P] [US3] Create `src/components/Skills.tsx` (client) rendering `content.skills` agrupadas por categoría (`name` localizado + lista de `skills`), HTML semántico, resolviendo el idioma activo con `useLanguage()` (FR-004)
- [x] T022 [US3] Integrate Skills into `src/app/page.tsx` dentro de `<section id="skills">`

**Checkpoint**: US3 funcional de forma independiente.

---

## Phase 6: User Story 4 - Contactar a Franco (Priority: P2)

**Goal**: Correo y GitHub accesibles; LinkedIn con espacio reservado sin enlace roto.

**Independent Test**: Correo y GitHub funcionan; LinkedIn reservado sin enlace roto (quickstart V4).

- [x] T023 [P] [US4] Create `src/components/Contact.tsx` (client) rendering `content.contact` con textos localizados (`label`/`value`): el correo (04francomartin@gmail.com) se muestra como texto seleccionable (sin enlace `mailto:`) con un botón pequeño de copiar (etiqueta accesible localizada, operable por teclado, foco visible, objetivo táctil ≥ 44 px) que confirma "Copiado"/"Copied" con `aria-live="polite"` durante unos segundos y sin error si el portapapeles no está disponible; GitHub (MartinAlonso333) como enlace; si `available === false` (LinkedIn) mostrar espacio reservado sin enlace (FR-010, contract invariante 4)
- [x] T024 [US4] Integrate Contact into `src/app/page.tsx` dentro de `<section id="contact">`

**Checkpoint**: US4 funcional de forma independiente.

---

## Phase 7: User Story 5 - Conocer la formación (Priority: P3)

**Goal**: Formación académica y complementaria visible.

**Independent Test**: Verificar FIUBA (cursando 4.º año) y curso de JavaScript (quickstart V3).

- [x] T025 [P] [US5] Create `src/components/Education.tsx` (client) rendering `content.education` (programa, institución, estado y tipo localizados) con HTML semántico (FR-005)
- [x] T026 [US5] Integrate Education into `src/app/page.tsx` dentro de `<section id="education">`

**Checkpoint**: US5 funcional de forma independiente.

---

## Phase 8: User Story 6 - Descargar el CV y adaptar la experiencia (Priority: P3)

**Goal**: Botón de CV sin error si falta el PDF y conmutador de tema claro/oscuro con persistencia y sin parpadeo.

**Independent Test**: El botón de CV no lleva a error; alternar tema funciona, persiste y no parpadea (quickstart V5/V4).

- [x] T027 [US6] Add the CV download button to `src/components/Hero.tsx` using `content.cv`: si `cv.available === false`, el botón no conduce a error ni a enlace roto (atributo deshabilitado o `href` a ancla de reserva); si está disponible, enlaza a `cv.url` (FR-011, contract invariante 5)
- [x] T028 [P] [US6] Create `src/components/ThemeToggle.tsx` como client component (`'use client'`): `<button>` con etiqueta accesible que describa la acción, ícono SVG con `aria-hidden="true"`, operable por teclado, foco visible (contracts/theme.contract.md, Principio IV)
- [x] T029 [US6] Integrate ThemeToggle into `src/components/Header.tsx`
- [x] T030 [US6] Implement theme behavior in `src/components/ThemeToggle.tsx` + `src/lib/theme.ts`: alternar claro/oscuro, escribir `localStorage.theme`, restaurar al cargar, y escuchar cambios de `prefers-color-scheme` solo cuando la preferencia sea `'system'`; evitar hydration mismatch leyendo estado tras montar (FR-013, SC-005, contracts/theme.contract.md)
- [x] T031 [P] [US6] Add static assets placeholders in `public/`: `favicon.ico` y carpeta lista para `foto.jpg` y `cv.pdf` (los archivos reales se agregan luego como cambio de contenido; sin enlaces rotos mientras falten)

**Checkpoint**: Todas las historias funcionan de forma independiente.

---

## Phase 9: User Story 7 - Alternar el idioma de la página (Priority: P2)

**Goal**: Un control en el header alterna toda la página entre inglés y español al instante, actualiza `<html lang>`, persiste la elección y usa inglés por defecto.

**Independent Test**: Cambiar el idioma con el control, verificar que todo el contenido y la interfaz cambian de inmediato sin recargar, que `<html lang>` se actualiza y que la elección persiste tras recargar; con JS deshabilitado se ve inglés (quickstart V8).

- [x] T032 [P] [US7] Create `src/lib/i18n.ts`: constantes `DEFAULT_LANGUAGE = 'en'` (idioma por defecto: inglés), `LANGUAGES`, `LANGUAGE_STORAGE_KEY = 'lang'` y helpers `isLanguage` (type guard) y `pick(text, language)` (contracts/language.contract.md)
- [x] T033 [P] [US7] Create `src/content/ui.ts`: diccionario de textos de interfaz bilingüe (`LocalizedText`) — navegación, títulos de sección, etiquetas de estado de proyecto y de repositorio privado, etiquetas de tipo de formación, textos de reserva (foto), metadatos (title/description) y `aria-label` del control de idioma (contracts/language.contract.md, Principio VI)
- [x] T034 [US7] Create `src/components/LanguageProvider.tsx` (`'use client'`): contexto `{ language, setLanguage, toggle }` y hook `useLanguage()`; el idioma es un almacén externo leído con `useSyncExternalStore` (snapshot del servidor en `DEFAULT_LANGUAGE` para no diferir del HTML pre-renderizado, valor de `localStorage.lang` validado con `isLanguage` en cliente), escribe `document.documentElement.lang` desde un efecto y persiste el cambio en `localStorage.lang` (FR-017, contracts/language.contract.md; depende de T032)
- [x] T035 [US7] Create `src/components/LanguageToggle.tsx` (`'use client'`): `<button>` con etiqueta accesible localizada, operable por teclado, foco visible y estado comunicado con texto (no solo color); alterna el idioma vía `useLanguage()` (FR-017, Principio IV; depende de T034)
- [x] T036 [US7] Wrap `{children}` with `LanguageProvider` in `src/app/layout.tsx`, add `LanguageToggle` to `src/components/Header.tsx`, and make `Header`, `Hero`, `Projects`, `ProjectCard` y `page.tsx` client components que consumen `useLanguage()` y resuelven el texto con `pick` (depende de T034, T035)
- [x] T037 [US7] Hacer que las etiquetas derivadas de `src/lib/content.ts` reciban el idioma activo (`getProjectStatusLabel(status, language)`, `getPrivateRepositoryLabel(language)`) leyendo de `src/content/ui.ts`; verificar el render bilingüe, el cambio de `<html lang>` y la persistencia (quickstart V8)

**Checkpoint**: El sitio alterna español/inglés al instante y recuerda la elección.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Despliegue, responsive, accesibilidad, performance y documentación.

- [x] T038 [P] Create `.github/workflows/deploy.yml` (push a la rama principal): checkout, Node 20 LTS con caché npm, `npm ci`, `npm run build`, `actions/upload-pages-artifact` con `path: out`, `actions/deploy-pages`; permisos `contents: read`, `pages: write`, `id-token: write` (contracts/static-export.contract.md)
- [x] T039 [P] Update `README.md` with project description, stack, scripts (`dev`/`build`/`lint`/`typecheck`), structure and deployment notes (Restricciones Adicionales de la constitución)
- [ ] T040 [P] Verify responsive layout and cross-browser rendering of the built site (`out/`, served via `npx serve out`) at 320, 375, 768, 1024, 1440 and 1920 px across all sections in `src/components/`, in Chrome and Firefox on desktop and using the browser devtools mobile emulation; treat Safari, Edge and iOS devices as NOT verified (no access to them), and record that as a known limitation; fix any scroll horizontal, overlap or touch targets < 44 px, en ambos idiomas (FR-012, SC-003, SC-008, quickstart V6)
- [ ] T041 [P] Verify accessibility of `out/index.html`: keyboard operability, visible focus, contrast ≥ 4.5:1, semantic HTML, image `alt`; run axe DevTools and Lighthouse a11y with no A/AA violations, en ambos idiomas (FR-015, SC-006, quickstart V7)
- [ ] T042 [P] Verify performance budget on locally served `out/`: total transfer < 500 KB and LCP < 2.5 s on mid-tier mobile; confirm no third-party scripts/fonts and that the only client islands are ThemeToggle, LanguageToggle y LanguageProvider (SC-009, Principio II)
- [ ] T043 [P] Validate the static output: `npm run build` succeeds, `out/index.html` exists, el HTML pre-renderizado está en inglés (`lang="en"`), `out/` contains no development artifacts, and HTML validates (Flujo de Desarrollo)
- [ ] T044 Run the full `quickstart.md` validation (V1–V8), remove any dead links/placeholders and ensure no `console.log` or dead code remains (Principio V)

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
- **US7 (P2)**: tras Foundational; T036/T037 modifican `layout.tsx` y `page.tsx` (compartidos) y convierten `Header`/`Hero`/`Projects`/`ProjectCard` en client components. Se recomienda ejecutar US7 después de US1 y US2 (y antes de Polish) para que las verificaciones de Polish cubran el modo bilingüe.

### Within Each User Story

- Componente antes de integrarlo en `page.tsx`.
- Los datos invariantes se crean en Foundational (T008) antes de cualquier componente.

### Nota sobre archivos compartidos

`src/app/page.tsx` (T014, T017, T020, T022, T024, T026, T036), `src/components/Hero.tsx`
(T015, T016, T027, T036), `src/components/Header.tsx` (T013, T029, T036) y
`src/app/layout.tsx` (T012, T036) son archivos compartidos: las tareas que los tocan NO
deben ejecutarse en paralelo entre sí. `src/lib/content.ts` (T009, T037) y
`src/components/{Projects,ProjectCard}.tsx` (T018, T019, T036) también se tocan en US2 y
US7.

---

## Parallel Opportunities

- Setup: T002, T003, T004, T005, T006 en paralelo (archivos distintos, luego de T001).
- Foundational: T009 y T010 en paralelo; T011/T012 dependen de T003/T010; T013 (Header) tras T011/T012, y T014 (page.tsx) tras T013.
- Historias: los componentes `Hero` (T015), `ProjectCard`/`Projects` (T018), `Skills` (T021), `Contact` (T023), `Education` (T025), `ThemeToggle` (T028) son archivos distintos y pueden desarrollarse en paralelo; sus integraciones en `page.tsx` se serializan.
- US7: T032 (`i18n.ts`) y T033 (`ui.ts`) en paralelo; T034 tras T032; T035 tras T034; T036 tras T034/T035; T037 tras T036. T036/T037 se serializan con las integraciones de US1–US6 en los archivos compartidos.
- Polish: T038–T043 en paralelo (artefactos y verificaciones independientes); T044 al final.

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
4. US3, US4, US5, US6, US7 → validar cada una y desplegar.
5. Polish (Fase 10): despliegue, responsive, accesibilidad, performance.

### Parallel Team Strategy

1. El equipo completa Setup + Foundational.
2. Luego: Dev A → US1; Dev B → US2; Dev C → US3/US4/US5; un Dev para US6 (tras US1) y US7 (tras US1/US2).
3. Serializar solo las integraciones en `page.tsx`, `Hero.tsx`, `Header.tsx` y `layout.tsx`.

---

## Notes

- [P] = archivos distintos, sin dependencias.
- Sin tareas de tests automatizados (decisión de la spec/constitución); la verificación es manual y con tooling.
- Respetar las rutas de archivo exactas del plan.md.
- No dejar código muerto ni `console.log` (Principio V).
- Commit tras cada tarea o grupo lógico.
