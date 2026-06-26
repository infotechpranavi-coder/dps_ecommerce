import type { StoredCatalog } from '@/lib/catalog-utils'
import { CATALOG_DOC_ID, getMongoDb, isMongoConfigured } from '@/lib/db/mongodb'
import { CATALOG_VERSION, getDemoCatalog } from '@/lib/demo-catalog'

const CATALOG_FILTER = { _id: CATALOG_DOC_ID } as Record<string, unknown>

type CatalogDocument = StoredCatalog & { _id: string }

export type CatalogStorageMode = 'mongodb' | 'file' | 'demo'

export function getCatalogStorageMode(): CatalogStorageMode {
  if (isMongoConfigured()) return 'mongodb'
  return 'file'
}

async function seedMongoCatalog(): Promise<StoredCatalog> {
  const seed = getDemoCatalog()
  const db = await getMongoDb()
  await db.collection('catalog').replaceOne(
    CATALOG_FILTER,
    { ...seed, _id: CATALOG_DOC_ID },
    { upsert: true },
  )
  return seed
}

export async function readCatalogFromDb(): Promise<StoredCatalog> {
  if (!isMongoConfigured()) {
    throw new Error('MongoDB is not configured')
  }

  const db = await getMongoDb()
  const doc = (await db.collection('catalog').findOne(CATALOG_FILTER)) as CatalogDocument | null

  if (!doc || !doc.products?.length) {
    return seedMongoCatalog()
  }

  if ((doc.version ?? 0) < CATALOG_VERSION) {
    return seedMongoCatalog()
  }

  const { _id: _removed, ...catalog } = doc
  return catalog
}

export async function writeCatalogToDb(data: StoredCatalog): Promise<void> {
  if (!isMongoConfigured()) {
    throw new Error('MongoDB is not configured')
  }

  const db = await getMongoDb()
  await db.collection('catalog').replaceOne(
    CATALOG_FILTER,
    { ...data, version: CATALOG_VERSION, _id: CATALOG_DOC_ID },
    { upsert: true },
  )
}
