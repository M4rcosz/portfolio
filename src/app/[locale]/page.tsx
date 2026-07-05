import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { projects } from "@/lib/projects";
import { getRepoStats, type RepoStats } from "@/lib/github";

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

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects repoStats={repoStats} />
      <Skills />
      <Contact />
    </>
  );
}
