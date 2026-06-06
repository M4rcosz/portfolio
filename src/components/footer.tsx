"use client";

import { Mail } from "lucide-react";

import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { useT } from "@/i18n/provider";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Logo className="h-6 w-auto text-primary" />
          <div className="text-center text-sm text-muted-foreground sm:text-left">
            <p>
              © {year} {site.name}{" "}
              <span className="text-muted-foreground/70">@{site.handle}</span>.{" "}
              {t.footer.rights}
            </p>
            <p className="mt-1 text-xs">{t.footer.builtWith}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
