"use client";

import { Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { useT } from "@/i18n/provider";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Contact() {
  const t = useT();

  const channels = [
    { href: `mailto:${site.email}`, label: site.email, icon: Mail },
    { href: site.github, label: "GitHub", icon: GithubIcon },
    { href: site.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          kicker={t.contact.kicker}
          title={t.contact.title}
          description={t.contact.description}
        />

        <Reveal direction="up" tilt delay={0.1} className="mt-12">
          <div className="glow-ring rounded-2xl border border-border bg-card p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                <Mail />
                {t.contact.emailCta}
              </a>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <channel.icon className="size-4" />
                    {channel.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
