import Link from 'next/link';

import PriceRequestButton from '@/components/PriceRequestButton/PriceRequestButton';

import styles from './ProductDetails.module.scss';
import { Product, SupplyFormKind } from '../data/product';
import MediaSwitcher from '../products/MediaSwitcher';
import { cx } from '@/lib/cx';

// Слайды — та же логика наследования, что в карточке
type DetailSlide = { kind: SupplyFormKind; src: string; alt: string };

function buildSlides(product: Product): DetailSlide[] {
  return product.forms
    .map((form) => ({
      kind: form.kind,
      src: form.image ?? (form.kind === 'cylinder' ? product.image : undefined),
      alt:
        form.alt ??
        (form.kind === 'cylinder' ? product.alt : undefined) ??
        `${product.title} — ${form.label}`,
    }))
    .filter((s): s is DetailSlide => Boolean(s.src));
}

const FORM_KIND_LABEL: Record<SupplyFormKind, string> = {
  cylinder: 'Баллон',
  tank: 'Цистерна',
};

export default function ProductDetails({ product }: { product: Product }) {
  const slides = buildSlides(product);

  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        {/* ---------- Навигация назад ---------- */}
        <nav aria-label="Навигация по каталогу">
          <Link href="/products" className={styles.back}>
            ← Вся продукция
          </Link>
        </nav>

        {/* ---------- Верх: галерея + покупка ---------- */}
        <div className={styles.hero}>
          <div className={styles.media}>
            {slides.length > 0 ? (
              <MediaSwitcher slides={slides} sizes="(max-width: 767px) 100vw, 480px" />
            ) : (
              <p className={styles.noPhoto}>Фото появится позже</p>
            )}
          </div>

          <div className={styles.buy}>
            <h1 className={styles.title}>{product.title}</h1>

            {product.composition && (
              <p className={styles.composition}>{product.composition}</p>
            )}

            <p className={styles.lead}>{product.description}</p>

            {/* Формы поставки как маркированный список */}
         <ul className={styles.forms} aria-label="Формы поставки">
  {product.forms.map((form) => (
    <li key={form.kind} className={styles.form}>
   <span
  className={cx(
    styles.formKind,
    form.kind === 'tank' && styles.formKindWide
  )}
>
  {form.kind === 'tank'
    ? `Жидкий ${product.title.toLowerCase()}`
    : FORM_KIND_LABEL[form.kind]}
</span>
      <span>
        {form.label}
        {form.note && <span className={styles.formNote}> — {form.note}</span>}
      </span>
    </li>
  ))}
</ul>

         <div className={styles.actions}>
  <PriceRequestButton
    productTitle={product.title}
    productSlug={product.slug}
    className={styles.priceBtn}
  />
  <PriceRequestButton
    productTitle={product.title}
    productSlug={product.slug}
    label="Заказать"
    modalTitle="Оформить заказ"
    variant="outline"
    className={styles.orderBtn}
  />
</div>
          </div>
        </div>

        {/* ---------- Описание ---------- */}
        <section className={styles.section} aria-labelledby="desc-title">
          <h2 id="desc-title" className={styles.sectionTitle}>Описание</h2>
          {product.fullDescription?.length ? (
            product.fullDescription.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>{paragraph}</p>
            ))
          ) : (
            <p className={styles.paragraph}>{product.description}</p>
          )}
        </section>

        {/* ---------- Характеристики ---------- */}
        {product.specs && (
          <section className={styles.section} aria-labelledby="specs-title">
            <h2 id="specs-title" className={styles.sectionTitle}>Характеристики</h2>
            <div className={styles.specsGrid}>
              {product.specs.map((table) => (
                <div key={table.title} className={styles.specTable}>
                  <h3 className={styles.specTitle}>{table.title}</h3>
                  <table className={styles.table}>
                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row.label}>
                          <th scope="row">{row.label}</th>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}