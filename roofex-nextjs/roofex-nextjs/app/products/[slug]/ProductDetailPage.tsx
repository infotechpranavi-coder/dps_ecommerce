'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ProductCard } from '@/components/ProductCard'
import { EcomTrustBar } from '@/components/EcomTrustBar'
import { CheckIcon, HeartIcon } from '@/components/Icons'
import { useCatalog } from '@/components/CatalogProvider'
import type { Product } from '@/lib/product-types'

export default function ProductDetailPage({ product }: { product: Product }) {
  const router = useRouter()
  const { products, categories } = useCatalog()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([])

  const enquireHref = `/contact?product=${encodeURIComponent(product.title)}&qty=${quantity}#contact-form`

  const handleEnquire = () => {
    router.push(enquireHref)
  }

  const thumbStripRef = useRef<HTMLDivElement>(null)
  const activeThumbRef = useRef<HTMLButtonElement>(null)

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4)
  const categoryMatch = categories.find((c) => c.title === product.category)
  const categoryHref = categoryMatch ? `/products?category=${categoryMatch.slug}` : '/categories'

  const toggleRelatedWishlist = (slug: string) => {
    setWishlistSlugs((items) =>
      items.includes(slug) ? items.filter((s) => s !== slug) : [...items, slug],
    )
  }

  const imageCount = product.images.length

  const showPrevImage = () => {
    setActiveImage((i) => (i === 0 ? imageCount - 1 : i - 1))
  }

  const showNextImage = () => {
    setActiveImage((i) => (i === imageCount - 1 ? 0 : i + 1))
  }

  const scrollThumbs = (direction: -1 | 1) => {
    thumbStripRef.current?.scrollBy({ left: direction * 92, behavior: 'smooth' })
  }

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeImage])

  return (
    <>
      <FloatingNavbar activePage="products" />
      <main className="sitePage productDetailPage">
        <section className="productDetailHero">
          <div className="container productDetailGrid">
            <aside className="productDetailGalleryCol" aria-label="Product images">
              <div className="productDetailGalleryCard">
                <div className="productDetailMainImg">
                  <img src={product.images[activeImage]} alt={`${product.title} — view ${activeImage + 1}`} />
                  {imageCount > 1 && (
                    <>
                      <button
                        type="button"
                        className="productDetailImgNav productDetailImgNav--prev"
                        onClick={showPrevImage}
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="productDetailImgNav productDetailImgNav--next"
                        onClick={showNextImage}
                        aria-label="Next image"
                      >
                        ›
                      </button>
                      <span className="productDetailImgCounter">
                        {activeImage + 1} / {imageCount}
                      </span>
                    </>
                  )}
                </div>

                {imageCount > 1 && (
                  <div className="productDetailThumbCarousel">
                    <button
                      type="button"
                      className="productDetailThumbNav"
                      onClick={() => scrollThumbs(-1)}
                      aria-label="Scroll thumbnails left"
                    >
                      ‹
                    </button>
                    <div className="productDetailThumbs" ref={thumbStripRef}>
                      {product.images.map((img, i) => (
                        <button
                          key={img}
                          ref={activeImage === i ? activeThumbRef : undefined}
                          type="button"
                          className={`productDetailThumb${activeImage === i ? ' active' : ''}`}
                          onClick={() => setActiveImage(i)}
                          aria-label={`Show image ${i + 1}`}
                          aria-current={activeImage === i ? 'true' : undefined}
                        >
                          <img src={img} alt="" />
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="productDetailThumbNav"
                      onClick={() => scrollThumbs(1)}
                      aria-label="Scroll thumbnails right"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            </aside>

            <div className="productDetailInfoCol">
              <Reveal className="productDetailInfoIntro" delay={0.06}>
                <Link href={categoryHref} className="productDetailEyebrow">
                  {product.category}
                </Link>
                <h1 className="productDetailTitle">{product.title}</h1>
                <p className="productDetailShort">{product.shortDescription}</p>

                <div className="productDetailMetaRow">
                  <div className="productDetailRatingPill">
                    <span className="productDetailStars" aria-hidden>★★★★★</span>
                    <span>{product.rating} · {product.reviewCount} reviews</span>
                  </div>
                  <span className={`productDetailStockPill${product.inStock ? '' : ' productDetailStockPill--out'}`}>
                    {product.inStock ? 'In stock' : 'Out of stock'}
                  </span>
                </div>

                <div className="productDetailPriceCard">
                  <div className="productDetailPriceMain">
                    <strong>{product.price}</strong>
                    {product.compareAt && <s>{product.compareAt}</s>}
                  </div>
                  {product.isLimited && product.stockCount && (
                    <span className="productDetailLimited">Only {product.stockCount} left in stock</span>
                  )}
                </div>

                <div className="productDetailActions">
                  <div className="productDetailQty">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button
                    type="button"
                    className="btnOrange productDetailAdd"
                    onClick={handleEnquire}
                  >
                    Enquire
                  </button>
                  <button
                    type="button"
                    className={`productDetailWishlist${wishlisted ? ' active' : ''}`}
                    onClick={() => setWishlisted(!wishlisted)}
                    aria-label="Add to wishlist"
                  >
                    <HeartIcon />
                  </button>
                </div>
              </Reveal>

              <Reveal className="productDetailPanel" delay={0.1}>
                <h2 className="productDetailPanelTitle">About this product</h2>
                <p className="productDetailDesc">{product.description}</p>
                <ul className="productDetailFeatures">
                  {product.features.map((f) => (
                    <li key={f}><CheckIcon /> {f}</li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="productDetailPanel" delay={0.14}>
                <h2 className="productDetailPanelTitle">Product details</h2>
                <div className="productDetailSpecs">
                  {product.material && <div><span>Material</span><strong>{product.material}</strong></div>}
                  {product.dimensions && <div><span>Dimensions</span><strong>{product.dimensions}</strong></div>}
                  <div><span>SKU</span><strong>{product.sku}</strong></div>
                  {product.warranty && <div><span>Warranty</span><strong>{product.warranty}</strong></div>}
                  <div><span>Category</span><strong>{product.category}</strong></div>
                  {product.stockCount != null && (
                    <div><span>Availability</span><strong>{product.stockCount} units</strong></div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <EcomTrustBar />

        {related.length > 0 && (
          <section className="section productDetailRelated">
            <div className="container">
              <Reveal className="sectionHeader">
                <div className="eyebrow">Similar Products</div>
                <h2 className="sectionTitle sectionTitle--display">More Products</h2>
              </Reveal>
              <div className="productGrid productDetailRelatedGrid">
                {related.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.05} className="productDetailCardReveal">
                    <ProductCard
                      product={item}
                      wishlisted={wishlistSlugs.includes(item.slug)}
                      onToggleWishlist={() => toggleRelatedWishlist(item.slug)}
                      showCategory
                      variant="showcase"
                    />
                  </Reveal>
                ))}
              </div>
              <div className="productDetailCategoryCta">
                <Link href={categoryHref} className="btn btnDark">
                  View all {product.category}
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="productDetailSupportCta">
          <div className="container productDetailSupportInner">
            <div>
              <p className="eyebrow">Need Help Choosing?</p>
              <h2>Our team can guide your purchase</h2>
              <p>Questions about sizing, materials, or gifting? Our concierge team responds within 2 hours.</p>
            </div>
            <Link href={enquireHref} className="btn btnPrimary">
              Contact Support
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
