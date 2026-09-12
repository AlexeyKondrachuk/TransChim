'use client'; // обязательна в App Router: компонент использует хуки

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import TranshimLogo from '../Logo/TranshimLogo';
import PriceRequestButton from '../PriceRequestButton/PriceRequestButton';

const NAV_LINKS = [
  { label: 'О компании', href: '/about' },
  { label: 'Продукция', href: '/products' },
  { label: 'Доставка', href: '/delivery' },
  { label: 'Документы', href: '/documents' },
  { label: 'Контакты', href: '/contacts' },
];

const PHONE = '+7 (495) 123-45-67';
const PHONE_HREF = 'tel:+74951234567';
const EMAIL = 'info@transhim.ru';

// tel:/mailto:/якоря — обычные <a>, внутренние страницы — <Link>
const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="ТрансХим — на главную">
      <TranshimLogo size="xs" ariaLabel={null} priority />
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  // Блокируем прокрутку страницы при открытом меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // При открытом меню шапка всегда видима
  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeMenu]);

  // Закрываем меню при расширении до десктопа
  // (иначе body останется заблокированным после resize)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)'); // = $bp-lg
    const onChange = () => mq.matches && closeMenu();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [closeMenu]);

  // Hide-on-scroll: прячем при скролле вниз, показываем при скролле вверх
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 100 && !menuOpen);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return (
    <header className={cx(styles.header, hidden && styles.headerHidden)}>
      <div className={styles.inner}>
        <Logo />

        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cx(
                    styles.navLink,
                    pathname === href && styles.navLinkActive
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contacts}>
          <a href={PHONE_HREF} className={styles.phone}>
            {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className={styles.email}>
            {EMAIL}
          </a>
        </div>

      <PriceRequestButton
  label="Оставить заявку"
  requestKind="request"
  className={styles.cta}
/>

        <button
          type="button"
          className={cx(styles.burger, menuOpen && styles.burgerActive)}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Полноэкранное мобильное меню */}
      <div id="mobile-menu" className={cx(styles.mobileMenu, menuOpen && styles.mobileMenuOpen)}>
        <nav aria-label="Мобильная навигация">
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cx(
                    styles.mobileNavLink,
                    pathname === href && styles.mobileNavLinkActive
                  )}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileContacts}>
          <a href={PHONE_HREF} className={styles.phone}>
            {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className={styles.email}>
            {EMAIL}
          </a>
        </div>

    <PriceRequestButton
  label="Оставить заявку"
  requestKind="request"
  className={styles.cta}
  onOpen={closeMenu}
/>
      </div>
    </header>
  );
}