"use client";

import { ArrowUpRight, CalendarDays, GitCommit } from "lucide-react";

import { cn } from "@/lib/utils";
import { projects } from "@/lib/projects";
import type { RepoStats } from "@/lib/github";
import { GithubIcon } from "@/components/icons";
import { useLanguage } from "@/i18n/provider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Projects({
  repoStats = {},
}: {
  repoStats?: Record<string, RepoStats>;
}) {
  const { lang, t } = useLanguage();

  const formatStart = (iso: string) => {
    if (!iso) return null;
    return new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  };

  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-border px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker={t.projects.kicker}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const stats = project.repoUrl
              ? repoStats[project.repoUrl]
              : undefined;
            const startLabel = stats ? formatStart(stats.startedAt) : null;

            return (
              <Reveal
                key={project.title}
                delay={i * 0.1}
                className={cn(project.featured && "md:col-span-2")}
              >
                <Card className="group glow-ring flex h-full flex-col hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-xl transition-colors group-hover:text-primary">
                        {project.title}
                      </CardTitle>
                      {project.featured ? (
                        <Badge>{t.projects.featured}</Badge>
                      ) : null}
                    </div>

                    {stats ? (
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <GitCommit className="size-3.5 text-primary" />
                          <span className="font-semibold text-foreground">
                            {stats.commits}
                          </span>
                          commits
                        </span>
                        {startLabel ? (
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-3.5 text-primary" />
                            {t.projects.since} {startLabel}
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    <CardDescription className="mt-3 leading-relaxed">
                      {project.description[lang]}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col gap-5">
                    {project.highlights ? (
                      <ul
                        className={cn(
                          "space-y-2.5",
                          project.featured &&
                            "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5 sm:space-y-0",
                        )}
                      >
                        {project.highlights[lang].map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-4 pt-2 text-sm">
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {t.projects.demo}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : null}
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                          <GithubIcon className="size-4" />
                          {t.projects.code}
                        </a>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
