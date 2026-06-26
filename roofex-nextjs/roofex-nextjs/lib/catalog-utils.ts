import type { Category, HeroBanner, Product } from './product-types'
import { jewelleryGallery, productImageForCategory, defaultProductImage } from './product-images'

export type CategoryMeta = Omit<Category, 'count'>

export type StoredCatalog = {
  version?: number
  products: Product[]
  categories: CategoryMeta[]
  banners: HeroBanner[]
}

function countByCategory(name: string, products: Product[]) {
  const count = products.filter((p) => p.category === name).length
  return `${count} piece${count !== 1 ? 's' : ''}`
}

export function buildCategories(products: Product[], meta: CategoryMeta[]): Category[] {
  return meta.map((cat) => ({
    ...cat,
    count: countByCategory(cat.title, products),
  }))
}

export function normalizeProduct(product: Product): Product {
  const isCloudinary = product.img?.includes('res.cloudinary.com')
  const img = isCloudinary
    ? product.img
    : productImageForCategory(product.category) || product.img || defaultProductImage
  const images = isCloudinary && product.images?.length
    ? product.images
    : jewelleryGallery(img)
  return {
    ...product,
    img,
    images,
    isBestSeller:
      product.isBestSeller ??
      ['Best Seller', 'Top Rated'].includes(product.badge ?? ''),
  }
}

export function getBestSellers(products: Product[], limit = 4) {
  return products.filter((p) => p.isBestSeller).slice(0, limit)
}

export function getNewArrivals(products: Product[], limit = 8) {
  return products.filter((p) => p.isNew).slice(0, limit)
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''))
}
