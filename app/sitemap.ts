// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/components/config/site';

const ROUTES = ['', '/about', '/products', '/delivery', '/documents', '/contacts', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}