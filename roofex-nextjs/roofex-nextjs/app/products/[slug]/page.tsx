export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { brand } from '@/lib/brand'
import { getAllSlugs, getProductBySlug } from '@/lib/products'
import ProductDetailPage from './ProductDetailPage'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.title} - ${brand.name}`,
    description: product.shortDescription,
  }
}

export default function Page({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetailPage product={product} />
}
