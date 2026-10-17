import type { PortfolioContent } from "@/types/content";

export const portfolio: PortfolioContent = {
  profile: {
    fullName: "Franco Martín Alonso",
    professionalTitle: "Estudiante de Ingeniería Informática · Desarrollador Backend",
    summary:
      "Estudiante de cuarto año de Ingeniería Informática en FIUBA, orientado al desarrollo backend con Java y Spring Boot. Busco una pasantía o mi primer empleo como desarrollador backend.",
    location: "Buenos Aires, Argentina",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio" },
      { name: "Portugués", level: "Básico" },
    ],
    photo: {
      src: "/foto.jpg",
      alt: "Foto de perfil de Franco Martín Alonso",
      available: false,
    },
  },
  skills: [
    {
      id: "lenguajes",
      name: "Lenguajes",
      skills: ["Java", "C++", "TypeScript", "JavaScript"],
    },
    {
      id: "backend",
      name: "Backend",
      skills: ["Spring Boot 3.x", "Spring Data JPA", "Hibernate", "Spring Security", "Maven"],
    },
    {
      id: "bases-de-datos",
      name: "Bases de datos",
      skills: ["PostgreSQL"],
    },
    {
      id: "infraestructura",
      name: "Infraestructura y monitoreo",
      skills: ["Docker", "Spring Boot Actuator"],
    },
    {
      id: "frontend",
      name: "Frontend",
      skills: ["React"],
    },
  ],
  education: [
    {
      id: "fiuba",
      program: "Ingeniería Informática",
      institution: "Facultad de Ingeniería de la Universidad de Buenos Aires (FIUBA)",
      status: "Cursando 4.º año",
      type: "grado",
    },
    {
      id: "curso-javascript",
      program: "Curso de JavaScript",
      // TODO: completar la institución del curso de JavaScript.
      institution: "",
      status: "Completado",
      type: "curso",
    },
  ],
  projects: [
    {
      id: "al-toque",
      name: "Al Toque",
      description:
        "Plataforma que conecta a personas que necesitan servicios del hogar, como gas o plomería, con profesionales registrados.",
      highlights: [
        "Trabajo en equipo con Spec-Driven Development",
        "A cargo del backend y del frontend",
        "API REST con Spring Boot y Spring Data JPA",
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
      repositories: [{ label: "Código fuente", visibility: "private" }],
    },
    {
      id: "simulador-granja",
      name: "Simulador de granja multijugador",
      description:
        "Simulador de granja multijugador y multihilo en C++, con soporte para múltiples jugadores y partidas simultáneas.",
      highlights: [
        "A cargo del modelo del juego",
        "A cargo de la interfaz gráfica",
        "Concurrencia con múltiples jugadores y partidas",
      ],
      technologies: ["C++"],
      status: "in-progress",
      repositories: [{ label: "Código fuente", visibility: "private" }],
    },
    {
      id: "psa",
      name: "PSA",
      description:
        "Sistema de gestión de campañas de marketing y leads, con backend desacoplado del frontend mediante una API REST.",
      highlights: [
        "Backend desacoplado del frontend mediante API REST",
        "Trabajo en equipo en todas las etapas",
        "Gestión de campañas y leads",
      ],
      technologies: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "Render"],
      status: "completed",
      repositories: [
        // TODO: cargar la URL del repositorio backend (cuenta compartida).
        { label: "Código backend", visibility: "public" },
        // TODO: cargar la URL del repositorio frontend (cuenta compartida).
        { label: "Código frontend", visibility: "public" },
      ],
    },
    {
      id: "yet-another-battle-city",
      name: "Yet Another Battle City",
      description:
        "Juego de tanques con arquitectura MVC, para uno o dos jugadores con IA local.",
      highlights: [
        "Diseñé el sistema multiclase que gestiona los eventos",
        "Desarrollé la capa de vistas",
        "Arquitectura MVC con IA local",
      ],
      technologies: ["Java", "JavaFX", "JUnit"],
      status: "completed",
      // TODO: cargar la URL del repositorio (cuenta compartida).
      repositories: [{ label: "Código fuente", visibility: "public" }],
    },
  ],
  contact: [
    {
      kind: "email",
      label: "Correo",
      value: "04francomartin@gmail.com",
      url: "mailto:04francomartin@gmail.com",
      available: true,
    },
    {
      kind: "github",
      label: "GitHub",
      value: "MartinAlonso333",
      url: "https://github.com/MartinAlonso333",
      available: true,
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      value: "Próximamente",
      available: false,
    },
  ],
  cv: {
    url: "/cv.pdf",
    fileName: "Franco-Martin-Alonso-CV.pdf",
    available: false,
  },
};
