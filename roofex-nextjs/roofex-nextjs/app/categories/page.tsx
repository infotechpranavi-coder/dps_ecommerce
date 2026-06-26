import type { Metadata } from 'next'
import { brand } from '@/lib/brand'
import CategoriesPage from './CategoriesPage'

export const metadata: Metadata = {
  title: `Categories - ${brand.name}`,
  description: `Browse ${brand.name} jewellery collections — necklaces, earrings, bangles, rings, bridal sets, and limited editions.`,
}

export default function Page() {
  return <CategoriesPage />
}
