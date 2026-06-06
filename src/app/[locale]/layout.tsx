import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { site } from "@/lib/site";
import { isLocale, localePath, type Lang } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { LanguageProvider } from "@/i18n/provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = isLocale(locale) ? locale : "pt";
  const { title, description } = dictionaries[lang].meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s · Marcos" },
    description,
    // O site já tem tema escuro próprio: desliga a extensão Dark Reader
    // (evita que ela injete estilos e cause mismatch de hidratação).
    other: { "darkreader-lock": "true" },
    alternates: {
      canonical: localePath(lang),
      languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Marcos",
      url: localePath(lang),
      locale: lang === "pt" ? "pt_BR" : "en_US",
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
      title,
      description,
      images: ["/brand/marcos-og.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <LanguageProvider lang={locale}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
