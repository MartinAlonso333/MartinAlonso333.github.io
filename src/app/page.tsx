"use client";

import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { useLanguage } from "@/components/LanguageProvider";
import { portfolio } from "@/content/portfolio";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";

export default function Home() {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-16 px-4 py-16">
        <section id="about" aria-label={pick(ui.sections.about, language)}>
          <Hero profile={portfolio.profile} cv={portfolio.cv} />
        </section>
        <section id="skills" aria-label={pick(ui.sections.skills, language)}>
          <Skills skills={portfolio.skills} />
        </section>
        <section id="education" aria-label={pick(ui.sections.education, language)}>
          <Education education={portfolio.education} />
        </section>
        <section id="projects" aria-label={pick(ui.sections.projects, language)}>
          <Projects projects={portfolio.projects} />
        </section>
        <section id="contact" aria-label={pick(ui.sections.contact, language)}>
          <Contact contact={portfolio.contact} />
        </section>
      </main>
    </>
  );
}
