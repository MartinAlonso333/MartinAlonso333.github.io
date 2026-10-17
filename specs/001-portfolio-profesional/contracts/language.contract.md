# Contract: Idioma de la página (`src/lib/i18n.ts`, `LanguageProvider`, `LanguageToggle`, `src/content/ui.ts`)

**Feature**: `001-portfolio-profesional` | **Type**: UI behavior contract (interno)

Cubre FR-001 (bilingüe), FR-017, FR-014 y SC-010, en conjunto con
`content-model.contract.md` (textos de contenido) y las Reglas de accesibilidad
(Principio IV).

## Modelo de idioma

- **Idioma (locale)**: `'es' | 'en'`.
- **Idioma por defecto**: `'en'` (el sitio se pre-renderiza en inglés con `lang="en"`; visible sin JS). El español es una opción manual con el control de idioma.
- **Clave de almacenamiento**: `lang` en `localStorage`. Debe declararse como constante
  única (`LANGUAGE_STORAGE_KEY`) en `src/lib/i18n.ts`.
- **Representación en el DOM**: atributo `lang` del elemento `<html>` (`es` / `en`).
- **Textos de interfaz**: viven en `src/content/ui.ts` como `LocalizedText`; no se
  escriben literales de interfaz dentro de los componentes (Principio V/VI).

## API (`src/lib/i18n.ts`)

| Símbolo | Tipo | Descripción |
|---------|------|-------------|
| `Language` | `'es' \| 'en'` | Tipo de locale (re-exportado de `src/types/content.ts`). |
| `LocalizedText` | `Record<Language, string>` | Texto en ambos idiomas. |
| `DEFAULT_LANGUAGE` | `'en'` | Idioma por defecto (inglés). |
| `LANGUAGES` | `Language[]` | `['es', 'en']`, para validación e iteración. |
| `LANGUAGE_STORAGE_KEY` | `'lang'` | Clave de persistencia. |
| `isLanguage(value)` | type guard | Valida contra `LANGUAGES`. |
| `pick(text, language)` | `string` | Devuelve `text[language]`. |

## Estado y providers

- `LanguageProvider` (isla cliente) expone `{ language, setLanguage, toggle }` vía React
  Context y un hook `useLanguage()`. Envuelve a `{children}` en `layout.tsx`.
- El estado inicial es `DEFAULT_LANGUAGE` (`en`) vía `getServerSnapshot`, de modo que el
  HTML pre-renderizado sale con `lang="en"` y sin hydration mismatch; el valor de
  `localStorage.lang` (validado con `isLanguage`) se lee en cliente tras hidratar.
- Al cambiar de idioma MUST actualizarse `document.documentElement.lang` y persistirse en
  `localStorage.lang`. No MUST cambiar la URL.
- Componentes que muestran texto (Header, Hero, Projects, ProjectCard) son client
  components y usan `useLanguage()`; `page.tsx` pasa a cliente.

## Reglas de comportamiento

1. **Cambio inmediato**: accionar `LanguageToggle` alterna el idioma y re-renderiza todo el
   contenido visible sin recargar ni navegar (SC-010).
2. **Persistencia**: al recargar o volver a visitar, se restaura el idioma guardado.
3. **Por defecto**: sin preferencia guardada (o con valor inválido) se muestra inglés,
   incluso con JavaScript deshabilitado.
4. **Sin parpadeo crítico**: el HTML estático se genera en inglés; un usuario con
   preferencia `es` puede ver un destello breve antes de hidratar. No se agrega script
   anti-parpadeo para el idioma (limitación aceptada, Principio I).
5. **Sin dependencias**: no se permite una librería de i18n externa (Principio I).

## Accesibilidad (Principio IV)

- `LanguageToggle` MUST ser un `<button>` operable por teclado, con foco visible y
  etiqueta accesible (`aria-label` localizado en `ui.ts`, p. ej. "Cambiar a inglés" /
  "Switch to Spanish").
- El estado (idioma actual) no MUST depender solo del color; se comunica con texto
  (p. ej. mostrar el idioma destino "EN"/"ES").
- El texto debe conservar contraste AA en ambos idiomas y ajustarse sin romper el layout a
  320 px (FR-012, SC-003).

## Acceptance checks

- Al pulsar `LanguageToggle`, todo el contenido y la interfaz cambian de inmediato y
  `<html lang>` pasa a `en` (o `es`) (FR-017, SC-010).
- Tras cambiar y recargar, el idioma elegido persiste.
- Con JS deshabilitado, el contenido se ve en inglés (`lang="en"`).
- No hay texto de interfaz hardcodeado en los componentes (todo proviene de `ui.ts`).
