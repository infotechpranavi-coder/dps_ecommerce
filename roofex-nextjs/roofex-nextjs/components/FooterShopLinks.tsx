'use client'

import Link from 'next/link'
import { useCatalog } from '@/components/CatalogProvider'

const fallbackShopLinks = [
  { href: '/products?collection=new', label: 'New Arrivals' },
  { href: '/products?collection=bestseller', label: 'Best Sellers' },
  { href: '/products', label: 'All Products' },
  { href: '/categories', label: 'Categories' },
] as const

export function FooterShopLinks() {
  const { products } = useCatalog()
  const footerProducts = products.filter((p) => p.showInFooter).slice(0, 8)

  const links =
    footerProducts.length > 0
      ? footerProducts.map((p) => ({
          href: `/${p.slug}`,
          label: p.title,
        }))
      : fallbackShopLinks.map((item) => ({ href: item.href, label: item.label }))

  return (
    <ul>
      {links.map((item) => (
        <li key={item.href + item.label}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  )
}
