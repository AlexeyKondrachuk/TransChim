export const SITE = {
  name: "ТрансХим",
  legalName: "ООО «Трансхим»",

  url: "https://transchim.ru",
  domain: "transchim.ru",

  phone: "+79277977709",
  phoneDisplay: "+7 (927) 797-77-09",
  phoneHref: "tel:+79277977709",

  email: "info@transchim.ru",

  inn: "6321465601",
  ogrn: "1216300002918",

  address:
    "445057, г. Тольятти, ул. 40 Лет Победы, здание 14, помещение 55",

  addressDetails: {
    postalCode: "445057",
    addressRegion: "Самарская область",
    addressLocality: "Тольятти",
    streetAddress: "ул. 40 Лет Победы, здание 14, помещение 55",
    addressCountry: "RU",
  },

  hours: "Пн–пт: 08:00–19:00\nСб: 09:00–13:00\nВс: выходной",

  mapCoords: [53.5303, 49.3469] as const,
  mapZoom: 16,

  maxUrl:
    "https://max.ru/u/f9LHodD0cOKeNJgOOVKKKzfJrgRD_7r-Yq4H7YT_d9htLhJMxPNQFbLywRM",
} as const;

export const CATALOG_LINKS = [
  { label: "Кислород технический", href: "/products/kislorod" },
  { label: "Азот", href: "/products/azot" },
  { label: "Аргон", href: "/products/argon" },
  {
    label: "Сварочная смесь K18",
    href: "/products/svarochnaya-smes-k18",
  },
  { label: "Весь каталог", href: "/products" },
] as const;

export const COMPANY_LINKS = [
  { label: "О компании", href: "/about" },
  { label: "Доставка", href: "/delivery" },
  { label: "Документы", href: "/documents" },
  { label: "Контакты", href: "/contacts" },
] as const;