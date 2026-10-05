import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { projects } from "@/lib/projects";
import { getRepoStats, type RepoStats } from "@/lib/github";
import { isPreviewReachable } from "@/lib/preview";

/**
 * Combina os stats de vários repos de um projeto: soma os commits, usa o
 * primeiro commit mais antigo e a versão do primeiro repo que tiver uma.
 */
function combineStats(all: (RepoStats | null)[]): RepoStats | null {
  const ok = all.filter((s): s is RepoStats => s !== null);
  if (ok.length === 0) return null;
  const starts = ok.map((s) => s.startedAt).filter(Boolean).sort();
  return {
    commits: ok.reduce((sum, s) => sum + s.commits, 0),
    startedAt: starts[0] ?? "",
    version: ok.find((s) => s.version)?.version ?? "",
  };
}

export default async function Home() {
  // Stats do GitHub (commits + data de início + versão) por projeto, somando
  // os repos quando há mais de um. Repos privados exigem GITHUB_TOKEN.
  // Buscado no servidor com cache (ISR 1h); falhas degradam graciosamente.
  const statsResults = await Promise.all(
    projects.map(async (p) => {
      const repos = (p.repos ?? []).filter((r) => r.url.includes("github.com"));
      const all = await Promise.all(
        repos.map((r) => getRepoStats(r.url, r.ref)),
      );
      return [p.title, combineStats(all)] as const;
    }),
  );
  const repoStats: Record<string, RepoStats> = {};
  for (const [title, stats] of statsResults) {
    if (stats) repoStats[title] = stats;
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

  // Repos privados nunca vão para o cliente (nem no bundle, nem no payload).
  const publicProjects = projects.map((p) =>
    p.private ? { ...p, repos: undefined } : p,
  );

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects projects={publicProjects} repoStats={repoStats} previewAvailability={previewAvailability} />
      <Skills />
      <Contact />
    </>
  );
}
