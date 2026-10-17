# Feature Specification: Portafolio profesional de Franco Martín Alonso

**Feature Branch**: `001-portfolio-profesional`

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "Quiero un portfolio profesional en español, con tono formal, para Franco Martín Alonso, estudiante de cuarto año de Ingeniería Informática en la Facultad de Ingeniería de la Universidad de Buenos Aires (FIUBA), que busca una pasantía o su primer empleo como desarrollador backend. Vive en Buenos Aires, Argentina. Idiomas: español nativo, inglés intermedio, portugués básico. Secciones: (1) presentación con nombre, título, descripción breve, ubicación e idiomas, y un espacio para una foto que se agregará más adelante; (2) habilidades agrupadas por categoría: lenguajes (Java, C++, TypeScript, JavaScript), backend (Spring Boot 3.x, Spring Data JPA, Hibernate, Spring Security, Maven), bases de datos (PostgreSQL), infraestructura y monitoreo (Docker, Spring Boot Actuator) y frontend (React); (3) formación: Ingeniería Informática en FIUBA (cursando 4.º año) y un curso de JavaScript; (4) proyectos destacados; (5) contacto; (6) botón para descargar el CV en PDF. Proyectos: Al Toque (en desarrollo, repositorio privado): plataforma que conecta personas que necesitan servicios del hogar, como gas o plomería, con profesionales registrados. Trabajo en equipo, a cargo de backend y frontend, con Spec-Driven Development. Stack: Java, Spring Boot 3.x, Spring Data JPA, Hibernate, Spring Security, PostgreSQL, Docker, Maven, Spring Boot Actuator. Simulador de granja multijugador y multihilo en C++ (en desarrollo, repositorio privado): soporta múltiples jugadores y partidas. A cargo del modelo del juego y luego de la interfaz gráfica. PSA, sistema de gestión de campañas de marketing: gestión de campañas y leads, con backend desacoplado del frontend mediante API REST. Trabajo en equipo en todas las etapas. Stack: Spring Boot, React, TypeScript, PostgreSQL, Docker, Render. Yet Another Battle City: juego de tanques con arquitectura MVC, para uno o dos jugadores con IA local. Diseñé el sistema multiclase que gestiona los eventos y desarrollé la capa de vistas. Stack: Java, JavaFX, JUnit. Cada proyecto muestra descripción, puntos clave, tecnologías y link a GitHub cuando el repositorio es público; los privados muestran la etiqueta \"Repositorio privado\" y los que están en curso, \"En desarrollo\". Contacto: 04francomartin@gmail.com y GitHub (MartinAlonso333); el link de LinkedIn se agregará más adelante. El sitio debe verse bien en celular y computadora y tener modo claro y oscuro."

## Clarifications

### Session 2026-10-17

- Q: El archivo PDF del CV, ¿ya está disponible para incorporarlo al repositorio ahora, o el botón debe apuntar a un placeholder hasta que exista? → A: Placeholder por ahora; el botón se reserva sin enlace roto.
- Q: ¿La página debe incluir una barra de navegación con enlaces a cada sección, o el visitante solo recorre el contenido con scroll? → A: Sí, barra de navegación con enlaces de ancla a cada sección.
- Q: ¿Qué navegadores y dispositivos deben considerarse como soportados para verificar el sitio? → A: Navegadores evergreens actuales (Chrome, Firefox, Safari, Edge) y móviles (Safari iOS, Chrome Android).
- Q: ¿La especificación debe fijar un objetivo de performance medible para la carga del sitio? → A: Sí, adoptar el presupuesto de la constitución: <500 KB de transferencia total y LCP <2,5 s en móvil de gama media.
- Q: ¿Cómo se modelan los proyectos con más de un repositorio y los repositorios públicos cuyo enlace todavía no está disponible? → A: Cada proyecto expone una lista de repositorios, cada uno con una etiqueta, visibilidad y enlace opcional; un repositorio público sin URL se muestra como "pendiente" (sin enlace y sin la etiqueta de privado), los privados muestran "Repositorio privado" y los públicos con enlace disponible muestran un botón por repositorio.
- Q: ¿El sitio debe estar disponible en más de un idioma? → A: Sí, en español e inglés; todo el contenido visible y la interfaz se traducen.
- Q: ¿Cómo debe funcionar el cambio de idioma? → A: Un control en el header que cambia el idioma al instante, sin recargar ni cambiar la URL; el idioma por defecto es inglés y la elección del visitante persiste entre visitas.
- Q: ¿El contenido bilingüe se traduce completo? → A: Sí; se traduce todo el contenido (perfil, habilidades, formación, proyectos y contacto), no solo la interfaz. Los nombres propios y las tecnologías se mantienen.
- Q: ¿Se revisa el idioma por defecto acordado? → A: Sí. El sitio debe cargar en inglés, tanto en el HTML pre-renderizado (`lang="en"`) como en el estado inicial del proveedor de idioma. El español queda como opción manual con el control de idioma y la elección del visitante sigue persistiendo entre visitas.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conocer el perfil profesional (Priority: P1)

