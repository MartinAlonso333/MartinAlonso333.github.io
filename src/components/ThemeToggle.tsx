"use client";

import { useSyncExternalStore } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { ui } from "@/content/ui";
import { pick } from "@/lib/i18n";
import {
  isThemePreference,
  resolveEffectiveTheme,
  THEME_STORAGE_KEY,
  type EffectiveTheme,
  type ThemePreference,
} from "@/lib/theme";

const SERVER_THEME: EffectiveTheme = "light";

const listeners = new Set<() => void>();

let cached: EffectiveTheme | null = null;

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function currentTheme(): EffectiveTheme {
  return resolveEffectiveTheme(readPreference(), systemPrefersDark());
}

function applyTheme(theme: EffectiveTheme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function refresh(): void {
  const theme = currentTheme();
  cached = theme;
  applyTheme(theme);
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = () => refresh();

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (readPreference() === "system") {
      refresh();
    }
  };

  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onSystemChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystemChange);
  };
}

function getSnapshot(): EffectiveTheme {
  if (cached === null) {
    cached = currentTheme();
  }
  return cached;
}

function getServerSnapshot(): EffectiveTheme {
  return SERVER_THEME;
}

function setPreference(preference: ThemePreference): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Sin localStorage el tema sigue vigente solo durante la sesión.
  }
  const theme = resolveEffectiveTheme(preference, systemPrefersDark());
  cached = theme;
  applyTheme(theme);
  emit();
}

function toggleTheme(): void {
  setPreference(getSnapshot() === "dark" ? "light" : "dark");
}

export function ThemeToggle() {
  const { language } = useLanguage();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const action = theme === "dark" ? ui.themeToggle.toLight : ui.themeToggle.toDark;
  const label = pick(action, language);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-border px-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="hidden dark:block"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="block dark:hidden"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
