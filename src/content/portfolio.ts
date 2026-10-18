import type { PortfolioContent } from "@/types/content";

export const portfolio: PortfolioContent = {
  profile: {
    fullName: "Franco Martín Alonso",
    professionalTitle: {
      es: "Estudiante de Ingeniería Informática · Desarrollador Backend",
      en: "Computer Engineering Student · Backend Developer",
    },
    summary: {
      es:
        "Estudiante de Ingeniería Informática en la Universidad de Buenos Aires (FIUBA), actualmente en cuarto año, orientado al desarrollo backend y a la programación de sistemas.\n\n" +
        "Disfruto resolver problemas complejos, diseñar APIs limpias y construir software confiable y mantenible. Hoy trabajo en un juego multihilo en C++ y en una plataforma de servicios construida con Spring Boot, y utilizo Spec-Driven Development con agentes de IA en mi flujo de trabajo diario. Busco una pasantía o un primer empleo que me permita seguir creciendo como desarrollador backend.",
      en:
        "Computer Engineering student at the University of Buenos Aires (FIUBA), currently in my fourth year, focused on backend development and systems programming.\n\n" +
        "I enjoy solving complex problems, designing clean APIs, and building reliable, maintainable software. Right now I'm working on a multithreaded C++ game and a service marketplace built with Spring Boot, and I use Spec-Driven Development with AI coding agents in my daily workflow. I'm looking for an internship or a first role where I can keep growing as a backend developer.",
    },
    location: {
      es: "Buenos Aires, Argentina",
      en: "Buenos Aires, Argentina",
    },
    languages: [
      { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
      { name: { es: "Inglés", en: "English" }, level: { es: "Intermedio", en: "Intermediate" } },
      { name: { es: "Portugués", en: "Portuguese" }, level: { es: "Básico", en: "Basic" } },
    ],
    photo: {
      src: "/foto.jpg",
      alt: {
        es: "Foto de perfil de Franco Martín Alonso",
        en: "Profile photo of Franco Martín Alonso",
      },
      available: false,
    },
  },
  skills: [
    {
      id: "lenguajes",
      name: { es: "Lenguajes", en: "Languages" },
      skills: ["Java", "C++", "TypeScript", "JavaScript", "Python"],
    },
    {
      id: "backend",
      name: { es: "Backend", en: "Backend" },
      skills: [
        "Spring Boot 3.x",
        "Spring Data JPA",
        "Hibernate",
        "Spring Security",
        "Maven",
        "Gradle",
        "REST APIs",
        "JUnit",
      ],
    },
    {
      id: "bases-de-datos",
      name: { es: "Bases de datos", en: "Databases" },
      skills: ["PostgreSQL","MongoDB"]
    },
    {
      id: "infraestructura",
      name: { es: "Infraestructura y monitoreo", en: "Infrastructure & monitoring" },
      skills: ["Docker", "Spring Boot Actuator", "Git", "GitHub", "GitHub Actions", "Render"],
    },
    {
      id: "frontend",
      name: { es: "Frontend", en: "Frontend" },
      skills: ["React", "Next.js", "Tailwind CSS", "HTML and CSS", "JavaFX"],
    },
    {
      id: "metodologia",
      name: { es: "Metodologia", en: "Methodology" },
      skills: [
        {
          es: "Scrum",
          en: "Scrum",
        },
        {
          es: "TDD (Test-Driven Development)",
          en: "TDD (Test-Driven Development)",
        },
        {
          es: "DDD (Domain-Driven Design)",
          en: "DDD (Domain-Driven Design)",
        },
        {
          es: "Spec-Driven Development con Spec Kit",
          en: "Spec-Driven Development with Spec Kit",
        },
      ],
    },
  ],
  education: [
    {
      id: "fiuba",
      program: { es: "Ingeniería Informática", en: "Computer Engineering" },
      institution: {
        es: "Facultad de Ingeniería de la Universidad de Buenos Aires (FIUBA)",
        en: "School of Engineering, University of Buenos Aires (FIUBA)",
      },
      status: { es: "Cursando 4.º año", en: "Currently in 4th year" },
      type: "grado",
    },
    {
      id: "curso-javascript",
      program: { es: "Certificacion en JavaScript", en: "JavaScript certification" },
      // TODO: completar la institución real del curso. Vacío ⇒ no se muestra (sin espacios huérfanos).
      institution: { es: "EducaciónIT", en: "EducaciónIT" },
      status: { es: "Completado", en: "Completed" },
      type: "curso",
      certificates: [
        {
          id: "curso-javascript",
          // TODO: completar el título real del certificado.
          title: {
            es: "JavaScript Desarrollador Avanzado",
            en: "JavaScript Desarrollador Avanzado",
          },
          // TODO: completar el emisor real del certificado (vacío ⇒ no se muestra).
          issuer: { es: "EducaciónIT", en: "EducaciónIT" },
          // TODO: completar la fecha de emisión (opcional):
          // date: { es: "Mes Año", en: "Month Year" },
          // TODO: agregar `url` (PDF en public/certificates/<archivo>.pdf o enlace externo
          // de verificación). Mientras falte, el certificado queda oculto (sin enlace roto).
          url: "/public/cv.pdf",
        },
      ],
    },
  ],
  projects: [
    {
      id: "al-toque",
      name: { es: "Al Toque", en: "Al Toque" },
      description: {
        es: "Plataforma que conecta a personas que necesitan servicios del hogar, como gas o plomería, con profesionales registrados.",
        en: "Platform that connects people who need household services, such as gas or plumbing, with registered professionals.",
      },
      highlights: [
        {
          es: "Trabajo en equipo con Spec-Driven Development",
          en: "Teamwork using Spec-Driven Development",
        },
        {
          es: "A cargo del backend y del frontend",
          en: "Responsible for the backend and the frontend",
        },
        {
          es: "API REST con Spring Boot y Spring Data JPA",
          en: "REST API with Spring Boot and Spring Data JPA",
        },
      ],
      technologies: [
        "Java",
        "Spring Boot 3.x",
        "Spring Data JPA",
        "Hibernate",
        "Spring Security",
        "PostgreSQL",
        "Docker",
        "Maven",
        "Spring Boot Actuator",
      ],
      status: "in-progress",
      repositories: [
        { label: { es: "Código fuente", en: "Source code" }, visibility: "private" },
      ],
    },
    {
      id: "simulador-granja",
      name: {
        es: "Simulador de granja multijugador",
        en: "Multiplayer farm simulator",
      },
      description: {
        es: "Simulador de granja multijugador y multihilo en C++, con soporte para múltiples jugadores y partidas simultáneas.",
        en: "Multiplayer, multithreaded farm simulator in C++, supporting multiple players and simultaneous games.",
      },
      highlights: [
        { es: "A cargo del modelo del juego", en: "Responsible for the game model" },
        { es: "A cargo de la interfaz gráfica", en: "Responsible for the graphical interface" },
        {
          es: "Concurrencia con múltiples jugadores y partidas",
          en: "Concurrency with multiple players and games",
        },
      ],
      technologies: ["C++"],
      status: "in-progress",
      repositories: [
        { label: { es: "Código fuente", en: "Source code" }, visibility: "private" },
      ],
    },
    {
      id: "psa",
      name: { es: "PSA", en: "PSA" },
      description: {
        es: "Sistema de gestión de campañas de marketing y leads, con backend desacoplado del frontend mediante una API REST.",
        en: "Marketing campaign and lead management system, with a backend decoupled from the frontend through a REST API.",
      },
      highlights: [
        {
          es: "Backend desacoplado del frontend mediante API REST",
          en: "Backend decoupled from the frontend through a REST API",
        },
        { es: "Trabajo en equipo en todas las etapas", en: "Teamwork at every stage" },
        { es: "Gestión de campañas y leads", en: "Campaign and lead management" },
      ],
      technologies: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "Render"],
      status: "completed",
      repositories: [
        // TODO: cargar la URL del repositorio backend (cuenta compartida).
        { label: { es: "Código backend", en: "Backend code" }, visibility: "public" },
        // TODO: cargar la URL del repositorio frontend (cuenta compartida).
        { label: { es: "Código frontend", en: "Frontend code" }, visibility: "public" },
      ],
    },
    {
      id: "yet-another-battle-city",
      name: { es: "Yet Another Battle City", en: "Yet Another Battle City" },
      description: {
        es: "Juego de tanques con arquitectura MVC, para uno o dos jugadores con IA local.",
        en: "Tank game with an MVC architecture, for one or two players with local AI.",
      },
      highlights: [
        {
          es: "Diseñé el sistema multiclase que gestiona los eventos",
          en: "Designed the multi-class system that manages the events",
        },
        { es: "Desarrollé la capa de vistas", en: "Developed the view layer" },
        { es: "Arquitectura MVC con IA local", en: "MVC architecture with local AI" },
      ],
      technologies: ["Java", "JavaFX", "JUnit"],
      status: "completed",
      // TODO: cargar la URL del repositorio (cuenta compartida).
      repositories: [
        { label: { es: "Código fuente", en: "Source code" }, visibility: "public" },
      ],
    },
  ],
  contact: [
    {
      kind: "email",
      label: { es: "Correo", en: "Email" },
      value: { es: "04francomartin@gmail.com", en: "04francomartin@gmail.com" },
      url: "mailto:04francomartin@gmail.com",
      available: true,
    },
    {
      kind: "github",
      label: { es: "GitHub", en: "GitHub" },
      value: { es: "MartinAlonso333", en: "MartinAlonso333" },
      url: "https://github.com/MartinAlonso333",
      available: true,
    },
    {
      kind: "linkedin",
      label: { es: "LinkedIn", en: "LinkedIn" },
      value: { es: "franco-martin-alonso", en: "franco-martin-alonso" },
      url: "linkedin.com/in/franco-martin-alonso",
      available: true,
    },
  ],
  cv: {
    url: "/cv.pdf",
    fileName: "Franco-Martin-Alonso-CV.pdf",
    available: true,
  },
};
