import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Roofex',
  description: 'Get in touch with Roofex — product questions, order support, and business inquiries. We are here to help.',
}

import ContactPage from './ContactPage'

export default function Page() {
  return <ContactPage />
}
