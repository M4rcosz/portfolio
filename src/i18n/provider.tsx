"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { dictionaries, type Dictionary } from "./dictionaries";
import { localePath, type Lang } from "./config";

const COOKIE = "NEXT_LOCALE";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

/**
 * Provider de idioma controlado pela rota: o `lang` vem do segmento [locale].
 * Trocar de idioma grava um cookie (para o middleware lembrar) e navega para
 * a URL do outro idioma (pt na raiz, en em /en).
 */
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();

  // mantém o <html lang> coerente em navegações no cliente (o layout raiz
  // não re-renderiza ao trocar de rota).
  React.useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = React.useCallback(
    (next: Lang) => {
      document.cookie = `${COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
      router.push(localePath(next));
    },
    [router],
  );

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

export type { Lang } from "./config";
