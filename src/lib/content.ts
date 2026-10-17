import type { ProjectStatus, RepositoryRef } from "@/types/content";

export type RepositoryState = "link" | "private" | "pending";

export const PRIVATE_REPOSITORY_LABEL = "Repositorio privado";

export function getRepositoryState(repository: RepositoryRef): RepositoryState {
  if (repository.visibility === "private") {
    return "private";
  }
  return repository.url ? "link" : "pending";
}

export function getProjectStatusLabel(status: ProjectStatus): string {
  return status === "in-progress" ? "En desarrollo" : "Finalizado";
}
