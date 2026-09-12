import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

// Geist не поддерживает кириллицу — для русскоязычного сайта берём Inter
const inter = Inter({
  subsets: ["latin", "cyrillic"], // cyrillic обязателен!
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ТрансХим — поставка технических газов для промышленности",
    template: "%s — ТрансХим", // вложенные страницы: "Контакты — ТЕХГАЗ"
  },
  description:
    "Широкий ассортимент технических газов: азот, кислород, аргон, ацетилен. Доставка по всей России.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru"  data-scroll-behavior="smooth" className={inter.variable}>
      <body>
        <Header />
        {children}
        <Footer /> 
      </body>
    </html>
  );
}