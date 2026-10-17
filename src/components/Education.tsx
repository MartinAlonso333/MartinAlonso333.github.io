"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import type { EducationItem } from "@/types/content";

export function Education({ education }: { education: EducationItem[] }) {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <h2 className="section-title text-2xl font-bold tracking-tight">
        {pick(ui.sections.education, language)}
      </h2>
      <ul className="space-y-6">
        {education.map((item) => {
          const institution = pick(item.institution, language).trim();
          return (
            <li key={item.id} className="rounded-lg border border-border bg-muted p-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold">{pick(item.program, language)}</h3>
                <span className="rounded bg-badge px-2 py-1 text-xs font-medium text-badge-foreground">
                  {pick(ui.educationType[item.type], language)}
                </span>
              </div>
              {institution.length > 0 ? (
                <p className="mt-1 text-sm text-muted-foreground">{institution}</p>
              ) : null}
              <p className="mt-2 text-sm">{pick(item.status, language)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
