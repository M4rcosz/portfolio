"use client";

import * as React from "react";

/**
 * Lê uma media query de forma reativa e segura para SSR.
 * No servidor (e antes da hidratação) retorna `false`, então o primeiro
 * render casa com o HTML do servidor; o valor real é aplicado no efeito.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Verdadeiro em telas de celular (abaixo do breakpoint `md` do Tailwind). */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
