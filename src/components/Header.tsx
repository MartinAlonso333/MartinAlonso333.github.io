"use client";

import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";

export function Header() {
  const { language } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav
        aria-label={pick(ui.nav.ariaLabel, language)}
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3"
      >
        <a
          href="#about"
          className="rounded font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Franco Martín Alonso
        </a>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {ui.nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {pick(ui.sections[item.section], language)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
