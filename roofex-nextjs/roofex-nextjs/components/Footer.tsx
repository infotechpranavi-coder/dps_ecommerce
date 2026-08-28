import Link from 'next/link'
import Image from 'next/image'
import { MailIcon, MapPinIcon, PhoneIcon } from './Icons'
import { brand } from '@/lib/brand'
import { FooterShopLinks } from './FooterShopLinks'

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const

const socialLinks = [
  {
    href: '#',
    label: 'X (Twitter)',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden fill="currentColor">
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden fill="currentColor">
        <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 3.5A1.72 1.72 0 003.75 5.22c0 .95.77 1.72 1.72 1.72s1.72-.77 1.72-1.72A1.72 1.72 0 005.47 3.5zM20 20h-2.94v-5.6c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95V20H10.1V8.5h2.82v1.57h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.96 3.52 4.5V20z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
] as const

export function Footer() {
  return (
    <footer className="footer">
      <div className="footerAccent" aria-hidden />
      <div className="container footerContainer">
        <div className="footerGrid">
          <div className="footerBrand">
            <Link href="/" className="logo footerLogoLink">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={420}
                height={126}
                className="siteLogo siteLogo--footer"
              />
            </Link>
            <p className="footerTagline">{brand.tagline}</p>
            <p className="footerBrandDesc">
              {brand.name} connects quality products with retailers and partners
              across India and international markets — with consistent supply, honest details, and reliable delivery.
            </p>
            <div className="footerSocial">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} className="socialIcon" aria-label={item.label}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footerNavCol">
            <h4>Pages</h4>
            <ul>
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footerNavCol">
            <h4>Shop Products</h4>
            <FooterShopLinks />
          </div>

          <div className="footerNavCol footerContactCol">
            <h4>Contact</h4>
            <ul className="footerContact">
              <li>
                <span className="footerContactIcon" aria-hidden>
                  <MapPinIcon />
                </span>
                <span>{brand.address}</span>
              </li>
              <li>
                <span className="footerContactIcon" aria-hidden>
                  <PhoneIcon size={15} color="currentColor" />
                </span>
                <a href={`tel:${brand.phoneTel}`}>{brand.phone}</a>
              </li>
              <li>
                <span className="footerContactIcon" aria-hidden>
                  <MailIcon />
                </span>
                <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
              </li>
            </ul>
            <Link href="/contact" className="footerContactCta">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="footerBottom">
          <p>
            {brand.copyright}
            <span className="footerPoweredBy">
              Powered by{' '}
              <a href="https://pranaviinfotech.com/" target="_blank" rel="noopener noreferrer">
                Pranavi Infotech
              </a>
            </span>
          </p>
          <div className="footerBottomLinks">
            <Link href="/contact">Support</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">About Us</Link>
            <Link href="/products">Catalogue</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
