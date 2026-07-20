'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useCatalog } from '@/components/CatalogProvider'
import { productsHome } from '@/lib/content'
import {
  getCategoryImage,
  jewelleryCollections,
  mergeCatalogCounts,
} from '@/lib/jewellery-collections'

import { categoryImages } from '@/lib/product-images'

const partners = [
  {
    name: 'APEX SUPPLY',
    img: categoryImages['bridal-collection'],
  },
  {
    name: 'GLOBAL TRADERS',
    img: categoryImages['necklace-sets'],
  },
  {
    name: 'PRIME SOURCING',
    img: categoryImages.earrings,
  },
  {
    name: 'ELITE EXPORTS',
    img: categoryImages['bangles-bracelets'],
  },
  {
    name: 'NOVA WHOLESALE',
    img: categoryImages.rings,
  },
  {
    name: 'TRUST PARTNERS',
    img: categoryImages['limited-edition'],
  },
] as const

export function PartnersSection() {
  const slides = [...partners, ...partners]

  return (
    <section className="uniPartners">
      <div className="uniContainer">
        <ScrollReveal className="uniPartnersHeader" bounce>
          <p className="uniPartnersEyebrow">Trusted Suppliers</p>
          <h2 className="uniPartnersTitle">Supply partners chosen for quality and trust</h2>
        </ScrollReveal>
      </div>

      <ScrollReveal className="uniPartnersMarqueeWrap" delay={0.05} direction="none" aria-label="Supply partners">
        <div className="uniPartnersMarqueeViewport">
          <div className="uniPartnersMarqueeTrack">
            {slides.map((partner, index) => (
              <article
                key={`${partner.name}-${index}`}
                className="uniPartnersCard"
                style={{ ['--slide-i' as string]: index % partners.length }}
              >
                <div className="uniPartnersCardMedia">
                  <img src={partner.img} alt={partner.name} loading="lazy" />
                </div>
                <span className="uniPartnersCardName">{partner.name}</span>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

export function ProductsSection() {
  const { categories } = useCatalog()

  const displayCategories = useMemo(
    () => mergeCatalogCounts(jewelleryCollections, categories),
    [categories],
  )

  return (
    <section className="uniProducts" id="products">
      <div className="uniContainer">
        <div className="uniProductsSplit">
          <aside className="uniProductsStickyCol" aria-label="Shop by category">
            <div className="uniProductsSticky">
              <ScrollReveal direction="left">
                <p className="uniProductsEyebrow">Our Collections</p>
                <h2 className="uniProductsTitle">{productsHome.title}</h2>
                <p className="uniProductsLead">{productsHome.lead}</p>
                <Link href="/categories" className="uniProductsStickyLink">
                  View all categories →
                </Link>
              </ScrollReveal>
            </div>
          </aside>

          <div className="uniProductsCardsTrack" aria-label="Product categories">
            {displayCategories.map((item) => (
              <ScrollReveal key={item.slug} className="uniProductsCardReveal" direction="up">
                <Link href={`/products?category=${item.slug}`} className="uniProductsCard">
                  <div className="uniProductsCardImgWrap">
                    <img
                      src={getCategoryImage(item.slug, item.img)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = getCategoryImage(item.slug)
                      }}
                    />
                    <span className="uniProductsCardCount">{item.count}</span>
                  </div>
                  <div className="uniProductsCardContent">
                    <h3>{item.title}</h3>
                    <p className="uniProductsCardDesc">{item.tagline}</p>
                    <span className="uniProductsCardCta">
                      Explore collection
                      <span className="uniProductsCardArrow" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
