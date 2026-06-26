import { Suspense } from 'react'
import type { Metadata } from 'next'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Contact Us - ${brand.name}`,
  description: `Get in touch with ${brand.name} — product enquiries, order support, wholesale, and business partnerships.`,
}

import ContactPage from './ContactPage'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContactPage />
    </Suspense>
  )
}
