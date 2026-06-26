/**
 * Seeds demo catalog into MongoDB with images hosted on Cloudinary (DBS_ECOMMCERCE folder).
 * Run: npm run seed
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { MongoClient } from 'mongodb'
import { getDemoCatalog, CATALOG_VERSION } from '../lib/demo-catalog'
import { cloudinaryDeliveryUrl, uploadRemoteImage } from '../lib/seed-upload'
import type { StoredCatalog } from '../lib/catalog-utils'

function loadEnvFile() {
  const envPath = join(process.cwd(), '.env.local')
  const text = readFileSync(envPath, 'utf8').replace(/^\uFEFF/, '')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    process.env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim()
  }
}

async function seedCatalog(): Promise<StoredCatalog> {
  const demo = getDemoCatalog()
  const categoryImgBySlug = new Map<string, string>()

  console.log('Uploading category images to Cloudinary…')
  for (const cat of demo.categories) {
    const url = await uploadRemoteImage(cat.img, 'categories', cat.slug)
    categoryImgBySlug.set(cat.slug, cloudinaryDeliveryUrl(url, 800))
    console.log(`  ✓ ${cat.title}`)
  }

  console.log('Uploading hero banners to Cloudinary…')
  const banners = []
  for (const banner of demo.banners) {
    const url = await uploadRemoteImage(banner.image, 'banners', banner.id)
    banners.push({
      ...banner,
      image: cloudinaryDeliveryUrl(url, 1600),
    })
    console.log(`  ✓ ${banner.alt}`)
  }

  console.log('Mapping product images from Cloudinary categories…')
  const categoryTitleToSlug: Record<string, string> = {
    'Necklace Sets': 'necklace-sets',
    Earrings: 'earrings',
    'Bangles & Bracelets': 'bangles-bracelets',
    Rings: 'rings',
    'Bridal Collection': 'bridal-collection',
    'Limited Edition': 'limited-edition',
  }

  const products = demo.products.map((product) => {
    const slug = categoryTitleToSlug[product.category]
    const img = cloudinaryDeliveryUrl(categoryImgBySlug.get(slug ?? '') || product.img, 700)
    return {
      ...product,
      img,
      images: [img],
    }
  })

  const categories = demo.categories.map((cat) => ({
    ...cat,
    img: categoryImgBySlug.get(cat.slug) ?? cat.img,
  }))

  return {
    version: CATALOG_VERSION,
    products,
    categories,
    banners,
  }
}

async function writeMongo(catalog: StoredCatalog) {
  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB_NAME || 'dbs_ecommerce'
  if (!uri) throw new Error('MONGODB_URI missing in .env.local')

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  await db.collection('catalog').replaceOne(
    { _id: 'main' } as Record<string, unknown>,
    { ...catalog, _id: 'main' },
    { upsert: true },
  )
  await client.close()
  console.log(`MongoDB seeded → database "${dbName}", collection "catalog"`)
}

function writeLocalMirror(catalog: StoredCatalog) {
  const dir = join(process.cwd(), 'data')
  mkdirSync(dir, { recursive: true })
  const path = join(dir, 'catalog.json')
  writeFileSync(path, JSON.stringify(catalog, null, 2), 'utf8')
  console.log(`Local mirror saved → ${path}`)
}

async function main() {
  loadEnvFile()

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary env vars missing in .env.local')
  }

  console.log(`Seeding catalog v${CATALOG_VERSION} → Cloudinary folder ${process.env.CLOUDINARY_FOLDER || 'DBS_ECOMMCERCE'}`)
  const catalog = await seedCatalog()
  await writeMongo(catalog)
  writeLocalMirror(catalog)
  console.log(`Done — ${catalog.products.length} products, ${catalog.categories.length} categories, ${catalog.banners.length} banners`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
