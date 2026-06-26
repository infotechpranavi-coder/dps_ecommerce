import type { Metadata } from 'next'
import './globals.css'
import './uni.css'
import { CatalogProvider } from '@/components/CatalogProvider'
import { brand, siteMetadata } from '@/lib/brand'
import { getInitialCatalog } from '@/lib/get-initial-catalog'

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: brand.logoSmall,
    shortcut: brand.logoSmall,
    apple: brand.logoSmall,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialCatalog = await getInitialCatalog()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body suppressHydrationWarning>
        <CatalogProvider initialCatalog={initialCatalog}>{children}</CatalogProvider>
      </body>
    </html>
  )
}

