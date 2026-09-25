import { SITE } from "@/components/config/site";

export default function JsonLdOrganization() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,

    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/icon.png`,

    telephone: SITE.phone,
    email: SITE.email,

    address: {
      "@type": "PostalAddress",
      ...SITE.addressDetails,
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "sales",
      areaServed: "RU",
      availableLanguage: ["ru"],

      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "https://schema.org/Monday",
            "https://schema.org/Tuesday",
            "https://schema.org/Wednesday",
            "https://schema.org/Thursday",
            "https://schema.org/Friday",
          ],
          opens: "08:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "https://schema.org/Saturday",
          opens: "09:00",
          closes: "13:00",
        },
      ],
    },

    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "ИНН",
        value: SITE.inn,
      },
      {
        "@type": "PropertyValue",
        propertyID: "ОГРН",
        value: SITE.ogrn,
      },
    ],

    sameAs: [SITE.maxUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}