import type { Metadata } from 'next'
import { Suspense } from 'react'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Products - ${brand.name}`,
  description: `Browse quality products from ${brand.name} — curated collections with clear details and dependable delivery.`,
}

import ProductsPage from './ProductsPage'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  )
}
