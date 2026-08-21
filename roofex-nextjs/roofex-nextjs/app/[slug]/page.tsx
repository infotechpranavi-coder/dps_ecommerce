export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { brand } from '@/lib/brand'
import { getAllSlugs, getProductBySlug } from '@/lib/products'
import ProductDetailPage from '@/app/products/[slug]/ProductDetailPage'

type Props = { params: { slug: string } }

const RESERVED = new Set([
  'about',
  'api',
  'categories',
  'contact',
  'dashboard',
  'faq',
  'products',
  'sectors',
])

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  if (RESERVED.has(params.slug)) return { title: brand.name }
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.title} - ${brand.name}`,
    description: product.shortDescription,
  }
}

export default function Page({ params }: Props) {
  if (RESERVED.has(params.slug)) notFound()
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetailPage product={product} />
}
