import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { projects } from "@/lib/projects";
import { getRepoStats, type RepoStats } from "@/lib/github";
import { isPreviewReachable } from "@/lib/preview";

export default async function Home() {
  // Stats do GitHub (commits + data de início) para projetos com repo público.
  // Buscado no servidor com cache (ISR 1h); falhas degradam graciosamente.
  const githubProjects = projects.filter((p) =>
    p.repoUrl?.includes("github.com"),
  );
  const results = await Promise.all(
    githubProjects.map(
      async (p) =>
        [p.repoUrl, await getRepoStats(p.repoUrl as string, p.repoRef)] as const,
    ),
  );
  const repoStats: Record<string, RepoStats> = {};
  for (const [url, stats] of results) {
    if (url && stats) repoStats[url] = stats;
  }

  // Verifica no servidor se cada `previewUrl` está no ar antes de tentar o
  // iframe ao vivo no cliente (ver src/lib/preview.ts). Deploy fora do ar =>
  // card degrada para o layout sem preview, sem ícone quebrado.
  const previewProjects = projects.filter((p) => p.previewUrl);
  const previewResults = await Promise.all(
    previewProjects.map(
      async (p) =>
        [p.previewUrl as string, await isPreviewReachable(p.previewUrl as string)] as const,
    ),
  );
  const previewAvailability: Record<string, boolean> = {};
  for (const [url, available] of previewResults) {
    previewAvailability[url] = available;
  }

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects repoStats={repoStats} previewAvailability={previewAvailability} />
      <Skills />
      <Contact />
    </>
  );
}
