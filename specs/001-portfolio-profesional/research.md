# Phase 0 — Research: Portafolio profesional (Next.js estático)

**Feature**: `001-portfolio-profesional` | **Date**: 2026-10-17

Este documento resuelve las decisiones técnicas del plan. No quedan incógnitas
marcadas como NEEDS CLARIFICATION.

---

## R1. Next.js como sitio 100 % estático

- **Decision**: Usar Next.js 16.x (App Router) con `output: 'export'` en
  `next.config.ts`. El build genera la carpeta `out/` con HTML/CSS/JS estáticos.
- **Rationale**: Es el mecanismo oficial de exportación estática; no requiere
  servidor Node en producción y encaja con GitHub Pages. Con App Router, los
  componentes son de servidor por defecto, lo que reduce el JavaScript enviado al
  cliente.
- **Alternatives considered**:
  - `output: 'standalone'` / servidor Next: descartado, viola "sin backend ni
    código de servidor".
  - Pages Router + `next export`: deprecado/eliminado en v14; se prefiere App Router.
  - SPA estática con Vite/React puro: válida, pero el usuario eligió explícitamente
    Next.js.

## R2. Node y versiones de dependencias

- **Decision**: Node.js ≥ 20.9 (LTS). Fijar `next`, `react`, `react-dom`,
  `tailwindcss` y `typescript` a versiones exactas en `package.json` y bloquear con
  `package-lock.json`. A la fecha, Next.js 16.x y Tailwind CSS 4.3.x.
- **Rationale**: Next.js 16 exige Node ≥ 20.9, TypeScript ≥ 5.1 y navegadores
  Chrome/Edge/Firefox 111+ y Safari 16.4+. La constitución exige dependencias fijadas
  a versiones concretas.
- **Alternatives considered**: rangos semver (`^`) — descartados por la restricción de
  fijado; versiones LTS anteriores de Node — descartadas por incompatibilidad.

## R3. Modo oscuro con Tailwind v4 sin parpadeo

- **Decision**: Configurar la estrategia por clase con la directiva CSS
  `@custom-variant dark (&:where(.dark, .dark *));` en `globals.css`. El tema se
  representa con la clase `dark` en `<html>`. Para evitar el flash (FOUC) se inyecta
  un **script mínimo en línea** en el `<head>` (`layout.tsx`) que, antes del primer
  pintado, lee `localStorage` y `prefers-color-scheme` y aplica la clase
  correspondiente.
- **Rationale**: Es el patrón recomendado por Tailwind v4 para alternancia manual
  combinada con la preferencia del sistema. El script en línea se ejecuta antes de
  renderizar, eliminando el parpadeo (SC-005, FR-013).
- **Alternatives considered**:
  - Solo `prefers-color-scheme` (sin toggle): no cumple FR-013.
  - Toggle gestionado 100 % en React tras hidratar: produce parpadeo; descartado.
  - Librería `next-themes`: añade una dependencia innecesaria (Principio I).

## R4. Ausencia de parpadeo con export estático

- **Decision**: Mantener el script anti-parpadeo en línea y pequeño (sin dependencias),
  insertado como `dangerouslySetInnerHTML` en `<head>` del `layout.tsx`, con valores de
  tema validados contra una lista blanca (`light` / `dark` / `system`).
- **Rationale**: Garantiza que la preferencia se aplique antes de que el navegador
  pinte, incluso en HTML estático pre-renderizado. Evita cualquier acceso a `window`
  durante el render de React (que rompería el build estático).
- **Alternatives considered**: cookie de tema leída en el servidor — no aplica en
  export estático sin servidor.

## R5. Imágenes en export estático

- **Decision**: Usar `images: { unoptimized: true }` en `next.config.ts` y almacenar en
  `public/` imágenes ya optimizadas (dimensiones correctas, formato WebP/AVIF con JPEG
  de respaldo cuando corresponda y peso reducido).
