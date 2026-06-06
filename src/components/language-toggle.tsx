"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { locales, type Lang } from "@/i18n/config";
import { useLanguage } from "@/i18n/provider";

const LABEL: Record<Lang, string> = { pt: "PT", en: "EN" };
const ARIA: Record<Lang, string> = {
  pt: "Mudar para Português",
  en: "Switch to English",
};

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-0.5 rounded-full border border-border bg-secondary/40 p-0.5 text-xs font-semibold transition-colors duration-300 hover:border-primary/50",
        className,
      )}
    >
      {locales.map((l) => {
        const isActive = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-label={ARIA[l]}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 cursor-pointer rounded-full px-2.5 py-1 transition-colors duration-300",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lang-active"
                className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_3px_14px_-3px_var(--glow)]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {LABEL[l]}
          </button>
        );
      })}
    </div>
  );
}
