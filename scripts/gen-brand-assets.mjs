// Gera os assets rasterizados da marca a partir dos vetores.
// Uso: node scripts/gen-brand-assets.mjs
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const RED = "#E11D2A";
const BLACK = "#0A0A0A";
const WHITE = "#F5F5F5";

// Traços do monograma (mesmo path dos SVGs da marca).
const monogram = (color) => `
  <g transform="skewX(-11)">
    <path d="M18 40 L31 28 L31 88 L18 88 Z" fill="${color}"/>
    <path d="M79 28 L105 28 L105 41 L72 41 Z" fill="${color}"/>
    <path d="M72 75 L98 75 L105 88 L72 88 Z" fill="${color}"/>
    <path d="M27 30 L55 61 L80 30" fill="none" stroke="${color}" stroke-width="13" stroke-linecap="butt" stroke-linejoin="miter"/>
    <path d="M100 38 L77 78" fill="none" stroke="${color}" stroke-width="13" stroke-linecap="butt"/>
  </g>`;

// Ícone quadrado 512: fundo preto arredondado + logo vermelha centralizada.
const iconBlack = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="${BLACK}"/>
  <g transform="scale(4)"><g transform="translate(13.77,6)">${monogram(RED)}</g></g>
</svg>`;

// Ícone quadrado vermelho sobre transparente (avatar/preview claro).
const iconRed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <g transform="scale(4)"><g transform="translate(13.77,6)">${monogram(RED)}</g></g>
</svg>`;

// Imagem social (Open Graph) 1200x630.
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="22%" cy="6%" r="85%">
      <stop offset="0%" stop-color="${RED}" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="${RED}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BLACK}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(404,92) scale(3.2)"><g transform="translate(11.11,-16)">${monogram(RED)}</g></g>
  <text x="600" y="470" text-anchor="middle" font-family="sans-serif" font-size="72" font-weight="700" fill="${WHITE}">Marcos</text>
  <text x="600" y="528" text-anchor="middle" font-family="sans-serif" font-size="34" font-weight="500" fill="${RED}">Desenvolvedor Fullstack</text>
</svg>`;

// ICO simples embutindo um PNG (suportado por navegadores modernos).
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: ícone
  header.writeUInt16LE(1, 4); // qtd de imagens
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // largura
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // altura
  entry.writeUInt8(0, 2); // paleta
  entry.writeUInt8(0, 3); // reservado
  entry.writeUInt16LE(1, 4); // planos
  entry.writeUInt16LE(32, 6); // bits por pixel
  entry.writeUInt32LE(png.length, 8); // tamanho dos dados
  entry.writeUInt32LE(22, 12); // offset
  return Buffer.concat([header, entry, png]);
}

await mkdir("public/brand", { recursive: true });

// apple touch icon (opaco, 180)
await sharp(Buffer.from(iconBlack)).resize(180, 180).png().toFile("src/app/apple-icon.png");

// ícones PNG da marca
await sharp(Buffer.from(iconBlack)).resize(512, 512).png().toFile("public/brand/marcos-icon-512-black.png");
await sharp(Buffer.from(iconRed)).resize(512, 512).png().toFile("public/brand/marcos-icon-512.png");

// favicon.ico (32, PNG embutido)
const png32 = await sharp(Buffer.from(iconBlack)).resize(32, 32).png().toBuffer();
await writeFile("src/app/favicon.ico", pngToIco(png32, 32));

// imagem social
await sharp(Buffer.from(og)).png().toFile("public/brand/marcos-og.png");

console.log("OK: apple-icon.png, favicon.ico, marcos-icon-512(-black).png, marcos-og.png");
