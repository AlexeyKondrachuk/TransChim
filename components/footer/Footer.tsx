import { SITE, CATALOG_LINKS, COMPANY_LINKS } from "@/components/config/site";
import styles from "./Footer.module.scss";
import TranshimLogo from "../Logo/TranshimLogo";
import Link from "next/link";
import PriceRequestButton from "../PriceRequestButton/PriceRequestButton";
import IconMax from "../Icons/IconMax";

export default function Footer() {
  const year = new Date().getFullYear();



  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* ---------- Блок бренда ---------- */}
          <div className={styles.about}>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="ТрансХим — на главную"
            >
              <TranshimLogo size="sm" variant="white" ariaLabel={null} />
            </Link>

            <p className={styles.desc}>
              Поставка технических газов для промышленных предприятий.
            </p>

            <a
              href={SITE.maxUrl}
              className={styles.messenger}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Мы в мессенджере MAX"
            >
              <IconMax size={40} />
            </a>
          </div>

          {/* ---------- Каталог ---------- */}
          <nav className={styles.col} aria-label="Каталог">
            <h3 className={styles.colTitle}>Каталог</h3>
            <ul className={styles.list}>
              {CATALOG_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={styles.listLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Компания ---------- */}
          <nav className={styles.col} aria-label="Компания">
            <h3 className={styles.colTitle}>Компания</h3>
            <ul className={styles.list}>
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={styles.listLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Контакты ---------- */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Контакты</h3>
            <ul className={styles.list}>
              <li>
                <a href={SITE.phoneHref} className={styles.phone}>
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={styles.listLink}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <address className={styles.address}>
                  <span className={styles.contactLabel}>Юридический адрес</span>
                  {SITE.address}
                </address>
              </li>

              <li>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Время работы</span>
                  {SITE.hours}
                </div>
              </li>

              <li>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>{SITE.legalName}</span>
                  ИНН {SITE.inn}
                </div>
              </li>
            </ul>

            {/* Пока ведёт на звонок; когда будет форма — заменить на открытие модалки */}
            <PriceRequestButton
              label="Заказать звонок"
              requestKind="callback"
              className={styles.callback}
            />
          </div>
        </div>

        {/* ---------- Нижняя строка ---------- */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © 2010–{year} {SITE.name}. Все права защищены.
          </p>
          <Link href="/privacy" className={styles.privacy}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
