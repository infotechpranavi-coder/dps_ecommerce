import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - Roofex Premium Collections',
  description: 'Browse curated premium collections — luxury accessories, home essentials, and exclusive editions crafted for modern living.',
}

import ProductsPage from './ProductsPage'

export default function Page() {
  return <ProductsPage />
}
