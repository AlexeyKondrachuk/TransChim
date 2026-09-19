'use client';

import { useEffect, useState } from 'react';
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

// Замените пути на названия ваших файлов в public/images.
const SLIDES = [
    {
    src: '/images/hero_truck.webp',
    alt: 'Автоцистерна для перевозки технических газов',
  },
  {
    src: '/images/auto_ballon.webp',
    alt: 'Автомобиль для перевозки баллонов для технических газов',
  },
  {
    src: '/images/asset-storage.webp',
    alt: 'Склад баллонов с техническими газами',
  },

];

export default function AboutCompany() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);

  const hasMultiple = SLIDES.length > 1;
  const isPaused = hovered || focused || paused;

  useEffect(() => {
    if (!hasMultiple || isPaused) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [active, hasMultiple, isPaused]);

  const changeSlide = (direction: number) => {
    setActive(
      (current) =>
        (current + direction + SLIDES.length) % SLIDES.length
    );
  };

  return (
    <section
      className={styles.section}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        <div
          className={styles.media}
          role="region"
          aria-roledescription="карусель"
          aria-label="Фотографии компании"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocused(false);
            }
          }}
        >
          {SLIDES.map((slide, index) => (
    <div
  key={slide.src}
  className={`${styles.slide} ${
    index === active ? styles.slideActive : ''
  }`}
  aria-hidden={index !== active}
>
  <Image
    src={slide.src}
    alt={slide.alt}
    fill
    sizes="(max-width: 1023px) 100vw, 45vw"
    className={styles.image}
  />
</div>
          ))}

          {hasMultiple && (
            <>
              <button
                type="button"
                className={styles.pause}
                onClick={() => setPaused((current) => !current)}
                aria-label={
                  paused
                    ? 'Включить автоматическую смену фото'
                    : 'Приостановить автоматическую смену фото'
                }
              >
                {paused ? 'Включить смену фото' : 'Пауза'}
              </button>

              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowPrev}`}
                onClick={() => changeSlide(-1)}
                aria-label="Предыдущее фото"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m15 6-6 6 6 6" />
                </svg>
              </button>

              <button
                type="button"
                className={`${styles.arrow} ${styles.arrowNext}`}
                onClick={() => changeSlide(1)}
                aria-label="Следующее фото"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>

              <div
                className={styles.dots}
                role="group"
                aria-label="Выбор фотографии"
              >
                {SLIDES.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    className={`${styles.dot} ${
                      index === active ? styles.dotActive : ''
                    }`}
                    onClick={() => setActive(index)}
                    aria-label={`Показать фото ${index + 1}`}
                    aria-pressed={index === active}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.body}>
          <h2 id="about-title" className={styles.title}>
            О компании
          </h2>

          <p className={styles.text}>
            Компания ТрансХим — надежный поставщик технических газов и
            газовых смесей промышленного назначения. Мы работаем с 2021
            года и обслуживаем предприятия более чем в 5 регионах России,
            обеспечивая стабильность поставок и высокое качество сервиса.
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