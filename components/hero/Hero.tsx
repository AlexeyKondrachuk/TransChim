"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.scss";
import { cx } from "@/lib/cx";

// Проверьте alias "@/*" в tsconfig.json; если его нет — относительный путь

type Slide = {
  id: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  href: string;
  ctaLabel: string;
};

const SLIDES: Slide[] = [
  {
    id: "gases",
    image: "/images/hero_img.webp",
    alt: "Технические газы на фоне промышленного производства",
    title: "Поставка технических газов для промышленности и бизнеса",
    subtitle:
      "Широкий ассортимент. Высокое качество. Надежные поставки по всей России.",
    href: "/products",
    ctaLabel: "Каталог продукции",
  },
  {
    id: "gases2",
    image: "/images/hero_img2.webp",
    alt: "Газовоз на фоне промышленного производства",
    title: "Поставка технических газов для промышленности и бизнеса",
    subtitle:
      "Широкий ассортимент. Высокое качество. Надежные поставки по всей России.",
    href: "/products",
    ctaLabel: "Каталог продукции",
  },
  // Новый слайд = новый объект в массиве. Точки, автоплей и
  // стрелочная логика включатся автоматически (при count > 1)
];

const AUTOPLAY_DELAY = 6000;



// ---------- Иконки преимуществ ----------
const ICONS = {
  cylinders: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <rect x="4" y="7" width="6" height="13" rx="3" />
      <rect x="14" y="7" width="6" height="13" rx="3" />
      <path d="M7 7V5M17 7V5" />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  truck: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 7h11v8H2z" />
      <path d="M13 10h4.5l2.5 3v2h-7" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
    </svg>
  ),
  person: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
    </svg>
  ),
};

const ADVANTAGES = [
  {
    id: "assortment",
    icon: ICONS.cylinders,
    label: "Широкий ассортимент технических газов",
  },
  {
    id: "quality",
    icon: ICONS.shield,
    label: "Гарантия качества и соответствие ГОСТ",
  },
  {
    id: "delivery",
    icon: ICONS.truck,
    label: "Оперативная доставка по всей России",
  },
  {
    id: "personal",
    icon: ICONS.person,
    label: "Индивидуальный подход к каждому клиенту",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const count = SLIDES.length;
  const pausedRef = useRef(false);
  const startX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => setActive(((index % count) + count) % count),
    [count],
  );
  const go = useCallback(
    (step: number) => setActive((a) => (a + step + count) % count),
    [count],
  );

  // Автоплей: только при 2+ слайдах и без prefers-reduced-motion
  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % count);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [count]);

  // Свайп: горизонтальный жест > 50px листает слайд
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };
  const onPointerCancel = () => {
    startX.current = null;
  };

  return (
    <section className={styles.hero} aria-label="Главный промо-блок">
      <div
        className={styles.viewport}
        role="region"
        aria-roledescription="карусель"
        aria-label="Промо-слайды"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          // h1 только у первого слайда, у остальных — p (SEO)
          const TitleTag = i === 0 ? "h1" : "p";

          return (
            <div
              key={slide.id}
              className={cx(styles.slide, isActive && styles.slideActive)}
              aria-hidden={!isActive} // visibility:hidden и так убирает из tab-order, это для скринридеров
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1023px) 100vw, 1920px"
                className={styles.slideImage}
                loading="eager"
              />
              <div className={styles.content}>
                <TitleTag className={styles.title}>{slide.title}</TitleTag>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <Link href={slide.href} className={styles.cta}>
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          );
        })}

        {count > 1 && (
          <div className={styles.dots}>
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={cx(styles.dot, i === active && styles.dotActive)}
                onClick={() => goTo(i)}
                aria-label={`Слайд ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
        )}
      </div>

      {/* Полоса преимуществ — статична, не зависит от слайда */}
      <div className={styles.advantages}>
        <ul className={styles.advList}>
          {ADVANTAGES.map((adv) => (
            <li key={adv.id} className={styles.advItem}>
              <span className={styles.advIcon} aria-hidden="true">
                {adv.icon}
              </span>
              {adv.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
