import { NextResponse } from 'next/server'
import {
  getCatalogStorageMode,
  readCatalogFromDb,
  writeCatalogToDb,
} from '@/lib/db/catalog-repository'
import { isCloudinaryConfigured } from '@/lib/cloudinary'
import {
  normalizeCatalog,
  readStoredCatalog,
  writeStoredCatalog,
  type StoredCatalog,
} from '@/lib/catalog-store'
import { CATALOG_VERSION, getDemoCatalog } from '@/lib/demo-catalog'

/** ~12MB — leaves headroom under MongoDB's 16MB document limit. */
const MAX_CATALOG_JSON_BYTES = 12 * 1024 * 1024

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

async function saveCatalog(data: StoredCatalog): Promise<StoredCatalog> {
  const payload = normalizeCatalog({ ...data, version: CATALOG_VERSION })

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

  return payload
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
    const raw = await request.text()
    if (raw.length > MAX_CATALOG_JSON_BYTES) {
      return NextResponse.json(
        {
          error:
            'Catalog is too large to save (likely embedded image data). Re-upload images via Cloudinary/URL instead of huge local data URLs.',
        },
        { status: 413 },
      )
    }

    const body = JSON.parse(raw) as StoredCatalog
    if (!body?.products || !body?.categories) {
      return NextResponse.json({ error: 'Invalid catalog payload' }, { status: 400 })
    }

    const payload: StoredCatalog = {
      ...body,
      banners: Array.isArray(body.banners) ? body.banners : [],
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
