import { NextResponse } from 'next/server'
import { getCatalogStorageMode } from '@/lib/db/catalog-repository'
import { getCloudinaryFolder, isCloudinaryConfigured } from '@/lib/cloudinary'
import { isMongoConfigured } from '@/lib/db/mongodb'

export async function GET() {
  return NextResponse.json({
    storage: getCatalogStorageMode(),
    mongoConfigured: isMongoConfigured(),
    cloudinaryConfigured: isCloudinaryConfigured(),
    cloudinaryFolder: getCloudinaryFolder(),
    message:
      getCatalogStorageMode() === 'mongodb'
        ? 'Catalog is stored in MongoDB.'
        : 'Demo mode: catalog is stored locally. Add MONGODB_URI to use MongoDB.',
  })
}
