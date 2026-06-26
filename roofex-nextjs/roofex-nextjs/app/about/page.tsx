import type { Metadata } from 'next'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: `About Us - ${brand.name}`,
  description: `Discover ${brand.name} — ${brand.tagline}. Imitation jewellery with quality finishing and reliable supply across India.`,
}

import AboutPage from './AboutPage'

export default function Page() {
  return <AboutPage />
}
