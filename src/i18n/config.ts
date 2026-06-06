export const locales = ["pt", "en"] as const;

export type Lang = (typeof locales)[number];

export const defaultLocale: Lang = "pt";

/** Caminho público de cada idioma (pt na raiz, demais com prefixo). */
export function localePath(locale: Lang): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

/** Atributo lang do <html> por idioma. */
export function htmlLang(locale: Lang): string {
  return locale === "pt" ? "pt-BR" : "en";
}

export function isLocale(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}
