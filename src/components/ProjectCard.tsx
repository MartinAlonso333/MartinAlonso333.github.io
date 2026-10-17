"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import {
  getPrivateRepositoryLabel,
  getProjectStatusLabel,
  getRepositoryState,
} from "@/lib/content";
import { pick } from "@/lib/i18n";
import type { Project } from "@/types/content";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { language } = useLanguage();
  const repositories = project.repositories.filter(
    (repository) => getRepositoryState(repository) !== "pending",
  );

  return (
    <article className="flex h-full flex-col gap-4 rounded-lg border border-border bg-muted p-5 transition-colors hover:border-accent focus-within:border-accent">
      <header className="space-y-2">
        <h3 className="text-xl font-semibold">{pick(project.name, language)}</h3>
        <p className="inline-block rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          {getProjectStatusLabel(project.status, language)}
        </p>
      </header>
      <p className="text-sm">{pick(project.description, language)}</p>
      {project.highlights.length > 0 ? (
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {project.highlights.map((highlight, index) => (
            <li key={index}>{pick(highlight, language)}</li>
          ))}
        </ul>
      ) : null}
      <ul className="flex flex-wrap gap-2 text-xs">
        {project.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded bg-badge px-2 py-1 font-medium text-badge-foreground"
          >
            {technology}
          </li>
        ))}
      </ul>
      {repositories.length > 0 ? (
        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
          {repositories.map((repository) => {
            const label = pick(repository.label, language);
            if (getRepositoryState(repository) === "link" && repository.url) {
              return (
                <a
                  key={label}
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (${pick(ui.repositoryLinkAriaSuffix, language)})`}
                  className="inline-flex min-h-11 items-center gap-2 rounded bg-accent px-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <GitHubIcon />
                  {label}
                </a>
              );
            }
            return (
              <span
                key={label}
                className="inline-flex min-h-11 items-center rounded border border-border px-3 text-sm text-muted-foreground"
              >
                {getPrivateRepositoryLabel(language)}
              </span>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}
