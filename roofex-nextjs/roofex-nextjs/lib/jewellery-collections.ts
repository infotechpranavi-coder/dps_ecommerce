import { demoCategoryMeta } from './demo-catalog'
import { categoryImages, defaultProductImage } from './product-images'

export type JewelleryCollection = {
  slug: string
  title: string
  name: string
  img: string
  tagline: string
  description: string
  count: string
}

/** Reliable product images for category cards (homepage + collections). */
export const categoryImageBySlug = categoryImages

const defaultCounts: Record<string, string> = {
  'necklace-sets': '4 pieces',
  earrings: '4 pieces',
  'bangles-bracelets': '4 pieces',
  rings: '3 pieces',
  'bridal-collection': '3 pieces',
  'limited-edition': '2 pieces',
}

export function getCategoryImage(slug: string, fallback = ''): string {
  return categoryImageBySlug[slug] || fallback || defaultProductImage
}

const shortTaglines: Record<string, string> = {
  'necklace-sets': 'Premium products for retail and wholesale buyers',
  earrings: 'Everyday essentials with consistent quality and supply',
  'bangles-bracelets': 'Core products with reliable stock and clear details',
  rings: 'Signature items with export-ready presentation',
  'bridal-collection': 'Featured edits for seasonal and bulk orders',
  'limited-edition': 'Small-batch products with limited availability',
}

export const jewelleryCollections: JewelleryCollection[] = demoCategoryMeta.map((cat) => ({
  slug: cat.slug,
  title: cat.title,
  name: cat.title,
  img: getCategoryImage(cat.slug, cat.img),
  tagline: shortTaglines[cat.slug] ?? cat.description.split('.')[0] ?? cat.description,
  description: cat.description,
  count: defaultCounts[cat.slug] ?? '0 pieces',
}))

export function mergeCatalogCounts(
  collections: JewelleryCollection[],
  catalogCategories: { slug: string; count: string }[],
): JewelleryCollection[] {
  const countMap = Object.fromEntries(catalogCategories.map((c) => [c.slug, c.count]))
  return collections.map((item) => ({
    ...item,
    count: countMap[item.slug] ?? item.count,
  }))
}
