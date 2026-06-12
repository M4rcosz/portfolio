"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useLanguage, type Lang } from "@/i18n/provider";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
];

/** largura de cada segmento (w-10) — o thumb desliza essa distância. */
const SEGMENT_W = 40;

/** Letras que "rolam" de baixo para cima, com leve flip 3D, a cada troca. */
function RollingLabel({ label, roll }: { label: string; roll: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <span aria-hidden className="block overflow-hidden" style={{ perspective: 120 }}>
      {label.split("").map((char, i) => (
        <motion.span
          // a key muda a cada troca de idioma → as letras remontam e rolam
          key={`${roll}-${i}`}
          initial={reduced ? false : { y: "130%", opacity: 0, rotateX: -80 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            delay: 0.08 + i * 0.07,
            type: "spring",
            stiffness: 400,
            damping: 24,
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
 * Controle segmentado PT | EN: o thumb rubro desliza com mola fazendo
 * squash & stretch (estica no arranque, amassa na chegada), solta um anel
 * de ping e pulsa o glow; as letras rolam com flip 3D a cada troca.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const reduced = useReducedMotion() ?? false;
  const isEn = lang === "en";

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={cn(
        "relative inline-flex items-center rounded-full border border-border bg-secondary/40 p-1 font-mono text-[11px] font-semibold transition-colors duration-300 hover:border-primary/50",
        className,
      )}
    >
      {/* thumb deslizante */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          x: isEn ? SEGMENT_W : 0,
          ...(reduced
            ? {}
            : {
                scaleX: [1, 1.35, 0.9, 1],
                scaleY: [1, 0.7, 1.08, 1],
                boxShadow: [
                  "0 0 10px var(--glow)",
                  "0 0 26px rgba(225, 29, 42, 0.6)",
                  "0 0 18px rgba(225, 29, 42, 0.45)",
                  "0 0 10px var(--glow)",
                ],
              }),
        }}
        transition={{
          x: { type: "spring", stiffness: 480, damping: 26 },
          scaleX: { duration: 0.45, times: [0, 0.35, 0.7, 1] },
          scaleY: { duration: 0.45, times: [0, 0.35, 0.7, 1] },
          boxShadow: { duration: 0.55, times: [0, 0.35, 0.7, 1] },
        }}
        className="absolute left-1 top-1 h-6 w-10 rounded-full bg-primary"
      />

      {/* anel de ping que expande a partir do lado ativo a cada troca */}
      <AnimatePresence initial={false}>
        {!reduced ? (
          <motion.span
            key={lang}
            aria-hidden
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={cn(
              "pointer-events-none absolute top-1 h-6 w-10 rounded-full border-2 border-primary/70",
              isEn ? "left-[2.75rem]" : "left-1",
            )}
          />
        ) : null}
      </AnimatePresence>

      {OPTIONS.map((option) => {
        const isActive = lang === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={isActive}
            aria-label={option.value === "pt" ? "Português" : "English"}
            whileTap={{ scale: 0.88 }}
            className={cn(
              "relative z-10 grid h-6 w-10 cursor-pointer place-items-center rounded-full tracking-wider transition-colors duration-300",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <RollingLabel label={option.label} roll={lang} />
          </motion.button>
        );
      })}
    </div>
  );
}
