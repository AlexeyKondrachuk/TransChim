import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import { SITE } from "@/components/config/site";
import JsonLdOrganization from "@/components/seo/JsonLdOrganization";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  icons: {
    // Next.js also exposes app/favicon.ico as a 32x32 fallback.
    // Keep one explicit scalable icon so crawlers cannot choose an invalid size.
    icon: [{ url: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },

  title: {
    default: "ТрансХим — поставка технических газов для промышленности",
    template: "%s — ТрансХим",
  },
  description:
      "Технические газы от производителя: азот, кислород, аргон, сварочная смесь K18. " +
  "Доставка по всей России, сертификаты, отгрузка от 1 баллона.",

  alternates: {
    canonical: "./",
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE.url,
    siteName: SITE.name,
    images: [
      { url: "/og-cover.jpg", width: 1200, height: 630, alt: SITE.name },
    ],
  },
  twitter: {
    card: "summary_large_image", // картинка и описание наследуются из openGraph
  },

  verification: {
    yandex: "18612445fd53dd63",
    google: "O3T07hq2J8xDsBX_wT9yCb0IiqIBE5CdhYczYOz6rpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a6ebd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" data-scroll-behavior="smooth" className={inter.variable}>
      <body>
        <JsonLdOrganization />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
