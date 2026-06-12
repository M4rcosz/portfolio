"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useLanguage, type Lang } from "@/i18n/provider";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
];

const thumbSpring = { type: "spring", stiffness: 500, damping: 28 } as const;

/** Letras que "rolam" de baixo para cima quando o idioma muda. */
function RollingLabel({ label, roll }: { label: string; roll: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <span aria-hidden className="block overflow-hidden">
      {label.split("").map((char, i) => (
        <motion.span
          // a key muda a cada troca de idioma → as letras remontam e rolam
          key={`${roll}-${i}`}
          initial={reduced ? false : { y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * 0.06,
            type: "spring",
            stiffness: 420,
            damping: 26,
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Controle segmentado PT | EN: o "thumb" rubro desliza com mola entre os
 * segmentos (layoutId) e as letras rolam a cada troca de idioma.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={cn(
        "relative inline-flex items-center rounded-full border border-border bg-secondary/40 p-1 font-mono text-[11px] font-semibold",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = lang === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={isActive}
            aria-label={option.value === "pt" ? "Português" : "English"}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "relative cursor-pointer rounded-full px-2.5 py-1 tracking-wider transition-colors duration-300",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="lang-thumb"
                transition={thumbSpring}
                className="absolute inset-0 rounded-full bg-primary shadow-[0_0_14px_var(--glow)]"
              />
            ) : null}
            <span className="relative z-10">
              <RollingLabel label={option.label} roll={lang} />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
