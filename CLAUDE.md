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
  app/
    layout.tsx        # fontes Geist, metadata, <LanguageProvider>, Navbar + Footer
    page.tsx          # monta as seções na ordem
    globals.css       # tokens do tema rubro-negro + Tailwind
  components/
    ui/               # button, card, badge, separator (estilo shadcn)
    navbar.tsx        # nav fixa + LanguageToggle
    footer.tsx
    language-toggle.tsx
    reveal.tsx        # wrapper de animação (fade/subida ao entrar na viewport)
    section-heading.tsx
    sections/         # hero, about, projects, skills, contact
  i18n/
    provider.tsx      # LanguageProvider (Context) + hooks useLanguage()/useT()
    dictionaries/
      pt.ts           # textos PT (fonte da verdade do tipo Dictionary)
      en.ts           # textos EN (tipado como Dictionary)
  lib/
    site.ts           # nome + links de contato (email, GitHub, LinkedIn)
    projects.ts       # dados dos projetos (descrição bilíngue)
    skills.ts         # grupos de skills (frontend/backend/devops)
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

Abordagem leve **client-side** (sem rotas `[locale]`): `LanguageProvider` guarda o idioma em
`localStorage` (`portfolio-lang`). Em componentes client use `useT()` (dicionário ativo) ou
`useLanguage()` (`{ lang, setLang, toggle, t }`). Para dados bilíngues fora do dicionário (ex.: projetos)
acesse `obj[lang]`.

> Upgrade futuro: se SEO multi-idioma com URLs separadas virar prioridade, migrar para `next-intl`
> com segmento de rota `[locale]`.

## Convenções

- Componentes que usam estado/hooks/Framer Motion levam `"use client"`.
- Imports via alias `@/*` (→ `src/*`).
- Cores sempre via tokens do tema (evite hex solto fora de `globals.css`).
