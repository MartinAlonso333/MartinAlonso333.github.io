import type { LocalizedText } from "@/types/content";

export type SectionKey =
  | "presentacion"
  | "habilidades"
  | "formacion"
  | "proyectos"
  | "contacto";

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
  projects: {
    heading: LocalizedText;
  };
  projectStatus: {
    "in-progress": LocalizedText;
    completed: LocalizedText;
  };
  privateRepository: LocalizedText;
  repositoryLinkAriaSuffix: LocalizedText;
  educationType: {
    grado: LocalizedText;
    curso: LocalizedText;
  };
  languageToggle: {
    label: LocalizedText;
    target: LocalizedText;
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
      { href: "#presentacion", section: "presentacion" },
      { href: "#habilidades", section: "habilidades" },
      { href: "#formacion", section: "formacion" },
      { href: "#proyectos", section: "proyectos" },
      { href: "#contacto", section: "contacto" },
    ],
  },
  sections: {
    presentacion: { es: "Presentación", en: "About" },
    habilidades: { es: "Habilidades", en: "Skills" },
    formacion: { es: "Formación", en: "Education" },
    proyectos: { es: "Proyectos", en: "Projects" },
    contacto: { es: "Contacto", en: "Contact" },
  },
  hero: {
    photoPlaceholder: {
      es: "Espacio reservado para la foto de perfil",
      en: "Placeholder for the profile photo",
    },
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
  educationType: {
    grado: { es: "Grado", en: "Degree" },
    curso: { es: "Curso", en: "Course" },
  },
  languageToggle: {
    label: { es: "Cambiar a inglés", en: "Switch to Spanish" },
    target: { es: "EN", en: "ES" },
  },
};
