"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import type { Project } from "@/types/content";

export function Projects({ projects }: { projects: Project[] }) {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <h2 className="section-title text-2xl font-bold tracking-tight">{pick(ui.projects.heading, language)}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
