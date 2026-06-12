"use client";

import * as React from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { useT } from "@/i18n/provider";
import { Logo } from "@/components/logo";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { LanguageToggle } from "@/components/language-toggle";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
] as const;

/** duração do colapso do menu mobile (precisa casar com o exit abaixo). */
const MOBILE_MENU_EXIT_MS = 250;

/** Seção atualmente no centro da viewport (scroll-spy). */
function useActiveSection() {
  // No topo (home/hero) começa sem item ativo: como "top" não é um link do
  // menu, nenhum traço aparece. O destaque só surge quando uma das seções
  // do menu cruza o centro da viewport.
  const [active, setActive] = React.useState<string>("top");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    // observa o hero (#top) também, para o destaque sumir ao voltar ao topo
    ["top", ...SECTION_IDS].forEach((id) => {
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

  const scrollToSection = React.useCallback((href: string) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    // scrollIntoView respeita o scroll-mt-20 das seções
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  }, []);

  /**
   * Navegação programática no lugar da âncora nativa: no mobile, o scroll
   * suave nativo é cancelado pelo colapso animado do painel do menu — então
   * fechamos o menu primeiro e só depois rolamos até a seção.
   */
  const handleNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (open) {
        setOpen(false);
        window.setTimeout(() => scrollToSection(href), MOBILE_MENU_EXIT_MS + 30);
      } else {
        scrollToSection(href);
      }
    },
    [open, scrollToSection],
  );

  const socials = [
    { href: site.github, label: "GitHub", icon: GithubIcon },
    { href: site.linkedin, label: "LinkedIn", icon: LinkedinIcon },
    { href: `mailto:${site.email}`, label: "Email", icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
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
          onClick={(e) => handleNavClick(e, "#top")}
        >
          <span className="absolute -inset-2 -z-10 rounded-full bg-primary/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
          <Logo className="h-7 w-auto text-primary transition-transform duration-300 group-hover:scale-110" />
        </a>

        {/* links desktop: numerados (estética de código) + pílula deslizante */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link, i) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-primary/30 bg-primary/10 shadow-[0_0_12px_var(--glow)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "mr-1.5 font-mono text-[11px] transition-colors duration-300",
                    isActive ? "text-primary" : "text-primary/50",
                  )}
                >
                  0{i + 1}
                </span>
                {link.label}
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
            transition={{ duration: MOBILE_MENU_EXIT_MS / 1000, ease: "easeInOut" }}
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
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className={cn(
                    "flex items-baseline gap-3 rounded-lg border-l-2 px-4 py-3 text-base transition-colors",
                    active === link.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "font-mono text-xs",
                      active === link.id ? "text-primary" : "text-primary/50",
                    )}
                  >
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}

              {/* socials no rodapé do menu */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0 },
                }}
                className="mt-3 flex items-center gap-2 border-t border-border px-4 pt-4"
              >
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
