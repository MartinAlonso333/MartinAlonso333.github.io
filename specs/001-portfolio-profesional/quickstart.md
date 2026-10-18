# Quickstart — Validación del portafolio

**Feature**: `001-portfolio-profesional` | **Date**: 2026-10-17

Guía para ejecutar y validar el sitio de punta a punta. No contiene la implementación;
los detalles de comportamiento están en `contracts/` y el modelo en `data-model.md`.

## Prerequisites

- Node.js ≥ 20.9 (LTS) y npm.
- Repositorio con las dependencias fijadas en `package.json` y `package-lock.json`.

## Setup

```bash
npm ci          # instalación reproducible desde el lockfile
```

## Desarrollo

```bash
npm run dev     # servidor de desarrollo en http://localhost:3000
```

## Build estático y servido local

```bash
npm run build            # genera out/ (debe terminar sin errores)
npx serve out            # sirve la salida estática para validar como en producción
```

Comprobación rápida de la salida:

- Existe `out/index.html`.
- El HTML pre-renderizado está en el idioma por defecto: `<html lang="en">`.
- No hay artefactos de desarrollo en `out/` (`node_modules`, `.next`, fuentes).

## Checks automáticos

```bash
npx tsc --noEmit         # el contenido cumple el contrato de tipos
npm run lint             # ESLint sin errores
```

## Validación manual (escenarios)

### V1 — Presentación (US1, FR-002/FR-003)
- Se ven nombre, título, descripción, ubicación e idiomas.
- Sin foto, aparece un espacio reservado que no rompe el layout.

### V2 — Proyectos (US2, FR-006–FR-009)
- Aparecen los 4 proyectos con descripción, puntos clave y tecnologías.
- Al Toque y el simulador de granja muestran "In progress" y "Private repository"
  (al cambiar a español: "En desarrollo" y "Repositorio privado") sin enlace.
- PSA mostrará dos botones ("Backend code" y "Frontend code"; en español, "Código
  backend" y "Código frontend") en la misma tarjeta cuando sus enlaces estén cargados.
- Los repositorios públicos con enlace disponible muestran su botón etiquetado; los
  públicos sin enlace (pendientes) no muestran botón ni enlace roto ni la etiqueta de
  privado.

### V3 — Habilidades y formación (US3/US5, FR-004/FR-005)
- Las 6 categorías de habilidades (Lenguajes, Backend, Bases de datos, Infraestructura y
  monitoreo, Frontend y Metodología) con sus tecnologías.
- Formación: FIUBA (cursando 4.º año) y curso de JavaScript.
- Certificado del curso de JavaScript: botón "Ver certificado"/"View certificate" (ícono,
  foco visible, operable por teclado) que abre el PDF en `public/certificates/`; si el enlace
  es externo (`https://…`) se abre en una pestaña nueva.

### V4 — Contacto y CV (US4/US6, FR-010/FR-011)
- Correo `04francomartin@gmail.com` como texto seleccionable con botón de copiado (confirma
  "Copiado"/"Copied" y lo anuncia con `aria-live`); sin enlace `mailto:`.
- GitHub `MartinAlonso333` funciona.
- LinkedIn: espacio reservado sin enlace roto.
- Botón de CV: sin PDF, no lleva a error.

### V5 — Tema (FR-013, SC-005, `theme.contract.md`)
- Con sistema en oscuro y sin preferencia, carga en oscuro sin destello.
- Alternar tema y recargar: la elección persiste.
- Con preferencia `system`, cambiar el tema del SO actualiza en vivo.

### V6 — Responsive y cross-browser (FR-012, SC-003, SC-008)
- Revisar en Chrome y Firefox (escritorio) y con la emulación móvil de las devtools, a
  320, 375, 768, 1024, 1440 y 1920 px.
- Sin scroll horizontal ni solapamientos; objetivos táctiles ≥ 44 px.
- **Limitación conocida**: Safari, Edge e iOS no se verifican (sin acceso); registrarlo
  como no verificado.

### V7 — Accesibilidad (FR-015, SC-006)
- Navegación completa por teclado con foco visible.
- `axe DevTools` sin violaciones A/AA; contraste ≥ 4.5:1.
- HTML semántico; imágenes con `alt` correcto.
- Repetir en ambos idiomas (el control de idioma es operable por teclado y tiene foco
  visible).

### V8 — Idioma (US7, FR-001/FR-017, SC-010, `language.contract.md`)
- Al cargar por primera vez, el contenido se muestra en inglés y `<html lang="en">`.
- Al accionar el control de idioma, todo el contenido y la interfaz pasan a español de
  inmediato, sin recargar ni cambiar la URL, y `<html lang>` pasa a `es`.
- Tras recargar, se restaura el idioma elegido.
- Con JavaScript deshabilitado, el HTML pre-renderizado se ve en inglés.
- Los textos derivados ("In progress"/"En desarrollo", "Private repository"/"Repositorio
  privado") cambian con el idioma.

## Validaciones con herramientas

```bash
# Lighthouse (performance, accesibilidad, buenas prácticas)
npx lighthouse http://localhost:3000 --view

# HTML válido
npx html-validate out/index.html
```

Objetivos: performance dentro del presupuesto (SC-009), accesibilidad sin violaciones
AA (SC-006), HTML válido (Flujo de Desarrollo).

## Validación de despliegue

- El workflow `.github/workflows/deploy.yml` se ejecuta en push a la rama principal.
- Solo se publica `out/`; el sitio queda en `https://martinalonso333.github.io/`.

## Criterios de aceptación global

- `npm run build` sin errores y `out/` correcto.
- V1–V8 aprobadas.
- Presupuesto de performance respetado.
