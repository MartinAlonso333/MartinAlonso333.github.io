import type { Language, LocalizedText } from "@/types/content";

export type { Language, LocalizedText } from "@/types/content";

export const DEFAULT_LANGUAGE: Language = "es";

export const LANGUAGES: readonly Language[] = ["es", "en"];

export const LANGUAGE_STORAGE_KEY = "lang";

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export function pick(text: LocalizedText, language: Language): string {
  return text[language];
}
