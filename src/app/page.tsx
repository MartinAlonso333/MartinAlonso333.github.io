"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
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
        <section id="presentacion" aria-label={pick(ui.sections.presentacion, language)}>
          <Hero profile={portfolio.profile} />
        </section>
        <section id="habilidades" aria-label={pick(ui.sections.habilidades, language)} />
        <section id="formacion" aria-label={pick(ui.sections.formacion, language)} />
        <section id="proyectos" aria-label={pick(ui.sections.proyectos, language)}>
          <Projects projects={portfolio.projects} />
        </section>
        <section id="contacto" aria-label={pick(ui.sections.contacto, language)} />
      </main>
    </>
  );
}
