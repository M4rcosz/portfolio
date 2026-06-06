# Marca pessoal — Marcos (M4rcosz)

**Monograma "Mz":** ligadura em que a perna direita do **M** se transforma num **Z** — uma referência ao handle `M4rcosz`. Estilo itálico (11°), terminais angulares, peso medium.

## Cores
| Uso | Cor | HEX |
|---|---|---|
| Principal | Vermelho | `#E11D2A` |
| Fundo | Preto | `#0A0A0A` |
| Monocromática | Branco | `#FFFFFF` |

## Arquivos

Vetores em `public/brand/`:
- `marcos-logo.svg` — versão principal (vermelha), fundo transparente.
- `marcos-logo-white.svg` — branca, para fundos escuros/coloridos.
- `marcos-logo-black.svg` — preta, para fundos claros.
- `marcos-icon.svg` — versão quadrada (avatar), vermelha sobre transparente.
- `marcos-icon-512.png` — ícone vermelho sobre transparente (preview claro).
- `marcos-icon-512-black.png` — ícone sobre preto (social / preview).
- `marcos-og.png` — imagem social (Open Graph) 1200×630.

Ícones do site (convenção do Next.js, em `src/app/`):
- `icon.svg` — favicon (quadrado preto arredondado + logo vermelha).
- `apple-icon.png` — apple touch icon (180×180).
- `favicon.ico` — favicon legado (32×32).

No código, use o componente `src/components/logo.tsx` (`<Logo />`): inline, com
`currentColor` — a cor vem da classe de texto (padrão: vermelho da marca).

## Gerar os PNGs
Os rasters são gerados a partir dos vetores com:

```bash
node scripts/gen-brand-assets.mjs
```

O `.svg` escala infinitamente; rode o script novamente para outros tamanhos.

## Área de respiro (clear space)
Mantenha ao redor da logo um espaço livre de **no mínimo a espessura de um traço**. Nada de texto, borda ou outro elemento dentro dessa margem.

## Tamanho mínimo
Não use abaixo de **16 px** de altura. Em contextos minúsculos, prefira sempre o ícone quadrado (`marcos-icon`), nunca a versão horizontal.

## Uso correto
- **Vermelho sobre preto/escuro** — versão principal.
- **Branca** — fundos escuros ou coloridos.
- **Preta** — fundos claros.

## O que NÃO fazer
- Não girar nem espelhar.
- Não esticar nem distorcer — mantenha a proporção.
- Não trocar a cor para fora da paleta.
- Não aplicar sombra, gradiente ou contorno.
- Não colocar o vermelho sobre fundos de baixo contraste (vermelho, laranja, marrom).
- Não recriar a logo na mão — sempre use o SVG.
