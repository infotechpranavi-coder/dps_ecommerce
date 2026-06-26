'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ProductCard } from '@/components/ProductCard'
import { ScrollShrinkHero } from '@/components/home/ScrollShrinkHero'
import { HomeTrustBar } from '@/components/home/HomeTrustBar'
import { useCatalog } from '@/components/CatalogProvider'
import { AwardIcon, ShieldIcon, WrenchIcon } from '@/components/Icons'

import { brand } from '@/lib/brand'

const SkillsSection = dynamic(
  () => import('@/components/home/SkillsSection').then((m) => ({ default: m.SkillsSection })),
  { loading: () => null },
)
const SteelMarqueeSection = dynamic(
  () => import('@/components/home/SteelMarqueeSection').then((m) => ({ default: m.SteelMarqueeSection })),
  { loading: () => null },
)
const MarketSectorsSection = dynamic(
  () => import('@/components/home/MarketSectorsSection').then((m) => ({ default: m.MarketSectorsSection })),
  { loading: () => null },
)
const ProductsSection = dynamic(
  () => import('@/components/home/ProductsSection').then((m) => ({ default: m.ProductsSection })),
  { loading: () => null },
)
const PartnersSection = dynamic(
  () => import('@/components/home/ProductsSection').then((m) => ({ default: m.PartnersSection })),
  { loading: () => null },
)
const ClientSaySection = dynamic(
  () => import('@/components/home/ClientSaySection').then((m) => ({ default: m.ClientSaySection })),
  { loading: () => null },
)

function BestSellers() {
  const { bestSellers } = useCatalog()
  const [wishlisted, setWishlisted] = useState<string[]>([])

  const displayMetrics = [
    '4.9/5 rating',
    '50k+ happy shoppers',
    '98% satisfaction',
    'Tracked delivery',
  ]

  const trustSignals = ['Secure Checkout', 'Fast Delivery', 'Premium Quality', 'Easy Returns']

  const toggleWishlist = (title: string) => {
    setWishlisted((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])
  }

  return (
    <section className="section section--gold clientReviews bestSellersSection" id="bestsellers">
      <div className="container">
        <Reveal className="sectionHeader">
          <div className="eyebrow eyebrow--light">Best Sellers</div>
          <h2 className="sectionTitle">Most Loved Right Now</h2>
          <p className="sectionDesc">Top-rated picks with verified reviews, detailed product pages, and secure checkout.</p>
        </Reveal>
        <Reveal className="reviewMetrics" delay={0.1}>
          {displayMetrics.map((metric) => (
            <div key={metric} className="reviewMetric">{metric}</div>
          ))}
        </Reveal>
        <div className="floatingTrustIndicators" aria-hidden>
          {trustSignals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
        <div className="productGrid bestSellersGrid">
          {bestSellers.map((product, index) => (
            <Reveal key={product.slug} className="bestSellersReveal" delay={index * 0.08}>
              <ProductCard
                product={product}
                wishlisted={wishlisted.includes(product.title)}
                onToggleWishlist={() => toggleWishlist(product.title)}
                showCategory
                variant="showcase"
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="sectionCtaRow" delay={0.2}>
          <Link href="/products#bestsellers" className="btn btnOutlineWhite">Shop All Best Sellers</Link>
        </Reveal>
      </div>
    </section>
  )
}

const whyChooseBenefits = [
  { icon: <AwardIcon />, title: 'Premium Finish', desc: 'We choose jewellery with strong plating, neat stone work, and real festive appeal.' },
  { icon: <WrenchIcon />, title: 'Easy To Choose', desc: 'Collections organised by occasion — bridal, daily wear, gifting, and limited editions.' },
  { icon: <ShieldIcon />, title: 'Reliable Supply', desc: 'Clear stock details, secure enquiries, and dependable delivery on every order.' },
]

function Benefits() {
  return (
    <section className="jewelryBenefitsSection" id="why-choose">
      <div className="container jewelryBenefitsInner">
        <Reveal className="jewelryBenefitsContent">
          <p className="jewelryBenefitsEyebrow">
            <span className="jewelryBenefitsPlus" aria-hidden>+</span>
            Why Choose Us
          </p>
          <h2 className="jewelryBenefitsTitle">Imitation Jewellery, Reliably Supplied</h2>
          <p className="jewelryBenefitsLead">
            Curated necklaces, earrings, bangles, and bridal sets from {brand.shortName} —
            honest details, secure enquiries, and delivery that feels considered from order to unboxing.
          </p>
          <div className="jewelryBenefitsList">
            {whyChooseBenefits.map((item, index) => (
              <Reveal key={item.title} className="jewelryBenefitsItem" delay={0.12 + index * 0.08}>
                <div className="jewelryBenefitsIcon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal className="jewelryBenefitsVisual" delay={0.15}>
          <div className="jewelryBenefitsCollage">
            <div className="jewelryBenefitsTrust">
              <p className="jewelryBenefitsTrustLabel">Trusted by 5,000+ happy shoppers</p>
              <div className="jewelryBenefitsAvatars">
                {[32, 44, 68].map((n) => (
                  <img key={n} src={`https://randomuser.me/api/portraits/women/${n}.jpg`} alt="" />
                ))}
              </div>
              <div className="jewelryBenefitsRating">
                <span className="jewelryBenefitsStars" aria-hidden>★★★★★</span>
                <span>4.9 Rating · 8,400+ Reviews</span>
              </div>
            </div>
            <img
              className="jewelryBenefitsImg jewelryBenefitsImg--small"
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&q=80"
              alt="Close-up of imitation jewellery"
            />
            <img
              className="jewelryBenefitsImg jewelryBenefitsImg--large"
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80"
              alt="Premium products in a refined setting"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function NewArrivals() {
  const { newArrivals } = useCatalog()
  const newArrivalsList = newArrivals.slice(0, 8)
  const [wishlisted, setWishlisted] = useState<string[]>([])

  const toggleWishlist = (title: string) => {
    setWishlisted((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])
  }

  return (
    <section className="section homeArrivalsSection" id="new-arrivals">
      <div className="container">
        <Reveal className="sectionHeader">
          <div className="eyebrow">New Arrivals</div>
          <h2 className="sectionTitle">New Pieces Worth Noticing</h2>
          <p className="sectionDesc">Fresh imitation jewellery selected for weddings, festivals, and everyday elegance.</p>
        </Reveal>
        <div className="newArrivalsGrid">
          {newArrivalsList.map((item, index) => (
            <Reveal key={item.slug} className="newArrivalsGridItem" delay={index * 0.06}>
              <ProductCard
                product={item}
                wishlisted={wishlisted.includes(item.title)}
                onToggleWishlist={() => toggleWishlist(item.title)}
                variant="showcase-compact"
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="sectionCtaRow" delay={0.2}>
          <Link href="/products" className="btn btnPrimary">View All New Arrivals</Link>
        </Reveal>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <FloatingNavbar activePage="home" />
      <main>
        <ScrollShrinkHero />
        <HomeTrustBar />
        <NewArrivals />
        <BestSellers />
        <SkillsSection />
        <SteelMarqueeSection />
        <MarketSectorsSection />
        <ProductsSection />
        <Benefits />
        <PartnersSection />
        <ClientSaySection />
      </main>
      <Footer />
    </>
  )
}
