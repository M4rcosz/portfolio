export interface RepoStats {
  /** total de commits no branch default. */
  commits: number;
  /** ISO date do primeiro commit (começo do projeto); "" se indisponível. */
  startedAt: string;
}

/** Extrai owner/repo de uma URL do GitHub. */
function parseRepo(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+?)(?:\.git)?\/?$/);
  return m ? { owner: m[1], repo: m[2] } : null;
}

function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Opcional: define GITHUB_TOKEN no .env.local para subir o rate limit
  // de 60 para 5.000 req/h. Funciona sem token também.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

// cache de 1h (ISR) — evita estourar o rate limit do GitHub
const REVALIDATE = 3600;

/**
 * Busca o nº de commits e a data do primeiro commit de um repositório
 * público do GitHub. Server-side, com cache. Retorna null em qualquer falha
 * (rede, repo privado, repo vazio) para degradar de forma graciosa.
 */
export async function getRepoStats(repoUrl: string): Promise<RepoStats | null> {
  const parsed = parseRepo(repoUrl);
  if (!parsed) return null;

  const base = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;

  try {
    // 1 commit por página: o nº da última página no header Link == total de commits
    const head = await fetch(`${base}/commits?per_page=1`, {
      headers: ghHeaders(),
      next: { revalidate: REVALIDATE },
    });
    if (!head.ok) return null;

    const link = head.headers.get("link");
    const last = link?.match(/[?&]page=(\d+)>;\s*rel="last"/);

    if (last) {
      const commits = Number(last[1]);
      // a última página (a mais antiga) traz o primeiro commit
      const oldest = await fetch(`${base}/commits?per_page=1&page=${commits}`, {
        headers: ghHeaders(),
        next: { revalidate: REVALIDATE },
      });
      const data = oldest.ok ? await oldest.json() : [];
      return { commits, startedAt: data[0]?.commit?.author?.date ?? "" };
    }

    // sem header Link => 0 ou 1 commit
    const data = (await head.json()) as Array<{
      commit?: { author?: { date?: string } };
    }>;
    return {
      commits: data.length,
      startedAt: data[0]?.commit?.author?.date ?? "",
    };
  } catch {
    return null;
  }
}
