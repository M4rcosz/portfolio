"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useT } from "@/i18n/provider";

/** Digita `text` caractere a caractere; com reduced motion, mostra tudo. */
function useTypewriter(text: string, instant: boolean, speed = 38) {
  const [length, setLength] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setLength(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, instant, speed]);

  return { typed: text.slice(0, length), done: length >= text.length };
}

function JsonString({ value }: { value: string }) {
  return <span className="text-foreground">&quot;{value}&quot;</span>;
}

function JsonKey({ name }: { name: string }) {
  return (
    <>
      <span className="text-primary">&quot;{name}&quot;</span>
      <span className="text-muted-foreground">: </span>
    </>
  );
}

function JsonArray({ values }: { values: string[] }) {
  return (
    <span className="text-muted-foreground">
      [
      {values.map((value, i) => (
        <span key={value}>
          <JsonString value={value} />
          {i < values.length - 1 ? ", " : null}
        </span>
      ))}
      ]
    </span>
  );
}

/**
 * Janela de terminal com uma "chamada de API" digitada ao vivo:
 * comando curl + resposta JSON revelada linha a linha.
 */
export function TerminalCard() {
  const t = useT();
  const reduced = useReducedMotion() ?? false;
  const { terminal } = t.hero;
  const { typed, done } = useTypewriter(terminal.command, reduced);
  const { response } = terminal;

  const lines: React.ReactNode[] = [
    <span key="open" className="text-muted-foreground">
      {"{"}
    </span>,
    <span key="name" className="pl-5">
      <JsonKey name="name" />
      <JsonString value={response.name} />
      <span className="text-muted-foreground">,</span>
    </span>,
    <span key="role" className="pl-5">
      <JsonKey name="role" />
      <JsonString value={response.role} />
      <span className="text-muted-foreground">,</span>
    </span>,
    <span key="stack" className="pl-5">
      <JsonKey name="stack" />
      <JsonArray values={response.stack} />
      <span className="text-muted-foreground">,</span>
    </span>,
    <span key="focus" className="pl-5">
      <JsonKey name="focus" />
      <JsonArray values={response.focus} />
      <span className="text-muted-foreground">,</span>
    </span>,
    <span key="status" className="pl-5">
      <JsonKey name="status" />
      <JsonString value={response.status} />
    </span>,
    <span key="close" className="text-muted-foreground">
      {"}"}
    </span>,
  ];

  return (
    <div className="glow-ring overflow-hidden rounded-xl border border-border bg-card font-mono text-[13px] leading-relaxed sm:text-sm">
      {/* barra de título */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
        <span aria-hidden className="size-2.5 rounded-full bg-primary/80" />
        <span aria-hidden className="size-2.5 rounded-full bg-primary/40" />
        <span aria-hidden className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 truncate text-xs text-muted-foreground">
          {terminal.filename}
        </span>
      </div>

      <div className="space-y-0.5 p-4 sm:p-5">
        <div className="break-all">
          <span className="select-none text-primary">$ </span>
          <span className="text-foreground">{typed}</span>
          {!done ? <span className="cursor-blink text-primary">▍</span> : null}
        </div>

        {done ? (
          <>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: reduced ? 0 : i * 0.1 }}
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : lines.length * 0.1 + 0.2 }}
              className="pt-2 text-xs text-muted-foreground"
            >
              <span className="mr-2 inline-block size-1.5 rounded-full bg-primary align-middle" />
              {terminal.statusLine}
              <span className="cursor-blink ml-2 text-primary">▍</span>
            </motion.div>
          </>
        ) : null}
      </div>
    </div>
  );
}
