import { buildCategories } from './catalog-utils'
import { demoCategoryMeta, demoProducts } from './demo-catalog'

export type ProductHighlight = {
  title: string
  slug: string
  img: string
  href: string
  count: string
  description: string
}

const categories = buildCategories(demoProducts, demoCategoryMeta)

export function getKvsCategoryHref(slug: string): string {
  return `/products?category=${slug}`
}

export const kvsProductCategories = categories

export const productHighlights: ProductHighlight[] = categories.map((cat) => ({
  title: cat.title,
  slug: cat.slug,
  img: cat.img,
  href: getKvsCategoryHref(cat.slug),
  count: cat.count,
  description: cat.description,
}))

export type ProductScrollBlock = {
  id: string
  label: string
  text: string
  image: string
  alt: string
  href: string
}

export const productScrollBlocks: ProductScrollBlock[] = categories.map((cat) => ({
  id: cat.slug,
  label: cat.title,
  text: cat.description,
  image: cat.img,
  alt: cat.title,
  href: getKvsCategoryHref(cat.slug),
}))

export const productMarqueeTerms: string[] = categories.map((cat) => cat.title.toUpperCase())
