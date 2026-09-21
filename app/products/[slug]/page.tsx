import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductDetails from '@/components/ProductDetails/ProductDetails';
import {
  getProductBySlug,
  PRODUCTS,
} from '@/components/data/product';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return {
    title: product.seoTitle ?? product.title,
    description: product.seoDescription ?? product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}