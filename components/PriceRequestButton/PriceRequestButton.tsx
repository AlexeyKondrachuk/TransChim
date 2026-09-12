'use client';

import { useEffect, useId, useRef } from 'react';
import RequestForm from '@/components/RequestForm/RequestForm';
import type { RequestKind } from '@/components/RequestForm/config';
import { cx } from '@/lib/cx';
import styles from './PriceRequestButton.module.scss';

type PriceRequestButtonProps = {
  /** Продукт — уходит в заявку; в общих формах (звонок, заявка) не нужен */
  productTitle?: string;
  productSlug?: string;
  label?: string;
  requestKind?: RequestKind;
  modalTitle?: string;
  variant?: 'primary' | 'outline';
  /** Вызывается при открытии модалки (напр., закрыть мобильное меню) */
  onOpen?: () => void;
  className?: string;
};

export default function PriceRequestButton({
  productTitle,
  productSlug,
  label = 'Запросить цену',
  requestKind = 'price',
  modalTitle = label,
  variant = 'primary',
  onOpen,
  className,
}: PriceRequestButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = () => {
    dialogRef.current?.showModal();
    document.body.classList.add('modal-open');
    onOpen?.();
  };

  const close = () => {
    dialogRef.current?.close();
    document.body.classList.remove('modal-open');
  };

  // Страховка: размонтирование с открытым диалогом не оставляет замок
  useEffect(() => {
    return () => {
      if (dialogRef.current?.open) {
        document.body.classList.remove('modal-open');
      }
    };
  }, []);

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <button
        type="button"
        className={cx(
          styles.button,
          variant === 'outline' && styles.buttonOutline,
          className
        )}
        onClick={open}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClick={onDialogClick}
      >
        <div className={styles.head}>
          <h2 id={titleId} className={styles.title}>
            {modalTitle}
          </h2>
          <button
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <RequestForm
          kind={requestKind}
          productTitle={productTitle}
          productSlug={productSlug}
          onSuccess={close}
        />
      </dialog>
    </>
  );
}