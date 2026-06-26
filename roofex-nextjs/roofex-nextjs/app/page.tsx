'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ProductCard } from '@/components/ProductCard'
import { ScrollShrinkHero } from '@/components/home/ScrollShrinkHero'
import { HomeTrustBar } from '@/components/home/HomeTrustBar'
import { useCatalog } from '@/components/CatalogProvider'
import { AwardIcon, ShieldIcon, WrenchIcon } from '@/components/Icons'

import { brand } from '@/lib/brand'
import { jewelleryImages, optimizeCatalogImage } from '@/lib/product-images'

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
        <ScrollReveal className="sectionHeader">
          <div className="eyebrow eyebrow--light">Best Sellers</div>
          <h2 className="sectionTitle">Most Loved Right Now</h2>
          <p className="sectionDesc">Top-rated picks with verified reviews, detailed product pages, and secure checkout.</p>
        </ScrollReveal>
        <ScrollReveal className="reviewMetrics" delay={0.1}>
          {displayMetrics.map((metric) => (
            <div key={metric} className="reviewMetric">{metric}</div>
          ))}
        </ScrollReveal>
        <div className="floatingTrustIndicators" aria-hidden>
          {trustSignals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
        <div className="productGrid bestSellersGrid">
          {bestSellers.map((product, index) => (
            <ScrollReveal
              key={product.slug}
              className="bestSellersReveal"
              delay={0.08 + index * 0.05}
            >
              <ProductCard
                product={product}
                wishlisted={wishlisted.includes(product.title)}
                onToggleWishlist={() => toggleWishlist(product.title)}
                showCategory
                variant="showcase"
                priority={index < 4}
              />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="sectionCtaRow" delay={0.2}>
          <Link href="/products#bestsellers" className="btn btnOutlineWhite">Shop All Best Sellers</Link>
        </ScrollReveal>
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
  const { heroBanners } = useCatalog()
  const firstBanner = heroBanners[0]
  const largeImage = firstBanner
    ? optimizeCatalogImage(firstBanner.image, 900)
    : jewelleryImages.bridal
  const largeAlt = firstBanner?.alt ?? 'Bridal imitation jewellery collection'

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
              src={jewelleryImages.earrings}
              alt="Close-up of imitation earrings with stone work"
            />
            <img
              className="jewelryBenefitsImg jewelryBenefitsImg--large"
              src={largeImage}
              alt={largeAlt}
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
        <ScrollReveal className="sectionHeader">
          <div className="eyebrow">New Arrivals</div>
          <h2 className="sectionTitle">New Pieces Worth Noticing</h2>
          <p className="sectionDesc">Fresh imitation jewellery selected for weddings, festivals, and everyday elegance.</p>
        </ScrollReveal>
        <div className="newArrivalsGrid">
          {newArrivalsList.map((item, index) => (
            <ScrollReveal
              key={item.slug}
              className="newArrivalsGridItem"
              delay={0.08 + index * 0.05}
            >
              <ProductCard
                product={item}
                wishlisted={wishlisted.includes(item.title)}
                onToggleWishlist={() => toggleWishlist(item.title)}
                variant="showcase-compact"
                priority={index < 4}
              />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="sectionCtaRow" delay={0.2}>
          <Link href="/products" className="btn btnPrimary">View All New Arrivals</Link>
        </ScrollReveal>
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
        <ScrollReveal direction="up">
          <HomeTrustBar />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}>
          <NewArrivals />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}>
          <BestSellers />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}>
          <SkillsSection />
        </ScrollReveal>
        <SteelMarqueeSection />
        <ScrollReveal direction="up" delay={0.05}>
          <MarketSectorsSection />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}>
          <ProductsSection />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}>
          <Benefits />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}>
          <PartnersSection />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.05}>
          <ClientSaySection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}
