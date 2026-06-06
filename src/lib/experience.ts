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
      pt: "Analista de Suporte e Sucesso do Cliente",
      en: "Support & Customer Success Analyst",
    },
    startDate: "2026-02-10",
    current: true,
    description: {
      pt: "Na cVortex, plataforma omnichannel SaaS impulsionada por IA, atuo na ponta entre cliente, produto e engenharia: unindo suporte técnico, sucesso do cliente e o desenvolvimento de soluções internas que geram eficiência e ganho de tempo.",
      en: "At cVortex, an AI-powered omnichannel SaaS platform, I work at the intersection of customer, product and engineering: combining technical support, customer success and building internal tools that drive efficiency and save time.",
    },
    highlights: {
      pt: [
        "Integrações com IA na plataforma omnichannel SaaS, potencializando automação e atendimento",
        "Troubleshooting e resolução de problemas em workflows complexos",
        "Consumo e integração de APIs (REST e GraphQL) e consultas em SQL",
        "Automações em Python que economizaram ~20h semanais no período de implantação",
        "Desenvolvimento de aplicações internas que integram sistemas e aumentam a eficiência",
        "Domínio das regras de negócio com contato direto com o produto e o cliente",
      ],
      en: [
        "AI integrations in the omnichannel SaaS platform, powering automation and support",
        "Troubleshooting and problem-solving across complex workflows",
        "Consuming and integrating APIs (REST and GraphQL) and writing SQL queries",
        "Python automations that saved ~20h per week during the rollout phase",
        "Building internal applications that integrate systems and boost efficiency",
        "Strong grasp of business rules with direct contact with product and customers",
      ],
    },
    tags: [
      "AI",
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
 * Monta o período: "Fev. de 2026 — Presente · 4 meses". A duração dos
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

  return `${startLabel} — ${endLabel} · ${formatDuration(months, lang)}`;
}
