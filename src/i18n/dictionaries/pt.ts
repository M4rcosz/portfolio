export const pt = {
  meta: {
    title: "Marcos · Desenvolvedor Backend",
    description:
      "Portfólio de Marcos — desenvolvedor backend. APIs robustas, arquitetura limpa, modelagem de dados e integrações que aguentam o mundo real.",
  },
  nav: {
    about: "Sobre",
    experience: "Experiência",
    projects: "Projetos",
    skills: "Skills",
    contact: "Contato",
  },
  hero: {
    badge: "Aberto a oportunidades",
    greeting: "Olá, eu sou",
    name: "Marcos",
    role: "Desenvolvedor Backend",
    description:
      "Projeto e construo o que roda por trás: APIs robustas, arquitetura limpa, dados bem modelados e integrações que não caem quando o mundo real chega.",
    ctaProjects: "Ver projetos",
    ctaContact: "Entrar em contato",
    ctaResume: "Ver currículo",
    terminal: {
      filename: "marcos@backend: ~",
      command: "curl -s https://m4rcosz.com/api/dev",
      response: {
        name: "Marcos",
        role: "backend_developer",
        stack: ["node", "nestjs", "postgresql"],
        focus: ["apis", "clean_architecture", "ddd"],
        status: "open_to_work",
      },
      statusLine: "200 OK · 12ms",
    },
  },
  resume: {
    title: "Currículo — Marcos Paulo",
    download: "Baixar",
    openTab: "Abrir em nova aba",
    close: "Fechar",
  },
  about: {
    kicker: "sobre-mim",
    title: "Quem está por trás do servidor",
    paragraphs: [
      "Sou desenvolvedor backend focado em construir a parte que ninguém vê, mas todo mundo sente: APIs REST e GraphQL, regras de negócio bem isoladas e bancos de dados que contam a verdade. Trabalho com Node.js, NestJS e PostgreSQL, aplicando Clean Architecture e DDD para que o código continue mudável anos depois do deploy.",
      "Gosto dos problemas difíceis do backend — idempotência, concorrência, dinheiro em decimal, webhooks como fonte da verdade — e de automações em Python que devolvem horas para o time. Estou sempre estudando e levando o que aprendo para produção.",
    ],
    highlights: [
      { value: "APIs", label: "REST, GraphQL e webhooks" },
      { value: "Arquitetura", label: "Clean Architecture & DDD" },
      { value: "Dados", label: "PostgreSQL, SQL e modelagem" },
    ],
  },
  experience: {
    kicker: "carreira",
    title: "Experiência profissional",
  },
  projects: {
    kicker: "portfólio",
    title: "Projetos em destaque",
    description:
      "Backends que construí, com foco em arquitetura, consistência de dados e boas práticas.",
    featured: "Destaque",
    since: "desde",
    demo: "Demo",
    code: "Código",
    docs: "API Docs",
    openApp: "Abrir aplicação",
  },
  skills: {
    kicker: "stack",
    title: "Tecnologias que uso",
    description:
      "Minha caixa de ferramentas do dia a dia — do endpoint ao banco, passando pela infraestrutura.",
    core: "core",
    groups: {
      backend: "Backend",
      data: "Banco de Dados",
      architecture: "Arquitetura & Qualidade",
      devops: "DevOps & Ferramentas",
      frontend: "Frontend",
    },
  },
  contact: {
    kicker: "contato",
    title: "Vamos conversar",
    description:
      "Tem um projeto em mente ou quer trocar uma ideia sobre backend? Minha caixa de entrada está sempre aberta.",
    emailCta: "Enviar email",
  },
  footer: {
    rights: "Todos os direitos reservados.",
    builtWith: "Feito com Next.js, Tailwind e Framer Motion.",
  },
};

export type Dictionary = typeof pt;
