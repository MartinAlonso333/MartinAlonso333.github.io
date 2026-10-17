# Implementation Plan: Portafolio profesional de Franco Martín Alonso

**Branch**: `001-portfolio-profesional` | **Date**: 2026-10-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-profesional/spec.md`

## Summary

Sitio de una sola página que presenta el perfil profesional de Franco Martín Alonso
(estudiante de Ingeniería Informática en FIUBA en busca de pasantía o primer empleo
backend). Se implementa con **Next.js (App Router) + TypeScript + Tailwind CSS**,
compilado como **sitio 100 % estático** (`output: 'export'`) y publicado en GitHub
Pages mediante GitHub Actions. Todo el contenido (perfil, habilidades, formación,
proyectos, contacto) reside en un **único módulo de datos tipado** separado de los
componentes, de modo que agregar o editar contenido no implique tocar la lógica. El
contenido es **bilingüe** (español por defecto e inglés): todo texto legible se modela
como `LocalizedText` y el visitante alterna el idioma al instante con un control
accesible, sin recargar, con la elección persistida. El
tema claro/oscuro respeta la preferencia del sistema, permite alternancia manual sin
parpadeo y persiste la elección. La foto y el CV se guardan en `public/` con
comportamiento de reserva mientras no existan. El enfoque técnico prioriza el envío
mínimo de JavaScript en el cliente (componentes de servidor por defecto, pocas islas
interactivas) para respetar el presupuesto de performance de la constitución.

## Technical Context

**Language/Version**: TypeScript 5.x (modo `strict`); Node.js ≥ 20.9 (LTS)

**Primary Dependencies**: Next.js 16.x (App Router, `output: 'export'`), React 19.2.x
(incluido por Next), Tailwind CSS 4.3.x. Dependencias fijadas a versiones exactas
(sin rangos `^`/`~`) y bloqueadas con `package-lock.json`.

**Storage**: N/A — sitio estático. El contenido se define en un módulo TypeScript
tipado (`src/content/portfolio.ts`) validado en tiempo de compilación; la interfaz, en
`src/content/ui.ts`.

**Testing**: Sin suite de tests automatizada (Principio I, simplicidad). Verificación
mediante: `tsc --noEmit` (tipos), ESLint, `next build` (fallo si el contenido no
cumple el contrato de tipos), validación HTML (W3C), Lighthouse (performance,
accesibilidad, mejores prácticas), axe DevTools (WCAG 2.1 AA) y revisión responsive
manual en los breakpoints definidos. Si se introduce automatización, debe cubrir los
mismos puntos (Flujo de Desarrollo de la constitución).

**Target Platform**: Hosting estático — GitHub Pages, sitio de usuario
`https://martinalonso333.github.io` (sin `basePath`). Navegadores evergreens:
Chrome/Edge/Firefox 111+ y Safari 16.4+ (mínimos soportados por Next.js 16), más
Safari iOS y Chrome Android.

**Project Type**: Aplicación web de una sola página (frontend estático, sin backend).

**Performance Goals**: < 500 KB de transferencia total y LCP < 2,5 s en móvil de gama
media (SC-009, Principio II). JavaScript de cliente mínimo: componentes de servidor
por defecto y solo las islas interactivas imprescindibles (tema e idioma). El estado de
idioma se comparte con un provider mínimo; el texto no se duplica en la página.

**Constraints**: `output: 'export'` obligatorio; sin código de servidor, sin rutas de
API, sin secretos versionados. Diseño mobile-first entre 320 px y 1920 px. WCAG 2.1
AA. Tema claro/oscuro sin parpadeo. Español por defecto; alternancia de idioma al
instante sin cambiar la URL. Dependencias fijadas a versiones concretas.

**Scale/Scope**: 1 página, 6 secciones (presentación, habilidades, formación,
proyectos, contacto y navegación), 4 proyectos, ~5 categorías de habilidades, 2
elementos de formación, 3 canales de contacto, 2 idiomas completos.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Evaluación | Estado |
|-----------|------------|--------|
| I. Simplicidad ante todo | Se introduce un framework (Next.js) y un paso de build. La constitución lo permite **solo con justificación documentada**. Justificación registrada en Complexity Tracking. | JUSTIFICADO (con seguimiento) |
| II. Carga rápida | Presupuesto < 500 KB / LCP < 2,5 s adoptado como SC-009. Se mitiga con export estático, componentes de servidor por defecto, mínimo JS de cliente e imágenes pre-optimizadas (`images.unoptimized` + assets ya comprimidos). | PASS (con verificación) |
| III. Diseño responsive | Tailwind mobile-first, rango 320–1920 px, objetivos táctiles ≥ 44 px. | PASS |
| IV. Accesibilidad (no negociable) | HTML semántico, foco visible, contraste AA, navegación por teclado; verificación con axe y Lighthouse. | PASS |
| V. Código limpio y mantenible | TypeScript `strict`, ESLint, una única fuente de verdad (módulo de contenido), sin código muerto ni `console.log`. | PASS |
| VI. Contenido desacoplado de la lógica | Todo el contenido en `src/content/portfolio.ts` tipado; los componentes solo lo consumen. Agregar un proyecto = cambio de datos. | PASS |

