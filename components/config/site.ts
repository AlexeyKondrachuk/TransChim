export const SITE = {
  name: 'ТрансХим',
  legalName: 'ООО «Трансхим»',
  domen: 'transhim.ru',
  phoneDisplay: '+7 (927) 977-77-09', // мобильный: формат с федеральной записью
  phoneHref: 'tel:+79277977709',
  email: 'info@transchim.ru',
  inn: '6321465601',               // ← от заказчика, обязателен
  ogrn: '1106300000000', 
  address: '445057, г. Тольятти, ул. 40 Лет Победы, здание 14, помещение 55',
  hours: 'Пн–Пт: 9:00–18:00, Сб–Вс: выходные', // ← сверьте с реальным графиком
  /** Тольятти, 40 Лет Победы, 14 — замените точные координаты:
   *  Яндекс.Карты → правый клик по зданию → «Что здесь?» */
  mapCoords: [53.5303, 49.3469] as [number, number],
  mapZoom: 16,
  maxUrl: 'https://max.ru/',
} as const;

// Растёт вместе с каталогом: добавили продукт — добавили ссылку
export const CATALOG_LINKS = [
  { label: 'Кислород технический', href: '/products/kislorod' },
  { label: 'Азот', href: '/products/azot' },
  { label: 'Аргон', href: '/products/argon' },
  { label: 'Сварочная смесь K18', href: '/products/svarochnaya-smes-k18' },
  { label: 'Весь каталог', href: '/products' },
];

export const COMPANY_LINKS = [
  { label: 'О компании', href: '/about' },
  { label: 'Доставка', href: '/delivery' },
  { label: 'Документы', href: '/documents' },
  { label: 'Контакты', href: '/contacts' },
];

