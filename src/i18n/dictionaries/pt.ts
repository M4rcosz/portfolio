export const pt = {
  nav: {
    about: "Sobre",
    experience: "Experiência",
    projects: "Projetos",
    skills: "Skills",
    contact: "Contato",
  },
  hero: {
    badge: "Disponível para novos projetos",
    greeting: "Olá, eu sou",
    name: "Marcos",
    role: "Desenvolvedor Fullstack",
    description:
      "Construo aplicações web do front ao back — interfaces rápidas e acessíveis, APIs robustas e infraestrutura confiável.",
    ctaProjects: "Ver projetos",
    ctaContact: "Entrar em contato",
  },
  about: {
    kicker: "Sobre mim",
    title: "Quem está por trás do código",
    paragraphs: [
      "Sou desenvolvedor fullstack apaixonado por transformar ideias em produtos digitais completos. Atuo em todas as camadas: do design da interface à modelagem de dados e ao deploy.",
      "Gosto de código limpo, performance e experiências que as pessoas realmente querem usar. Estou sempre estudando e experimentando novas tecnologias.",
    ],
    highlights: [
      { value: "Fullstack", label: "Front, back e automações" },
      { value: "APIs", label: "REST, GraphQL e integrações" },
      { value: "∞", label: "Vontade de aprender" },
    ],
  },
  experience: {
    kicker: "Carreira",
    title: "Experiência profissional",
  },
  projects: {
    kicker: "Portfólio",
    title: "Projetos em destaque",
    description:
      "Projetos que construí, com foco em arquitetura, qualidade e boas práticas.",
    featured: "Destaque",
    since: "desde",
    demo: "Demo",
    code: "Código",
  },
  skills: {
    kicker: "Stack",
    title: "Tecnologias que uso",
    description:
      "Ferramentas e linguagens com que trabalho no dia a dia, do front à infraestrutura.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps & Ferramentas",
    },
  },
  contact: {
    kicker: "Contato",
    title: "Vamos conversar",
    description:
      "Tem um projeto em mente ou quer trocar uma ideia? Minha caixa de entrada está sempre aberta.",
    emailCta: "Enviar email",
  },
  footer: {
    rights: "Todos os direitos reservados.",
    builtWith: "Feito com Next.js, Tailwind e Framer Motion.",
  },
};

export type Dictionary = typeof pt;
