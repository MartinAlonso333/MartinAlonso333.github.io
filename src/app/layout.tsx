import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import { THEME_STORAGE_KEY, THEME_VALUES } from "@/lib/theme";
import { DEFAULT_LANGUAGE, pick } from "@/lib/i18n";
import { ui } from "@/content/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: pick(ui.meta.title, DEFAULT_LANGUAGE),
  description: pick(ui.meta.description, DEFAULT_LANGUAGE),
};

const themeScript = `(function(){try{var key=${JSON.stringify(THEME_STORAGE_KEY)};var allowed=${JSON.stringify(THEME_VALUES)};var stored=localStorage.getItem(key);if(stored&&allowed.indexOf(stored)===-1){stored=null;}var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=stored==="dark"||((!stored||stored==="system")&&prefersDark);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LANGUAGE}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