- **Rationale**: El optimizador de `next/image` requiere servidor y no funciona con
  `output: 'export'`; la optimización se hace "offline" al preparar los assets. Cumple
  la restricción de imágenes optimizadas del Principio II.
- **Alternatives considered**: `loader: 'custom'` con un CDN externo — descartado por
  simplicidad y por evitar dependencias de terceros.

## R6. Foto y CV con comportamiento de reserva

- **Decision**: Referenciar `public/foto.jpg` y `public/cv.pdf` desde el módulo de
  contenido con un flag de disponibilidad. Mientras no existan, el componente de
  presentación muestra un **espacio reservado** (por ejemplo, iniciales/monograma o
  marco neutro) y el botón de CV queda deshabilitado o apunta a un ancla sin error.
- **Rationale**: Cumple FR-003 y FR-011 sin enlaces rotos; incorporar los archivos reales
  es un cambio de contenido.
- **Alternatives considered**: romper el layout si falta el archivo — descartado.

## R7. Publicación en GitHub Pages (sitio de usuario)

- **Decision**: Workflow de GitHub Actions (`.github/workflows/deploy.yml`) que en cada
  push a la rama principal: hace checkout, configura Node 20 LTS, `npm ci`, `npm run
  build`, sube `out/` como artefacto de Pages y despliega. Sin `basePath`/`assetPrefix`
  (sitio de usuario en la raíz del dominio).
- **Rationale**: Es el flujo oficial para Pages con Actions; solo se publica la salida
  estática, sin artefactos de desarrollo (Restricciones Adicionales). `npm ci` garantiza
  instalación reproducible desde el lockfile.
- **Alternatives considered**: publicar `out/` a una rama `gh-pages` con `push` manual —
  descartado por fragilidad; Pages "Deploy from branch" con la raíz del repo — descartado
  porque publicaría fuentes y artefactos de desarrollo.

## R8. Estrategia de verificación (sin suite automatizada)

- **Decision**: Verificar con `tsc --noEmit` (contrato de contenido), ESLint,
  `next build`, validación HTML (W3C), Lighthouse (performance ≥ objetivo, accesibilidad,
  buenas prácticas), axe DevTools (WCAG 2.1 AA) y revisión responsive manual en
  320/375/768/1024/1440/1920 px.
- **Rationale**: La constitución admite verificación manual mientras no exista suite
  automatizada, e indica que cualquier automatización debe cubrir los mismos puntos.
  Evita añadir infraestructura de tests que contradiga el Principio I.
- **Alternatives considered**: Vitest + Testing Library — descartado por simplicidad
  (no hay lógica compleja más allá del tema); Playwright — sobredimensionado para una
  página.

## R9. Idioma, tipografía y assets de terceros

- **Decision**: Contenido e interfaz solo en español (`<html lang="es">`). No cargar
  fuentes, iconos ni scripts de terceros; usar una pila de fuentes del sistema (system
  font stack) e iconos SVG en línea.
- **Rationale**: Minimiza peso y solicitudes de red (Principio II), evita dependencias
  externas y respeta la restricción de terceros al mínimo.
- **Alternatives considered**: Google Fonts / conjunto de iconos por CDN — descartados
  por costo de performance y por el Principio I.

## Resolved Unknowns

| Incógnita | Resolución |
|-----------|------------|
| Mecanismo de export estático | `output: 'export'` → carpeta `out/` (R1) |
| Versiones objetivo | Node ≥ 20.9, Next 16.x, Tailwind 4.3.x, TS 5.x fijadas (R2) |
| Dark mode sin parpadeo | `@custom-variant dark` + script en línea (R3, R4) |
| Imágenes optimizadas en estático | `unoptimized: true` + assets pre-optimizados (R5) |
| Reserva de foto/CV | Flags de disponibilidad en el contenido; UI de reserva (R6) |
| Despliegue | GitHub Actions → Pages, solo `out/`, sin basePath (R7) |
| Verificación | tsc + ESLint + build + Lighthouse + axe + manual (R8) |
| Terceros | Sin fuentes/iconos/scripts externos; system fonts + SVG (R9) |
