import type { Metadata } from 'next';
import Image from 'next/image';
import PriceRequestButton from '@/components/PriceRequestButton/PriceRequestButton';

import { cx } from '@/lib/cx';

import styles from './about.module.scss';
import { ABOUT_PAGE } from '@/components/data/about-page';


export const metadata: Metadata = {
  title: 'О компании',
  description:
    'ТрансХим — поставка технических газов с 2010 года. Собственное производство, парк газовозов и криоцистерн, поставки более чем в 50 регионов России.',
};

// ---------- Локальные иконки принципов (не пересекаются с WhyUs) ----------
function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="5" r="2.2" />
      <path d="M8.2 19H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8" />
    </svg>
  );
}

function IconGost() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="10" r="6" />
      <path d="M9.5 10l1.8 1.8L15 8.2" />
      <path d="M8.5 15.5L7 21l5-2.5 5 2.5-1.5-5.5" />
    </svg>
  );
}

function IconDocs() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M10 12h6M10 16h6" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const PRINCIPLE_ICONS = {
  reliability: <IconRoute />,
  quality: <IconGost />,
  docs: <IconDocs />,
  approach: <IconTarget />,
} as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* ============================================================
           HERO: заголовок + интро + фото
          ============================================================ */}
      <section className={styles.hero}>
        <div className={cx(styles.inner, styles.heroInner)}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{ABOUT_PAGE.title}</h1>
            <p className={styles.intro}>{ABOUT_PAGE.intro}</p>
                 </div>

          <div className={styles.heroMedia}>
            <Image
              src={ABOUT_PAGE.heroImage.src}
              alt={ABOUT_PAGE.heroImage.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className={styles.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ============================================================
           СЧЁТЧИКИ
          ============================================================ */}
      <section className={styles.inner} aria-label="Компания в цифрах">
        <ul className={styles.stats}>
          {ABOUT_PAGE.stats.map((stat) => (
            <li key={stat.id} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================================
           ИСТОРИЯ
          ============================================================ */}
      <section className={styles.inner}>
        <div className={styles.story}>
          {ABOUT_PAGE.story.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* ============================================================
           ПРИНЦИПЫ
          ============================================================ */}
      <section className={styles.inner} aria-labelledby="principles-title">
        <h2 id="principles-title" className={styles.sectionTitle}>
          Принципы работы
        </h2>
        <ul className={styles.principles}>
          {ABOUT_PAGE.principles.map((p) => (
            <li key={p.id} className={styles.principle}>
              <span className={styles.principleIcon} aria-hidden="true">
                {PRINCIPLE_ICONS[p.id as keyof typeof PRINCIPLE_ICONS]}
              </span>
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleText}>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================================
           ПАРК И ИНФРАСТРУКТУРА
          ============================================================ */}
      <section className={styles.inner} aria-labelledby="assets-title">
        <h2 id="assets-title" className={styles.sectionTitle}>
          Производство и парк
        </h2>
        <ul className={styles.assets}>
          {ABOUT_PAGE.assets.map((asset) => (
            <li key={asset.id} className={styles.asset}>
              <div className={styles.assetMedia}>
                {asset.image ? (
                  <Image
                    src={asset.image}
                    alt={asset.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className={styles.assetImage}
                  />
                ) : (
                  <span className={styles.assetPlaceholder} aria-hidden="true" />
                )}
              </div>
              <h3 className={styles.assetTitle}>{asset.title}</h3>
              <p className={styles.assetText}>{asset.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================================
           ГЕОГРАФИЯ + CTA
          ============================================================ */}
      <section className={styles.inner}>
        <div className={styles.ctaBlock}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>География поставок</h2>
            <p className={styles.ctaParagraph}>{ABOUT_PAGE.geography}</p>
          </div>

          <div className={styles.ctaActions}>
            <PriceRequestButton
              label="Оставить заявку"
              requestKind="request"
            />
            <PriceRequestButton
              label="Заказать звонок"
              requestKind="callback"
              variant="outline"
            />
          </div>
        </div>
        {/* РЕКОМЕНДАЦИЯ: сюда — схему/карту регионов поставок (см. комментарии ниже) */}
      </section>
    </div>
  );
}