"use client";

import { Code2, Server, Wrench, type LucideIcon } from "lucide-react";

import { skills, type SkillGroupId } from "@/lib/skills";
import { useT } from "@/i18n/provider";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const groupIcons: Record<SkillGroupId, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  devops: Wrench,
};

export function Skills() {
  const t = useT();

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker={t.skills.kicker}
          title={t.skills.title}
          description={t.skills.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = groupIcons[group.id];
            return (
              <Reveal
                key={group.id}
                delay={i * 0.1}
                direction={(["left", "up", "right"] as const)[i] ?? "up"}
                tilt
              >
                <div className="glow-ring h-full rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-lg font-semibold">
                      {t.skills.groups[group.id]}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
