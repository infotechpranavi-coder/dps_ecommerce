'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { EcomTrustBar } from '@/components/EcomTrustBar'
import { ProductCard } from '@/components/ProductCard'
import { AwardIcon, HeartIcon, ShieldIcon, UsersIcon } from '@/components/Icons'
import { allProducts, bestSellers, categories, limitedProducts, newArrivals, parsePrice } from '@/lib/products'

const filterOptions = ['All', 'Luxury Accessories', 'Home Essentials', 'Smart Technology', 'Travel Collection', 'Lifestyle Collection', 'Exclusive Editions']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest']

const whyProducts = [
  { icon: <AwardIcon />, title: 'Premium Materials', desc: 'Every product is vetted for material quality, finish, and longevity before it joins our catalog.' },
  { icon: <ShieldIcon />, title: 'Exceptional Durability', desc: 'Built to perform beautifully over years of daily use — not just look good on arrival day.' },
  { icon: <UsersIcon />, title: 'Modern Design', desc: 'Clean lines and timeless silhouettes that complement contemporary homes and wardrobes.' },
  { icon: <HeartIcon />, title: 'Customer Approved', desc: 'Thousands of verified reviews with a 4.9 average rating across our full collection.' },
]

const shoppingGuides = [
  { title: 'Gift-Ready Packaging', desc: 'Orders over $150 include premium packaging at no extra cost — perfect for birthdays, housewarmings, and holidays.' },
  { title: 'Detailed Product Pages', desc: 'Every item includes material specs, dimensions, features, and verified customer reviews to help you decide with confidence.' },
  { title: 'Easy Returns', desc: 'Changed your mind? Return unused items within 30 days in original packaging for a full refund.' },
]

