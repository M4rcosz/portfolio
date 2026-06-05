"use client";

import * as React from "react";

import { pt, type Dictionary } from "./dictionaries/pt";
import { en } from "./dictionaries/en";

export type Lang = "pt" | "en";

const dictionaries: Record<Lang, Dictionary> = { pt, en };

const STORAGE_KEY = "portfolio-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("pt");

  // restaura idioma salvo no primeiro render no cliente
  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "pt" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
  }, []);

  const toggle = React.useCallback(() => {
    setLang(lang === "pt" ? "en" : "pt");
  }, [lang, setLang]);

  const value = React.useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: dictionaries[lang] }),
    [lang, setLang, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage deve ser usado dentro de <LanguageProvider>");
  }
  return ctx;
}

/** Atalho para acessar o dicionário do idioma ativo. */
export function useT() {
  return useLanguage().t;
}
