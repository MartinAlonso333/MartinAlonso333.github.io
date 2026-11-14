# Contract: Tema claro/oscuro (`src/lib/theme.ts`, `ThemeToggle`, `layout.tsx`)

**Feature**: `001-portfolio-profesional` | **Type**: UI behavior contract (interno)

Cubre FR-013, SC-005 y las Reglas de accesibilidad (Principio IV).

## Modelo de tema

- **Valores de preferencia**: `'light' | 'dark' | 'system'`.
- **Clave de almacenamiento**: `theme` en `localStorage`. Debe declararse como
  constante única en `src/lib/theme.ts` (no repetir el literal "theme" en el código).
- **Representación en el DOM**: clase `dark` presente en el elemento `<html>`
  (ausente = claro).
- **Estrategia Tailwind v4**: `@custom-variant dark (&:where(.dark, .dark *));`
  declarado en `src/app/globals.css`.

## Reglas de comportamiento

1. **Resolución del tema efectivo**:
   - Si `localStorage.theme` es `'light'` o `'dark'`, ese es el tema efectivo.
   - Si es `'system'` o no existe, el tema efectivo lo determina
     `window.matchMedia('(prefers-color-scheme: dark)')`.
2. **Aplicación sin parpadeo**: un script en línea en el `<head>` (`layout.tsx`) lee
   `localStorage` + `prefers-color-scheme` y aplica/quit la clase `dark` en `<html>`
   **antes** del primer pintado. El script MUST validar el valor contra la lista blanca
   `['light','dark','system']`.
3. **Alternancia manual**: `ThemeToggle` (isla cliente) alterna entre claro y oscuro.
   Al usarse, MUST escribir la preferencia en `localStorage.theme`.
4. **Persistencia**: al recargar o volver a visitar, se restaura la preferencia
   guardada.
5. **Cambio del sistema**: mientras la preferencia sea `'system'`, el sitio MUST
   reaccionar a cambios de `prefers-color-scheme` (listener `matchMedia`); si el
   visitante eligió un tema manualmente, MUST ignorarse el cambio del sistema.
6. **Sin dependencias**: no se permite una librería de temas (Principio I).

## Accesibilidad (Principio IV)

- `ThemeToggle` MUST ser un `<button>` con etiqueta accesible que describa la acción
  (p. ej. `aria-label` que indique pasar a modo claro/oscuro) y un ícono SVG con
  `aria-hidden="true"`.
- MUST ser operable por teclado y mostrar foco visible.
- El estado no MUST depender solo del color para comunicarse.
- Sin hydration mismatch: el estado inicial de React debe leerse tras montar
  (`useEffect`) para no diferir del HTML estático.

## Acceptance checks

- Con `prefers-color-scheme: dark` y sin preferencia guardada, la página carga en
  oscuro sin destello claro.
- Tras alternar y recargar, el tema elegido persiste (SC-005).
- Con preferencia `system`, cambiar el tema del SO actualiza el sitio en vivo.
