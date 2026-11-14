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

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function ContactIcon({ kind }: { kind: ContactLink["kind"] }) {
  if (kind === "github") return <GitHubIcon />;
  if (kind === "linkedin") return <LinkedInIcon />;
  return <MailIcon />;
}

const pillClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-muted px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

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
    <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-muted py-0.5 pl-4 pr-0.5 text-sm font-medium">
      <MailIcon />
      <span className="sr-only">{label}: </span>
      <span className="select-all break-all">{value}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={pick(ui.contact.copyEmail, language)}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <CopyIcon />
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? pick(ui.contact.copied, language) : ""}
      </span>
      {copied ? (
        <span aria-hidden="true" className="pr-3 text-xs text-accent">
          {pick(ui.contact.copied, language)}
        </span>
      ) : null}
    </div>
  );
}

export function Contact({ contact }: { contact: ContactLink[] }) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <h2 className="section-title text-2xl font-bold tracking-tight">
        {pick(ui.sections.contact, language)}
      </h2>
      <ul className="flex flex-wrap items-center gap-3">
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
            return (
              <li key={link.kind}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}: ${value} (${pick(ui.repositoryLinkAriaSuffix, language)})`}
                  className={pillClass}
                >
                  <ContactIcon kind={link.kind} />
                  {label}
                </a>
              </li>
            );
          }

          return (
            <li
              key={link.kind}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-border bg-muted px-4 text-sm text-muted-foreground"
            >
              <ContactIcon kind={link.kind} />
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
