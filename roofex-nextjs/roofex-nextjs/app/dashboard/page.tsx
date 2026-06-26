import type { Metadata } from 'next'
import { brand } from '@/lib/brand'
import DashboardPage from './DashboardPage'

export const metadata: Metadata = {
  title: `Admin Dashboard - ${brand.name}`,
  description: `Manage ${brand.name} products and categories.`,
}

export default function Page() {
  return <DashboardPage />
}
