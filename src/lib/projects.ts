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
  /** branch/ref para ler stats do GitHub (default: branch default do repo). */
  repoRef?: string;
  /** link para documentação/Swagger da API. */
  docsUrl?: string;
  /** URL para preview em iframe ao vivo (clicável). */
  previewUrl?: string;
  /** rótulo de status por idioma (ex.: transição/WIP). */
  statusBadge?: Record<Lang, string>;
  /** destaque visual: exibe o badge "Destaque" e prioriza o projeto na lista. */
  featured?: boolean;
}

/**
 * Edite esta lista com seus projetos.
 * `description` e `highlights` aceitam os dois idiomas (pt / en).
 */
export const projects: Project[] = [
  // TODO(rename): "Raízes do Nordeste" será renomeado para "nexio-core". Enquanto o repo não é renomeado, lemos stats da branch `development` (repoRef) e exibimos um badge de transição. Ao concluir o rename: atualizar title/repoUrl, remover repoRef + statusBadge.
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
    repoRef: "development",
    // API sem UI própria: o link útil é o Swagger (docsUrl), não um "Demo".
    docsUrl: "https://nexios-core.onrender.com/api/docs",
    statusBadge: {
      pt: "Em transição para nexio-core",
      en: "Renaming to nexio-core",
    },
    featured: true,
  },
  {
    title: "nexio-frontend — Web App",
    description: {
      pt: "Interface web da aplicação Raízes do Nordeste (futuro nexio-core): consome os pedidos omnichannel, pagamentos e fidelidade expostos pela API, com foco em UX responsiva e integração em tempo real.",
      en: "Web interface for the Raízes do Nordeste app (future nexio-core): consumes the omnichannel orders, payments and loyalty exposed by the API, focused on responsive UX and real-time integration.",
    },
    highlights: {
      pt: [
        "Consome a API do nexio-core (pedidos, pagamentos, fidelidade)",
        "UI responsiva com feedback em tempo real",
        "Deploy contínuo na Vercel",
      ],
      en: [
        "Consumes the nexio-core API (orders, payments, loyalty)",
        "Responsive UI with real-time feedback",
        "Continuous deployment on Vercel",
      ],
    },
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/M4rcosz/nexio-frontend",
    demoUrl: "https://nexio-frontend-wheat.vercel.app/",
    previewUrl: "https://nexio-frontend-wheat.vercel.app/",
    featured: false,
  },
  {
    title: "nexio-workflow",
    description: {
      pt: "Motor de automação e orquestração de workflows do ecossistema nexio — em estágio inicial de desenvolvimento.",
      en: "Workflow automation and orchestration engine for the nexio ecosystem — in early development.",
    },
    tags: ["Java", "Spring Boot", "MongoDB"],
    repoUrl: "https://github.com/M4rcosz/nexio-workflow",
    demoUrl: "https://nexio-workflow.onrender.com",
    statusBadge: {
      pt: "Estágio inicial · WIP",
      en: "Early stage · WIP",
    },
    featured: false,
  },
];
