// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/components/config/site';
import { PRODUCTS } from '@/components/data/product';


export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url,                        changeFrequency: 'weekly',  priority: 1 },
    { url: `${SITE.url}/products`,          changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/contacts`,          changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/delivery`,          changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/about`,             changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/documents`,         changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${SITE.url}/privacy`,           changeFrequency: 'yearly',  priority: 0.2 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE.url}/products/${p.slug}`, 
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}