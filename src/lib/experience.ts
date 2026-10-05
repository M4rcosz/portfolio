import type { Lang } from "@/i18n/provider";

export interface Experience {
  company: string;
  role: Record<Lang, string>;
  /** mês de início no formato "YYYY-MM". */
  startDate: string;
  /** mês de término "YYYY-MM"; omita se for o emprego atual. */
  endDate?: string;
  /** emprego atual: período calculado até hoje ("Presente · X meses"). */
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
      pt: "Analista de Suporte",
      en: "Support Analyst",
    },
    startDate: "2026-02-10",
    current: true,
    description: {
      pt: "Na cVortex, plataforma omnichannel SaaS com IA, atuo entre cliente, produto e engenharia: suporte técnico, integrações com LLMs nos agentes de IA da plataforma e desenvolvimento de automações internas que geram eficiência e ganho de tempo.",
      en: "At cVortex, an AI-powered omnichannel SaaS platform, I work between customer, product and engineering: technical support, LLM integrations in the platform's AI agents and building internal automations that drive efficiency and save time.",
    },
    highlights: {
      pt: [
        "Automações e aplicações internas em Python e Node.js/NestJS que integram sistemas e eliminam a configuração manual recorrente da plataforma, economizando cerca de 20 horas semanais da equipe",
        "Consumo e configuração de integrações com APIs de LLMs nos agentes de IA da plataforma: tool calling com function declarations, RAG sobre bases de conhecimento e melhoria de prompts aplicada a casos reais de clientes",
        "Integração de APIs REST e GraphQL e uso de SQL para investigar problemas do produto em produção",
        "Diagnóstico e resolução de problemas em workflows complexos da plataforma, junto a produto e engenharia",
      ],
      en: [
        "Internal automations and apps in Python and Node.js/NestJS that integrate systems and remove recurring manual platform setup, saving the team around 20 hours a week",
        "Consume and configure LLM API integrations in the platform's AI agents: tool calling with function declarations, RAG over knowledge bases and prompt improvements applied to real customer cases",
        "Integrate REST and GraphQL APIs and use SQL to investigate product issues in production",
        "Diagnose and fix problems in complex platform workflows, together with product and engineering",
      ],
    },
    tags: [
      "Python",
      "Node.js",
      "NestJS",
      "LLMs",
      "Tool calling",
      "RAG",
      "SQL",
      "REST",
      "GraphQL",
      "Troubleshooting",
      "Workflows",
      "Automation",
      "Integrations",
    ],
  },
];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Aceita "YYYY-MM" ou "YYYY-MM-DD" e devolve uma Date válida. */
function toDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

function formatDuration(months: number, lang: Lang): string {
  if (months < 1) return lang === "pt" ? "menos de 1 mês" : "less than a month";
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (lang === "pt") {
    if (years > 0) parts.push(`${years} ano${years > 1 ? "s" : ""}`);
    if (rest > 0) parts.push(`${rest} ${rest > 1 ? "meses" : "mês"}`);
    return parts.join(" e ");
  }
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (rest > 0) parts.push(`${rest} month${rest > 1 ? "s" : ""}`);
  return parts.join(" and ");
}

/**
 * Monta o período: "Fev. de 2026 - Presente · 4 meses". A duração dos
 * empregos atuais é calculada até a data de hoje (atualiza sozinha).
 */
export function formatExperiencePeriod(exp: Experience, lang: Lang): string {
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const fmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  });

  const start = toDate(exp.startDate);
  const end = exp.endDate ? toDate(exp.endDate) : new Date();

  const startLabel = capitalize(fmt.format(start));
  const endLabel = exp.current
    ? lang === "pt"
      ? "Presente"
      : "Present"
    : capitalize(fmt.format(end));

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return `${startLabel} - ${endLabel} · ${formatDuration(months, lang)}`;
}
