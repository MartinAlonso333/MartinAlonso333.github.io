export type ProjectStatus = "in-progress" | "completed";

export type RepositoryVisibility = "public" | "private";

export type ContactKind = "email" | "github" | "linkedin";

export interface Language {
  name: string;
  level: string;
}

export interface PhotoRef {
  src: string;
  alt: string;
  available: boolean;
}

export interface Profile {
  fullName: string;
  professionalTitle: string;
  summary: string;
  location: string;
  languages: Language[];
  photo?: PhotoRef;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  program: string;
  institution: string;
  status: string;
  type: "grado" | "curso";
}

export interface RepositoryRef {
  /** Etiqueta legible del repositorio, p. ej. "Código fuente", "Código backend". */
  label: string;
  visibility: RepositoryVisibility;
  /** Presente solo cuando el enlace está disponible. Su ausencia en un repositorio público indica estado "pendiente". */
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  technologies: string[];
  status: ProjectStatus;
  repositories: RepositoryRef[];
}

export interface ContactLink {
  kind: ContactKind;
  label: string;
  value: string;
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
