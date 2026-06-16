import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Roofex',
  description: 'Discover the Roofex story — premium craftsmanship, timeless design, and a commitment to elevating everyday living.',
}

import AboutPage from './AboutPage'

export default function Page() {
  return <AboutPage />
}
