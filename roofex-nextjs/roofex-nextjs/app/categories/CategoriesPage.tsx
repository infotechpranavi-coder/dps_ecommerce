'use client'

import Link from 'next/link'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { useCatalog } from '@/components/CatalogProvider'
import { brand } from '@/lib/brand'

export default function CategoriesPage() {
  const { categories } = useCatalog()

  return (
    <>
      <FloatingNavbar activePage="categories" />
      <main className="sitePage categoriesPage">
        <section className="categoriesHero">
          <div className="container categoriesHeroInner">
            <Reveal>
              <div className="eyebrow">Shop By Category</div>
              <h1>Jewellery Collections For Every Occasion</h1>
              <p>
                Browse {brand.shortName} edits across necklaces, earrings, bangles, bridal sets,
                and limited releases — each with clear imagery, stock details, and verified reviews.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section section--surface">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">All Categories</div>
              <h2 className="sectionTitle">Find Your Next Favorite Edit</h2>
              <p className="sectionDesc">
                Jump into a collection — image-led cards with quick access to every edit.
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
      </main>
      <Footer />
    </>
  )
}
