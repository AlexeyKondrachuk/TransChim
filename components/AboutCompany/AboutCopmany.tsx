import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutCompany.module.scss';

type Stat = {
  id: string;
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { id: 'years', value: '5+', label: 'лет на рынке' },
  { id: 'clients', value: '120+', label: 'клиентов' },
  { id: 'gases', value: '10+', label: 'видов газов' },
];

function Placeholder() {
  return (
    <svg
      className={styles.placeholder}
      viewBox="0 0 120 68"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      {/* кабина */}
      <rect x="6" y="22" width="24" height="24" rx="3" />
      {/* цистерна */}
      <rect x="34" y="14" width="76" height="34" rx="17" />
      <path d="M30 34h4" />
      {/* колёса */}
      <circle cx="20" cy="54" r="6" />
      <circle cx="46" cy="54" r="6" />
      <circle cx="88" cy="54" r="6" />
    </svg>
  );
}

export default function AboutCompany() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.media}>
          
            Когда добавите фото — раскомментируйте и удалите <Placeholder />:
            <Image
              src="/images/about.webp"
              alt="Автоцистерна ТрансХим с техническими газами"
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
              className={styles.image}
            />
         
      
        </div>

        <div className={styles.body}>
          <h2 id="about-title" className={styles.title}>
            О компании
          </h2>

          <p className={styles.text}>
            Компания ТрансХим — надежный поставщик технических газов и газовых
            смесей промышленного назначения. Мы работаем с 2021 года и обслуживаем
            предприятия более чем в 5 регионах России, обеспечивая стабильность
            поставок и высокое качество сервиса.
          </p>

          <ul className={styles.stats}>
            {STATS.map((stat) => (
              <li key={stat.id} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>

          <Link href="/about" className={styles.more}>
            Подробнее о компании
          </Link>
        </div>
      </div>
    </section>
  );
}