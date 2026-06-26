'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Category, HeroBanner, Product } from '@/lib/product-types'
import { getDemoCatalog } from '@/lib/demo-catalog'
import {
  buildCategories,
  getBestSellers,
  getNewArrivals,
  normalizeProduct,
  type CategoryMeta,
  type StoredCatalog,
} from '@/lib/catalog-utils'

const DEMO_CATALOG = getDemoCatalog()

type CatalogContextValue = {
  products: Product[]
  categories: Category[]
  categoryMeta: CategoryMeta[]
  heroBanners: HeroBanner[]
  bestSellers: Product[]
  newArrivals: Product[]
  loading: boolean
  refresh: () => Promise<void>
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

function buildValue(stored: StoredCatalog, loading: boolean, refresh: () => Promise<void>): CatalogContextValue {
  const products = (stored.products ?? []).map(normalizeProduct)
  const categoryMeta = stored.categories ?? []
  const categories = buildCategories(products, categoryMeta)
  const heroBanners = [...(stored.banners ?? [])]
    .filter((banner) => banner.active && banner.image.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return {
    products,
    categories,
    categoryMeta,
    heroBanners,
    bestSellers: getBestSellers(products),
    newArrivals: getNewArrivals(products),
    loading,
    refresh,
  }
}

export function CatalogProvider({
  children,
  initialCatalog,
}: {
  children: ReactNode
  initialCatalog?: StoredCatalog
}) {
  const [stored, setStored] = useState<StoredCatalog>(initialCatalog ?? DEMO_CATALOG)
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/catalog', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load catalog')
      const data = (await res.json()) as StoredCatalog
      if (data?.products?.length) {
        setStored(data)
      }
    } catch {
      // Keep showing current demo / cached data — never blank the storefront.
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const onUpdate = () => refresh()
    window.addEventListener('catalog-updated', onUpdate)
    return () => window.removeEventListener('catalog-updated', onUpdate)
  }, [refresh])

  const value = useMemo(
    () => buildValue(stored, loading, refresh),
    [stored, loading, refresh],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) {
    throw new Error('useCatalog must be used within CatalogProvider')
  }
  return ctx
}
