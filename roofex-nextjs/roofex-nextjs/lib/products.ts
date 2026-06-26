import 'server-only'

import { demoCategoryMeta, demoProducts } from './demo-catalog'
import type { Category, LimitedProduct, Product } from './product-types'

export type { Category, LimitedProduct, Product } from './product-types'

const catalog: Product[] = demoProducts
const categoryMeta = demoCategoryMeta

export const seedCatalogProducts: Product[] = catalog
export { categoryMeta as seedCategoryMeta }

function getCatalogSnapshot() {
  const { readCatalog } = require('./catalog-store') as typeof import('./catalog-store')
  return readCatalog()
}

export function getAllProducts(): Product[] {
  return getCatalogSnapshot().products
}

export function getCategories(): Category[] {
  return getCatalogSnapshot().categories
}

export function getBestSellersList(limit = 4): Product[] {
  const { getBestSellers } = require('./catalog-store') as typeof import('./catalog-store')
  return getBestSellers(getAllProducts(), limit)
}

export function getNewArrivalsList(limit = 8): Product[] {
  const { getNewArrivals } = require('./catalog-store')
  return getNewArrivals(getAllProducts(), limit)
}

/** @deprecated Use getAllProducts() */
export const allProducts: Product[] = catalog

/** @deprecated Use getBestSellersList() */
export const bestSellers: Product[] = catalog.filter((p) =>
  ['Best Seller', 'Top Rated'].includes(p.badge ?? ''),
).slice(0, 4)

/** @deprecated Use getNewArrivalsList() */
export const newArrivals: Product[] = catalog.filter((p) => p.isNew).slice(0, 8)

export const limitedProducts: LimitedProduct[] = catalog
  .filter((p) => p.isLimited)
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    price: p.price,
    img: p.img,
    units: p.stockCount ? `Only ${p.stockCount} left` : 'Limited stock',
    description: p.shortDescription,
  }))

function countByCategory(name: string, products: Product[] = catalog) {
  const count = products.filter((p) => p.category === name).length
  return `${count} piece${count !== 1 ? 's' : ''}`
}

/** @deprecated Use getCategories() */
export const categories: Category[] = categoryMeta.map((cat) => ({
  ...cat,
  count: countByCategory(cat.title),
}))

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit)
}

export type CategoryProductGroup = {
  title: string
  slug: string
  description: string
  products: Product[]
}

export function getOtherCategoryGroups(
  product: Product,
  productsPerCategory = 3,
  maxGroups = 3,
): CategoryProductGroup[] {
  const cats = getCategories()
  return cats
    .filter((c) => c.title !== product.category)
    .map((c) => ({
      title: c.title,
      slug: c.slug,
      description: c.description,
      products: getAllProducts().filter((p) => p.category === c.title).slice(0, productsPerCategory),
    }))
    .filter((g) => g.products.length > 0)
    .slice(0, maxGroups)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug)
}

export function getCategoryHref(categoryTitle: string): string {
  const cat = getCategories().find((c) => c.title === categoryTitle)
  return cat ? `/products?category=${cat.slug}` : '/categories'
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((p) => p.category === category)
}

export function getAllSlugs(): string[] {
  return getAllProducts().map((p) => p.slug)
}
