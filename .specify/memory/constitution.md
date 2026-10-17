<!--
Sync Impact Report
==================
Version change: template (sin versión) → 1.0.0
Tipo de bump: MINOR / ratificación inicial (adopción del documento completo)
Principios añadidos:
  - I. Simplicidad ante todo
  - II. Carga rápida
  - III. Diseño responsive
  - IV. Accesibilidad (NO NEGOCIABLE)
  - V. Código limpio y mantenible
  - VI. Contenido desacoplado de la lógica
Secciones añadidas:
  - Restricciones Adicionales
  - Flujo de Desarrollo
  - Gobernanza
Secciones eliminadas: ninguna
TODOs aplazados: ninguno
Nota de revisión: este informe es material temporal para revisión humana y debe
eliminarse antes de confirmar (commit) la constitución enmendada.
-->

# Constitución de MartinAlonso333.github.io

## Principios Fundamentales

### I. Simplicidad ante todo
El sitio MUST permanecer como un artefacto estático de una sola página servible
sin lógica de servidor. Todo cambio SHOULD preferir las capacidades nativas de
la plataforma (HTML, CSS, JS del navegador) antes que introducir dependencias.
No se MUST añadir un framework, bundler o paso de compilación salvo que se
demuestre que reduce la complejidad total; en tal caso, la justificación MUST
quedar documentada. Se aplica YAGNI: ninguna abstracción o función sin un caso
de uso real y presente.

**Rationale**: un portafolio personal obtiene su valor de ser barato de
publicar, entender y mantener; cada dependencia añadida es deuda futura.

### II. Carga rápida
El peso total de la página MUST mantenerse dentro de un presupuesto de
performance documentado (presupuesto inicial: menos de 500 KB de transferencia
total y Largest Contentful Paint inferior a 2,5 s en una conexión móvil de gama
media). Los recursos externos MUST cargarse de forma no bloqueante
(defer/async) y limitarse al mínimo necesario. Las imágenes MUST optimizarse
(formato, dimensiones y compresión adecuados). Ningún cambio MUST degradar el
presupuesto sin justificación explícita registrada.

**Rationale**: la velocidad percibida es parte central de la accesibilidad y de
la primera impresión; en un sitio estático no hay excusa para el exceso.

### III. Diseño responsive
El diseño MUST desarrollarse mobile-first. El layout MUST funcionar y ser
legible en el rango de 320 px a 1920 px de ancho, sin scroll horizontal ni
solapamiento de contenido. Los objetivos táctiles MUST tener al menos 44×44 px.
Todo cambio de layout MUST verificarse en los breakpoints definidos por el
proyecto antes de considerarse completo.

**Rationale**: la mayoría del tráfico de un portafolio llega desde móvil; un
layout que falla en ese contexto invalida el resto del trabajo.

### IV. Accesibilidad (NO NEGOCIABLE)
El sitio MUST cumplir con WCAG 2.1 nivel AA. El marcado MUST usar HTML semántico
y recurrir a ARIA solo cuando no exista un elemento nativo adecuado. Las
imágenes con significado MUST tener texto alternativo; las decorativas, `alt`
vacío. El contraste de texto MUST ser al menos 4,5:1 (texto normal) y 3:1 (texto
grande). Toda funcionalidad MUST ser operable por teclado con foco visible. La
información MUST NOT transmitirse únicamente mediante color.

**Rationale**: la accesibilidad es un requisito de inclusión, no una mejora
opcional; es más barato cumplirla por diseño que remediarla después.

### V. Código limpio y mantenible
El código MUST tener una única fuente de verdad para cada dato y comportamiento.
MUST NOT quedar código muerto, código comentado ni `console.log` de depuración
en el sitio publicado. El estilo de formato y nomenclatura MUST ser consistente
en todo el repositorio. Los comentarios MUST explicar el porqué y no el qué. En
CSS se SHOULD preferir custom properties, evitar selectores anidados profundos y
restringir `!important` a casos justificados. Los cambios MUST ser pequeños y
legibles para una persona que no conozca el historial.

**Rationale**: el mantenimiento a largo plazo de un proyecto personal depende de
poder retomarlo sin esfuerzo de arqueología.

### VI. Contenido desacoplado de la lógica
Todo contenido personal (biografía, proyectos, enlaces, datos de contacto,
textos) MUST residir en ubicaciones claramente separadas y editables por una
persona no programadora (por ejemplo, un archivo de datos o un bloque de
contenido delimitado). Editar o añadir contenido MUST NOT requerir modificar la
lógica de layout o de comportamiento. Añadir un proyecto o una sección MUST ser
un cambio de contenido, no un cambio de código. El formato del contenido MUST
mantenerse simple y uniforme.

**Rationale**: el contenido cambia con frecuencia y el comportamiento casi
nunca; separarlos permite actualizar el portafolio sin riesgo de romper la
presentación.

## Restricciones Adicionales

El sitio MUST publicarse como contenido estático en GitHub Pages, servido desde
la rama principal. MUST NOT existir código de servidor, procesos en segundo
plano ni credenciales o secretos versionados en el repositorio. El stack por
defecto es HTML5, CSS moderno y JavaScript vainilla; cualquier herramienta de
build es opcional y MUST justificarse según el Principio I. Los recursos de
terceros MUST limitarse al mínimo, fijarse a versiones concretas y cargarse
desde CDN solo cuando aporten un beneficio claro. Todos los assets MUST
versionarse en el repositorio en forma optimizada.

## Flujo de Desarrollo

Cada cambio MUST clasificarse explícitamente como cambio de contenido o de
código. Antes de integrar un cambio, MUST verificarse: (a) comportamiento
responsive en los breakpoints definidos, (b) cumplimiento de accesibilidad del
Principio IV, (c) permanencia dentro del presupuesto de performance del
Principio II, y (d) validez del HTML. La verificación es manual en los
navegadores objetivo mientras no exista una suite automatizada; si se introduce
automatización, MUST cubrir los mismos puntos. La publicación ocurre mediante
GitHub Pages y MUST NOT incluir artefactos de desarrollo. La guía de uso y
estructura del proyecto MUST mantenerse en `README.md`.

## Gobernanza

Esta constitución prevalece sobre cualquier otra práctica o convención del
proyecto. Toda enmienda MUST proponerse por escrito, incluir su justificación,
actualizar el número de versión según las reglas de abajo y registrarse en el
informe de impacto correspondiente. El versionado sigue Semantic Versioning:
MAJOR ante eliminaciones o redefiniciones incompatibles de principios o
gobernanza; MINOR ante la adición de un principio o sección, o la expansión
material de la guía; PATCH ante aclaraciones, correcciones de redacción o
refinamientos no semánticos. Toda revisión de cambios MUST verificar el
cumplimiento de los principios aquí definidos, y cualquier complejidad añadida
MUST justificarse frente al Principio I. La ratificación inicial y cada enmienda
MUST dejar constancia de su fecha en la línea de versión inferior.

**Version**: 1.0.0 | **Ratified**: 2026-10-17 | **Last Amended**: 2026-10-17
