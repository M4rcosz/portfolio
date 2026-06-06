"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/provider";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage();
  const isEn = lang === "en";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isEn}
      aria-label={isEn ? "Switch to Português" : "Mudar para English"}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 py-1 pl-1 pr-2.5 transition-colors duration-300 hover:border-primary/60 cursor-pointer",
        className,
      )}
    >
      {/* símbolo yin-yang: gira 180° conforme o idioma */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className={cn(
          "size-6 shrink-0 transition-transform duration-500 ease-out group-hover:scale-110",
          isEn ? "rotate-180" : "rotate-0",
        )}
      >
        <circle cx="50" cy="50" r="49" fill="var(--muted-foreground)" />
        <path
          d="M50,1 a49,49 0 0,1 0,98 a24.5,24.5 0 0,1 0,-49 a24.5,24.5 0 0,0 0,-49 z"
          fill="var(--primary)"
        />
        <circle cx="50" cy="25.5" r="9" fill="var(--muted-foreground)" />
        <circle cx="50" cy="74.5" r="9" fill="var(--primary)" />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
      </svg>
      <span className="text-xs font-semibold tabular-nums text-foreground">
        {lang.toUpperCase()}
      </span>
    </button>
  );
}
