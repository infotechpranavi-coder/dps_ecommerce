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
    try {
      return await Promise.race([
        readCatalogFromDb(),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('MongoDB read timed out')), 5000)
        }),
      ])
    } catch (error) {
      console.error('[api/catalog] MongoDB read failed — using file catalog:', error)
      return readStoredCatalog()
    }
  }
  return readStoredCatalog()
}

async function saveCatalog(data: StoredCatalog): Promise<void> {
  const payload = { ...data, version: CATALOG_VERSION }

  // Always persist to local file first so dashboard saves stay reliable.
  writeStoredCatalog(payload)

  if (getCatalogStorageMode() === 'mongodb') {
    // Don't block the dashboard on a slow/unreachable Mongo cluster.
    void Promise.race([
      writeCatalogToDb(payload),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('MongoDB write timed out')), 8000)
      }),
    ]).catch((error) => {
      console.error('[api/catalog] MongoDB write failed — file save kept:', error)
    })
  }
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
      marqueeTerms: Array.isArray(body.marqueeTerms) ? body.marqueeTerms : [],
    }
    await saveCatalog(payload)
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save catalog'
    console.error('[api/catalog PUT]', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

