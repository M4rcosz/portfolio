"use client";

import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/provider";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer",
        className,
      )}
    >
      <Languages className="size-3.5" />
      <span className={lang === "pt" ? "text-primary" : ""}>PT</span>
      <span aria-hidden>/</span>
      <span className={lang === "en" ? "text-primary" : ""}>EN</span>
    </button>
  );
}
