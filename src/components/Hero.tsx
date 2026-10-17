"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import type { CvResource, Profile } from "@/types/content";

function getInitials(fullName: string): string {
  const words = fullName.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return "";
  }
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

export function Hero({ profile, cv }: { profile: Profile; cv: CvResource }) {
  const { language } = useLanguage();
  const { photo } = profile;
  const summaryParagraphs = pick(profile.summary, language)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  return (
    <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{profile.fullName}</h1>
        <p className="text-lg text-muted-foreground">{pick(profile.professionalTitle, language)}</p>
        <div className="max-w-prose space-y-3">
          {summaryParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{pick(profile.location, language)}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {profile.languages.map((spokenLanguage) => (
            <li key={spokenLanguage.name.es}>
              <span className="font-medium">{pick(spokenLanguage.name, language)}</span>{" "}
              <span className="text-muted-foreground">{pick(spokenLanguage.level, language)}</span>
            </li>
          ))}
        </ul>
        {cv.available ? (
          <a
            href={cv.url}
            download={cv.fileName}
            className="inline-flex min-h-11 items-center rounded bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {pick(ui.cv.download, language)}
          </a>
        ) : (
          <button
            type="button"
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded border border-border px-4 text-sm font-medium text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {pick(ui.cv.download, language)}
            <span className="rounded-full bg-background px-2 py-0.5 text-xs">
              {pick(ui.cv.comingSoon, language)}
            </span>
          </button>
        )}
      </div>
      <div className="shrink-0">
        {photo && photo.available ? (
          <Image
            src={photo.src}
            alt={pick(photo.alt, language)}
            width={160}
            height={160}
            className="h-40 w-40 rounded-full border border-border object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={photo ? pick(photo.alt, language) : pick(ui.hero.photoPlaceholder, language)}
            className="flex h-40 w-40 items-center justify-center rounded-full border border-border bg-muted text-3xl font-semibold text-muted-foreground"
          >
            <span aria-hidden="true">{getInitials(profile.fullName)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
