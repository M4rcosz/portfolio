"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

import { useIsMobile } from "@/hooks/use-media-query";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** amplitude vertical em px (sobe ao rolar para baixo). */
  y?: number;
  /** amplitude horizontal em px (vai para a direita ao rolar). */
  x?: number;
  /** amplitude de rotação 3D no eixo Y (graus). */
  rotateY?: number;
  /** amplitude de rotação 3D no eixo X (graus). */
  rotateX?: number;
}

/**
 * Movimento contínuo ligado ao scroll (parallax): o elemento desliza /
 * inclina conforme passa pela viewport, criando profundidade. Respeita
 * `prefers-reduced-motion` (desliga o movimento).
 */
export function Parallax({
  children,
  className,
  y = 0,
  x = 0,
  rotateY = 0,
  rotateX = 0,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const k = reduce ? 0 : 1;
  // No celular o movimento horizontal/3D causa jitter e corte lateral
  // (com overflow-x escondido); mantemos só o deslize vertical sutil.
  const kx = reduce || mobile ? 0 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ty = useTransform(scrollYProgress, [0, 1], [y * k, -y * k]);
  const tx = useTransform(scrollYProgress, [0, 1], [-x * kx, x * kx]);
  const rx = useTransform(scrollYProgress, [0, 1], [rotateX * kx, -rotateX * kx]);
  const ry = useTransform(scrollYProgress, [0, 1], [-rotateY * kx, rotateY * kx]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: ty,
        x: tx,
        rotateX: rx,
        rotateY: ry,
        transformPerspective: rotateX || rotateY ? 1000 : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Entrada 3D ligada ao scroll: o elemento "voa" para dentro vindo da
 * lateral (padrão: da direita para a esquerda), girando em 3D até assentar,
 * conforme entra na viewport. Ótimo para revelar projetos um a um.
 */
export function ScrollReveal3D({
  children,
  className,
  from = "right",
}: {
  children: ReactNode;
  className?: string;
  from?: "right" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const sign = from === "right" ? 1 : -1;
  const still = reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    // no celular a revelação termina mais cedo para não exigir rolar
    // o card inteiro até o centro antes de aparecer.
    offset: mobile ? ["start end", "center center"] : ["start end", "start center"],
  });

  // No celular: nada de voo horizontal/3D (corta na lateral). Só um
  // fade + leve subida vertical, mais elegante em telas estreitas.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    still || mobile ? [0, 0] : [260 * sign, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    still ? [0, 0] : mobile ? [40, 0] : [0, 0],
  );
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    still || mobile ? [0, 0] : [-34 * sign, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    still ? [1, 1] : mobile ? [0.96, 1] : [0.9, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    still ? [1, 1, 1] : [0, 1, 1],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, rotateY, scale, opacity, transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fundo fixo de "viagem": blobs rubros que derivam em velocidades e
 * direções diferentes ao longo de todo o scroll da página.
 */
export function ParallaxBackground() {
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;
  const { scrollYProgress } = useScroll();

  const b1y = useTransform(scrollYProgress, [0, 1], [0, 220 * k]);
  const b1x = useTransform(scrollYProgress, [0, 1], [0, 140 * k]);
  const b2y = useTransform(scrollYProgress, [0, 1], [0, -300 * k]);
  const b2x = useTransform(scrollYProgress, [0, 1], [0, -180 * k]);
  const b3y = useTransform(scrollYProgress, [0, 1], [0, -180 * k]);
  const b3x = useTransform(scrollYProgress, [0, 1], [0, 120 * k]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{
          y: b1y,
          x: b1x,
          background:
            "radial-gradient(circle, rgba(225,29,42,0.25), transparent 70%)",
        }}
        className="absolute -left-40 -top-32 h-[44rem] w-[44rem] rounded-full blur-[130px]"
      />
      <motion.div
        style={{
          y: b2y,
          x: b2x,
          background:
            "radial-gradient(circle, rgba(220,38,38,0.18), transparent 70%)",
        }}
        className="absolute right-[-12rem] top-1/3 h-[40rem] w-[40rem] rounded-full blur-[130px]"
      />
      <motion.div
        style={{
          y: b3y,
          x: b3x,
          background:
            "radial-gradient(circle, rgba(150,20,28,0.20), transparent 70%)",
        }}
        className="absolute bottom-[-10rem] left-1/4 h-[38rem] w-[38rem] rounded-full blur-[140px]"
      />
    </div>
  );
}
