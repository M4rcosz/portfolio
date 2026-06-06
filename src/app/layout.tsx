import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";

import "./globals.css";
import { defaultLocale, htmlLang, isLocale } from "@/i18n/config";
import { ParallaxBackground } from "@/components/parallax";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // O idioma vem do proxy (header x-locale). A metadata localizada e o
  // provider/navbar/footer ficam em app/[locale]/layout.tsx.
  const headerLocale = (await headers()).get("x-locale");
  const lang = headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;

  return (
    <html
      lang={htmlLang(lang)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ParallaxBackground />
        {children}
      </body>
    </html>
  );
}
