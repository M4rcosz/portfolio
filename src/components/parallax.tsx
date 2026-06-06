"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

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
  const k = reduce ? 0 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ty = useTransform(scrollYProgress, [0, 1], [y * k, -y * k]);
  const tx = useTransform(scrollYProgress, [0, 1], [-x * k, x * k]);
  const rx = useTransform(scrollYProgress, [0, 1], [rotateX * k, -rotateX * k]);
  const ry = useTransform(scrollYProgress, [0, 1], [-rotateY * k, rotateY * k]);

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
  const sign = from === "right" ? 1 : -1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const x = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [260 * sign, 0]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-34 * sign, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    reduce ? [1, 1, 1] : [0, 1, 1],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, rotateY, scale, opacity, transformPerspective: 1200 }}
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
