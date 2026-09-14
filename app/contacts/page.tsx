import type { Metadata } from 'next';

import PriceRequestButton from '@/components/PriceRequestButton/PriceRequestButton';

import styles from './contacts.module.scss';
import { SITE } from '@/components/config/site';
import YandexMap from '@/components/YandexMap/YandexMap';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Контакты ТрансХим: телефон, email, адрес офиса и склада в Подольске. Закажите обратный звонок или приезжайте — работаем с предприятиями по всей России.',
};

// Микроразметка LocalBusiness — сниппет с адресом и телефоном в выдаче
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  telephone: SITE.phoneDisplay,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    // раскладываем индекс и город для поисковиков
    postalCode: '445057',
    addressLocality: 'Тольятти',
    addressRegion: 'Самарская область',
    streetAddress: 'ул. 40 Лет Победы, здание 14, помещение 55',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.mapCoords[0],
    longitude: SITE.mapCoords[1],
  },
};

export default function ContactsPage() {
  return (
    <section className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.inner}>
        <h1 className={styles.title}>Контакты</h1>
        <p className={styles.subtitle}>
          Ответим на вопросы по продукции, доставке и оформлению документов.
        </p>

        <div className={styles.layout}>
          {/* ---------- Контактный блок ---------- */}
          <div className={styles.info}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Телефон</h2>
              <a href={SITE.phoneHref} className={styles.phone}>
                {SITE.phoneDisplay}
              </a>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Почта</h2>
              <a href={`mailto:${SITE.email}`} className={styles.link}>
                {SITE.email}
              </a>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Адрес</h2>
              <p className={styles.text}>{SITE.address}</p>
              <p className={styles.note}>{SITE.hours}</p>
            </div>

            <PriceRequestButton
              label="Заказать звонок"
              requestKind="callback"
              className={styles.callback}
            />
          </div>

          {/* ---------- Карта ---------- */}
          <div className={styles.mapColumn}>
         <YandexMap
  center={SITE.mapCoords}
  zoom={SITE.mapZoom}
  hintContent={SITE.name}
  balloonContent={SITE.address}
/>
            <p className={styles.mapNote}>
              Офис и склад —{' '}
              <a
                href={`https://yandex.ru/maps/?pt=${SITE.mapCoords[1]},${SITE.mapCoords[0]}&z=${SITE.mapZoom}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                проложить маршрут в Яндекс.Картах
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}