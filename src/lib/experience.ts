import type { Lang } from "@/i18n/provider";

export interface Experience {
  company: string;
  role: Record<Lang, string>;
  period: Record<Lang, string>;
  /** marca o cargo atual (badge em destaque). */
  current?: boolean;
  description: Record<Lang, string>;
  /** bullets de responsabilidades / conquistas. */
  highlights: Record<Lang, string[]>;
  /** tecnologias e competências usadas. */
  tags: string[];
}

/** Edite com sua trajetória profissional. */
export const experiences: Experience[] = [
  {
    company: "cVortex",
    role: {
      pt: "Analista de Suporte e Sucesso do Cliente",
      en: "Support & Customer Success Analyst",
    },
    period: {
      pt: "Fev 2026 — Presente · 4 meses",
      en: "Feb 2026 — Present · 4 months",
    },
    current: true,
    description: {
      pt: "Atuação na ponta entre cliente, produto e engenharia: unindo suporte técnico, sucesso do cliente e o desenvolvimento de soluções internas que geram eficiência e ganho de tempo.",
      en: "Working at the intersection of customer, product and engineering: combining technical support, customer success and building internal tools that drive efficiency and save time.",
    },
    highlights: {
      pt: [
        "Troubleshooting e resolução de problemas em workflows complexos",
        "Consumo e integração de APIs (REST e GraphQL) e consultas em SQL",
        "Automações em Python para eliminar trabalho manual e ganhar tempo",
        "Desenvolvimento de aplicações internas que integram sistemas e aumentam a eficiência",
        "Domínio das regras de negócio com contato direto com o produto e o cliente",
      ],
      en: [
        "Troubleshooting and problem-solving across complex workflows",
        "Consuming and integrating APIs (REST and GraphQL) and writing SQL queries",
        "Python automations to remove manual work and save time",
        "Building internal applications that integrate systems and boost efficiency",
        "Strong grasp of business rules with direct contact with product and customers",
      ],
    },
    tags: [
      "SQL",
      "REST",
      "GraphQL",
      "Python",
      "Troubleshooting",
      "Workflows",
      "Automation",
      "Integrations",
    ],
  },
];
