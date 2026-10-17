import type { Metadata } from "next";
import type { ReactNode } from "react";
import { THEME_STORAGE_KEY, THEME_VALUES } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Franco Martín Alonso — Desarrollador Backend",
  description:
    "Portafolio profesional de Franco Martín Alonso, estudiante de Ingeniería Informática en FIUBA y desarrollador backend.",
};

const themeScript = `(function(){try{var key=${JSON.stringify(THEME_STORAGE_KEY)};var allowed=${JSON.stringify(THEME_VALUES)};var stored=localStorage.getItem(key);if(stored&&allowed.indexOf(stored)===-1){stored=null;}var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=stored==="dark"||((!stored||stored==="system")&&prefersDark);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
