import type { Dictionary } from "./pt";

export const en: Dictionary = {
  meta: {
    title: "Marcos · Backend Developer",
    description:
      "Marcos's portfolio — backend developer. Robust APIs, clean architecture, data modeling and integrations that survive the real world.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    badge: "Open to opportunities",
    greeting: "Hi, I'm",
    name: "Marcos",
    role: "Backend Developer",
    description:
      "I design and build what runs behind the scenes: robust APIs, clean architecture, well-modeled data and integrations that don't fall over when the real world shows up.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
    ctaResume: "View CV",
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
    title: "Resume — Marcos Paulo",
    download: "Download",
    openTab: "Open in new tab",
    close: "Close",
  },
  about: {
    kicker: "about-me",
    title: "Who's behind the server",
    paragraphs: [
      "I'm a backend developer focused on building the part nobody sees but everybody feels: REST and GraphQL APIs, well-isolated business rules and databases that tell the truth. I work with Node.js, NestJS and PostgreSQL, applying Clean Architecture and DDD so the code stays changeable years after deploy.",
      "I enjoy the hard backend problems — idempotency, concurrency, money as decimals, webhooks as the source of truth — and Python automations that give hours back to the team. I'm always learning and shipping what I learn to production.",
    ],
    highlights: [
      { value: "APIs", label: "REST, GraphQL and webhooks" },
      { value: "Architecture", label: "Clean Architecture & DDD" },
      { value: "Data", label: "PostgreSQL, SQL and modeling" },
    ],
  },
  experience: {
    kicker: "career",
    title: "Professional experience",
  },
  projects: {
    kicker: "portfolio",
    title: "Featured projects",
    description:
      "Backends I've built, focused on architecture, data consistency and best practices.",
    featured: "Featured",
    since: "since",
    demo: "Demo",
    code: "Code",
    docs: "API Docs",
    openApp: "Open app",
  },
  skills: {
    kicker: "stack",
    title: "Technologies I use",
    description:
      "My day-to-day toolbox — from the endpoint to the database, through the infrastructure.",
    core: "core",
    groups: {
      backend: "Backend",
      data: "Databases",
      architecture: "Architecture & Quality",
      devops: "DevOps & Tools",
      frontend: "Frontend",
    },
  },
  contact: {
    kicker: "contact",
    title: "Let's talk",
    description:
      "Got a project in mind or want to talk backend? My inbox is always open.",
    emailCta: "Send email",
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, Tailwind and Framer Motion.",
  },
};
