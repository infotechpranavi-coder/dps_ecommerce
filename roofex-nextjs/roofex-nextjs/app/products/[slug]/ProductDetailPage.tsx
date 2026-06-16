'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ProductCard } from '@/components/ProductCard'
import { EcomTrustBar } from '@/components/EcomTrustBar'
import { CartIcon, CheckIcon, HeartIcon, ShieldIcon } from '@/components/Icons'
import { getRelatedProducts, type Product } from '@/lib/products'

export default function ProductDetailPage({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const related = getRelatedProducts(product)

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <FloatingNavbar activePage="products" />
      <main className="productDetailPage">
        <div className="container productDetailBreadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <section className="section productDetailHero">
          <div className="container productDetailGrid">
            <Reveal className="productDetailGallery">
              <div className="productDetailMainImg">
                {product.badge && <span className="productBadge">{product.badge}</span>}
                <img src={product.images[activeImage]} alt={product.title} />
              </div>
              <div className="productDetailThumbs">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    className={`productDetailThumb${activeImage === i ? ' active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal className="productDetailInfo" delay={0.1}>
              <div className="productDetailCategory">{product.category}</div>
              <h1>{product.title}</h1>
              <p className="productDetailShort">{product.shortDescription}</p>

              <div className="productDetailRating">
                <span className="productDetailStars">★ {product.rating}</span>
                <span>{product.reviewCount} verified reviews</span>
                <span className="productDetailStock">{product.inStock ? 'In stock' : 'Out of stock'}</span>
              </div>

              <div className="productDetailPrice">
                <strong>{product.price}</strong>
                {product.compareAt && <s>{product.compareAt}</s>}
                {product.isLimited && product.stockCount && (
                  <span className="productDetailLimited">Only {product.stockCount} left</span>
                )}
              </div>

              <p className="productDetailDesc">{product.description}</p>

              <ul className="productDetailFeatures">
                {product.features.map((f) => (
                  <li key={f}><CheckIcon /> {f}</li>
                ))}
              </ul>

              {(product.material || product.dimensions || product.sku) && (
                <div className="productDetailSpecs">
                  {product.material && <div><span>Material</span><strong>{product.material}</strong></div>}
                  {product.dimensions && <div><span>Dimensions</span><strong>{product.dimensions}</strong></div>}
                  <div><span>SKU</span><strong>{product.sku}</strong></div>
                  {product.warranty && <div><span>Warranty</span><strong>{product.warranty}</strong></div>}
                </div>
              )}

              <div className="productDetailActions">
                <div className="productDetailQty">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
                </div>
                <button
                  type="button"
                  className={`btnOrange productDetailAdd${added ? ' added' : ''}`}
                  onClick={handleAddToCart}
                >
                  <CartIcon />
                  {added ? 'Added to Cart' : 'Add to Cart'}
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

              <div className="productDetailPerks">
                <div><ShieldIcon /> Secure checkout</div>
                <div>Free shipping over $150</div>
                <div>30-day easy returns</div>
              </div>
            </Reveal>
          </div>
        </section>

        <EcomTrustBar />

        <section className="section section--surface productDetailHighlights">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Product Highlights</div>
              <h2 className="sectionTitle">Why Customers Choose This</h2>
            </Reveal>
            <div className="productDetailHighlightGrid">
              {product.features.slice(0, 4).map((feature, i) => (
                <Reveal key={feature} className="productDetailHighlightCard" delay={i * 0.06}>
                  <div className="productDetailHighlightNum">{String(i + 1).padStart(2, '0')}</div>
                  <p>{feature}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section productDetailRelated">
            <div className="container">
              <Reveal className="sectionHeader">
                <div className="eyebrow">You May Also Like</div>
                <h2 className="sectionTitle">More From {product.category}</h2>
                <p className="sectionDesc">Curated picks that pair beautifully with {product.title}.</p>
              </Reveal>
              <div className="productGrid">
                {related.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.05}>
                    <ProductCard
                      product={item}
                      wishlisted={false}
                      onToggleWishlist={() => {}}
                      showCategory
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="ctaBanner limitedOffer">
          <div className="container ctaInner">
            <div>
              <div className="eyebrow eyebrow--light">Need Help Choosing?</div>
              <h2>Our Team Can Guide Your Purchase</h2>
              <p>Questions about sizing, materials, or gifting? Our concierge team responds within 2 hours.</p>
            </div>
            <Link href="/contact" className="btn btnPrimary" style={{ flexShrink: 0, padding: '16px 36px' }}>
              Contact Support
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
