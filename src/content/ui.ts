import type { LocalizedText } from "@/types/content";

export type SectionKey = "about" | "skills" | "education" | "projects" | "contact";

export interface NavItem {
  href: string;
  section: SectionKey;
}

export interface UiContent {
  meta: {
    title: LocalizedText;
    description: LocalizedText;
  };
  nav: {
    ariaLabel: LocalizedText;
    items: NavItem[];
  };
  sections: Record<SectionKey, LocalizedText>;
  hero: {
    photoPlaceholder: LocalizedText;
  };
  cv: {
    download: LocalizedText;
    comingSoon: LocalizedText;
  };
  projects: {
    heading: LocalizedText;
  };
  projectStatus: {
    "in-progress": LocalizedText;
    completed: LocalizedText;
  };
  privateRepository: LocalizedText;
  repositoryLinkAriaSuffix: LocalizedText;
  contact: {
    copyEmail: LocalizedText;
    copied: LocalizedText;
  };
  educationType: {
    grado: LocalizedText;
    curso: LocalizedText;
  };
  education: {
    viewCertificate: LocalizedText;
  };
  languageToggle: {
    label: LocalizedText;
    target: LocalizedText;
  };
  themeToggle: {
    toLight: LocalizedText;
    toDark: LocalizedText;
  };
}

export const ui: UiContent = {
  meta: {
    title: {
      es: "Franco Martín Alonso — Desarrollador Backend",
      en: "Franco Martín Alonso — Backend Developer",
    },
    description: {
      es: "Portafolio profesional de Franco Martín Alonso, estudiante de Ingeniería Informática en FIUBA y desarrollador backend.",
      en: "Professional portfolio of Franco Martín Alonso, Computer Engineering student at FIUBA and backend developer.",
    },
  },
  nav: {
    ariaLabel: { es: "Secciones del sitio", en: "Site sections" },
    items: [
      { href: "#about", section: "about" },
      { href: "#skills", section: "skills" },
      { href: "#education", section: "education" },
      { href: "#projects", section: "projects" },
      { href: "#contact", section: "contact" },
    ],
  },
  sections: {
    about: { es: "Presentación", en: "About" },
    skills: { es: "Habilidades", en: "Skills" },
    education: { es: "Formación", en: "Education" },
    projects: { es: "Proyectos", en: "Projects" },
    contact: { es: "Contacto", en: "Contact" },
  },
  hero: {
    photoPlaceholder: {
      es: "Espacio reservado para la foto de perfil",
      en: "Placeholder for the profile photo",
    },
  },
  cv: {
    download: { es: "Descargar CV", en: "Download CV" },
    comingSoon: { es: "Próximamente", en: "Coming soon" },
  },
  projects: {
    heading: { es: "Proyectos", en: "Projects" },
  },
  projectStatus: {
    "in-progress": { es: "En desarrollo", en: "In progress" },
    completed: { es: "Finalizado", en: "Completed" },
  },
  privateRepository: { es: "Repositorio privado", en: "Private repository" },
  repositoryLinkAriaSuffix: { es: "se abre en una nueva pestaña", en: "opens in a new tab" },
  contact: {
    copyEmail: { es: "Copiar correo electrónico", en: "Copy email address" },
    copied: { es: "Copiado", en: "Copied" },
  },
  educationType: {
    grado: { es: "Grado", en: "Degree" },
    curso: { es: "Curso", en: "Course" },
  },
  education: {
    viewCertificate: { es: "Ver certificado", en: "View certificate" },
  },
  languageToggle: {
    label: { es: "Cambiar a inglés", en: "Switch to Spanish" },
    target: { es: "EN", en: "ES" },
  },
  themeToggle: {
    toLight: { es: "Cambiar a modo claro", en: "Switch to light mode" },
    toDark: { es: "Cambiar a modo oscuro", en: "Switch to dark mode" },
  },
};
