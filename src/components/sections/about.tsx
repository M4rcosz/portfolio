"use client";

import { useT } from "@/i18n/provider";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/parallax";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  const t = useT();

  return (
    <section id="about" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker={t.about.kicker} title={t.about.title} />

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-12">
          <Parallax x={-22}>
            <Reveal direction="left" tilt className="space-y-5">
              {t.about.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </Parallax>

          <Parallax x={22}>
            <Reveal direction="right" tilt delay={0.15}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {t.about.highlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left sm:flex-col sm:items-center sm:gap-1 sm:text-center lg:flex-row lg:items-center lg:gap-4 lg:text-left"
                >
                  <div className="text-2xl font-bold text-primary sm:text-3xl">
                    {highlight.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {highlight.label}
                  </div>
                </div>
              ))}
              </div>
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