**Restricciones Adicionales**: se cumplen (salida estática, sin servidor ni secretos,
assets versionados y optimizados, dependencias fijadas).

**Resultado del gate**: PASS con una violación justificada (Principio I) registrada en
Complexity Tracking. No se requieren enmiendas a la constitución.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-profesional/
├── plan.md              # Este archivo (/speckit.plan)
├── research.md          # Fase 0 (/speckit.plan)
├── data-model.md        # Fase 1 (/speckit.plan)
├── quickstart.md        # Fase 1 (/speckit.plan)
├── contracts/           # Fase 1 (/speckit.plan)
│   ├── content-model.contract.md
│   ├── theme.contract.md
│   ├── language.contract.md
│   └── static-export.contract.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Fase 2 (/speckit.tasks — NO lo crea /speckit.plan)
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── deploy.yml            # Build (next build → out/) y deploy a GitHub Pages

public/                       # Assets estáticos servidos tal cual
├── foto.jpg                  # Foto de perfil (se agrega más adelante; reserva si falta)
├── cv.pdf                    # CV en PDF (se agrega más adelante; botón sin error si falta)
└── favicon.ico

src/
├── app/
│   ├── layout.tsx            # <html lang="es">, metadatos, script anti-parpadeo, LanguageProvider
│   ├── page.tsx              # Composición de las secciones (client component)
│   └── globals.css           # @import "tailwindcss", tokens y @custom-variant dark
├── components/
│   ├── LanguageProvider.tsx  # Isla cliente: contexto de idioma (useLanguage)
│   ├── LanguageToggle.tsx    # Isla cliente: alterna idioma y persiste
│   ├── Header.tsx            # Navegación fija con anclas (client) + ThemeToggle + LanguageToggle
│   ├── ThemeToggle.tsx       # Isla cliente: alterna tema y persiste
│   ├── Hero.tsx              # Presentación + reserva de foto + botón de CV (client)
│   ├── Skills.tsx            # Habilidades por categoría (client)
│   ├── Education.tsx         # Formación (client)
│   ├── Projects.tsx          # Lista de proyectos (client)
│   ├── ProjectCard.tsx       # Proyecto individual (descripción, puntos, stack, estado) (client)
│   └── Contact.tsx           # Correo, GitHub y reserva de LinkedIn (client)
├── content/
│   ├── portfolio.ts          # FUENTE ÚNICA de contenido bilingüe (datos tipados)
│   └── ui.ts                 # Textos de interfaz bilingües (navegación, etiquetas, metadatos)
├── types/
│   └── content.ts            # Interfaces del modelo de contenido (Language, LocalizedText, …)
└── lib/
    ├── i18n.ts               # Constantes y helpers de idioma (clave de almacenamiento, pick)
    ├── theme.ts              # Constantes y helpers de tema (clave de almacenamiento)
    └── content.ts            # Selectores/labels derivados del contenido (sin duplicar datos)

next.config.ts                # output: 'export', images.unoptimized, etc.
postcss.config.mjs            # plugin @tailwindcss/postcss
tsconfig.json                 # strict
package.json                  # dependencias fijadas (versiones exactas)
package-lock.json
```

**Structure Decision**: Proyecto único (opción por defecto) en la raíz del repositorio,
ya que se trata de una aplicación web estática de una sola página sin backend. La
separación clave es `src/content/` (datos) vs `src/components/` (presentación), que
materializa el Principio VI. Los artefactos de build (`out/`, `.next/`,
`node_modules/`) quedan fuera del control de versiones mediante `.gitignore`.

## Palette (T011 — tokens semánticos de color)

Definida en `src/app/globals.css` bajo `:root` (claro) y `.dark` (oscuro), y expuesta a
Tailwind v4 mediante `@theme inline`. Los componentes solo usan utilidades de token
(`bg-background`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `text-accent`,
`border-border`, `border-accent`, `outline-accent`): **no hay colores fijos ni valores
arbitrarios en los `.tsx`** (verificado con un barrido de literales `#hex` y de utilidades
de color).

### Tokens

