"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { useT } from "@/i18n/provider";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/language-toggle";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
] as const;

/** Seção atualmente no centro da viewport (scroll-spy). */
function useActiveSection() {
  // começa na primeira seção para o sublinhado já aparecer sob "Sobre"
  const [active, setActive] = React.useState<string>(SECTION_IDS[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", id: "about", label: t.nav.about },
    { href: "#experience", id: "experience", label: t.nav.experience },
    { href: "#projects", id: "projects", label: t.nav.projects },
    { href: "#skills", id: "skills", label: t.nav.skills },
    { href: "#contact", id: "contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* logo com glow no hover */}
        <a
          href="#top"
          aria-label={site.name}
          className="group relative flex items-center"
          onClick={() => setOpen(false)}
        >
          <span className="absolute -inset-2 -z-10 rounded-full bg-primary/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
          <Logo className="h-7 w-auto text-primary transition-transform duration-300 group-hover:scale-110" />
        </a>

        {/* links desktop com pílula ativa deslizante */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm transition-colors duration-300",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary shadow-[0_0_8px_var(--glow)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* lado direito */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="relative grid size-9 place-items-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* barra de progresso de scroll */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
        style={{ scaleX: scrollYProgress }}
      />

      {/* menu mobile animado */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.div
              className="flex flex-col gap-1 px-4 py-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className={cn(
                    "rounded-lg border-l-2 px-4 py-3 text-sm transition-colors",
                    active === link.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
