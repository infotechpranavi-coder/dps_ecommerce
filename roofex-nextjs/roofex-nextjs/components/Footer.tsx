import Link from 'next/link'
import { HomeIcon, MailIcon, MapPinIcon, PhoneIcon } from './Icons'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerGrid">
          <div className="footerBrand">
            <Link href="/" className="logo">
              <div className="logoIcon"><HomeIcon /></div>
              Roofex
            </Link>
            <p>Catchy premium finds for stylish homes, thoughtful gifts, and everyday moments that deserve better. 36+ curated products across six collections.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/products">New Arrivals</Link></li>
              <li><Link href="/products">Best Sellers</Link></li>
              <li><Link href="/products">Home Collection</Link></li>
              <li><Link href="/products">Gift Edit</Link></li>
              <li><Link href="/products">Exclusive Editions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/about">Our Values</Link></li>
              <li><Link href="/contact">Support</Link></li>
              <li><Link href="/contact">FAQ</Link></li>
              <li><Link href="/contact">Partnerships</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footerContact">
              <li><MapPinIcon /> 245 Mercer Street, New York, NY 10012</li>
              <li><PhoneIcon size={16} color="#c8860a" /> +1 (800) 555-0198</li>
              <li><MailIcon /> support@roofex.com</li>
            </ul>
          </div>
        </div>
        <div className="footerBottom">
          <p>Copyright 2026 Roofex. All Rights Reserved.</p>
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
