"use client";

import {
  Boxes,
  Code2,
  Database,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { skills, type SkillGroup, type SkillGroupId } from "@/lib/skills";
import { useT } from "@/i18n/provider";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const groupIcons: Record<SkillGroupId, LucideIcon> = {
  backend: Server,
  data: Database,
  architecture: Boxes,
  devops: Wrench,
  frontend: Code2,
};

function SkillCard({ group, core }: { group: SkillGroup; core: string }) {
  const t = useT();
  const Icon = groupIcons[group.id];

  return (
    <div
      className={cn(
        "glow-ring h-full rounded-xl border bg-card p-6",
        group.featured ? "border-primary/40" : "border-border",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid place-items-center rounded-lg bg-primary/15 text-primary",
            group.featured ? "size-11" : "size-10",
          )}
        >
          <Icon className={group.featured ? "size-6" : "size-5"} />
        </span>
        <h3 className={cn("font-semibold", group.featured ? "text-xl" : "text-lg")}>
          {t.skills.groups[group.id]}
        </h3>
        {group.featured ? (
          <Badge className="ml-auto font-mono text-[11px] uppercase tracking-wider">
            {core}
          </Badge>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const t = useT();
  const featured = skills.filter((g) => g.featured);
  const rest = skills.filter((g) => !g.featured);

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker={t.skills.kicker}
          title={t.skills.title}
          description={t.skills.description}
        />

        <div className="mt-12 space-y-5 sm:mt-14 sm:space-y-6">
          {/* grupo principal em largura total */}
          {featured.map((group) => (
            <Reveal key={group.id} direction="up" tilt>
              <SkillCard group={group} core={t.skills.core} />
            </Reveal>
          ))}

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {rest.map((group, i) => (
              <Reveal
                key={group.id}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
                tilt
              >
                <SkillCard group={group} core={t.skills.core} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
