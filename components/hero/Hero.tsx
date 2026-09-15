"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShieldAlt, FaUserTie } from "react-icons/fa";



import { cx } from "@/lib/cx";
import styles from "./Hero.module.scss";
import GasCylindersIcon from "../Icons/GasCylindersIcon";
import GasTankerIcon from "../Icons/GasTankerIcon";

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
];

const AUTOPLAY_DELAY = 6000;

const ADVANTAGES = [
  {
    id: "assortment",
    Icon: GasCylindersIcon,
    label: "Широкий ассортимент технических газов",
  },
  {
    id: "quality",
    Icon: FaShieldAlt,
    label: "Гарантия качества и соответствие ГОСТ",
  },
  {
    id: "delivery",
    Icon: GasTankerIcon,
    label: "Оперативная доставка по всей России",
  },
  {
    id: "personal",
    Icon: FaUserTie,
    label: "Индивидуальный подход к каждому клиенту",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  const count = SLIDES.length;
  const pausedRef = useRef(false);
  const startXRef = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  const go = useCallback(
    (step: number) => {
      setActive((current) => (current + step + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count < 2) return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (mediaQuery.matches) return;

    const intervalId = window.setInterval(() => {
      if (!pausedRef.current) {
        setActive((current) => (current + 1) % count);
      }
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [count]);

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    startXRef.current = event.clientX;
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (startXRef.current === null) return;

    const difference = event.clientX - startXRef.current;

    if (Math.abs(difference) > 50) {
      go(difference < 0 ? 1 : -1);
    }

    startXRef.current = null;
  };

  const handlePointerCancel = () => {
    startXRef.current = null;
  };

  return (
    <section
      className={styles.hero}
      aria-label="Главный промо-блок"
    >
      <div
        className={styles.viewport}
        role="region"
        aria-roledescription="карусель"
        aria-label="Промо-слайды"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        onFocusCapture={() => {
          pausedRef.current = true;
        }}
        onBlurCapture={() => {
          pausedRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === active;
          const TitleTag = index === 0 ? "h1" : "p";

          return (
            <div
              key={slide.id}
              className={cx(
                styles.slide,
                isActive && styles.slideActive,
              )}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 1240px) 100vw, 1240px"
                className={styles.slideImage}
              />

              <div className={styles.content}>
                <TitleTag className={styles.title}>
                  {slide.title}
                </TitleTag>

                <p className={styles.subtitle}>
                  {slide.subtitle}
                </p>

                <Link
                  href={slide.href}
                  className={styles.cta}
                  tabIndex={isActive ? undefined : -1}
                >
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          );
        })}

        {count > 1 && (
          <div
            className={styles.dots}
            aria-label="Навигация по слайдам"
          >
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={cx(
                  styles.dot,
                  index === active && styles.dotActive,
                )}
                onClick={() => goTo(index)}
                aria-label={`Показать слайд ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.advantages}>
        <ul className={styles.advList}>
          {ADVANTAGES.map(({ id, Icon, label }) => (
            <li key={id} className={styles.advItem}>
              <span
                className={styles.advIcon}
                aria-hidden="true"
              >
                <Icon />
              </span>

              <span className={styles.advLabel}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}