export type SkillGroupId = "frontend" | "backend" | "devops";

export interface SkillGroup {
  id: SkillGroupId;
  items: string[];
}

/**
 * Edite com as tecnologias que você usa. Os rótulos dos grupos
 * (Frontend / Backend / DevOps) ficam nos dicionários de i18n.
 */
export const skills: SkillGroup[] = [
  {
    id: "frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    items: [
      "Node.js",
      "NestJS",
      "Python",
      "Express",
      "PostgreSQL",
      "Prisma",
      "REST",
      "GraphQL",
    ],
  },
  {
    id: "devops",
    items: ["Docker", "Git", "CI/CD", "Vercel", "Linux"],
  },
];