Un reclutador o profesional que evalúa candidatos para una pasantía o primer empleo backend llega al sitio y, en la primera pantalla, entiende quién es Franco, cuál es su rol, dónde estudia, dónde vive y qué idiomas habla.

**Why this priority**: Es la propuesta de valor central del sitio; sin una presentación clara, ningún otro contenido cumple su función.

**Independent Test**: Se puede probar abriendo la página y verificando que la presentación muestra nombre, título, descripción breve, ubicación, idiomas y el espacio para la foto.

**Acceptance Scenarios**:

1. **Given** un visitante entra al sitio, **When** se carga la página, **Then** ve el nombre completo, el título profesional (estudiante de 4.º año de Ingeniería Informática en FIUBA en busca de pasantía/primer empleo backend), una descripción breve, la ubicación (Buenos Aires, Argentina) y los idiomas (español nativo, inglés intermedio, portugués básico).
2. **Given** la foto de perfil todavía no existe, **When** se carga la presentación, **Then** se muestra un espacio reservado que no rompe el diseño y se reemplazará cuando la foto esté disponible.

---

### User Story 2 - Explorar los proyectos destacados (Priority: P1)

Un visitante revisa los proyectos de Franco para evaluar su experiencia técnica, leyendo descripción, puntos clave, tecnologías y estado de cada uno.

**Why this priority**: Los proyectos son la evidencia principal de las capacidades del candidato y el principal motivo de consulta de un reclutador.

**Independent Test**: Se puede probar verificando que los cuatro proyectos aparecen con descripción, puntos clave, tecnologías y su estado, que los repositorios públicos con enlace disponible lo ofrecen, y que los privados y los pendientes no generan enlaces rotos.

**Acceptance Scenarios**:

1. **Given** un visitante revisa la sección de proyectos, **When** la recorre, **Then** ve los proyectos Al Toque, el simulador de granja multijugador y multihilo en C++, PSA y Yet Another Battle City, cada uno con descripción, puntos clave y tecnologías.
2. **Given** un proyecto tiene repositorio privado (Al Toque, simulador de granja), **When** el visitante lo observa, **Then** ve la etiqueta "Repositorio privado" en lugar de un enlace a GitHub.
3. **Given** un proyecto está en curso (Al Toque, simulador de granja), **When** el visitante lo observa, **Then** ve la etiqueta "En desarrollo".
4. **Given** un proyecto tiene uno o más repositorios públicos con enlace disponible, **When** el visitante lo observa, **Then** puede acceder a cada repositorio mediante su botón etiquetado (por ejemplo, "Código backend" y "Código frontend").
5. **Given** un proyecto tiene repositorios públicos cuyo enlace todavía no fue cargado, **When** el visitante lo observa, **Then** esos repositorios se muestran como pendientes, sin enlace y sin la etiqueta "Repositorio privado", sin generar enlaces rotos.

---

### User Story 3 - Evaluar habilidades por categoría (Priority: P2)

Un visitante revisa las habilidades técnicas de Franco organizadas por categoría para comparar con los requisitos de una posición.

**Why this priority**: Complementa la evidencia de los proyectos y facilita un rápido emparejamiento con ofertas concretas.

**Independent Test**: Se puede probar verificando que las habilidades aparecen agrupadas en Lenguajes, Backend, Bases de datos, Infraestructura y monitoreo, y Frontend, con las tecnologías indicadas en cada grupo.

**Acceptance Scenarios**:

1. **Given** un visitante revisa la sección de habilidades, **When** la recorre, **Then** ve las categorías Lenguajes (Java, C++, TypeScript, JavaScript), Backend (Spring Boot 3.x, Spring Data JPA, Hibernate, Spring Security, Maven), Bases de datos (PostgreSQL), Infraestructura y monitoreo (Docker, Spring Boot Actuator) y Frontend (React).

---

