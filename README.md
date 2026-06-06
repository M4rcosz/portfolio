<div align="center">
  <img src="public/brand/marcos-icon-512-black.png" alt="Marcos" width="96" height="96" />
  <h1>Marcos — Portfolio</h1>
  <p>
    Personal portfolio of <strong>Marcos</strong> (<a href="https://github.com/M4rcosz">@m4rcosz</a>),
    fullstack developer. Single page, red-and-black theme, bilingual <strong>PT-BR / EN</strong>.
  </p>
  <p>
    <a href="https://m4rcosz.com"><strong>m4rcosz.com</strong></a>
  </p>
</div>

---

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) · **React 19** · **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** (theme via `@theme` in CSS, no `tailwind.config`)
- **shadcn/ui**-style components (hand-written in `src/components/ui`)
- **[Framer Motion](https://www.framer.com/motion/)** for scroll-driven animations
- **[lucide-react](https://lucide.dev)** icons
- Package manager: **pnpm**

## Features

- 🎨 **Red-and-black theme** (rubro-negro), dark by default, design tokens in `globals.css`
- 🌐 **Route-based i18n** — Portuguese at `/`, English at `/en`, with localized `<title>`, `hreflang` and Open Graph. First-visit language is detected from the browser (`Accept-Language`) and remembered via cookie
- 🪄 **Scroll animations** — continuous 3D parallax background and scroll-linked reveals (respects `prefers-reduced-motion`)
- 🐙 **GitHub integration** — project cards show live commit count, start date and `package.json` version, fetched server-side and cached (ISR, 1h)
- 🔖 **Personal brand** — `Mz` monogram logo, favicon, apple icon and social (Open Graph) card

## Getting started

Requires **Node 20+**. Enable pnpm via [corepack](https://nodejs.org/api/corepack.html):

```bash
corepack enable pnpm
pnpm install
pnpm dev          # http://localhost:3000
```

### Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint
```

## Customizing content

Everything is data-driven — no need to touch the components:

| What | Where |
|---|---|
| Section copy (PT/EN) | `src/i18n/dictionaries/{pt,en}.ts` |
| Projects | `src/lib/projects.ts` |
| Professional experience | `src/lib/experience.ts` |
| Skills | `src/lib/skills.ts` |
| Name, handle, contact links | `src/lib/site.ts` |

> Keep the `pt` and `en` dictionaries in sync — the `Dictionary` type is inferred from `pt.ts`.

## Internationalization

`src/proxy.ts` resolves the language (**cookie › `Accept-Language` › default `pt`**), redirects
`/` → `/en` when needed and internally rewrites `/` → `/pt` (the public URL stays `/`). The active
locale drives `<html lang>`, the metadata and the content. The language toggle writes the cookie
and navigates to the other URL.

## Brand assets

Vectors live in `public/brand/`. Regenerate the PNGs (favicon, apple icon, social card) from the
SVGs with:

```bash
node scripts/gen-brand-assets.mjs
```

See [`BRAND-GUIDE.md`](BRAND-GUIDE.md) for usage rules.

## Deployment

Deploy anywhere that runs Next.js (e.g. [Vercel](https://vercel.com)). Set:

| Env var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG base URL (defaults to `https://m4rcosz.com`) |
| `GITHUB_TOKEN` *(optional)* | Raises the GitHub API rate limit from 60 to 5,000 req/h |

---

<div align="center">
  <sub>Built with Next.js, Tailwind and Framer Motion.</sub>
</div>
