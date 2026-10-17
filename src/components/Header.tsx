const navItems = [
  { href: "#presentacion", label: "Presentación" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#formacion", label: "Formación" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav
        aria-label="Secciones del sitio"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3"
      >
        <a
          href="#presentacion"
          className="rounded font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Franco Martín Alonso
        </a>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
