export const THEME_STORAGE_KEY = "theme";

export const THEME_VALUES = ["light", "dark", "system"] as const;

export type ThemePreference = (typeof THEME_VALUES)[number];

export type EffectiveTheme = "light" | "dark";

export function isThemePreference(value: unknown): value is ThemePreference {
  return typeof value === "string" && (THEME_VALUES as readonly string[]).includes(value);
}

export function resolveEffectiveTheme(
  preference: ThemePreference,
  prefersDark: boolean,
): EffectiveTheme {
  if (preference === "system") {
    return prefersDark ? "dark" : "light";
  }
  return preference;
}
