export type SkillGroupId =
  | "backend"
  | "data"
  | "architecture"
  | "security"
  | "devops"
  | "ai"
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
      "FastAPI",
      "REST",
      "GraphQL",
    ],
  },
  // ordem pensada para o grid de 2 colunas: grupos de tamanho parecido
  // ficam na mesma linha, senão o card menor sobra com espaço vazio.
  {
    id: "architecture",
    items: [
      "Clean Architecture",
      "DDD",
      "SOLID",
      "Repository Pattern",
      "Value Objects",
      "Idempotency",
      "Jest",
      "Vitest",
      "Supertest",
    ],
  },
  {
    id: "security",
    items: [
      "JWT",
      "Refresh token",
      "argon2",
      "RBAC",
      "Rate limiting",
      "Webhook HMAC",
      "OpenAPI/Swagger",
      "Zod",
    ],
  },
  {
    id: "devops",
    items: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Render",
      "Supabase",
      "Vercel",
      "Git",
      "Linux",
    ],
  },
  {
    id: "frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Zustand", "next-intl"],
  },
  {
    id: "data",
    items: ["PostgreSQL", "Prisma", "SQL", "MongoDB"],
  },
  {
    id: "ai",
    items: ["Google Gemini", "RAG", "Chatbots"],
  },
];
