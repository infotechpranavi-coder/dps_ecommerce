import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roofex - Premium Lifestyle Ecommerce Store',
  description: 'Shop curated premium lifestyle, home, gifting, and everyday essentials from Roofex.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
