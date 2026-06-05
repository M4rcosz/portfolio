import type { Lang } from "@/i18n/provider";

export interface Project {
  title: string;
  /** Descrição por idioma. */
  description: Record<Lang, string>;
  tags: string[];
  /** destaques de arquitetura/implementação (bullets, por idioma). */
  highlights?: Record<Lang, string[]>;
  demoUrl?: string;
  repoUrl?: string;
  /** destaque visual: card ocupa a largura toda no grid. */
  featured?: boolean;
}

/**
 * Edite esta lista com seus projetos.
 * `description` e `highlights` aceitam os dois idiomas (pt / en).
 */
export const projects: Project[] = [
  {
    title: "Raízes do Nordeste — Backend API",
    description: {
      pt: "API de gestão para uma rede de restaurantes multi-unidade (franquias): pedidos omnichannel (app, web, totem, balcão, retirada), pagamentos e programa de fidelidade — construída com Clean Architecture e DDD por bounded context.",
      en: "Management API for a multi-unit restaurant chain (franchises): omnichannel orders (app, web, kiosk, counter, pickup), payments and a loyalty program — built with Clean Architecture and DDD per bounded context.",
    },
    highlights: {
      pt: [
        "Clean Architecture + DDD por bounded context, com domínio puro (zero imports de framework)",
        "Pagamentos com webhook como source of truth: idempotente, transacional e com UNIQUE(order_id) contra duplo pagamento",
        "Pipeline monetário decimal-safe: Postgres Decimal → big.js → string no JSON, float nunca aparece",
        "Pedidos channel-aware com preço validado no servidor (anti-tampering) e optimistic locking nas transições de status",
        "Repository Pattern com injeção por Symbol (ORM trocável) e exception filter global mapeando erros de domínio → HTTP",
      ],
      en: [
        "Clean Architecture + DDD per bounded context, with a pure domain (zero framework imports)",
        "Payments with webhook as source of truth: idempotent, transactional and UNIQUE(order_id) against double payment",
        "Decimal-safe money pipeline: Postgres Decimal → big.js → JSON string, float never appears",
        "Channel-aware orders with server-side price validation (anti-tampering) and optimistic locking on status transitions",
        "Repository Pattern with Symbol injection (swappable ORM) and a global exception filter mapping domain errors → HTTP",
      ],
    },
    tags: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "DDD",
      "Clean Architecture",
      "Jest",
      "Docker",
    ],
    repoUrl: "https://github.com/M4rcosz/raizes-do-nordeste",
    featured: true,
  },
];
