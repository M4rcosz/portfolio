import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, type Lang } from "@/i18n/config";

const COOKIE = "NEXT_LOCALE";

/** Resolve o idioma: cookie > Accept-Language > padrão. */
function detectLocale(req: NextRequest): Lang {
  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = req.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  for (const tag of preferred) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

/** Repassa o request adicionando o idioma resolvido em x-locale. */
function withLocale(req: NextRequest, locale: Lang) {
  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);
  return { request: { headers } };
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /pt é redundante (pt vive na raiz) -> canonicaliza para /
  if (
    pathname === `/${defaultLocale}` ||
    pathname.startsWith(`/${defaultLocale}/`)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, defaultLocale, { path: "/", maxAge: 31536000 });
    return res;
  }

  // idiomas com prefixo (ex.: /en) seguem para o segmento [locale]
  const seg = pathname.split("/")[1];
  if (isLocale(seg) && seg !== defaultLocale) {
    return NextResponse.next(withLocale(req, seg));
  }

  // raiz: detecta o idioma na 1ª visita
  if (pathname === "/") {
    const locale = detectLocale(req);
    if (locale !== defaultLocale) {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
    // pt: reescreve internamente para /pt, mantendo a URL como /
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.rewrite(url, withLocale(req, defaultLocale));
  }

  return NextResponse.next();
}

export const config = {
  // ignora assets, api e qualquer arquivo (com ponto no nome)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
