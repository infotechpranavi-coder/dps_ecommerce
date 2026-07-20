'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ProductCard } from '@/components/ProductCard'
import { ScrollShrinkHero } from '@/components/home/ScrollShrinkHero'
import { HomeStatsSection } from '@/components/home/HomeStatsSection'
import { SkillsSection } from '@/components/home/SkillsSection'
import { SteelMarqueeSection } from '@/components/home/SteelMarqueeSection'
// import { MarketSectorsSection } from '@/components/home/MarketSectorsSection'
import { ProductsSection, PartnersSection } from '@/components/home/ProductsSection'
import { ClientSaySection } from '@/components/home/ClientSaySection'
import { useCatalog } from '@/components/CatalogProvider'
import { AwardIcon, ShieldIcon, WrenchIcon } from '@/components/Icons'

import { jewelleryImages, optimizeCatalogImage } from '@/lib/product-images'

function BestSellers() {
  const { bestSellers } = useCatalog()
  const [wishlisted, setWishlisted] = useState<string[]>([])

  const toggleWishlist = (title: string) => {
    setWishlisted((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])
  }

  return (
    <section className="section section--gold clientReviews bestSellersSection" id="bestsellers">
      <div className="container">
        <ScrollReveal className="bestSellersTitleWrap" bounce>
          <h2 className="bestSellersTitle">Most loved right now</h2>
          <p className="bestSellersTagline">
            Top-rated products with verified reviews, clear specifications, and secure enquiries — trusted by retail and wholesale buyers.
          </p>
        </ScrollReveal>
        <div className="productGrid bestSellersGrid">
          {bestSellers.map((product, index) => (
            <ScrollReveal
              key={product.slug}
              className="bestSellersReveal"
              delay={0.08 + index * 0.07}
              direction="up"
              bounce
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
  { icon: <AwardIcon />, title: 'Premium Finish', desc: 'Quality materials, neat finishing, and products that meet professional retail standards.' },
  { icon: <WrenchIcon />, title: 'Easy To Choose', desc: 'Organised by category with clear filters, imagery, and stock details on every item.' },
  { icon: <ShieldIcon />, title: 'Reliable Supply', desc: 'Consistent stock, secure enquiries, and dependable delivery for every order.' },
]

function Benefits() {
  const { heroBanners } = useCatalog()
  const firstBanner = heroBanners[0]
  const largeImage = firstBanner
    ? optimizeCatalogImage(firstBanner.image, 900)
    : jewelleryImages.bridal
  const largeAlt = firstBanner?.alt ?? 'Featured product collection'

  return (
    <section className="jewelryBenefitsSection" id="why-choose">
      <div className="container jewelryBenefitsInner">
        <Reveal className="jewelryBenefitsContent">
          <h2 className="jewelryBenefitsTitle">Quality products, reliably supplied</h2>
          <p className="jewelryBenefitsLead">
            Curated product edits with honest details and delivery you can count on.
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
            <img
              className="jewelryBenefitsImg jewelryBenefitsImg--small"
              src={jewelleryImages.earrings}
              alt="Close-up of featured products"
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
  const slides = [...newArrivalsList, ...newArrivalsList]

  return (
    <section className="section homeArrivalsSection" id="new-arrivals">
      <div className="container">
        <ScrollReveal className="newArrivalsTitleWrap" bounce>
          <h2 className="newArrivalsTitle">New products worth noticing</h2>
          <p className="newArrivalsTagline">
            Fresh additions across our catalogue — selected for quality, value, and broad business appeal.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="newArrivalsMarqueeWrap" delay={0.05} direction="none">
        <div aria-label="New arrivals">
          <div className="newArrivalsMarqueeViewport">
            <div className="newArrivalsMarqueeTrack">
              {slides.map((item, index) => (
                <Link
                  key={`${item.slug}-${index}`}
                  href={`/products/${item.slug}`}
                  className="newArrivalsSlide"
                  style={{ ['--slide-i' as string]: index }}
                >
                  <div className="newArrivalsSlideMedia">
                    <img
                      src={optimizeCatalogImage(item.img, 480)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="newArrivalsSlideName">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="container">
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
      <main className="homePage">
        <ScrollShrinkHero />
        <NewArrivals />
        <HomeStatsSection />
        <BestSellers />
        {/* <MarketSectorsSection /> */}
        <ProductsSection />
        <SkillsSection />
        <SteelMarqueeSection />
        <Benefits />
        <PartnersSection />
        <ClientSaySection />
      </main>
      <Footer />
    </>
  )
}
