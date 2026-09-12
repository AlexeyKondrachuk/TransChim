import type { Metadata } from 'next';
import Image from 'next/image';
import PriceRequestButton from '@/components/PriceRequestButton/PriceRequestButton';

import styles from './documents.module.scss';
import { DOCS_PAGE } from '@/components/data/docs-page';

export const metadata: Metadata = {
  title: 'Документы',
  description:
    'Сертификаты соответствия, лицензии на перевозку опасных грузов и образцы документов ТрансХим. Копии предоставляем по запросу.',
};

function DocPlaceholder() {
  // Стилизованная заглушка: лист документа с печатью
  return (
    <svg
      className={styles.docPlaceholder}
      viewBox="0 0 64 84"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 4h28l12 12v64H12z" />
      <path d="M40 4v12h12" />
      <path d="M20 34h24M20 42h24M20 50h16" />
      <circle cx="44" cy="66" r="8" opacity="0.6" />
    </svg>
  );
}

export default function DocumentsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <h1 className={styles.title}>{DOCS_PAGE.title}</h1>
          <p className={styles.intro}>{DOCS_PAGE.intro}</p>
        </header>

        {DOCS_PAGE.groups.map((group) => (
          <section key={group.id} aria-labelledby={`docs-${group.id}`}>
            <h2 id={`docs-${group.id}`} className={styles.groupTitle}>
              {group.title}
            </h2>

            <ul className={styles.grid}>
              {group.docs.map((doc) => (
                <li key={doc.id} className={styles.card}>
                  <div className={styles.media}>
                    {doc.image ? (
                      <Image
                        src={doc.image}
                        alt={`Скан: ${doc.title}`}
                        fill
                        sizes="(max-width: 767px) 50vw, 33vw"
                        className={styles.image}
                      />
                    ) : (
                      <DocPlaceholder />
                    )}
                  </div>

                  <div className={styles.body}>
                    <h3 className={styles.docTitle}>{doc.title}</h3>
                    <p className={styles.docDescription}>{doc.description}</p>
                    {doc.details && <p className={styles.docDetails}>{doc.details}</p>}
                  </div>

                  {/* Кнопка: PDF есть → скачивание; нет → запрос на почту */}
                  <div className={styles.actions}>
                    {doc.file ? (
                      <a
                        href={doc.file}
                        download
                        className={styles.download}
                        aria-label={`Скачать: ${doc.title}`}
                      >
                        Скачать PDF
                        <span className={styles.downloadSize} aria-hidden="true">
                          PDF
                        </span>
                      </a>
                    ) : (
                      <PriceRequestButton
                        label="Запросить копию"
                        requestKind="request"
                        modalTitle="Запросить копию документа"
                        productTitle={doc.title}
                        className={styles.request}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}