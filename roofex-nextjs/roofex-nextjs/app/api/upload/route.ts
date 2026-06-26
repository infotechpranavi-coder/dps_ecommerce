import { NextResponse } from 'next/server'
import {
  isCloudinaryConfigured,
  uploadBannerImage,
  uploadCategoryImage,
  uploadProductImage,
} from '@/lib/cloudinary'

type UploadKind = 'products' | 'categories' | 'banners'

export async function POST(request: Request) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 503 })
  }

  try {
    const form = await request.formData()
    const file = form.get('file')
    const kind = (form.get('kind') as UploadKind | null) || 'products'
    const remoteUrl = form.get('url')

    const uploaders = {
      products: uploadProductImage,
      categories: uploadCategoryImage,
      banners: uploadBannerImage,
    } as const

    const upload = uploaders[kind] ?? uploadProductImage

    if (file instanceof File && file.size > 0) {
      const result = await upload(file)
      return NextResponse.json(result)
    }

    if (typeof remoteUrl === 'string' && remoteUrl.trim()) {
      const result = await upload(remoteUrl.trim())
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: 'No file or URL provided' }, { status: 400 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
