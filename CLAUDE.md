# Portfólio — Marcos (Dev Fullstack)

Portfólio pessoal single-page, tema **rubro-negro** (preto + vermelho), **bilíngue PT/EN**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (config via `@theme` em CSS, sem `tailwind.config`)
- **shadcn/ui** — componentes em `src/components/ui` (escritos à mão, estilo shadcn)
- **Framer Motion** — animações (`framer-motion`)
- **lucide-react** — ícones
- Gerenciador de pacotes: **pnpm** (instalado via corepack)

## Comandos

```bash
pnpm dev      # servidor de desenvolvimento (http://localhost:3000)
pnpm build    # build de produção
pnpm start    # serve o build
pnpm lint     # eslint
```

## Estrutura

```
src/
  proxy.ts            # detecção de idioma + redirect/rewrite (ex-middleware)
  app/
    layout.tsx        # raiz: <html lang> (do header x-locale), fontes, ParallaxBackground
    [locale]/
      layout.tsx      # metadata localizada + <LanguageProvider> + Navbar/Footer
      page.tsx        # monta as seções na ordem (busca stats do GitHub)
    icon.svg / apple-icon.png / favicon.ico   # ícones da marca (convenção Next)
    globals.css       # tokens do tema rubro-negro + Tailwind
  components/
    logo.tsx          # monograma "Mz" (currentColor)
    parallax.tsx      # Parallax / ParallaxBackground / ScrollReveal3D (scroll-linked)
    ui/               # button, card, badge, separator (estilo shadcn)
    navbar.tsx        # nav fixa + LanguageToggle
    footer.tsx
    language-toggle.tsx
    reveal.tsx        # wrapper de animação (fade/subida + tilt 3D ao entrar na viewport)
    section-heading.tsx
    sections/         # hero, about, experience, projects, skills, contact
  i18n/
    config.ts         # locales, defaultLocale (pt), helpers localePath/htmlLang/isLocale
    provider.tsx      # LanguageProvider (Context, recebe lang da rota) + useLanguage()/useT()
    dictionaries/
      index.ts        # mapa { pt, en }
      pt.ts           # textos PT (fonte da verdade do tipo Dictionary; inclui meta)
      en.ts           # textos EN (tipado como Dictionary)
  lib/
    site.ts           # nome, handle, url + links de contato (email, GitHub, LinkedIn)
    projects.ts       # dados dos projetos (descrição/highlights bilíngues)
    experience.ts     # experiência profissional (período dinâmico)
    skills.ts         # grupos de skills (frontend/backend/devops)
    github.ts         # stats do GitHub (commits, início, versão) via API, com cache
    utils.ts          # cn()
```

## Onde editar conteúdo

- **Textos das seções (PT/EN):** `src/i18n/dictionaries/{pt,en}.ts` — manter as duas chaves em sincronia (o tipo `Dictionary` vem de `pt.ts`).
- **Projetos:** `src/lib/projects.ts` (cada projeto tem `description: { pt, en }`, `tags`, `demoUrl`, `repoUrl`).
- **Skills:** `src/lib/skills.ts` (rótulos dos grupos ficam no dicionário em `skills.groups`).
- **Contato/identidade:** `src/lib/site.ts`.

## Tema rubro-negro (tokens em `globals.css`)

Modo escuro por padrão. Variáveis CSS no estilo shadcn, expostas como utilitários Tailwind:

| Token            | Valor       | Uso                         |
|------------------|-------------|-----------------------------|
| `--background`   | `#0A0A0B`   | fundo quase preto           |
| `--foreground`   | `#F5F5F5`   | texto                       |
| `--primary`      | `#E11D2A`   | vermelho rubro (destaques)  |
| `--accent`       | `#DC2626`   | vermelho hover              |
| `--card`/`--muted` | `#121214`/`#1A1A1C` | superfícies      |
| `--border`       | `#262626`   | bordas                      |

Utilitários extras: `.text-gradient-red` (título), `.glow-ring` (cards/botões com brilho vermelho).
Use as classes Tailwind `bg-primary`, `text-foreground`, `border-border`, etc. — já mapeadas para os tokens.

## i18n

**Roteado por idioma** (a URL muda com o idioma): **pt na raiz `/`** e **en em `/en`**
(prefixo só quando necessário).

- **Detecção (1ª visita):** `src/proxy.ts` resolve o idioma por **cookie `NEXT_LOCALE` > `Accept-Language` > padrão (pt)**. Redireciona `/`→`/en` quando o idioma é en; senão **reescreve** `/`→`/pt` internamente (a URL pública continua `/`). `/pt` é canonicalizado para `/`. Injeta o idioma no header `x-locale`.
- **`<html lang>`:** definido no `app/layout.tsx` (raiz) a partir do `x-locale` (render dinâmico).
- **Metadata localizada:** `app/[locale]/layout.tsx` (`generateMetadata`) gera title/description/OG/`hreflang` por idioma, lendo de `dictionaries[locale].meta`.
- **No cliente:** `useT()` (dicionário ativo) ou `useLanguage()` (`{ lang, setLang, toggle, t }`). O `lang` vem da rota (prop do provider). O **toggle grava o cookie e navega** para a URL do outro idioma (`/` ou `/en`).
- Para dados bilíngues fora do dicionário (ex.: projetos) acesse `obj[lang]`.

> Trade-off: o layout raiz usa `headers()` para o `lang`, então a página é **renderizada dinamicamente** (SSR). Os dados do GitHub seguem cacheados no nível do `fetch` (ISR 1h).

## Convenções

- Componentes que usam estado/hooks/Framer Motion levam `"use client"`.
- Imports via alias `@/*` (→ `src/*`).
- Cores sempre via tokens do tema (evite hex solto fora de `globals.css`).
- **Mensagens de commit sempre em inglês** (Conventional Commits) e **sem linha de co-autor**.
- **Nunca trabalhe/commite direto na `main`** (branch de produção, com deploy). Crie uma branch (`feat/…`, `fix/…`, `docs/…`), commite nela e abra um **Pull Request** para a `main`. Assim, mudanças em andamento não afetam o site no ar.
- **Versionamento (automático, julgamento do agente):** a cada conjunto de mudanças que chega na `main`, faça o bump do `package.json` e crie a tag `vX.Y.Z` (SemVer) + release no GitHub. Features → MINOR, correções → PATCH, quebras → MAJOR.
