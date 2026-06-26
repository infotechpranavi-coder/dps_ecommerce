import crypto from 'crypto'

const DEFAULT_FOLDER = 'DBS_ECOMMCERCE'

export function getCloudinaryFolder(): string {
  return process.env.CLOUDINARY_FOLDER?.trim() || DEFAULT_FOLDER
}

export function cloudinarySubfolder(kind: 'products' | 'categories' | 'banners'): string {
  return `${getCloudinaryFolder()}/${kind}`
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  )
}

export type CloudinaryUploadResult = {
  url: string
  publicId: string
  source: 'cloudinary' | 'external'
}

function signParams(params: Record<string, string>): string {
  const apiSecret = process.env.CLOUDINARY_API_SECRET!.trim()
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')
  return crypto.createHash('sha1').update(payload + apiSecret).digest('hex')
}

async function uploadToCloudinary(
  file: File | string,
  folder: string,
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!.trim()
  const apiKey = process.env.CLOUDINARY_API_KEY!.trim()
  const timestamp = String(Math.round(Date.now() / 1000))

  const signatureParams: Record<string, string> = { folder, timestamp }
  const signature = signParams(signatureParams)
  const form = new FormData()
  form.append('api_key', apiKey)
  form.append('timestamp', timestamp)
  form.append('signature', signature)
  form.append('folder', folder)

  if (typeof file === 'string') {
    form.append('file', file)
  } else {
    form.append('file', file)
  }

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Cloudinary upload failed: ${err}`)
  }

  const data = (await res.json()) as { secure_url: string; public_id: string }
  return { url: data.secure_url, publicId: data.public_id, source: 'cloudinary' }
}

/** Upload a product image to Cloudinary under DBS_ECOMMCERCE/products. */
export async function uploadProductImage(fileOrUrl: File | string): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    const url = typeof fileOrUrl === 'string' ? fileOrUrl : ''
    return { url, publicId: '', source: 'external' }
  }
  return uploadToCloudinary(fileOrUrl, cloudinarySubfolder('products'))
}

/** Upload a category image to Cloudinary under DBS_ECOMMCERCE/categories. */
export async function uploadCategoryImage(fileOrUrl: File | string): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    const url = typeof fileOrUrl === 'string' ? fileOrUrl : ''
    return { url, publicId: '', source: 'external' }
  }
  return uploadToCloudinary(fileOrUrl, cloudinarySubfolder('categories'))
}

/** Upload a homepage hero banner to Cloudinary under DBS_ECOMMCERCE/banners. */
export async function uploadBannerImage(fileOrUrl: File | string): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    const url = typeof fileOrUrl === 'string' ? fileOrUrl : ''
    return { url, publicId: '', source: 'external' }
  }
  return uploadToCloudinary(fileOrUrl, cloudinarySubfolder('banners'))
}

/** Optimise an external URL through Cloudinary fetch when configured. */
export function cloudinaryImageUrl(url: string, width = 800): string {
  if (!isCloudinaryConfigured() || !url) return url
  if (url.includes('res.cloudinary.com')) return url
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!.trim()
  const encoded = encodeURIComponent(url)
  return `https://res.cloudinary.com/${cloudName}/image/fetch/w_${width},q_auto,f_auto/${encoded}`
}
