'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CartIcon, CloseIcon, MenuIcon, RoofLogoIcon } from './Icons'

type NavPage = 'home' | 'about' | 'products' | 'contact'

const navItems: { href: string; label: string; page: NavPage }[] = [
  { href: '/', label: 'Home', page: 'home' },
  { href: '/about', label: 'About', page: 'about' },
  { href: '/products', label: 'Products', page: 'products' },
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
            <div className="floatingLogoIcon"><RoofLogoIcon /></div>
            Roofex
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
            <Link href="/products" className="floatingNavCta" onClick={closeMenu}>
              <CartIcon />
              Shop Now
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
          <Link href="/products" className="floatingNavCta" onClick={closeMenu}>
            <CartIcon />
            Shop Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
