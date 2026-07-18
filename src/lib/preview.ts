// cache curto (ISR) — deploys de preview (ex.: Vercel free tier) podem cair/hibernar
// e voltar em minutos, então não vale a pena cachear tanto quanto os stats do GitHub.
const REVALIDATE = 300;
const TIMEOUT_MS = 5000;

/**
 * `X-Frame-Options: DENY/SAMEORIGIN` ou `CSP frame-ancestors` sem coringa
 * bloqueiam o embed mesmo com a página no ar (o iframe "carrega" a recusa
 * normalmente — o `onLoad` do cliente não percebe isso).
 */
function blocksFraming(headers: Headers): boolean {
  const xfo = headers.get("x-frame-options")?.trim().toLowerCase();
  if (xfo === "deny" || xfo === "sameorigin") return true;

  const csp = headers.get("content-security-policy");
  const frameAncestors = csp?.match(/frame-ancestors\s+([^;]+)/i)?.[1];
  if (frameAncestors && !frameAncestors.includes("*")) return true;

  return false;
}

/**
 * Verifica no servidor se `url` responde e permite ser embutida antes de
 * tentar o iframe ao vivo no cliente. Falha (rede, timeout, status != 2xx,
 * embed bloqueado) => indisponível, degrada graciosamente.
 */
export async function isPreviewReachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return false;
    return !blocksFraming(res.headers);
  } catch {
    return false;
  }
}
