import type { Metadata } from 'next';

import styles from './products.module.scss';
import { PRODUCTS_PAGE } from '@/components/data/products-page';
import { PRODUCTS } from '@/components/data/product';
import MiniProductCard from '@/components/products/MiniProductCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Наша продукция',
  description:
    'Каталог технических газов: кислород, азот, аргон, сварочные смеси, углекислота, пропан. Газообразные и жидкие формы поставки, доставка по всей России.',
};

export default function ProductsPage() {
  return (
    <section className={styles.page} aria-labelledby="catalog-title">
      <div className={styles.inner}>
           <nav aria-label="Навигация">
          <Link href="/" className={styles.back}>
            ← На главную
          </Link>
        </nav>
        <header className={styles.head}>
          <h1 id="catalog-title" className={styles.title}>
            {PRODUCTS_PAGE.title}
          </h1>
          <p className={styles.subtitle}>{PRODUCTS_PAGE.subtitle}</p>
        </header>

        <ul className={styles.grid}>
          {PRODUCTS.map((product) => (
            <li key={product.slug}>
              <MiniProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}