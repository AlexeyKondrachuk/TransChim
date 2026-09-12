'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import styles from './YandexMap.module.scss';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps?: any;
  }
}

const SCRIPT_URL = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YMAPS_API_KEY}&lang=ru_RU`;

// Модульный guard: скрипт грузится один раз на страницу,
// все экземпляры карты ждут один и тот же промис
let ymapsPromise: Promise<void> | null = null;

function loadYmaps(): Promise<void> {
  if (window.ymaps) return Promise.resolve();
  if (ymapsPromise) return ymapsPromise;

  ymapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      ymapsPromise = null; // разрешаем повторную попытку при следующем рендере
      reject(new Error('Не удалось загрузить Яндекс.Карты'));
    };
    document.head.appendChild(script);
  });

  return ymapsPromise;
}

type YandexMapProps = {
  center: [number, number];
  zoom?: number;
  hintContent?: string;
  balloonContent?: string;
  className?: string;
};

export default function YandexMap({
  center,
  zoom = 15,
  hintContent,
  balloonContent,
  className,
}: YandexMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadYmaps()
      .then(() => {
        window.ymaps.ready(() => {
          if (cancelled || !containerRef.current) return;

          const map = new window.ymaps.Map(containerRef.current, {
            center,
            zoom,
            controls: ['zoomControl', 'fullscreenControl'],
          });

          map.geoObjects.add(
            new window.ymaps.Placemark(
              center,
              { hintContent, balloonContent },
              { preset: 'islands#blueDotIcon' }
            )
          );

          // Карта не перехватывает скролл страницы —
          // зум только кнопками и pinch'ем. Стандарт UX-практики
          map.behaviors.disable(['scrollZoom']);

          mapRef.current = map;
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [center, zoom, hintContent, balloonContent]);

  return (
    <div className={cx(styles.wrap, className)}>
      <div
        ref={containerRef}
        className={styles.container}
        role="application"
        aria-label="Карта: расположение офиса"
      />

      {error && (
        <div className={styles.fallback}>
          <p>Не удалось загрузить карту.</p>
          {/* pt=долгота,широта — порядок в ссылке Яндекс.Карт обратный */}
          <a
            href={`https://yandex.ru/maps/?pt=${center[1]},${center[0]}&z=${zoom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть на Яндекс.Картах
          </a>
        </div>
      )}
    </div>
  );
}