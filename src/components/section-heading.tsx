import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/parallax";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Parallax y={-28}>
      <Reveal className="mx-auto max-w-2xl text-center">
      <span className="font-mono text-sm font-semibold tracking-widest text-primary">
        <span aria-hidden className="select-none opacity-60">{"// "}</span>
        {kicker}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
        {description ? (
          <p className="mt-4 text-muted-foreground">{description}</p>
        ) : null}
      </Reveal>
    </Parallax>
  );
}
