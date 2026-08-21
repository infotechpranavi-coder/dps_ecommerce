'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CloseIcon, MailIcon, MenuIcon } from './Icons'
import { CurrencySelector } from '@/components/CurrencySelector'
import { useCurrency } from '@/components/CurrencyProvider'
import { brand } from '@/lib/brand'
import { useCatalog } from '@/components/CatalogProvider'
import type { Product } from '@/lib/product-types'

type NavPage = 'home' | 'about' | 'products' | 'categories' | 'contact' | 'faq'

const navItems: { href: string; label: string; page: NavPage }[] = [
  { href: '/', label: 'Home', page: 'home' },
  { href: '/products', label: 'Products', page: 'products' },
  { href: '/categories', label: 'Categories', page: 'categories' },
  { href: '/about', label: 'About', page: 'about' },
  { href: '/faq', label: 'FAQ', page: 'faq' },
  { href: '/contact', label: 'Contact Us', page: 'contact' },
]

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function editDistance(a: string, b: string) {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index)

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    previous.splice(0, previous.length, ...current)
  }

  return previous[b.length]
}

function searchScore(product: Product, rawQuery: string) {
  const query = normalizeSearch(rawQuery)
  const title = normalizeSearch(product.title)
  const category = normalizeSearch(product.category)
  const searchable = `${title} ${category} ${normalizeSearch(product.shortDescription)}`

  if (!query) return 0
  if (title === query) return 100
  if (title.startsWith(query)) return 95
  if (title.includes(query)) return 90
  if (searchable.includes(query)) return 82

  const queryWords = query.split(' ')
  const targetWords = searchable.split(' ')
  const wordScore = queryWords.reduce((total, queryWord) => {
    const closest = targetWords.reduce((best, targetWord) => {
      const distance = editDistance(queryWord, targetWord)
      return Math.max(best, 1 - distance / Math.max(queryWord.length, targetWord.length, 1))
    }, 0)
    return total + closest
  }, 0) / queryWords.length

  const wholeDistance = editDistance(query, title)
  const wholeScore = 1 - wholeDistance / Math.max(query.length, title.length, 1)
  return Math.max(wordScore * 78, wholeScore * 70)
}

export function FloatingNavbar({ activePage = 'home' }: { activePage?: NavPage }) {
  const router = useRouter()
  const { products } = useCatalog()
  const { formatPrice } = useCurrency()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(activePage !== 'home')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeResult, setActiveResult] = useState(0)
  const headerRef = useRef<HTMLElement>(null)

  const results = useMemo(() => {
    if (normalizeSearch(query).length < 2) return []
    return products
      .map((product) => ({ product, score: searchScore(product, query) }))
      .filter(({ score }) => score >= 30)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ product }) => product)
  }, [products, query])

  useEffect(() => {
    // Translucent nav only over the homepage hero; white solid nav everywhere else.
    const onScroll = () => {
      if (activePage !== 'home') {
        setScrolled(true)
        return
      }
      setScrolled(window.scrollY > 50)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [activePage])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const closeSearch = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('pointerdown', closeSearch)
    return () => document.removeEventListener('pointerdown', closeSearch)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  const openProduct = (product: Product) => {
    setQuery(product.title)
    setSearchOpen(false)
    setMenuOpen(false)
    router.push(`/${product.slug}`)
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (results[activeResult]) {
      openProduct(results[activeResult])
    } else if (query.trim()) {
      setSearchOpen(false)
      router.push(`/products?search=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleSearchKeys = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSearchOpen(true)
      setActiveResult((index) => Math.min(index + 1, Math.max(results.length - 1, 0)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveResult((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Escape') {
      setSearchOpen(false)
    }
  }

  const searchBox = (mobile = false) => (
    <div className={`navProductSearch${mobile ? ' navProductSearch--mobile' : ''}`}>
      <form className="navProductSearchForm" role="search" onSubmit={submitSearch}>
        <label className="srOnly" htmlFor={mobile ? 'mobile-product-search' : 'product-search'}>
          Search products
        </label>
        <input
          id={mobile ? 'mobile-product-search' : 'product-search'}
          type="search"
          value={query}
          placeholder="Search products..."
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={mobile ? 'mobile-search-results' : 'nav-search-results'}
          aria-expanded={searchOpen && results.length > 0}
          onFocus={() => setSearchOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveResult(0)
            setSearchOpen(true)
          }}
          onKeyDown={handleSearchKeys}
        />
        <button type="submit" aria-label="Search">
          <svg viewBox="0 0 24 24" aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </button>
      </form>

      {searchOpen && normalizeSearch(query).length >= 2 && (
        <div
          id={mobile ? 'mobile-search-results' : 'nav-search-results'}
          className="navSearchResults"
          role="listbox"
        >
          {results.length ? (
            results.map((product, index) => (
              <button
                key={product.slug}
                type="button"
                className={`navSearchResult${activeResult === index ? ' is-active' : ''}`}
                role="option"
                aria-selected={activeResult === index}
                onMouseEnter={() => setActiveResult(index)}
                onClick={() => openProduct(product)}
              >
                <img src={product.img} alt="" />
                <span>
                  <strong>{product.title}</strong>
                  <small>{product.category}</small>
                </span>
                <em>{formatPrice(product.price)}</em>
              </button>
            ))
          ) : (
            <div className="navSearchEmpty">
              No close product found. Press Enter to search all products.
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <header
      ref={headerRef}
      className={`floatingNav siteNav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}
    >
      <div className="siteNavInner">
        <div className="floatingNavBar siteNavBar">
          <Link href="/" className="floatingLogo" onClick={closeMenu}>
            <Image
              src={brand.logoSmall}
              alt=""
              width={70}
              height={70}
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
            <div className="navProductSearchArea">
              {searchBox()}
            </div>
            <CurrencySelector />
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
          {searchBox(true)}
          <div className="floatingMobileCurrency">
            <CurrencySelector />
          </div>
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