### User Story 4 - Contactar a Franco (Priority: P2)

Un visitante interesado en contactar a Franco encuentra los medios de contacto disponibles y puede iniciar el contacto.

**Why this priority**: El objetivo final del sitio es generar oportunidades; el contacto debe ser directo y sin fricción.

**Independent Test**: Se puede probar verificando que el correo y el perfil de GitHub están presentes y funcionan, y que el espacio para LinkedIn existe sin enlaces rotos.

**Acceptance Scenarios**:

1. **Given** un visitante quiere escribir a Franco, **When** usa el correo mostrado, **Then** se abre un canal hacia 04francomartin@gmail.com.
2. **Given** un visitante quiere ver el código de Franco, **When** usa el enlace de GitHub mostrado, **Then** accede al perfil MartinAlonso333.
3. **Given** el enlace de LinkedIn aún no está disponible, **When** el visitante revisa la sección de contacto, **Then** no encuentra un enlace roto y existe un espacio reservado para agregarlo más adelante.

---

### User Story 5 - Conocer la formación (Priority: P3)

Un visitante revisa la formación académica y complementaria de Franco.

**Why this priority**: Refuerza la credibilidad del perfil, pero es secundaria frente a proyectos y presentación.

**Independent Test**: Se puede probar verificando que aparecen la carrera (Ingeniería Informática, FIUBA, cursando 4.º año) y el curso de JavaScript.

**Acceptance Scenarios**:

1. **Given** un visitante revisa la sección de formación, **When** la recorre, **Then** ve la carrera de Ingeniería Informática en FIUBA (cursando 4.º año) y el curso de JavaScript.

---

### User Story 6 - Descargar el CV y adaptar la experiencia (Priority: P3)

Un visitante descarga el CV en PDF y, además, consulta el sitio cómodamente desde su celular o computadora y elige el tema claro u oscuro que prefiera.

**Why this priority**: Mejora la conversión y la comodidad de lectura, pero no bloquea el valor principal del sitio.

**Independent Test**: Se puede probar verificando que existe un botón de descarga de CV, que el sitio se adapta a pantallas de celular y computadora y que el tema claro/oscuro cambia y persiste.

**Acceptance Scenarios**:

1. **Given** un visitante quiere el CV, **When** acciona el botón de descarga, **Then** obtiene el archivo PDF del CV.
2. **Given** un visitante navega desde un celular o una computadora, **When** recorre el sitio, **Then** el contenido se ve correctamente adaptado sin scroll horizontal ni solapamientos.
3. **Given** un visitante prefiere un tema, **When** alterna entre claro y oscuro, **Then** el cambio se aplica de inmediato y se mantiene al volver a visitar el sitio.

---

### User Story 7 - Alternar el idioma de la página (Priority: P2)

Un visitante que prefiere leer en inglés (o un reclutador internacional) puede cambiar el idioma de toda la página entre español e inglés sin recargar, y su elección se recuerda en visitas posteriores.

**Why this priority**: El sitio llega a un público internacional en su idioma por defecto (inglés) y le permite a quien prefiere español cambiarlo de inmediato; amplía el alcance más allá de un solo idioma.

**Independent Test**: Se puede probar cambiando el idioma con el control del header y verificando que todo el contenido y la interfaz cambian de inmediato, que el atributo `lang` del documento se actualiza y que la elección persiste tras recargar (quickstart V8).

**Acceptance Scenarios**:

1. **Given** un visitante entra por primera vez, **When** se carga la página, **Then** el contenido se muestra en inglés y el atributo `lang` del documento es `en`.
2. **Given** un visitante quiere leer en español, **When** acciona el control de idioma, **Then** todo el contenido visible y la interfaz pasan a español de inmediato y sin recargar, y el atributo `lang` del documento pasa a `es`.
3. **Given** un visitante ya eligió un idioma, **When** vuelve a visitar el sitio, **Then** se restaura el idioma elegido.
4. **Given** un visitante tiene JavaScript deshabilitado, **When** carga la página, **Then** ve el contenido en el idioma por defecto (inglés), visible y legible.

---

### Edge Cases

