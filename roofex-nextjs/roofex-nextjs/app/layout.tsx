import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roofex – Your Trusted Local Residential Roofing Experts',
  description: 'Professional residential roofing services. Book a free appointment today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
