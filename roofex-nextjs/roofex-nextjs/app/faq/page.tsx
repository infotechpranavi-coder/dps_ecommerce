import type { Metadata } from 'next'
import { brand } from '@/lib/brand'
import FaqPage from './FaqPage'

export const metadata: Metadata = {
  title: `FAQ - ${brand.name}`,
  description: `Frequently asked questions about ${brand.name} — product enquiries, delivery, payments, and support.`,
}

export default function Page() {
  return <FaqPage />
}
