"use client";

import { experiences } from "@/lib/experience";
import { useLanguage } from "@/i18n/provider";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-border px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading kicker={t.experience.kicker} title={t.experience.title} />

        <div className="mt-14 space-y-6">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div className="glow-ring relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8">
                {/* faixa de destaque rubra à esquerda */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 bg-primary"
                />

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role[lang]}</h3>
                    <p className="font-medium text-primary">{exp.company}</p>
                  </div>
                  <Badge variant={exp.current ? "default" : "secondary"}>
                    {exp.period[lang]}
                  </Badge>
                </div>

                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {exp.description[lang]}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {exp.highlights[lang].map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
