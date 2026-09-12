import Link from 'next/link';
import styles from './Products.module.scss';
import { PRODUCTS, PRODUCTS_HOME_LIMIT } from '../data/product';
import MiniProductCard from './MiniProductCard';

export default function Products() {
  const homeProducts = PRODUCTS.slice(0, PRODUCTS_HOME_LIMIT);

  return (
    <section className={styles.section} aria-labelledby="products-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="products-title" className={styles.title}>
            Наша продукция
          </h2>

          <Link href="/products" className={styles.allLink}>
            Смотреть весь каталог
            <span className={styles.allArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <ul className={styles.grid}>
          {homeProducts.map((product) => (
            <li key={product.slug}>
              <MiniProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}