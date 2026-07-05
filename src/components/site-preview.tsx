"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/provider";

/**
 * Renderiza o iframe numa viewport desktop fixa (`DESKTOP_WIDTH`) e reduz por
 * `scale(containerWidth / DESKTOP_WIDTH)`: o site enxerga uma janela desktop
 * real (~1440px) e é encolhido para caber na largura do card, sem distorcer o
 * layout nem deixar o conteúdo minúsculo/centralizado como faria uma viewport
 * larga demais. A altura do iframe casa com o `aspect-video` (16/9) do container.
 */
const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = Math.round((DESKTOP_WIDTH * 9) / 16); // 810
/**
 * Sobra de largura além da área visível: empurra a barra de rolagem vertical
 * do iframe para fora do container (cortada pelo `overflow-hidden`).
 */
const SCROLLBAR_GUTTER = 24;
/** se o onLoad não disparar até aqui, tratamos como indisponível. */
const LOAD_TIMEOUT = 8000;

/** Extrai o hostname da URL (fallback: a própria string). */
function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * Preview ao vivo de um site em `<iframe>`, clicável (abre em nova aba).
 * Lazy-load via IntersectionObserver, skeleton enquanto carrega e fallback
 * com os tokens do tema quando o site não responde.
 */
export function SitePreview({ url, title }: { url: string; title: string }) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [scale, setScale] = useState(0);

  // monta o iframe só quando o container entra (ou está perto de) na viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // fator de escala = largura real do card / viewport desktop de referência.
  // Recalcula em resize para manter o preview nítido em qualquer breakpoint.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setScale(el.clientWidth / DESKTOP_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // se o iframe não carregar a tempo, mostra o fallback — mas o iframe segue
  // montado por baixo; se ele carregar depois (rede lenta / cold start), o
  // onLoad limpa o `failed` e o preview se recupera sozinho, sem retry manual.
  useEffect(() => {
    if (!inView || loaded) return;
    const id = window.setTimeout(() => setFailed(true), LOAD_TIMEOUT);
    return () => window.clearTimeout(id);
  }, [inView, loaded]);

  const host = hostnameOf(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.projects.openApp}: ${title} (${host})`}
      className="group/preview block"
    >
      <div
        ref={containerRef}
        className={cn(
          "glow-ring relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted",
          "transition-colors group-hover/preview:border-primary/50",
        )}
      >
        {inView && scale > 0 ? (
          // `previewUrl` é sempre um valor hardcoded em projects.ts (site do
          // próprio dono). `allow-same-origin` é mantido para o app renderizar
          // normalmente; a combinação com `allow-scripts` só é segura porque a
          // URL é confiável e o iframe é puramente visual (pointer-events-none,
          // sem allow-popups/top-navigation/forms). NUNCA alimentar este campo
          // com URL vinda de fonte editável por terceiros sem revalidar isso.
          <iframe
            src={url}
            title={title}
            aria-hidden="true"
            tabIndex={-1}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => {
              setLoaded(true);
              setFailed(false);
            }}
            onError={() => setFailed(true)}
            style={{
              width: `${DESKTOP_WIDTH + SCROLLBAR_GUTTER}px`,
              height: `${DESKTOP_HEIGHT}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            className={cn(
              "pointer-events-none absolute left-0 top-0 border-0 transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}

        {/* Skeleton neutro por cima até carregar (evita flash de erro do browser). */}
        {!loaded && !failed ? (
          <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
        ) : null}

        {/* Fallback quando o site não responde. */}
        {failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-center">
            <Globe className="size-8 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{host}</span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              {t.projects.openApp}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        ) : null}
      </div>
    </a>
  );
}
