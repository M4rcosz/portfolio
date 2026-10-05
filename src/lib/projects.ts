import type { Lang } from "@/i18n/provider";

export interface ProjectRepo {
  /** rótulo do link quando há mais de um repo (ex.: "API", "Web"). */
  label?: string;
  url: string;
  /** branch/ref para ler stats do GitHub (default: branch default do repo). */
  ref?: string;
}

export interface Project {
  title: string;
  /** Descrição por idioma. */
  description: Record<Lang, string>;
  tags: string[];
  /** destaques de arquitetura/implementação (bullets, por idioma). */
  highlights?: Record<Lang, string[]>;
  demoUrl?: string;
  /** repositórios do projeto; os stats do GitHub são combinados entre eles. */
  repos?: ProjectRepo[];
  /**
   * repo privado: os stats são lidos no servidor (exige GITHUB_TOKEN com
   * acesso de leitura ao repo), mas os links de código nunca são exibidos.
   */
  private?: boolean;
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
  {
    title: "Nexio · Restaurant platform (API + Web)",
    description: {
      pt: "Plataforma de gestão para uma rede de restaurantes multi-unidade (franquias): API com pedidos omnichannel (app, web, totem, balcão, retirada), pagamentos e programa de fidelidade, construída com Clean Architecture e DDD por bounded context, e um web app com área do cliente, PDV, totem e admin.",
      en: "Management platform for a multi-unit restaurant chain (franchises): an API with omnichannel orders (app, web, kiosk, counter, pickup), payments and a loyalty program, built with Clean Architecture and DDD per bounded context, plus a web app with customer area, POS, kiosk and admin.",
    },
    highlights: {
      pt: [
        "Clean Architecture + DDD com 9 bounded contexts (identidade, catálogo, pedidos, pagamentos, estoque, promoções, fidelidade, IA e auditoria), domínio puro e comunicação entre contextos só por portas",
        "Pedidos omnichannel em 5 canais (app, web, totem, balcão e retirada) com preço calculado no servidor (anti-tampering), máquina de estados e optimistic locking nas transições",
        "Pagamentos com webhook assinado (HMAC) como source of truth: fluxo idempotente e transacional, com pipeline monetário decimal-safe via Value Object sobre big.js (float não aparece em nenhuma camada)",
        "Estoque como ledger append-only: saldo derivado das transações e dedução atômica dentro da criação do pedido, sem update destrutivo de quantidade",
        "Assistente de IA com Google Gemini medido por token: débito de saldo e registro de consumo gravados na mesma transação, com teto de contexto para limitar o custo por chamada",
        "Autenticação JWT com refresh token rotativo e detecção de reúso, hash argon2, RBAC e escopo por unidade, paginação keyset e upload direto ao storage por URL assinada",
        "Web app em Next.js com área do cliente, PDV, totem e admin, JWT em cookie httpOnly, i18n PT/EN e deploy contínuo na Vercel",
        "1.846 testes unitários e 97 e2e, CI no GitHub Actions a cada push (type-check, lint, testes, build) e imagem Docker no Render com PostgreSQL gerenciado no Supabase",
      ],
      en: [
        "Clean Architecture + DDD across 9 bounded contexts (identity, catalog, orders, payments, inventory, promotions, loyalty, AI and audit), with a pure domain and cross-context communication only through ports",
        "Omnichannel orders across 5 channels (app, web, kiosk, counter and pickup) with server-side pricing (anti-tampering), a state machine and optimistic locking on transitions",
        "Payments with a signed webhook (HMAC) as source of truth: idempotent and transactional, with a decimal-safe money pipeline via a Value Object over big.js (float never appears in any layer)",
        "Inventory as an append-only ledger: balance derived from transactions and atomic deduction inside order creation, with no destructive quantity update",
        "Token-metered AI assistant with Google Gemini: balance debit and usage record written in the same transaction, with a context cap to bound the cost per call",
        "JWT auth with rotating refresh tokens and reuse detection, argon2 hashing, RBAC scoped per unit, keyset pagination and direct-to-storage upload via signed URL",
        "Next.js web app with customer area, POS, kiosk and admin, JWT in an httpOnly cookie, PT/EN i18n and continuous deployment on Vercel",
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
      "Next.js",
      "React",
      "Tailwind CSS",
      "Zustand",
      "Jest",
      "Docker",
      "GitHub Actions",
      "Render",
      "Vercel",
      "Supabase",
    ],
    repos: [
      { label: "API", url: "https://github.com/M4rcosz/nexio-core", ref: "main" },
      { label: "Web", url: "https://github.com/M4rcosz/nexio-frontend" },
    ],
    docsUrl: "https://nexios-core.onrender.com/api/docs",
    demoUrl: "https://nexio-frontend-wheat.vercel.app/",
    previewUrl: "https://nexio-frontend-wheat.vercel.app/",
    featured: true,
  },
  {
    title: "zNuvo · Omnichannel support SaaS",
    description: {
      pt: "SaaS multi-tenant de atendimento ao cliente: cada empresa conecta seus canais (widget de chat no site hoje; WhatsApp e Instagram no roadmap) e os agentes respondem todas as conversas em tempo real a partir de um único painel. Monorepo poliglota com serviços em NestJS e Go.",
      en: "Multi-tenant customer support SaaS: each company connects its channels (a chat widget on its website today; WhatsApp and Instagram on the roadmap) and agents answer every conversation in real time from a single dashboard. Polyglot monorepo with NestJS and Go services.",
    },
    highlights: {
      pt: [
        "Arquitetura hexagonal + DDD com outbox transacional publicando eventos no NATS JetStream; contratos em Protobuf e gRPC interno entre os serviços",
        "Serviço de realtime em Go com WebSocket (protocolo versionado), autenticação por ticket assinado de uso único e encerramento dos sockets de membros desativados",
        "Multi-tenancy com Row-Level Security no PostgreSQL e usuários de banco, Redis e NATS com privilégio mínimo por serviço",
        "Autenticação via Zitadel (OIDC + PKCE, tokens só em memória), convites por e-mail e signup self-service provisionado por um worker em Go com retry e dead letter",
        "Painel em React com CSP estrita e widget em Preact isolado (launcher em Shadow DOM + painel em iframe, com frame-ancestors por chave)",
        "Observabilidade com OpenTelemetry e Grafana, testes e2e com Playwright, testes de carga com k6 e CI no GitHub Actions",
      ],
      en: [
        "Hexagonal architecture + DDD with a transactional outbox publishing events to NATS JetStream; Protobuf contracts and internal gRPC between services",
        "Realtime service in Go over WebSocket (versioned protocol), with single-use signed tickets and closing the sockets of deactivated members",
        "Multi-tenancy with PostgreSQL Row-Level Security and least-privilege database, Redis and NATS users per service",
        "Auth via Zitadel (OIDC + PKCE, tokens in memory only), email invitations and self-service signup provisioned by a Go worker with retries and dead letters",
        "React dashboard with a strict CSP and an isolated Preact widget (Shadow DOM launcher + iframe panel, with per-key frame-ancestors)",
        "Observability with OpenTelemetry and Grafana, Playwright e2e tests, k6 load tests and CI on GitHub Actions",
      ],
    },
    tags: [
      "NestJS",
      "Go",
      "TypeScript",
      "PostgreSQL",
      "NATS JetStream",
      "gRPC",
      "Protobuf",
      "Redis",
      "React",
      "Preact",
      "Zitadel",
      "OpenTelemetry",
      "Docker",
      "Playwright",
      "k6",
    ],
    repos: [{ url: "https://github.com/M4rcosz/znuvo" }],
    private: true,
    statusBadge: {
      pt: "Em desenvolvimento · repositório privado",
      en: "In development · private repo",
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
