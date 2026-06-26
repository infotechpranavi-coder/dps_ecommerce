'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { YellowScribble } from '@/components/UniIcons'
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
    name: 'KUNDAN CRAFT',
    img: categoryImages['bridal-collection'],
  },
  {
    name: 'PEARL HOUSE',
    img: categoryImages['necklace-sets'],
  },
  {
    name: 'ANTIQUE GOLD',
    img: categoryImages.earrings,
  },
  {
    name: 'BRIDAL EDIT',
    img: categoryImages['bangles-bracelets'],
  },
  {
    name: 'JHUMKA ATELIER',
    img: categoryImages.rings,
  },
  {
    name: 'TEMPLE WORKS',
    img: categoryImages['limited-edition'],
  },
] as const

export function PartnersSection() {
  const slides = [...partners, ...partners]

  return (
    <section className="uniPartners">
      <div className="uniContainer">
        <ScrollReveal className="uniPartnersHeader">
          <p className="uniPartnersEyebrow">Jewellery Makers</p>
          <h2 className="uniPartnersTitle">Craft partners chosen for finish and trust</h2>
        </ScrollReveal>
      </div>

      <ScrollReveal className="uniPartnersMarqueeWrap" delay={0.12} direction="up" aria-label="Jewellery partners">
        <div className="uniPartnersMarqueeViewport">
          <div className="uniPartnersMarqueeTrack">
            {slides.map((partner, index) => (
              <article key={`${partner.name}-${index}`} className="uniPartnersCard">
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
            <ScrollReveal className="uniProductsSticky" direction="left">
              <p className="uniProductsEyebrow">{productsHome.eyebrow}</p>
              <h2 className="uniProductsTitle">{productsHome.title}</h2>
              <p className="uniProductsLead">{productsHome.lead}</p>
              <YellowScribble />
              <Link href="/categories" className="uniProductsStickyLink">
                View all categories →
              </Link>
            </ScrollReveal>
          </aside>

          <ScrollReveal className="uniProductsCardsTrack" direction="up" aria-label="Jewellery categories">
            {displayCategories.map((item) => (
              <div key={item.slug} className="uniProductsCardReveal">
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
                    <p className="uniProductsCardDesc">{item.description}</p>
                    <span className="uniProductsCardArrow" aria-hidden>
                      →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
