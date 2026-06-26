'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CloseIcon, MailIcon, MenuIcon } from './Icons'
import { brand } from '@/lib/brand'

type NavPage = 'home' | 'about' | 'products' | 'categories' | 'contact'

const navItems: { href: string; label: string; page: NavPage }[] = [
  { href: '/', label: 'Home', page: 'home' },
  { href: '/about', label: 'About', page: 'about' },
  { href: '/products', label: 'Products', page: 'products' },
  { href: '/categories', label: 'Categories', page: 'categories' },
  { href: '/contact', label: 'Contact', page: 'contact' },
]

export function FloatingNavbar({ activePage = 'home' }: { activePage?: NavPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`floatingNav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <div className="container floatingNavWrap">
        <div className="floatingNavBar">
          <Link href="/" className="floatingLogo" onClick={closeMenu}>
            <Image
              src={brand.logoSmall}
              alt=""
              width={56}
              height={56}
              className="siteLogo siteLogo--nav"
              priority
              aria-hidden
            />
            <span className="floatingLogoText">
              <span className="floatingLogoTitle">DB International</span>
              <span className="floatingLogoSubtitle">Ventures</span>
            </span>
          </Link>

          <nav className="floatingNavLinks" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.page}
                href={item.href}
                className={activePage === item.page ? 'active' : ''}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="floatingNavEnd">
            <Link href="/contact" className="floatingNavCta" onClick={closeMenu}>
              <MailIcon />
              Get in Touch
            </Link>
            <button
              type="button"
              className="floatingMenuToggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav className={`floatingMobileNav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.page}
              href={item.href}
              className={activePage === item.page ? 'active' : ''}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="floatingNavCta" onClick={closeMenu}>
            <MailIcon />
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  )
}
