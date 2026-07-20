import type { Metadata } from 'next'
import { brand } from '@/lib/brand'
import CategoriesPage from './CategoriesPage'

export const metadata: Metadata = {
  title: `Categories - ${brand.name}`,
  description: `Browse ${brand.name} product categories — curated collections with clear stock details and reliable supply.`,
}

export default function Page() {
  return <CategoriesPage />
}
