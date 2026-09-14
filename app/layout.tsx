import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import './globals.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

import { SITE } from '@/components/config/site';
import JsonLdOrganization from '@/components/seo/JsonLdOrganization';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-main',
  display: 'swap',
});

export const metadata: Metadata = {
  // ОБЯЗАТЕЛЬНО: без него относительные og:image и canonical
  // не соберутся в абсолютные URL (и будет warning в консоли)
  metadataBase: new URL(SITE.url),

  title: {
    default: 'ТрансХим — поставка технических газов для промышленности',
    template: '%s — ТрансХим',
  },
  description:
    'Широкий ассортимент технических газов: азот, кислород, аргон, Сварочная смесь K18. Доставка по всей России.',

  // canonical для каждой страницы (Next 14.2+): './' резолвится в адрес текущей страницы
  alternates: {
    canonical: './',
  },

  // og:title / og:description НЕ пишем здесь — Next подставит их
  // из title/description, причём постранично. Если задать тут явно,
  // они «приклеются» ко всем страницам.
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image', // картинка и описание наследуются из openGraph
  },

  // Раскомментировать после регистрации в вебмастерах (см. п.7)
  // verification: {
  //   yandex: 'код',
  //   google: 'код',
  // },
};

export const viewport: Viewport = {
  themeColor: '#0a6ebd', // ← ваш $color-primary
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
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