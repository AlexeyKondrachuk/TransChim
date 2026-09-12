import type { ReactNode } from 'react';
import styles from './WhyUs.module.scss';

// ---------- Локальная обёртка для единообразия иконок ----------
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function IconFactory() {
  return (
    <Icon>
      <path d="M3 21V9.5l5.5 3.5V9.5L14 13V4h7v17" />
      <path d="M2 21h20" />
      <path d="M17.5 9h1.5M17.5 12.5h1.5" />
    </Icon>
  );
}

function IconQuality() {
  return (
    <Icon>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 2.5h6v3H9z" />
      <path d="M9 13.5l2 2 4-4" />
    </Icon>
  );
}

function IconGear() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </Icon>
  );
}

function IconTeam() {
  return (
    <Icon>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c1-3 3-4.5 5.5-4.5s4.5 1.5 5.5 4.5" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M16 14.6c2.3.2 4 1.6 4.8 4.4" />
    </Icon>
  );
}

// ---------- Данные ----------
const REASONS = [
  { id: 'production', icon: <IconFactory />, label: 'Собственное производство и парковка' },
  { id: 'quality', icon: <IconQuality />, label: 'Контроль качества на всех этапах' },
  { id: 'equipment', icon: <IconGear />, label: 'Современный парк оборудования' },
  { id: 'staff', icon: <IconTeam />, label: 'Опытный и отзывчивый персонал' },
];

export default function WhyUs() {
  return (
    <section className={styles.section} id="why-us" aria-labelledby="why-us-title">
      <div className={styles.inner}>
        <h2 id="why-us-title" className={styles.title}>
          Почему выбирают нас
        </h2>

        <ul className={styles.list}>
          {REASONS.map((reason) => (
            <li key={reason.id} className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                {reason.icon}
              </span>
              {reason.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}