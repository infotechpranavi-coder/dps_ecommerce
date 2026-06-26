import crypto from 'crypto'
import { cloudinarySubfolder, isCloudinaryConfigured } from './cloudinary'

function signParams(params: Record<string, string>): string {
  const apiSecret = process.env.CLOUDINARY_API_SECRET!.trim()
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')
  return crypto.createHash('sha1').update(payload + apiSecret).digest('hex')
}

/** Upload remote image to Cloudinary with a stable public_id (re-runs overwrite). */
export async function uploadRemoteImage(
  remoteUrl: string,
  kind: 'products' | 'categories' | 'banners',
  assetId: string,
): Promise<string> {
  if (!isCloudinaryConfigured()) return remoteUrl
  if (remoteUrl.includes('res.cloudinary.com')) return remoteUrl

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!.trim()
  const apiKey = process.env.CLOUDINARY_API_KEY!.trim()
  const folder = cloudinarySubfolder(kind)
  const publicId = assetId
  const timestamp = String(Math.round(Date.now() / 1000))

  const signatureParams: Record<string, string> = {
    folder,
    overwrite: 'true',
    public_id: publicId,
    timestamp,
  }
  const signature = signParams(signatureParams)

  const form = new FormData()
  form.append('file', remoteUrl)
  form.append('api_key', apiKey)
  form.append('timestamp', timestamp)
  form.append('signature', signature)
  form.append('folder', folder)
  form.append('public_id', publicId)
  form.append('overwrite', 'true')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Cloudinary upload failed for ${assetId}: ${err}`)
  }

  const data = (await res.json()) as { secure_url: string }
  return data.secure_url
}

export function cloudinaryDeliveryUrl(url: string, width = 900): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url
  if (url.includes('/upload/f_auto')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
}
