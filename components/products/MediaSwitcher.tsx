'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cx } from '@/lib/cx';
import styles from './MediaSwitcher.module.scss';
import { SupplyFormKind } from '../data/product';

export type MediaSlide = {
  kind: SupplyFormKind;
  src: string;
  alt: string;
};

const CHIP_LABELS: Record<SupplyFormKind, string> = {
  cylinder: 'Баллон',
  tank: 'Цистерна',
};

type MediaSwitcherProps = {
  slides: MediaSlide[];
  sizes: string;
};

export default function MediaSwitcher({ slides, sizes }: MediaSwitcherProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.stage}>
      {/* Основные слайды: все в DOM, виден активный */}
      {slides.map((slide, i) => (
        <div
          key={slide.kind}
          className={cx(styles.slide, i === active && styles.slideActive)}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            className={styles.image}
            loading="eager"
          />
          <span className={styles.chip}>{CHIP_LABELS[slide.kind]}</span>
        </div>
      ))}

      {/* Превью справа-вверху: только при 2+ слайдах */}
      {slides.length > 1 && (
        <div
          className={styles.thumbs}
          role="group"
          aria-label="Переключение фото формы поставки"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.kind}
              type="button"
              className={cx(styles.thumb, i === active && styles.thumbActive)}
              onClick={() => setActive(i)}
              aria-label={`Показать фото: ${CHIP_LABELS[slide.kind]}`}
              aria-pressed={i === active}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="56px"
                className={styles.thumbImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}