- ¿Qué ocurre cuando el contenido está disponible pero la foto de perfil todavía no fue incorporada? Debe mostrarse un espacio reservado neutro que no rompa el diseño.
- ¿Qué ocurre cuando el enlace de LinkedIn todavía no existe? No debe mostrarse un enlace roto; el espacio queda reservado.
- ¿Qué ocurre cuando el archivo PDF del CV todavía no está disponible? El botón no debe conducir a una página de error.
- ¿Qué ocurre cuando un visitante tiene JavaScript deshabilitado? El contenido esencial (presentación, habilidades, formación, proyectos y contacto) debe permanecer visible y legible; se muestra en el idioma por defecto (inglés).
- ¿Qué ocurre con las descripciones largas? El texto debe ajustarse sin desbordar ni solaparse en pantallas de 320 px.
- ¿Qué ocurre cuando cambia la preferencia de tema del sistema operativo? El sitio debe reflejarla mientras el visitante no haya elegido un tema manualmente.
- ¿Qué ocurre al cambiar de idioma con un texto largo? El contenido traducido debe ajustarse sin romper el layout ni generar scroll horizontal.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST ser una página única, con tono formal, orientada a reclutadores y profesionales que evalúan candidatos para pasantías o primer empleo backend, y MUST estar disponible en español e inglés.
- **FR-002**: El sitio MUST presentar el nombre completo (Franco Martín Alonso), el título profesional (estudiante de 4.º año de Ingeniería Informática en FIUBA, en busca de pasantía o primer empleo como desarrollador backend), una descripción breve, la ubicación (Buenos Aires, Argentina) y los idiomas (español nativo, inglés intermedio, portugués básico).
- **FR-003**: La presentación MUST incluir un espacio reservado para la foto de perfil, que se incorporará más adelante, sin que su ausencia rompa el diseño.
- **FR-004**: El sitio MUST incluir una sección de habilidades agrupadas por categoría: Lenguajes (Java, C++, TypeScript, JavaScript), Backend (Spring Boot 3.x, Spring Data JPA, Hibernate, Spring Security, Maven), Bases de datos (PostgreSQL), Infraestructura y monitoreo (Docker, Spring Boot Actuator) y Frontend (React).
- **FR-005**: El sitio MUST incluir una sección de formación con, al menos, Ingeniería Informática en FIUBA (cursando 4.º año) y un curso de JavaScript.
- **FR-006**: El sitio MUST incluir una sección de proyectos destacados que contenga los cuatro proyectos: Al Toque, el simulador de granja multijugador y multihilo en C++, PSA y Yet Another Battle City.
- **FR-007**: Cada proyecto MUST mostrar nombre, descripción, puntos clave, tecnologías y su estado.
- **FR-008**: Cada proyecto MUST exponer una lista de repositorios, cada uno con una etiqueta. Los repositorios MUST mostrarse como enlaces a GitHub cuando su enlace esté disponible; los repositorios privados (Al Toque y el simulador de granja) MUST mostrar la etiqueta "Repositorio privado" en lugar de un enlace; los repositorios públicos cuyo enlace aún no esté disponible MUST mostrarse como pendientes (sin enlace y sin la etiqueta de privado), sin generar enlaces rotos.
- **FR-009**: Los proyectos en curso (Al Toque y el simulador de granja) MUST mostrar la etiqueta "En desarrollo".
- **FR-010**: El sitio MUST incluir una sección de contacto con el correo 04francomartin@gmail.com y el perfil de GitHub (MartinAlonso333), y MUST reservar un espacio para el enlace de LinkedIn que se agregará más adelante.
- **FR-011**: El sitio MUST incluir un botón para descargar el CV en formato PDF; mientras el archivo no esté disponible, el botón MUST apuntar a una ubicación reservada que no conduzca a un enlace roto ni a una página de error.
- **FR-012**: El sitio MUST ser responsive y visualizarse correctamente tanto en celular como en computadora, sin scroll horizontal ni solapamiento de contenido entre 320 px y 1920 px de ancho.
- **FR-013**: El sitio MUST ofrecer modo claro y modo oscuro, respetando la preferencia del sistema operativo y permitiendo alternarla manualmente; la elección del visitante MUST persistir entre visitas.
- **FR-014**: El contenido MUST poder editarse o ampliarse (por ejemplo, agregar un proyecto o actualizar datos) sin modificar la lógica de presentación.
- **FR-015**: El sitio MUST cumplir con las pautas de accesibilidad WCAG 2.1 nivel AA.
- **FR-016**: El sitio MUST incluir una barra de navegación fija (sticky) en la parte superior, con enlaces de ancla a cada sección (presentación, habilidades, formación, proyectos, contacto), operables por teclado, con foco visible y visible durante todo el desplazamiento.
- **FR-017**: El sitio MUST incluir un control accesible para alternar el idioma de la página entre español e inglés. El cambio MUST aplicarse de inmediato y sin recargar; el idioma por defecto MUST ser inglés y la elección del visitante MUST persistir entre visitas. Al cambiar de idioma MUST actualizarse el atributo `lang` del documento y todo el contenido visible y la interfaz.

