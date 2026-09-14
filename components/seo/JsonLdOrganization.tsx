import { SITE } from '@/components/config/site';

export default function JsonLdOrganization() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.png`,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    address: SITE.address, // в идеале разбить на streetAddress/addressLocality/addressCountry
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}