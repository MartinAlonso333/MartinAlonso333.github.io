export type Language = "es" | "en";

export type LocalizedText = Record<Language, string>;

export type ProjectStatus = "in-progress" | "completed";

export type RepositoryVisibility = "public" | "private";

export type ContactKind = "email" | "github" | "linkedin";

export interface SpokenLanguage {
  name: LocalizedText;
  level: LocalizedText;
}

export interface PhotoRef {
  src: string;
  alt: LocalizedText;
  available: boolean;
}

export interface Profile {
  /** Nombre propio: no se traduce. */
  fullName: string;
  professionalTitle: LocalizedText;
  /** Párrafos separados por una línea en blanco ("\n\n"); se renderizan como <p> independientes. */
  summary: LocalizedText;
  location: LocalizedText;
  languages: SpokenLanguage[];
  photo?: PhotoRef;
}

/** Nombre de habilidad: los nombres propios se dejan como `string`; las frases se localizan. */
export type SkillItem = string | LocalizedText;

export interface SkillCategory {
  id: string;
  name: LocalizedText;
  skills: SkillItem[];
}

export interface Certificate {
  id: string;
  title: LocalizedText;
  issuer: LocalizedText;
  /** Fecha de emisión, opcional. */
  date?: LocalizedText;
  /** URL a un PDF en `public/certificates/` o a un enlace externo de verificación. */
  url: string;
}

export interface EducationItem {
  id: string;
  program: LocalizedText;
  institution: LocalizedText;
  status: LocalizedText;
  type: "grado" | "curso";
  /** Certificados asociados a la formación (opcional). */
  certificates?: Certificate[];
}

export interface RepositoryRef {
  /** Etiqueta legible del repositorio, p. ej. "Código fuente", "Código backend". */
  label: LocalizedText;
  visibility: RepositoryVisibility;
  /** Presente solo cuando el enlace está disponible. Su ausencia en un repositorio público indica estado "pendiente". */
  url?: string;
}

export interface Project {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  /** Nombres propios de tecnologías: no se traducen. */
  technologies: string[];
  status: ProjectStatus;
  repositories: RepositoryRef[];
}

export interface ContactLink {
  kind: ContactKind;
  label: LocalizedText;
  value: LocalizedText;
  url?: string;
  available: boolean;
}

export interface CvResource {
  url: string;
  fileName: string;
  available: boolean;
}

export interface PortfolioContent {
  profile: Profile;
  skills: SkillCategory[];
  education: EducationItem[];
  projects: Project[];
  contact: ContactLink[];
  cv: CvResource;
}
