'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ProductCard } from '@/components/ProductCard'
import { EcomTrustBar } from '@/components/EcomTrustBar'
import { useCatalog } from '@/components/CatalogProvider'
import { PriceDisplay } from '@/components/PriceDisplay'
import type { Product } from '@/lib/product-types'

export default function ProductDetailPage({ product }: { product: Product }) {
  const router = useRouter()
  const { products, categories } = useCatalog()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([])

  const enquireHref = `/contact?product=${encodeURIComponent(product.title)}&qty=${quantity}#contact-form`

  const handleEnquire = () => {
    router.push(enquireHref)
  }

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

  const specRows = [
    { label: 'Category', value: product.category },
    { label: 'SKU', value: product.sku },
    product.material ? { label: 'Material', value: product.material } : null,
    product.dimensions ? { label: 'Size', value: product.dimensions } : null,
    product.warranty ? { label: 'Warranty', value: product.warranty } : null,
    {
      label: 'Availability',
      value: product.inStock
        ? product.stockCount != null
          ? `${product.stockCount} units in stock`
          : 'In stock — ready to supply'
        : 'Out of stock',
    },
    { label: 'Rating', value: `${product.rating} · ${product.reviewCount} reviews` },
  ].filter(Boolean) as { label: string; value: string }[]

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
                    <span className="productDetailImgCounter">
                      {activeImage + 1} / {imageCount}
                    </span>
                  )}
                </div>

                {imageCount > 1 && (
                  <div className="productDetailThumbRow">
                    {product.images.map((img, i) => (
                      <button
                        key={img}
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
                )}
              </div>
            </aside>

            <div className="productDetailInfoCol">
              <Reveal className={`productDetailInfoIntro${!product.hidePrice ? '' : ' productDetailInfoIntro--compact'}`} delay={0.06}>
                <Link href={categoryHref} className="productDetailEyebrow">
                  {product.category}
                </Link>
                <h1 className="productDetailTitle">{product.title}</h1>
                <p className="productDetailShort">{product.shortDescription}</p>

                {!product.hidePrice ? (
                  <div className="productDetailPriceCard">
                    <div className="productDetailPriceMain">
                      <strong><PriceDisplay value={product.price} as="span" /></strong>
                      {product.compareAt && <s><PriceDisplay value={product.compareAt} as="span" /></s>}
                    </div>
                    {product.isLimited && product.stockCount && (
                      <span className="productDetailLimited">Only {product.stockCount} left in stock</span>
                    )}
                  </div>
                ) : (
                  <div className="productDetailEnquireNote">
                    <strong>Price on enquiry</strong>
                    <span>Share quantity below and our team will confirm pricing.</span>
                    {product.isLimited && product.stockCount ? (
                      <span className="productDetailLimited">Only {product.stockCount} left in stock</span>
                    ) : null}
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
                    className="btnOrange productDetailAdd"
                    onClick={handleEnquire}
                  >
                    Enquire
                  </button>
                </div>
              </Reveal>

              <Reveal className="productDetailTrustWrap" delay={0.12}>
                <EcomTrustBar variant="panel" />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="productDetailSpecsSection">
          <div className="container">
            <Reveal className="productDetailNavyBox productDetailCombinedBox" delay={0.1}>
              <div className="productDetailCombinedGrid">
                <div className="productDetailCombinedAbout">
                  <h2 className="productDetailNavyBoxTitle">About Product</h2>
                  <p className="productDetailAboutLead">{product.description}</p>
                  {product.features.length > 0 && (
                    <ul className="productDetailAboutFeatures">
                      {product.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="productDetailCombinedSpecs">
                  <h2 className="productDetailNavyBoxTitle">Specifications</h2>
                  <div className="productDetailSpecList">
                    {specRows.map((row) => (
                      <div key={row.label} className="productDetailSpecRow">
                        <span>{row.label}</span>
                        <strong>{row.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section productDetailRelated">
            <div className="container">
              <Reveal className="sectionHeader">
                <div className="eyebrow">Similar Products</div>
                <h2 className="sectionTitle">More Products</h2>
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
              <p>Questions about specifications, availability, or bulk orders? Our team responds within 2 hours.</p>
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