### Key Entities *(include if feature involves data)*

- **Perfil**: información de presentación de Franco; atributos: nombre completo, título profesional, descripción breve, ubicación, idiomas, referencia a foto (opcional/futura).
- **Habilidad**: tecnología o competencia individual; atributos: nombre; pertenece a una categoría.
- **Categoría de habilidad**: agrupación de habilidades; atributos: nombre (Lenguajes, Backend, Bases de datos, Infraestructura y monitoreo, Frontend); contiene varias habilidades.
- **Formación**: estudio o curso realizado; atributos: nombre, institución, estado (por ejemplo, cursando), tipo.
- **Proyecto**: trabajo mostrado; atributos: nombre, descripción, puntos clave, tecnologías, estado (en desarrollo / finalizado) y lista de repositorios; cada repositorio tiene etiqueta (por ejemplo, "Código fuente", "Código backend"), visibilidad (público / privado) y enlace a GitHub cuando esté disponible (los públicos sin enlace quedan pendientes).
- **Medio de contacto**: canal para contactar a Franco; atributos: tipo (correo, GitHub, LinkedIn), valor, disponibilidad (disponible o pendiente).
- **Texto localizado**: todo texto legible (títulos, descripciones, etiquetas) existe en español y en inglés; la interfaz también se localiza y el contenido no se duplica como bloques separados en la página.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visitante puede identificar el rol y la especialidad de Franco (backend, estudiante de Ingeniería Informática) en menos de 30 segundos desde que llega al sitio.
- **SC-002**: Los cuatro proyectos, con sus tecnologías y estado, son visibles y legibles en la página sin necesidad de navegación adicional.
- **SC-003**: La página no presenta scroll horizontal ni solapamientos en ningún ancho de pantalla entre 320 px y 1920 px.
- **SC-004**: Un visitante puede iniciar el contacto (correo o GitHub) en un máximo de 2 acciones desde cualquier punto de la página.
- **SC-005**: El cambio de tema claro/oscuro surte efecto de forma inmediata y se conserva tras recargar la página.
- **SC-006**: El 100 % del contenido es alcanzable y operable por teclado y cumple los umbrales de contraste de WCAG 2.1 AA.
- **SC-007**: Añadir o actualizar un proyecto o dato de contenido no requiere modificar la lógica de presentación.
- **SC-008**: El sitio se visualiza y opera correctamente en las últimas versiones de Chrome, Firefox, Safari y Edge, tanto en escritorio como en móvil (Safari iOS, Chrome Android).
- **SC-009**: La carga total de la página se mantiene por debajo de 500 KB de transferencia y el Largest Contentful Paint es inferior a 2,5 s en una conexión móvil de gama media.
- **SC-010**: Un visitante puede cambiar el idioma de la página en un máximo de 1 acción desde cualquier punto de la página; el cambio es inmediato, actualiza el atributo `lang` del documento y persiste tras recargar.

## Assumptions

- El sitio es una página única sin backend ni funcionalidades de servidor.
- La foto de perfil y el enlace de LinkedIn se incorporarán más adelante; hasta entonces se muestran espacios reservados sin enlaces rotos ni fallos de diseño.
- El archivo PDF del CV se aportará por separado; hasta entonces el botón apunta a una ubicación reservada que no conduce a un error.
- Todo el contenido visible y la interfaz están disponibles en inglés y español con tono formal; el inglés es el idioma por defecto y el español es una opción manual con el control de idioma.
- Las traducciones al inglés del contenido del portafolio las mantiene el autor; los nombres propios, las tecnologías y los datos de contacto no se traducen.
- Los repositorios privados no son accesibles públicamente, por lo que se muestran como etiqueta en lugar de enlace.
- El sitio se publica en entorno de hosting estático (GitHub Pages), sin código de servidor ni secretos.
- Se toma como referencia la constitución del proyecto: simplicidad, carga rápida, diseño responsive, accesibilidad, código limpio y contenido desacoplado de la lógica.
- El soporte se limita a los navegadores evergreens actuales (Chrome, Firefox, Safari, Edge) y a móviles (Safari iOS, Chrome Android); no se garantiza compatibilidad con navegadores legacy.
