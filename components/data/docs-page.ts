// ============================================================
//  Реестр документов компании.
//  Пока сканов нет — карточки показывают заглушки,
//  ссылки на PDF отключены. Появятся файлы — раскомментировать
//  file и image, страница оживёт без правок кода.
// ============================================================

export type CompanyDoc = {
  id: string;
  title: string;
  /** Что документ подтверждает — подпись под карточкой */
  description: string;
  /** Путь к PDF в public/docs/. Нет файла — нет ссылки */
  file?: string;
  /** Превью-скан в public/images/docs/. Нет — плейсхолдер */
  image?: string;
  /** Номер и дата документа, если хотите показать */
  details?: string;
};

export const DOCS_PAGE = {
  title: 'Документы',
  intro:
    'Качество продукции подтверждено документально. По запросу предоставим сертификаты и паспорта качества на любую партию.',

  groups: [
    {
      id: 'certs',
      title: 'Сертификаты и декларации',
      docs: [
        {
          id: 'gost-cert',
          title: 'Сертификат соответствия ГОСТ',
          description:
            'Подтверждает соответствие выпускаемой продукции требованиям государственных стандартов',
          // file: '/docs/gost-cert.pdf',
          // image: '/images/docs/gost-cert.webp',
          // details: '№ РОСС RU.0001.21АЕ00 от 15.03.2024',
        },
        {
          id: 'declaration-tamozhnya',
          title: 'Декларация о соответствии ТР ТС',
          description:
            'Декларация соответствия техническим регламентам Таможенного союза',
          // file: '/docs/declaration-tr-ts.pdf',
        },
      ] as CompanyDoc[],
    },
    {
      id: 'licenses',
      title: 'Лицензии',
      docs: [
        {
          id: 'license-transport',
          title: 'Лицензия на перевозку опасных грузов',
          description:
            'Право транспортировки опасных грузов автомобильным транспортом',
          // file: '/docs/license-transport.pdf',
        },
      ] as CompanyDoc[],
    },
    {
      id: 'sample',
      title: 'Образцы документов',
      docs: [
        {
          id: 'passport-sample',
          title: 'Паспорт качества (образец)',
          description:
            'Пример паспорта качества, который мы выдаём на каждую партию продукции',
          // file: '/docs/passport-sample.pdf',
        },
      ] as CompanyDoc[],
    },
  ],
};