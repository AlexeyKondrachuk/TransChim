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

type MediaSwitcherProps = {
  slides: MediaSlide[];
  sizes: string;
  productTitle?: string;
};

export default function MediaSwitcher({
  slides,
  sizes,
  productTitle,
}: MediaSwitcherProps) {
  const [active, setActive] = useState(0);

  const getLabel = (kind: SupplyFormKind): string => {
    if (kind === 'tank') {
      return productTitle
        ? `Жидкий ${productTitle.toLowerCase()}`
        : 'Жидкий газ';
    }

    return 'Баллон';
  };

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

          <span className={styles.chip}>
            {getLabel(slide.kind)}
          </span>
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
              aria-label={`Показать фото: ${getLabel(slide.kind)}`}
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