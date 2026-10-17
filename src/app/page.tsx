import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-16 px-4 py-16">
        <section id="presentacion" aria-label="Presentación" />
        <section id="habilidades" aria-label="Habilidades" />
        <section id="formacion" aria-label="Formación" />
        <section id="proyectos" aria-label="Proyectos" />
        <section id="contacto" aria-label="Contacto" />
      </main>
    </>
  );
}
