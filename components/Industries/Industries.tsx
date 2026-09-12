import Image from "next/image";
import styles from "./Industries.module.scss";

const ICONS = {
  flame: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3c.8 3 4.5 4.6 4.5 8.5a4.5 4.5 0 0 1-9 0c0-1.6.6-2.9 1.5-4.1.4 1.1 1 1.9 1.9 2.4C10.7 7.6 11 5.2 12 3Z" />
    </svg>
  ),
  gear: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </svg>
  ),
  apple: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 8c-2.8-1.8-6.5-.3-6.5 3.6 0 3.6 2.7 7.4 4.9 7.4.9 0 1-.5 1.6-.5s.7.5 1.6.5c2.2 0 4.9-3.8 4.9-7.4C18.5 7.7 14.8 6.2 12 8Z" />
      <path d="M12 8c0-2 1-3.2 2.5-4" />
    </svg>
  ),
  flask: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.5 3h5M10.5 3v5.2L5.6 16a2.2 2.2 0 0 0 1.9 3.3h9a2.2 2.2 0 0 0 1.9-3.3l-4.9-7.8V3" />
      <path d="M8 14.5h8" />
    </svg>
  ),
  chip: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M9 2.5v4M15 2.5v4M9 17.5v4M15 17.5v4M2.5 9h4M2.5 15h4M17.5 9h4M17.5 15h4" />
    </svg>
  ),
} as const;

type Industry = {
  id: string;
  title: string;
  icon: keyof typeof ICONS;
  image?: string; // раскомментируйте, когда добавите фото в public/images/industries/
  alt?: string;
};

// Кладите фото рядом: /public/images/industries/<id>.webp
const INDUSTRIES: Industry[] = [
  {
    id: "metallurgy",
    title: "Металлургия",
    icon: "flame",
    image: "/images/industries/in1.webp",
    alt: "Разлив расплавленного металла в цехе",
  },
  {
    id: "machine-building",
    title: "Машиностроение",
    icon: "gear",
    image: "/images/industries/in2.webp",
    alt: "Станки механической обработки",
  },
  {
    id: "food",
    title: "Пищевая промышленность",
    icon: "apple",
    image: "/images/industries/in3.webp",
    alt: "Пищевое производство",
  },
  {
    id: "chemical",
    title: "Химическая промышленность",
    icon: "flask",
    image: "/images/industries/in4.webp",
    alt: "Лаборатория химического производства",
  },
  {
    id: "electronics",
    title: "Электроника",
    icon: "chip",
    image: "/images/industries/in5.webp",
    alt: "Микросхема крупным планом",
  },
];

export default function Industries() {
  return (
    <section
      className={styles.section}
      id="industries"
      aria-labelledby="industries-title"
    >
      <div className={styles.inner}>
        <h2 id="industries-title" className={styles.title}>
          Отрасли применения
        </h2>

        <ul className={styles.grid}>
          {INDUSTRIES.map((industry) => (
            <li key={industry.id} className={styles.item}>
              <div className={styles.card}>
                <div className={styles.media}>
                  {industry.image ? (
                    <Image
                      src={industry.image}
                      alt={industry.alt ?? industry.title}
                      fill
                      sizes="(max-width: 479px) 50vw, (max-width: 1023px) 33vw, 20vw"
                      className={styles.image}
                    />
                  ) : (
                    <span className={styles.placeholder} aria-hidden="true">
                      {ICONS[industry.icon]}
                    </span>
                  )}

                  {/* Теперь внутри media — оверлей поверх фото */}
                  <span className={styles.label}>{industry.title}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
