'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ImageSlider.module.scss';

type Slide = {
  src: string;
  alt: string;
};

type ImageSliderProps = {
  slides: readonly Slide[];
  sizes?: string;
};

export default function ImageSlider({
  slides,
  sizes = '(max-width: 1023px) 100vw, 45vw',
}: ImageSliderProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);

  const count = slides.length;
  const current = active < count ? active : 0;
  const isPaused = hovered || focused || paused;

  useEffect(() => {
    if (count < 2 || isPaused) return;

    const timer = window.setTimeout(() => {
      setActive((current + 1) % count);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [current, count, isPaused]);

  if (!count) return null;

  const changeSlide = (direction: number) => {
    setActive((current + direction + count) % count);
  };

  return (
    <div
      className={styles.slider}
      role="region"
      aria-roledescription="карусель"
      aria-label="Фотографии доставки"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={`${slide.src}-${index}`}
          className={`${styles.slide} ${
            index === current ? styles.slideActive : ''
          }`}
          role="group"
          aria-roledescription="слайд"
          aria-label={`${index + 1} из ${count}`}
          aria-hidden={index !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes={sizes}
            className={styles.image}
          />
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            className={styles.pause}
            onClick={() => setPaused((value) => !value)}
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
            className={`${styles.arrow} ${styles.prev}`}
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
            className={`${styles.arrow} ${styles.next}`}
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
            {slides.map((slide, index) => (
              <button
                key={`${slide.src}-${index}`}
                type="button"
                className={`${styles.dot} ${
                  index === current ? styles.dotActive : ''
                }`}
                onClick={() => setActive(index)}
                aria-label={`Показать фото ${index + 1}`}
                aria-pressed={index === current}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}