export default function ProductsPage() {
  const [wishlisted, setWishlisted] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Featured')
  const railRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const toggleWishlist = (title: string) => {
    setWishlisted((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])
  }

  const filteredProducts = useMemo(() => {
    let list = activeFilter === 'All'
      ? [...allProducts]
      : allProducts.filter((p) => p.category === activeFilter)

    switch (sortBy) {
      case 'Price: Low to High':
        list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
        break
      case 'Price: High to Low':
        list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
        break
      case 'Top Rated':
        list = [...list].sort((a, b) => Number(b.rating) - Number(a.rating))
        break
      case 'Newest':
        list = [...list].reverse()
        break
      default:
        break
    }
    return list
  }, [activeFilter, sortBy])

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
    startX.current = e.pageX - (railRef.current?.offsetLeft ?? 0)
    scrollLeft.current = railRef.current?.scrollLeft ?? 0
  }

  return (
    <>
      <FloatingNavbar activePage="products" />
      <main className="productsPage">
        <section className="productsHero">
          <div className="container productsHeroInner">
            <Reveal>
              <div className="eyebrow">Premium Collections</div>
              <h1>Curated For Modern Living</h1>
              <p>
                Explore {allProducts.length} handpicked products across six collections — from everyday home essentials
                to limited-edition pieces crafted for discerning shoppers.
              </p>
              <div className="productsHeroStats">
                <span><strong>{allProducts.length}+</strong> Products</span>
                <span><strong>6</strong> Collections</span>
                <span><strong>4.9★</strong> Avg Rating</span>
              </div>
            </Reveal>
          </div>
        </section>

        <EcomTrustBar />

        <section className="section productsCategories">
          <div className="container">
            <Reveal className="sectionHeader sectionHeader--left">
              <div className="eyebrow">Browse By Category</div>
              <h2 className="sectionTitle">Find Your Next Favorite</h2>
              <p className="sectionDesc">Shop by collection — accessories, home, tech, travel, and exclusive editions.</p>
            </Reveal>
            <div className="productsCategoryGrid">
              {categories.map((cat, i) => (
                <Reveal key={cat.title} className={`productsCategoryCard productsCategoryCard--${cat.size}`} delay={i * 0.05}>
                  <img src={cat.img} alt={cat.title} />
                  <div className="productsCategoryOverlay">
                    <span>{cat.count}</span>
                    <h3>{cat.title}</h3>
                    <button type="button" className="productsCategoryBtn" onClick={() => setActiveFilter(cat.title)}>Explore</button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section arrivalsSection">
          <div className="container">
            <Reveal className="testimonialsHeader">
              <div className="sectionHeader sectionHeader--left">
                <div className="eyebrow">New Arrivals</div>
                <h2 className="sectionTitle">Just Dropped This Season</h2>
                <p className="sectionDesc">Fresh pieces added weekly — scroll to explore the latest edits.</p>
              </div>
              <span className="testimonialsHint">Drag to explore</span>
            </Reveal>
          </div>
          <div
            className="newArrivalRail"
            ref={railRef}
            onMouseDown={onMouseDown}
            onMouseLeave={() => { isDown.current = false }}
            onMouseUp={() => { isDown.current = false }}
            onMouseMove={(e) => {
              if (!isDown.current || !railRef.current) return
              e.preventDefault()
              const x = e.pageX - railRef.current.offsetLeft
              railRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
            }}
            style={{ paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 24px))' }}
          >
            {newArrivals.map((item) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="arrivalCard">
                <img src={item.img} alt={item.title} />
                <div className="arrivalBody">
                  <span>{item.badge ?? 'New Season'}</span>
                  <h3>{item.title}</h3>
                  <strong>{item.price}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section section--surface productsFeatured" id="bestsellers">
          <div className="container">
            <Reveal className="productsFeaturedHeader">
              <div>
                <div className="eyebrow">Featured Collection</div>
                <h2 className="sectionTitle">Best Sellers</h2>
                <p className="sectionDesc">The products our customers love most — top rated and always in demand.</p>
              </div>
              <span className="testimonialsHint">Top rated this season</span>
            </Reveal>
            <div className="productsFeaturedGrid">
              {bestSellers.map((product, i) => (
                <Reveal key={product.title} delay={i * 0.06}>
                  <ProductCard
                    product={product}
                    wishlisted={wishlisted.includes(product.title)}
                    onToggleWishlist={() => toggleWishlist(product.title)}
                    showCategory
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section productsCatalog" id="catalog">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Full Collection</div>
              <h2 className="sectionTitle">Shop All Products</h2>
              <p className="sectionDesc">Filter by category, sort by price or rating, and add favorites to your wishlist.</p>
            </Reveal>

            <Reveal className="productsToolbar">
              <div className="productsFilters">
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`productsFilterBtn${activeFilter === filter ? ' active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="productsSort">
                <label htmlFor="sortBy">Sort by</label>
                <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </Reveal>

            <p className="productsResultCount">{filteredProducts.length} products found</p>

            <div className="productGrid">
              {filteredProducts.map((product, i) => (
                <Reveal key={product.title} delay={(i % 4) * 0.05}>
                  <ProductCard
                    product={product}
                    wishlisted={wishlisted.includes(product.title)}
                    onToggleWishlist={() => toggleWishlist(product.title)}
                    showCategory
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--navy productsLimited">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow eyebrow--light">Limited Collection</div>
              <h2 className="sectionTitle" style={{ color: '#fff' }}>Exclusive Releases</h2>
              <p className="sectionDesc" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Limited-edition products crafted for customers who appreciate rarity and exceptional quality.
              </p>
            </Reveal>
            <div className="productsLimitedGrid">
              {limitedProducts.map((product, i) => (
                <Reveal key={product.slug} className="productsLimitedCard" delay={i * 0.08}>
                  <img src={product.img} alt={product.title} />
                  <div className="productsLimitedBody">
                    <span>Limited Edition</span>
                    <h3>{product.title}</h3>
                    <p className="productsLimitedDesc">{product.description}</p>
                    <strong>{product.price}</strong>
                    <p className="productsLimitedStock">{product.units}</p>
                    <Link href={`/products/${product.slug}`} className="quickAdd">View Product</Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--surface productsGuides">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Shopping With Confidence</div>
              <h2 className="sectionTitle">Everything You Need Before You Buy</h2>
            </Reveal>
            <div className="productsGuidesGrid">
              {shoppingGuides.map((guide, i) => (
                <Reveal key={guide.title} className="contactHelpCard" delay={i * 0.06}>
                  <h3>{guide.title}</h3>
                  <p>{guide.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section productsWhy">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Why Our Products</div>
              <h2 className="sectionTitle">The Difference Is In The Details</h2>
            </Reveal>
            <div className="productsWhyGrid">
              {whyProducts.map((item, i) => (
                <Reveal key={item.title} className="featureItem" delay={i * 0.06}>
                  <div className="featureIcon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="ctaBanner limitedOffer">
          <div className="container ctaInner">
            <div>
              <div className="eyebrow eyebrow--light">Ready To Shop</div>
              <h2>Shop Best Sellers</h2>
              <p>Join thousands of customers who trust Roofex for premium everyday essentials.</p>
            </div>
            <a href="#bestsellers" className="btn btnPrimary" style={{ flexShrink: 0, padding: '16px 36px' }}>
              Shop Best Sellers
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
