"use client";

import { useT } from "@/i18n/provider";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  const t = useT();

  return (
    <section id="about" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker={t.about.kicker} title={t.about.title} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <Reveal className="space-y-5">
            {t.about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
              {t.about.highlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-xl border border-border bg-card p-5 text-center lg:text-left"
                >
                  <div className="text-3xl font-bold text-primary">
                    {highlight.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {highlight.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
