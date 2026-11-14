"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, toggle } = useLanguage();
  const label = pick(ui.languageToggle.label, language);
  const target = pick(ui.languageToggle.target, language);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-border px-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span aria-hidden="true">{target}</span>
    </button>
  );
}
