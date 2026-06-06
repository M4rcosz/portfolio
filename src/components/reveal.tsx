"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  /** atraso em segundos */
  delay?: number;
  className?: string;
  /** de onde o conteúdo entra. Padrão: "up". */
  direction?: Direction;
  /** adiciona rotação 3D sutil na entrada. */
  tilt?: boolean;
}

const DISTANCE = 56;

function initialState(direction: Direction, tilt: boolean): TargetAndTransition {
  const state: TargetAndTransition = { opacity: 0 };

  if (direction === "left") state.x = -DISTANCE;
  if (direction === "right") state.x = DISTANCE;
  if (direction === "up") state.y = DISTANCE;
  if (direction === "down") state.y = -DISTANCE;

  if (tilt) {
    if (direction === "left") state.rotateY = -16;
    if (direction === "right") state.rotateY = 16;
    if (direction === "up") state.rotateX = 14;
    if (direction === "down") state.rotateX = -14;
  }

  return state;
}

/**
 * Anima o conteúdo quando entra na viewport: fade + deslize (na direção
 * escolhida) e, opcionalmente, uma rotação 3D sutil (`tilt`).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  tilt = false,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      style={tilt ? { transformPerspective: 900 } : undefined}
      initial={initialState(direction, tilt)}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
