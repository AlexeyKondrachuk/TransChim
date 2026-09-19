import Link from 'next/link';
import PriceRequestButton from '@/components/PriceRequestButton/PriceRequestButton';
import MediaSwitcher from './MediaSwitcher';
import styles from './MiniProductCard.module.scss';
import { cx } from '@/lib/cx';
import { Product, SupplyFormKind } from '../data/product';

type MiniProductCardProps = {
  product: Product;
  /** Подсказка srcset — зависит от сетки родителя */
  imageSizes?: string;
  className?: string;
};

const DEFAULT_IMAGE_SIZES =
  '(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 25vw';

type CardSlide = {
  kind: SupplyFormKind;
  src: string;
  alt: string;
};

function buildSlides(product: Product): CardSlide[] {
  return product.forms
    .map((form) => ({
      kind: form.kind,
      src:
        form.image ??
        (form.kind === 'cylinder' ? product.image : undefined),
      alt:
        form.alt ??
        (form.kind === 'cylinder' ? product.alt : undefined) ??
        `${product.title} — ${form.label}`,
    }))
    .filter((s): s is CardSlide => Boolean(s.src));
}

// ---------- Плейсхолдеры ----------

function CylinderPlaceholder() {
  return (
    <svg
      className={styles.placeholder}
      viewBox="0 0 64 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M26 4h12v10H26z" />
      <rect x="14" y="18" width="36" height="74" rx="12" />
    </svg>
  );
}

function TankPlaceholder() {
  return (
    <svg
      className={styles.placeholderTank}
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <rect x="6" y="16" width="72" height="36" rx="18" />
      <path d="M78 34h6" />
      <rect x="84" y="22" width="22" height="22" rx="3" />
      <circle cx="26" cy="62" r="7" />
      <circle cx="50" cy="62" r="7" />
      <circle cx="96" cy="62" r="7" />
    </svg>
  );
}

// ---------- Иконка цистерны ----------

function IconTank({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="8" width="13" height="7.5" rx="3.75" />
      <path d="M16.5 9.5h2.8l1.7 2.5v3.5h-4.5" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="14.5" cy="18" r="1.6" />
      <circle cx="19" cy="18" r="1.6" />
    </svg>
  );
}

export default function MiniProductCard({
  product,
  imageSizes = DEFAULT_IMAGE_SIZES,
  className,
}: MiniProductCardProps) {
  const hasTank = product.forms.some((f) => f.kind === 'tank');
  const slides = buildSlides(product);

  return (
    <article
      className={cx(
        styles.card,
        hasTank && styles.cardTank,
        className
      )}
    >
      {/* Ссылка на всю карточку */}
      <Link
        href={`/products/${product.slug}`}
        className={styles.cardLink}
        aria-label={`${product.title} — перейти к описанию`}
      />

      {/* Media */}
      <div className={styles.media}>
        {slides.length > 0 ? (
          <div className={styles.mediaInner}>
       <MediaSwitcher
  slides={slides}
  sizes="(max-width: 767px) 100vw, 480px"
  productTitle={product.title}
/>
          </div>
        ) : hasTank ? (
          <TankPlaceholder />
        ) : (
          <CylinderPlaceholder />
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>
          {product.title}
        </h3>

        <ul
          className={styles.badges}
          aria-label="Формы поставки"
        >
          {product.forms.map((form) => (
            <li
              key={form.kind}
              className={cx(
                styles.badge,
                form.kind === 'tank' && styles.badgeTank
              )}
            >
              {form.kind === 'tank' && (
                <IconTank className={styles.badgeIcon} />
              )}

              {form.label}
            </li>
          ))}
        </ul>

        <p className={styles.description}>
          {product.description}
        </p>

        <div className={styles.actions}>
          <PriceRequestButton
            productTitle={product.title}
            productSlug={product.slug}
            label="Заказать"
            requestKind="order"
            modalTitle="Оформить заказ"
            className={styles.order}
          />

          <PriceRequestButton
            productTitle={product.title}
            productSlug={product.slug}
            label="Запросить цену"
            requestKind="price"
            variant="outline"
            className={styles.price}
          />
        </div>
      </div>
    </article>
  );
}