import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import type { Language, ProjectStatus, RepositoryRef } from "@/types/content";

export type RepositoryState = "link" | "private" | "pending";

export function getRepositoryState(repository: RepositoryRef): RepositoryState {
  if (repository.visibility === "private") {
    return "private";
  }
  return repository.url ? "link" : "pending";
}

export function getProjectStatusLabel(status: ProjectStatus, language: Language): string {
  return pick(ui.projectStatus[status], language);
}

export function getPrivateRepositoryLabel(language: Language): string {
  return pick(ui.privateRepository, language);
}
