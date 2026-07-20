'use client'

import Link from 'next/link'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { useCatalog } from '@/components/CatalogProvider'

export default function CategoriesPage() {
  const { categories } = useCatalog()

  return (
    <>
      <FloatingNavbar activePage="categories" />
      <main className="sitePage categoriesPage">
        <section className="section categoriesCatalog">
          <div className="container">
            <Reveal className="sectionHeader categoriesCatalogHeader">
              <div className="eyebrow">All Categories</div>
              <h1 className="sectionTitle">Browse Our Collections</h1>
              <p className="sectionDesc">
                Explore every collection — business-ready product categories with clear images, honest details, and stock availability on each item.
              </p>
            </Reveal>
            <div className="categoriesGrid">
              {categories.map((cat, i) => (
                <Reveal key={cat.slug} className="categoriesCardReveal" delay={i * 0.05}>
                  <Link href={`/products?category=${cat.slug}`} className="categoriesOverlayCard">
                    <img src={cat.img} alt={cat.title} loading="lazy" />
                    <div className="categoriesOverlay">
                      <span className="categoriesOverlayEyebrow">{cat.count}</span>
                      <h3>{cat.title}</h3>
                      <p className="categoriesOverlayDesc">{cat.description}</p>
                      <span className="categoriesOverlayBtn">Explore collection</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="siteMidCta">
          <div className="container">
            <Reveal className="siteMidCtaInner" direction="up">
              <div className="siteMidCtaCopy">
                <div className="eyebrow eyebrow--light">Ready to Shop?</div>
                <h2>Browse products from every category</h2>
                <p>Find curated edits with clear stock details — or speak with our team for a custom quote.</p>
              </div>
              <div className="siteMidCtaActions">
                <Link href="/products" className="btnOrange">Shop Products</Link>
                <Link href="/contact" className="btnOutlineWhite">Get in Touch</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
