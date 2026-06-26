import { NextResponse } from 'next/server'
import {
  getCatalogStorageMode,
  readCatalogFromDb,
  writeCatalogToDb,
} from '@/lib/db/catalog-repository'
import { isCloudinaryConfigured } from '@/lib/cloudinary'
import { readStoredCatalog, writeStoredCatalog, type StoredCatalog } from '@/lib/catalog-store'
import { CATALOG_VERSION, getDemoCatalog } from '@/lib/demo-catalog'

async function loadCatalog(): Promise<StoredCatalog> {
  if (getCatalogStorageMode() === 'mongodb') {
    return readCatalogFromDb()
  }
  return readStoredCatalog()
}

async function saveCatalog(data: StoredCatalog): Promise<void> {
  const payload = { ...data, version: CATALOG_VERSION }
  if (getCatalogStorageMode() === 'mongodb') {
    await writeCatalogToDb(payload)
  }
  // Always mirror to local file so server-rendered pages stay in sync.
  writeStoredCatalog(payload)
}

export async function GET() {
  const storage = getCatalogStorageMode()
  try {
    const catalog = await loadCatalog()
    return NextResponse.json(catalog, {
      headers: {
        'X-Catalog-Storage': storage,
        'X-Cloudinary-Configured': String(isCloudinaryConfigured()),
        'Cache-Control': 'private, max-age=30, stale-while-revalidate=120',
      },
    })
  } catch {
    try {
      const catalog = readStoredCatalog()
      return NextResponse.json(catalog, {
        headers: {
          'X-Catalog-Storage': 'file',
          'X-Cloudinary-Configured': String(isCloudinaryConfigured()),
        },
      })
    } catch {
      return NextResponse.json(getDemoCatalog(), {
        headers: {
          'X-Catalog-Storage': 'demo',
          'X-Cloudinary-Configured': String(isCloudinaryConfigured()),
        },
      })
    }
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as StoredCatalog
    if (!body?.products || !body?.categories) {
      return NextResponse.json({ error: 'Invalid catalog payload' }, { status: 400 })
    }
    const payload: StoredCatalog = {
      ...body,
      banners: body.banners ?? [],
    }
    await saveCatalog(payload)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save catalog' }, { status: 500 })
  }
}

