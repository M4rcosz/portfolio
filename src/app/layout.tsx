import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { LanguageProvider } from "@/i18n/provider";
import { ParallaxBackground } from "@/components/parallax";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const DESCRIPTION =
  "Portfólio de Marcos — desenvolvedor fullstack. Aplicações web do front ao back: interfaces, APIs e infraestrutura.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marcos · Desenvolvedor Fullstack",
    template: "%s · Marcos",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marcos · Desenvolvedor Fullstack",
    description: DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    siteName: "Marcos",
    url: "/",
    images: [
      {
        url: "/brand/marcos-og.png",
        width: 1200,
        height: 630,
        alt: "Marcos — Desenvolvedor Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos · Desenvolvedor Fullstack",
    description: DESCRIPTION,
    images: ["/brand/marcos-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ParallaxBackground />
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
