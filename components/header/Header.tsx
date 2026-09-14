'use client'; // обязательна в App Router: компонент использует хуки

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import TranshimLogo from '../Logo/TranshimLogo';
import PriceRequestButton from '../PriceRequestButton/PriceRequestButton';
import IconMax from '../Icons/IconMax';
import IconPhone from '../Icons/IconPhone';
import IconMail from '../Icons/IconMail';
import { SITE } from '../config/site';

const NAV_LINKS = [
  { label: 'О компании', href: '/about' },
  { label: 'Продукция', href: '/products' },
  { label: 'Доставка', href: '/delivery' },
  { label: 'Документы', href: '/documents' },
  { label: 'Контакты', href: '/contacts' },
];

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

        {/* Десктоп: текстовые контакты + MAX рядом */}
        <div className={styles.contacts}>
          <div className={styles.contactText}>
            <a href={SITE.phoneHref} className={styles.phone}>
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className={styles.email}>
              {SITE.email}
            </a>
          </div>

          <a
            href={SITE.maxUrl}
            className={styles.messenger}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Мы в мессенджере MAX"
          >
            <IconMax size={32} />
          </a>
        </div>

        <PriceRequestButton
          label="Оставить заявку"
          requestKind="request"
          className={styles.cta}
        />

        {/* Мобильные/планшет: телефон, почта и MAX рядом с бургером */}
        <div className={styles.mobileActions}>
          <a
            href={SITE.phoneHref}
            className={styles.iconBtn}
            aria-label={`Позвонить: ${SITE.phoneDisplay}`}
          >
            <IconPhone size={20} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className={styles.iconBtn}
            aria-label={`Написать на ${SITE.email}`}
          >
            <IconMail size={20} />
          </a>
          <a
            href={SITE.maxUrl}
            className={styles.iconBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Мы в мессенджере MAX"
          >
            <IconMax size={24} />
          </a>
        </div>

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
      <div
        id="mobile-menu"
        className={cx(styles.mobileMenu, menuOpen && styles.mobileMenuOpen)}
      >
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

        {/* Текстовые контакты внизу оверлея — иконки уже есть в шапке */}
        <div className={styles.mobileContacts}>
          <a href={SITE.phoneHref} className={styles.phone}>
            {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`} className={styles.email}>
            {SITE.email}
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