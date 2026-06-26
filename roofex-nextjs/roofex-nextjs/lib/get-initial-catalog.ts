import 'server-only'

import { cache } from 'react'
import { getDemoCatalog } from '@/lib/demo-catalog'
import { getCatalogStorageMode, readCatalogFromDb } from '@/lib/db/catalog-repository'
import { readStoredCatalog } from '@/lib/catalog-store'
import type { StoredCatalog } from '@/lib/catalog-utils'

/** Cached per request — fast repeat reads during SSR. */
export const getInitialCatalog = cache(async (): Promise<StoredCatalog> => {
  try {
    if (getCatalogStorageMode() === 'mongodb') {
      return await readCatalogFromDb()
    }
    return readStoredCatalog()
  } catch {
    try {
      return readStoredCatalog()
    } catch {
      return getDemoCatalog()
    }
  }
})
