"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import type { Certificate, EducationItem } from "@/types/content";

function CertificateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
    </svg>
  );
}

export function Education({ education }: { education: EducationItem[] }) {
  const { language } = useLanguage();
  const viewLabel = pick(ui.education.viewCertificate, language);
  const externalSuffix = pick(ui.repositoryLinkAriaSuffix, language);

  return (
    <div className="space-y-8">
      <h2 className="section-title text-2xl font-bold tracking-tight">
        {pick(ui.sections.education, language)}
      </h2>
      <ul className="space-y-6">
        {education.map((item) => {
          const institution = pick(item.institution, language).trim();
          const certificates = (item.certificates ?? []).filter(
            (certificate): certificate is Certificate & { url: string } =>
              Boolean(certificate.url),
          );
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
              {certificates.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {certificates.map((certificate) => {
                    const title = pick(certificate.title, language);
                    const issuer = pick(certificate.issuer, language);
                    const date = certificate.date ? pick(certificate.date, language) : "";
                    const meta = [issuer, date].filter(Boolean).join(" · ");
                    const external = certificate.url.startsWith("http");
                    const ariaLabel = external
                      ? `${viewLabel}: ${title} (${externalSuffix})`
                      : `${viewLabel}: ${title}`;
                    return (
                      <li
                        key={certificate.id}
                        className="rounded border border-border bg-background p-3"
                      >
                        <p className="text-sm font-medium">{title}</p>
                        {meta.length > 0 ? (
                          <p className="mt-0.5 text-xs text-muted-foreground">{meta}</p>
                        ) : null}
                        <a
                          href={certificate.url}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          aria-label={ariaLabel}
                          className="mt-2 inline-flex min-h-11 items-center gap-2 rounded border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          <CertificateIcon />
                          {viewLabel}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
