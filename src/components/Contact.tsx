"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import type { ContactLink } from "@/types/content";

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="11" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function EmailContact({ label, value }: { label: string; value: string }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    if (!navigator.clipboard?.writeText) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex h-full min-h-11 flex-col gap-2 rounded-lg border border-border bg-muted p-5">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="select-all break-all font-medium">{value}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={pick(ui.contact.copyEmail, language)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <CopyIcon />
        </button>
      </div>
      <span aria-live="polite" className="min-h-5 text-xs text-accent">
        {copied ? pick(ui.contact.copied, language) : ""}
      </span>
    </div>
  );
}

export function Contact({ contact }: { contact: ContactLink[] }) {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <h2 className="section-title text-2xl font-bold tracking-tight">
        {pick(ui.sections.contact, language)}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contact.map((link) => {
          const label = pick(link.label, language);
          const value = pick(link.value, language);

          if (link.kind === "email" && link.available) {
            return (
              <li key={link.kind}>
                <EmailContact label={label} value={value} />
              </li>
            );
          }

          if (link.available && link.url) {
            const external = link.url.startsWith("http");
            return (
              <li key={link.kind}>
                <a
                  href={link.url}
                  {...(external
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": `${label}: ${value} (${pick(ui.repositoryLinkAriaSuffix, language)})`,
                      }
                    : {})}
                  className="flex h-full min-h-11 flex-col gap-1 rounded-lg border border-border bg-muted p-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="text-sm font-medium text-muted-foreground">{label}</span>
                  <span className="break-all font-medium">{value}</span>
                </a>
              </li>
            );
          }

          return (
            <li
              key={link.kind}
              className="flex h-full min-h-11 flex-col gap-1 rounded-lg border border-dashed border-border bg-muted p-5 text-muted-foreground"
            >
              <span className="text-sm font-medium">{label}</span>
              <span className="break-all">{value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
