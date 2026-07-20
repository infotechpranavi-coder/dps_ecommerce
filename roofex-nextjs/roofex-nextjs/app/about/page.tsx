import type { Metadata } from 'next'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: `About Us - ${brand.name}`,
  description: `Discover ${brand.name} — ${brand.tagline}. Quality products with reliable supply across India and beyond.`,
}

import AboutPage from './AboutPage'

export default function Page() {
  return <AboutPage />
}
