import Link from 'next/link'
import Image from 'next/image'
import { MailIcon, MapPinIcon, PhoneIcon } from './Icons'
import { brand } from '@/lib/brand'

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/contact', label: 'Contact' },
] as const

const shopLinks = [
  { href: '/products?collection=new', label: 'New Arrivals' },
  { href: '/products?collection=bestseller', label: 'Best Sellers' },
  { href: '/products?category=necklace-sets', label: 'Necklace Sets' },
  { href: '/products?category=bridal-collection', label: 'Bridal Collection' },
  { href: '/products?collection=limited', label: 'Limited Edition' },
] as const

export function Footer() {
  return (
    <footer className="footer">
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
              {brand.name} brings imitation jewellery collections to retailers and customers
              across India — necklaces, earrings, bangles, bridal sets, and limited editions
              with consistent quality and reliable supply.
            </p>
          </div>
          <div className="footerNavCol">
            <h4>Pages</h4>
            <ul>
              {pageLinks.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footerNavCol">
            <h4>Shop</h4>
            <ul>
              {shopLinks.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footerNavCol">
            <h4>Contact</h4>
            <ul className="footerContact">
              <li><MapPinIcon /> {brand.address}</li>
              <li><PhoneIcon size={16} color="#c8860a" /> {brand.phone}</li>
              <li><MailIcon /> <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a></li>
            </ul>
          </div>
        </div>
        <div className="footerBottom">
          <p>{brand.copyright}</p>
          <div className="socialIcons">
            {['X', 'f', 'in', 'play'].map((icon) => (
              <a key={icon} href="#" className="socialIcon" aria-label={`Social link ${icon}`}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
