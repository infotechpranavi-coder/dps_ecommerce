import 'server-only'

import fs from 'fs'
import path from 'path'
import { CATALOG_VERSION, getDemoCatalog } from './demo-catalog'
import {
  buildCategories,
  normalizeProduct,
  type StoredCatalog,
} from './catalog-utils'
import type { Category, Product } from './product-types'

export type { CategoryMeta, StoredCatalog } from './catalog-utils'
export {
  buildCategories,
  getBestSellers,
  getNewArrivals,
  slugify,
} from './catalog-utils'

const CATALOG_PATH = path.join(process.cwd(), 'data', 'catalog.json')

function getSeedCatalog(): StoredCatalog {
  return getDemoCatalog()
}

function needsReseed(data: StoredCatalog): boolean {
  return (
    (data.version ?? 0) < CATALOG_VERSION
    || !data.products?.length
    || !data.categories?.length
    || !data.banners?.length
  )
}

function normalizeCatalog(data: StoredCatalog): StoredCatalog {
  const seed = getSeedCatalog()
  const products = Array.isArray(data.products) ? data.products : seed.products
  const categories = Array.isArray(data.categories) ? data.categories : seed.categories
  return {
    version: data.version ?? CATALOG_VERSION,
    products: products.map(normalizeProduct),
    categories,
    banners: data.banners?.length ? data.banners : seed.banners,
    marqueeTerms:
      Array.isArray(data.marqueeTerms) && data.marqueeTerms.length
        ? data.marqueeTerms.map((term) => String(term).trim()).filter(Boolean)
        : seed.marqueeTerms,
  }
}

export function readCatalog(): { products: Product[]; categories: Category[] } {
  const stored = readStoredCatalog()
  const products = stored.products.map(normalizeProduct)
  return {
    products,
    categories: buildCategories(products, stored.categories),
  }
}

export function readStoredCatalog(): StoredCatalog {
  if (!fs.existsSync(CATALOG_PATH)) {
    const seed = getSeedCatalog()
    writeStoredCatalog(seed)
    return seed
  }

  try {
    const raw = fs.readFileSync(CATALOG_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as StoredCatalog
    if (needsReseed(parsed)) {
      const seed = getSeedCatalog()
      writeStoredCatalog(seed)
      return seed
    }
    return normalizeCatalog(parsed)
  } catch {
    const seed = getSeedCatalog()
    writeStoredCatalog(seed)
    return seed
  }
}

export function writeStoredCatalog(data: StoredCatalog) {
  fs.mkdirSync(path.dirname(CATALOG_PATH), { recursive: true })
  const payload = normalizeCatalog({ ...data, version: CATALOG_VERSION })
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(payload, null, 2), 'utf-8')
}
