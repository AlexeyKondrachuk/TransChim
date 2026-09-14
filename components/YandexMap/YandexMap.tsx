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

const API_KEY = process.env.NEXT_PUBLIC_YMAPS_API_KEY;
const SCRIPT_URL = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;

// Модульный guard: скрипт грузится один раз на страницу,
// все экземпляры карты ждут один и тот же промис
let ymapsPromise: Promise<void> | null = null;

function loadYmaps(): Promise<void> {
  // Без ключа сразу ошибка — не грузим скрипт с apikey=undefined
  if (!API_KEY) {
    return Promise.reject(new Error('NEXT_PUBLIC_YMAPS_API_KEY не задан'));
  }
  if (window.ymaps) return Promise.resolve();
  if (ymapsPromise) return ymapsPromise;

  ymapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      ymapsPromise = null; // разрешаем повторную попытку
      reject(new Error('Не удалось загрузить Яндекс.Карты'));
    };
    document.head.appendChild(script);
  });

  return ymapsPromise;
}

type YandexMapProps = {
  // readonly — чтобы принимать координаты из конфига с as const.
  // Порядок: [широта, долгота] — как в Yandex Maps API
  center: readonly [number, number];
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
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0); // триггер повторной попытки

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

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
          // зум только кнопками и pinch'ем
          map.behaviors.disable(['scrollZoom']);

          mapRef.current = map;
          setStatus('ready');
        });
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
    // attempt намеренно в зависимостях: смена счётчика = retry
  }, [attempt, center, zoom, hintContent, balloonContent]);

  return (
    <div className={cx(styles.wrap, className)}>
      <div
        ref={containerRef}
        className={cx(
          styles.container,
          status === 'loading' && styles.containerLoading
        )}
        role="application"
        aria-label="Карта: расположение офиса"
      />

      {status === 'error' && (
        <div className={styles.fallback}>
          <p>Не удалось загрузить карту.</p>
          {/* pt=долгота,широта — в ссылках порядок обратный API */}
          <a
            href={`https://yandex.ru/maps/?pt=${center[1]},${center[0]}&z=${zoom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть на Яндекс.Картах
          </a>
          {API_KEY && (
            <button type="button" onClick={() => setAttempt((a) => a + 1)}>
              Попробовать снова
            </button>
          )}
        </div>
      )}
    </div>
  );
}