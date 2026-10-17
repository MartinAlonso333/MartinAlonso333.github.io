"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import type { Language, SkillCategory, SkillItem } from "@/types/content";

function getSkillLabel(skill: SkillItem, language: Language): string {
  return typeof skill === "string" ? skill : pick(skill, language);
}

export function Skills({ skills }: { skills: SkillCategory[] }) {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <h2 className="section-title text-2xl font-bold tracking-tight">{pick(ui.sections.skills, language)}</h2>
      <ul className="grid gap-6 sm:grid-cols-2">
        {skills.map((category) => (
          <li key={category.id} className="rounded-lg border border-border bg-muted p-5">
            <h3 className="text-lg font-semibold">{pick(category.name, language)}</h3>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs">
              {category.skills.map((skill) => {
                const label = getSkillLabel(skill, language);
                return (
                  <li
                    key={label}
                    className="rounded bg-badge px-2 py-1 font-medium text-badge-foreground"
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
