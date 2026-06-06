import type { Dictionary } from "./pt";

export const en: Dictionary = {
  meta: {
    title: "Marcos · Fullstack Developer",
    description:
      "Marcos's portfolio — fullstack developer. Web apps end to end: interfaces, APIs and infrastructure.",
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
    role: "Fullstack Developer",
    description:
      "I build web applications end to end — fast, accessible interfaces, robust APIs and reliable infrastructure.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
    ctaResume: "Download CV",
  },
  about: {
    kicker: "About me",
    title: "Who's behind the code",
    paragraphs: [
      "I'm a fullstack developer who loves turning ideas into complete digital products. I work across every layer: from interface design to data modeling and deployment.",
      "I care about clean code, performance and experiences people actually want to use. I'm always learning and experimenting with new technologies.",
    ],
    highlights: [
      { value: "Fullstack", label: "Front, back and automation" },
      { value: "APIs", label: "REST, GraphQL and integrations" },
      { value: "∞", label: "Eager to learn" },
    ],
  },
  experience: {
    kicker: "Career",
    title: "Professional experience",
  },
  projects: {
    kicker: "Portfolio",
    title: "Featured projects",
    description:
      "Projects I've built, focused on architecture, quality and best practices.",
    featured: "Featured",
    since: "since",
    demo: "Demo",
    code: "Code",
  },
  skills: {
    kicker: "Stack",
    title: "Technologies I use",
    description:
      "Tools and languages I work with day to day, from the frontend to infrastructure.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps & Tools",
    },
  },
  contact: {
    kicker: "Contact",
    title: "Let's talk",
    description:
      "Got a project in mind or just want to chat? My inbox is always open.",
    emailCta: "Send email",
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, Tailwind and Framer Motion.",
  },
};
