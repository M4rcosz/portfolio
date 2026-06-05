import { Reveal } from "@/components/reveal";

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
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">
        {kicker}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}
