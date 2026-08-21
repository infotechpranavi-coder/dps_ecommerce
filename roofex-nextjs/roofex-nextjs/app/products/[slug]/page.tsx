export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { productPath } from '@/lib/product-path'

type Props = { params: { slug: string } }

/** Legacy /products/[slug] → /[slug] */
export default function LegacyProductPage({ params }: Props) {
  redirect(productPath(params.slug))
}
