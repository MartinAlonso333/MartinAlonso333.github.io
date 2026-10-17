# Contract: Salida estática y publicación en GitHub Pages

**Feature**: `001-portfolio-profesional` | **Type**: Build/deployment contract

Cubre Restricciones Adicionales de la constitución, FR-012, FR-016 y SC-009.

## Build

- `next.config.ts` MUST incluir `output: 'export'` e `images: { unoptimized: true }`.
- MUST NOT existir `basePath` ni `assetPrefix` (sitio de usuario servido en la raíz
  de `https://martinalonso333.github.io`).
- `npm run build` MUST finalizar sin errores y generar la carpeta `out/`.
- `npm run build` MUST fallar si `src/content/portfolio.ts` no cumple el contrato de
  tipos (validación del Principio VI).

## Contenido de `out/` (salida publicable)

- `index.html` — la página única, en inglés (`<html lang="en">`).
- Assets con hash en `_next/static/`.
- Recursos de `public/` copiados (foto, CV, favicon) cuando existan.
- MUST NOT incluirse ningún artefacto de desarrollo (`node_modules/`, `.next/`,
  fuentes del proyecto, tests, config de tooling).

## Rutas y anclas (FR-016)

- Única ruta: `/`.
- Anclas de sección con `id` estables en inglés: `about`, `skills`, `education`,
  `projects`, `contact`.
- La navegación (`Header`) enlaza a esas anclas con `href="#<id>"`.
- Los `id` de ancla MUST coincidir con los definidos aquí y con los usados por los
  componentes.
- La barra de navegación es fija (sticky) y se mantiene visible al desplazar.

## JavaScript de cliente

- Los componentes MUST ser de servidor por defecto.
- El único componente cliente previsto es `ThemeToggle` (y el script en línea de
  tema, que no es React). Cualquier nueva isla cliente MUST justificarse frente al
  presupuesto de performance (Principio II).

## Performance (SC-009)

- Transferencia total de la página < 500 KB.
- LCP < 2,5 s en móvil de gama media.
- Sin fuentes, iconos ni scripts de terceros; SVG en línea y system font stack.

## Workflow de despliegue (`.github/workflows/deploy.yml`)

Disparador: push a la rama principal (`main`).

Pasos requeridos:

1. `actions/checkout`.
2. Configurar Node 20 LTS con caché de npm.
3. `npm ci` (instalación reproducible desde `package-lock.json`).
4. `npm run build` (genera `out/`).
5. `actions/upload-pages-artifact` con `path: out`.
6. `actions/deploy-pages`.

Permisos requeridos: `contents: read`, `pages: write`, `id-token: write`.
Entorno: `github-pages`. MUST NOT requerir secretos adicionales ni credenciales.

## Acceptance checks

- `npm run build` produce `out/index.html` y no incluye artefactos de desarrollo.
- El workflow despliega `out/` a GitHub Pages en la raíz del dominio.
- La página se ve correctamente entre 320 px y 1920 px sin scroll horizontal (SC-003).
