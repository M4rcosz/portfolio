"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ResumePreview } from "@/components/resume-preview";
import { useT } from "@/i18n/provider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  const t = useT();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-16 sm:px-6"
    >
      {/* glow rubro animado */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(225,29,42,0.20) 0%, rgba(225,29,42,0.06) 35%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-4xl text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {t.hero.badge}
        </motion.span>

        <motion.p
          variants={item}
          className="mt-8 text-base text-muted-foreground sm:text-lg"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-2 text-5xl font-bold tracking-tight sm:text-7xl"
        >
          <span className="text-gradient-red">{t.hero.name}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-xl font-semibold text-foreground sm:text-2xl"
        >
          {t.hero.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#projects" className={cn(buttonVariants({ size: "lg" }))}>
            {t.hero.ctaProjects}
            <ArrowRight />
          </a>
          <ResumePreview />
          <a
            href="#contact"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t.hero.ctaContact}
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex items-center justify-center gap-4 text-muted-foreground"
        >
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-primary"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-primary"
          >
            <LinkedinIcon className="size-5" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="transition-colors hover:text-primary"
          >
            <Mail className="size-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
