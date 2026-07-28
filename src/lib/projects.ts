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
    title: "Raízes do Nordeste · Backend API",
    description: {
      pt: "API de gestão para uma rede de restaurantes multi-unidade (franquias): pedidos omnichannel (app, web, totem, balcão, retirada), pagamentos e programa de fidelidade, construída com Clean Architecture e DDD por bounded context.",
      en: "Management API for a multi-unit restaurant chain (franchises): omnichannel orders (app, web, kiosk, counter, pickup), payments and a loyalty program, built with Clean Architecture and DDD per bounded context.",
    },
    highlights: {
      pt: [
        "Clean Architecture + DDD com 9 bounded contexts (identidade, catálogo, pedidos, pagamentos, estoque, promoções, fidelidade, IA e auditoria), domínio puro e comunicação entre contextos só por portas",
        "Pedidos omnichannel em 5 canais (app, web, totem, balcão e retirada) com preço calculado no servidor (anti-tampering), máquina de estados e optimistic locking nas transições",
        "Pagamentos com webhook assinado (HMAC) como source of truth: fluxo idempotente e transacional, com pipeline monetário decimal-safe via Value Object sobre big.js (float não aparece em nenhuma camada)",
        "Estoque como ledger append-only: saldo derivado das transações e dedução atômica dentro da criação do pedido, sem update destrutivo de quantidade",
        "Assistente de IA com Google Gemini medido por token: débito de saldo e registro de consumo gravados na mesma transação, com teto de contexto para limitar o custo por chamada",
        "Autenticação JWT com refresh token rotativo e detecção de reúso, hash argon2, RBAC e escopo por unidade, paginação keyset e upload direto ao storage por URL assinada",
        "1.846 testes unitários e 97 e2e, CI no GitHub Actions a cada push (type-check, lint, testes, build) e imagem Docker no Render com PostgreSQL gerenciado no Supabase",
      ],
      en: [
        "Clean Architecture + DDD across 9 bounded contexts (identity, catalog, orders, payments, inventory, promotions, loyalty, AI and audit), with a pure domain and cross-context communication only through ports",
        "Omnichannel orders across 5 channels (app, web, kiosk, counter and pickup) with server-side pricing (anti-tampering), a state machine and optimistic locking on transitions",
        "Payments with a signed webhook (HMAC) as source of truth: idempotent and transactional, with a decimal-safe money pipeline via a Value Object over big.js (float never appears in any layer)",
        "Inventory as an append-only ledger: balance derived from transactions and atomic deduction inside order creation, with no destructive quantity update",
        "Token-metered AI assistant with Google Gemini: balance debit and usage record written in the same transaction, with a context cap to bound the cost per call",
        "JWT auth with rotating refresh tokens and reuse detection, argon2 hashing, RBAC scoped per unit, keyset pagination and direct-to-storage upload via signed URL",
        "1,846 unit tests and 97 e2e, CI on GitHub Actions on every push (type-check, lint, tests, build) and a Docker image on Render with managed PostgreSQL on Supabase",
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
      "GitHub Actions",
      "Render",
      "Supabase",
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
    title: "nexio-frontend · Web App",
    description: {
      pt: "Interface web da aplicação Raízes do Nordeste (futuro nexio-core): consome os pedidos omnichannel, pagamentos e fidelidade expostos pela API, com foco em UX responsiva e integração em tempo real.",
      en: "Web interface for the Raízes do Nordeste app (future nexio-core): consumes the omnichannel orders, payments and loyalty exposed by the API, focused on responsive UX and real-time integration.",
    },
    highlights: {
      pt: [
        "Área do cliente, PDV, totem e admin sobre a API do nexio-core (pedidos, pagamentos, fidelidade)",
        "Autenticação com JWT em cookie httpOnly e i18n PT/EN",
        "UI responsiva com feedback em tempo real e deploy contínuo na Vercel",
      ],
      en: [
        "Customer area, POS, kiosk and admin on top of the nexio-core API (orders, payments, loyalty)",
        "Auth with JWT in an httpOnly cookie and PT/EN i18n",
        "Responsive UI with real-time feedback and continuous deployment on Vercel",
      ],
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "next-intl",
    ],
    repoUrl: "https://github.com/M4rcosz/nexio-frontend",
    demoUrl: "https://nexio-frontend-wheat.vercel.app/",
    previewUrl: "https://nexio-frontend-wheat.vercel.app/",
    featured: false,
  },
  {
    title: "nexio-workflow",
    description: {
      pt: "Motor de automação e orquestração de workflows do ecossistema nexio, em estágio inicial de desenvolvimento.",
      en: "Workflow automation and orchestration engine for the nexio ecosystem, in early development.",
    },
    tags: ["Java", "Spring Boot", "MongoDB"],
    repoUrl: "https://github.com/M4rcosz/nexio-workflow",
    statusBadge: {
      pt: "Estágio inicial · WIP",
      en: "Early stage · WIP",
    },
    featured: false,
  },
  // Projeto de estudo, sem repositório público: o card fica sem links.
  {
    title: "To-Do App · Full Stack",
    description: {
      pt: "Aplicação full stack de tarefas: API REST em FastAPI com PostgreSQL e SQLAlchemy, frontend em React com TypeScript, tudo containerizado com Docker Compose em ambiente WSL2.",
      en: "Full stack task app: a FastAPI REST API with PostgreSQL and SQLAlchemy, a React frontend in TypeScript, all containerized with Docker Compose on WSL2.",
    },
    tags: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "React",
      "TypeScript",
      "Docker Compose",
    ],
    statusBadge: {
      pt: "Projeto de estudo · sem repositório público",
      en: "Study project · no public repo",
    },
    featured: false,
  },
];
