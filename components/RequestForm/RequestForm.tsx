'use client';

import { useState } from 'react';
import type { RequestKind } from './config';
import { REQUEST_CONFIG } from './config';
import styles from './RequestForm.module.scss';

type RequestFormProps = {
  kind: RequestKind;
  /** Продукт, с которого пришли (price/order) */
  productTitle?: string;
  productSlug?: string;
  onSuccess?: () => void;
};

export default function RequestForm({
  kind,
  productTitle,
  productSlug,
  onSuccess,
}: RequestFormProps) {
  const config = REQUEST_CONFIG[kind];
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Callback — отдельный сценарий: только телефон, без имени и email.
  const isCallback = kind === 'callback';

  // Телефон обязателен там, где email не спрашиваем:
  // callback и общая заявка должны оставлять хотя бы один контакт
  const phoneRequired = isCallback || kind === 'request';

  // Заказ и запрос цены: email обязателен, телефон опционален
  const requiresEmail = kind === 'order' || kind === 'price';

  // Имя требуется всем, кроме callback
  const requiresName = !isCallback;

  // Адрес доставки — только для заказа: куда везти партию
  const needsAddress = kind === 'order';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? 'Ошибка отправки');
      }

      setSent(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Заявка отправлена</p>
        <p className={styles.successText}>
          Менеджер свяжется с вами в рабочее время.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Контекст заявки */}
      <input type="hidden" name="kind" value={kind} />

      {productSlug && (
        <input type="hidden" name="product_slug" value={productSlug} />
      )}

      {productTitle && <p className={styles.product}>{productTitle}</p>}

      {/* Имя */}
      {requiresName && (
        <label className={styles.field}>
          <span className={styles.label}>Имя</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={styles.input}
          />
        </label>
      )}

      {/* Email — для price/order */}
      {requiresEmail && (
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={styles.input}
            placeholder="you@example.com"
          />
        </label>
      )}

      {/* Телефон — обязателен для callback/request, опционален для price/order */}
      <label className={styles.field}>
        <span className={styles.label}>Телефон</span>
        <input
          name="phone"
          type="tel"
          required={phoneRequired}
          autoComplete="tel"
          className={styles.input}
          placeholder="+7 (___) ___-__-__"
        />
      </label>

      {/* Адрес доставки — только для заказа.
          Для tank-заявок регион не пугает: клиент уже прочитал
          «доставка в любой регион России» в карточке и на странице товара */}
      {needsAddress && (
        <label className={styles.field}>
          <span className={styles.label}>Адрес доставки</span>
          <input
            name="address"
            type="text"
            required
            autoComplete="street-address"
            className={styles.input}
            placeholder="Город, улица, объект"
          />
        </label>
      )}

      {/* Honeypot: скрыто от людей, боты заполняют — сервер тихо отбрасывает */}
      <label className={styles.hpField} aria-hidden="true" tabIndex={-1}>
        <span>Компания</span>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      {/* Комментарий */}
      <label className={styles.field}>
        <span className={styles.label}>{config.commentLabel}</span>
        <textarea
          name="comment"
          rows={3}
          className={styles.input}
          placeholder={config.commentPlaceholder}
        />
      </label>

      {/* Согласие */}
      <label className={styles.consent}>
        <input type="checkbox" name="consent" required />
        <span>
          Соглашаюсь с{' '}
          <a href="/privacy" className={styles.consentLink}>
            политикой обработки персональных данных
          </a>
        </span>
      </label>

      {/* Ошибка отправки */}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? 'Отправляем…' : config.submitLabel}
      </button>
    </form>
  );
}