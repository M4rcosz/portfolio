"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, Eye, FileText, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { useT } from "@/i18n/provider";

export function ResumePreview() {
  const t = useT();
  const [open, setOpen] = React.useState(false);

  // Esc para fechar + trava o scroll do body enquanto aberto
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
      >
        <Eye />
        {t.hero.ctaResume}
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[60]">
                {/* backdrop */}
                <motion.div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                />

                {/* painel deslizante (direita -> esquerda) */}
                <motion.aside
                  role="dialog"
                  aria-modal="true"
                  aria-label={t.resume.title}
                  className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-border bg-card shadow-2xl sm:w-[min(92vw,880px)]"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                  <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                      <FileText className="size-4 shrink-0 text-primary" />
                      <span className="truncate">{t.resume.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={site.resume}
                        download="Marcos-Paulo-CV.pdf"
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                      >
                        <Download className="size-4" />
                        <span className="hidden sm:inline">{t.resume.download}</span>
                      </a>
                      <a
                        href={site.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t.resume.openTab}
                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                      >
                        <ExternalLink className="size-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label={t.resume.close}
                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </header>

                  <div className="flex-1 overflow-hidden bg-muted">
                    <iframe
                      src={`${site.resume}#view=FitH`}
                      title={t.resume.title}
                      className="size-full"
                    />
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
