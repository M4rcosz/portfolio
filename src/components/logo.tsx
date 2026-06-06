import { cn } from "@/lib/utils";

/**
 * Monograma "Mz" (a perna direita do M vira um Z — referência ao handle
 * M4rcosz). Usa `currentColor`, então a cor vem da classe de texto
 * (padrão: vermelho da marca). Dimensione via altura, ex.: `h-7 w-auto`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-11.11 16 122.66 84"
      fill="none"
      role="img"
      aria-label="Marcos"
      className={cn("h-7 w-auto text-primary", className)}
    >
      <g transform="skewX(-11)">
        <path d="M18 40 L31 28 L31 88 L18 88 Z" fill="currentColor" />
        <path d="M79 28 L105 28 L105 41 L72 41 Z" fill="currentColor" />
        <path d="M72 75 L98 75 L105 88 L72 88 Z" fill="currentColor" />
        <path
          d="M27 30 L55 61 L80 30"
          stroke="currentColor"
          strokeWidth={13}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <path
          d="M100 38 L77 78"
          stroke="currentColor"
          strokeWidth={13}
          strokeLinecap="butt"
        />
      </g>
    </svg>
  );
}