| Token | Rol | Modo claro | Modo oscuro |
|-------|-----|-----------|-------------|
| `--background` | fondo | `#FAFAF9` | `#0F1115` |
| `--muted` | superficie | `#FFFFFF` | `#171A21` |
| `--foreground` | texto | `#1C1917` | `#E8EAED` |
| `--muted-foreground` | texto secundario | `#57534E` | `#9AA3AF` |
| `--accent` | acento | `#0F766E` | `#2DD4BF` |
| `--accent-foreground` | texto sobre acento | `#FFFFFF` | `#042F2E` |
| `--border` | bordes | `#E7E5E4` | `#2A2F3A` |

### Contraste medido (WCAG 2.1, fórmula reluminancia sRGB)

| Par | Claro | Oscuro | Mínimo |
|-----|-------|--------|--------|
| texto / fondo | 16,74:1 | 15,68:1 | 4,5:1 |
| texto / superficie | 17,49:1 | 14,45:1 | 4,5:1 |
| texto / tarjeta (`bg-muted/40` → `#FCFCFB` / `#12151A`) | 17,04:1 | 15,18:1 | 4,5:1 |
| texto secundario / fondo | 7,30:1 | 7,41:1 | 4,5:1 |
| texto secundario / superficie | 7,63:1 | 6,82:1 | 4,5:1 |
| acento / fondo (hover de enlaces) | 5,24:1 | 10,15:1 | 4,5:1 |
| acento / superficie | 5,47:1 | 9,35:1 | 4,5:1 |
| texto sobre acento / acento | 5,47:1 | 7,77:1 | 4,5:1 |
| texto grande (h1, 30 px) / fondo | 16,74:1 | 15,68:1 | 3:1 |

**Foco visible (FR-015, SC-006)**: `focus-visible:outline-2 … outline-accent` con
`outline-offset-2`; el acento contra el fondo da **5,24:1 (claro)** y **10,15:1 (oscuro)**,
por encima del 3:1 exigido al indicador de foco, y se distingue en ambos temas.

**Bordes**: `--border` (`#E7E5E4` / `#2A2F3A`) da 1,20:1 y 1,41:1 contra el fondo, por
debajo de 3:1. Los bordes son **decorativos**: no identifican por sí solos controles ni
estados (WCAG 1.4.11 no aplica), porque la identificación de cada botón/enlace la da su
texto, que sí cumple ≥ 4,5:1 en ambos temas. El color pedido por el usuario se respeta sin
ajustes.

## Complexity Tracking

> Violación justificada del Principio I (introducción de framework y paso de build).

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Uso de Next.js + Tailwind + build step (Principio I) | Decisión explícita del proyecto: practicar un stack de frontend moderno y frecuente en el mercado laboral, y aprovechar la componentización y los tipos de TypeScript para mantener el contenido desacoplado de la lógica (Principio VI). | HTML/CSS/JS vainilla mantendría el sitio más simple de servir, pero no permite practicar el stack objetivo ni ofrece tipado del contenido ni componentización equivalentes, que son requisitos explícitos del usuario. |
| Envío de JavaScript de cliente (React) | Necesario para el conmutador de tema interactivo y el de idioma (contenido bilingüe reactivo). | Eliminar React implicaría renunciar al stack elegido; se mitiga limitando el JS de cliente al mínimo (componentes de servidor por defecto, un único provider) para sostener el presupuesto de performance (Principio II). |

## Post-Design Constitution Re-Check

*Re-evaluación tras Fase 1 (data-model, contracts, quickstart).*

| Principio | Post-diseño | Estado |
|-----------|-------------|--------|
| I. Simplicidad | El diseño no añade dependencias más allá de las tres principales; no hay librerías de estado, UI ni i18n (el idioma se resuelve con un `provider` propio y `pick`). Complejidad acotada y justificada. | JUSTIFICADO |
| II. Carga rápida | Sin fuentes externas ni iconos vía CDN (SVG en línea); imágenes pre-optimizadas; islas cliente = tema e idioma (con un provider mínimo). Presupuesto verificable en quickstart. | PASS |
| III. Responsive | Layout con utilidades Tailwind mobile-first; breakpoints documentados en quickstart. El texto bilingüe no genera scroll horizontal a 320 px. | PASS |
| IV. Accesibilidad | Contratos exigen HTML semántico, foco visible y contraste AA; el control de idioma es un botón con etiqueta localizada y `lang` actualizado; verificable con axe/Lighthouse. | PASS |
| V. Código limpio | Tipos estrictos como contrato de contenido; labels derivados en `lib/content.ts` y textos de interfaz en `ui.ts` para evitar duplicación. | PASS |
| VI. Contenido desacoplado | `content-model.contract.md` fija el contrato entre datos y presentación; `language.contract.md` fija el comportamiento del idioma; agregar contenido no toca componentes. | PASS |

**Resultado**: PASS. Sin violaciones nuevas; la única violación (Principio I) permanece
justificada.
