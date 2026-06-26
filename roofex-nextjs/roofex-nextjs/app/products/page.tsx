import type { Metadata } from 'next'
import { Suspense } from 'react'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Products - ${brand.name}`,
  description: `Browse imitation jewellery from ${brand.name} — necklaces, earrings, bangles, bridal sets, and limited editions.`,
}

import ProductsPage from './ProductsPage'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  )
}
