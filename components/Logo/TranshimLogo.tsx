import Image from 'next/image';
import styles from './TranshimLogo.module.scss';
import logoWhiteSrc from './logo-white.webp'; // положить рядом
import logoSrc from './logo.webp';

type TranshimLogoProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** white — белая версия для тёмных фонов (футер, тёмные секции) */
  variant?: 'default' | 'white';
  ariaLabel?: string | null;
  className?: string;
  priority?: boolean;
};

const SOURCES = {
  default: logoSrc,
  white: logoWhiteSrc,
} as const;

// Пресеты ВЫСОТЫ. Ширина выводится из пропорций самого файла.
const SIZES = {
  xs: 34,
  sm: 44,
  md: 64,
  lg: 96,
} as const;

const DEFAULT_LABEL = 'ТрансХим — технические газы, поставки, сервис';

export function TranshimLogo({
  size = 'md',
  ariaLabel,
  className,
  priority = false,
  variant = 'default'
}: TranshimLogoProps) {
  const cx = [styles.logo, styles[size], className].filter(Boolean).join(' ');
  const decorative = ariaLabel === null;
const src = SOURCES[variant];
  // Ожидаемая CSS-ширина — только для подсказки sizes (выбор файла в srcset)
  const cssWidth = Math.round(SIZES[size] * (logoSrc.width / logoSrc.height));

  return (
    <Image
      src={src}
      alt={decorative ? '' : ariaLabel ?? DEFAULT_LABEL}
      priority={priority}
      className={cx}
      sizes={`${cssWidth}px`}
    />
  );
}

export default TranshimLogo;