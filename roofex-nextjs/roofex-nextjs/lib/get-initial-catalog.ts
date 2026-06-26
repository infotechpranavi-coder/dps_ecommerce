import 'server-only'

import { getDemoCatalog } from '@/lib/demo-catalog'
import { getCatalogStorageMode, readCatalogFromDb } from '@/lib/db/catalog-repository'
import { readStoredCatalog } from '@/lib/catalog-store'
import type { StoredCatalog } from '@/lib/catalog-utils'

/** Server-side catalog for instant first paint — falls back to demo data. */
export async function getInitialCatalog(): Promise<StoredCatalog> {
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
}
