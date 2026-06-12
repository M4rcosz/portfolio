export type SkillGroupId =
  | "backend"
  | "data"
  | "architecture"
  | "devops"
  | "frontend";

export interface SkillGroup {
  id: SkillGroupId;
  items: string[];
  /** grupo principal: card em largura total com destaque visual. */
  featured?: boolean;
}

/**
 * Edite com as tecnologias que você usa. Os rótulos dos grupos
 * ficam nos dicionários de i18n (`skills.groups`).
 */
export const skills: SkillGroup[] = [
  {
    id: "backend",
    featured: true,
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "TypeScript",
      "Python",
      "REST",
      "GraphQL",
    ],
  },
  {
    id: "data",
    items: ["PostgreSQL", "Prisma", "SQL"],
  },
  {
    id: "architecture",
    items: [
      "Clean Architecture",
      "DDD",
      "Repository Pattern",
      "Jest",
      "Webhooks",
      "Idempotency",
    ],
  },
  {
    id: "devops",
    items: ["Docker", "Git", "CI/CD", "Linux", "Vercel"],
  },
  {
    id: "frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
];
