import type { Metadata } from 'next';
import Image from 'next/image';
import PriceRequestButton from '@/components/PriceRequestButton/PriceRequestButton';
import styles from './delivery.module.scss';
import { DELIVERY_PAGE } from '@/components/data/delivery-page';

export const metadata: Metadata = {
  title: 'Доставка',
  description:
    'Доставка технических газов: баллоны по Тольятти, жидкие газы криоцистернами в любой регион России. Самовывоз со склада, работа по договору.',
};
// Иконки для форм доставки (не пересекаются с другими секциями)
function IconTruck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7h11v8H2z" />
      <path d="M13 10h4.5l2.5 3v2h-7" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
    </svg>
  );
}

function IconTanker() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="8" width="13" height="7.5" rx="3.75" />
      <path d="M16 9.5h2.6l1.6 2.4v3.6h-4.2" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="14" cy="18" r="1.6" />
      <circle cx="18.5" cy="18" r="1.6" />
    </svg>
  );
}

function IconWarehouse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21V9l9-5 9 5v12" />
      <path d="M8 21v-6h8v6" />
    </svg>
  );
}

const METHOD_ICONS = {
  cylinder: <IconTruck />,
  tank: <IconTanker />,
  pickup: <IconWarehouse />,
} as const;

export default function DeliveryPage() {
  return (
    <div className={styles.page}>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className={`${styles.inner} ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{DELIVERY_PAGE.title}</h1>
            <p className={styles.intro}>{DELIVERY_PAGE.intro}</p>
          </div>

          <div className={styles.heroMedia}>
            <Image
              src={DELIVERY_PAGE.heroImage.src}
              alt={DELIVERY_PAGE.heroImage.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <div className={styles.inner}>
        {/* ---------- Способы доставки ---------- */}
        <section aria-labelledby="methods-title">
          <h2 id="methods-title" className={styles.sectionTitle}>
            Способы доставки
          </h2>

          <ul className={styles.methods}>
            {DELIVERY_PAGE.methods.map((method) => (
              <li key={method.id} className={styles.method}>
                <span className={styles.methodIcon} aria-hidden="true">
                  {METHOD_ICONS[method.id as keyof typeof METHOD_ICONS]}
                </span>
                <h3 className={styles.methodTitle}>{method.title}</h3>
                <p className={styles.methodText}>{method.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Зоны и сроки ---------- */}
        <section aria-labelledby="zones-title">
          <h2 id="zones-title" className={styles.sectionTitle}>
            Зоны и сроки
          </h2>

          <ul className={styles.zones}>
            {DELIVERY_PAGE.zones.map((zone) => (
              <li key={zone.id} className={styles.zone}>
                <div className={styles.zoneHead}>
                  <h3 className={styles.zoneTitle}>{zone.title}</h3>
                  <span className={styles.zoneTime}>{zone.time}</span>
                </div>
                <p className={styles.zoneNote}>{zone.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Условия ---------- */}
        <section aria-labelledby="terms-title">
          <h2 id="terms-title" className={styles.sectionTitle}>
            Условия поставки
          </h2>

          <ul className={styles.terms}>
            {DELIVERY_PAGE.terms.map((term) => (
              <li key={term.id} className={styles.term}>
                <h3 className={styles.termTitle}>{term.title}</h3>
                <p className={styles.termText}>{term.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- География + CTA ---------- */}
        <section className={styles.ctaBlock} aria-label="География поставок">
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>География поставок</h2>
            <p className={styles.ctaParagraph}>{DELIVERY_PAGE.geography}</p>
            {/* РЕКОМЕНДАЦИЯ: слот под схему регионов (как на «О компании») */}
          </div>

          <div className={styles.ctaActions}>
            <PriceRequestButton
              label="Рассчитать доставку"
              requestKind="request"
              modalTitle="Расчёт доставки"
            />
            <PriceRequestButton
              label="Заказать звонок"
              requestKind="callback"
              variant="outline"
            />
          </div>
        </section>
      </div>
    </div>
  );
}