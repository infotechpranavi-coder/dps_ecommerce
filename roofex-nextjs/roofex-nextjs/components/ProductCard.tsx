'use client'

import Link from 'next/link'
import { CartIcon, EyeIcon, HeartIcon } from './Icons'
import { PriceDisplay } from './PriceDisplay'
import { defaultProductImage, productImageForCategory } from '@/lib/product-images'

export type ProductCardData = {
  slug?: string
  title: string
  price: string
  rating: string
  img: string
  category?: string
  badge?: string
  compareAt?: string
  hidePrice?: boolean
}

export function ProductCard({
  product,
  wishlisted,
  onToggleWishlist,
  showCategory = false,
  variant = 'default',
  priority = false,
}: {
  product: ProductCardData
  wishlisted: boolean
  onToggleWishlist: () => void
  showCategory?: boolean
  variant?: 'default' | 'showcase' | 'showcase-compact'
  priority?: boolean
}) {
  const detailHref = product.slug ? `/${product.slug}` : '/products'
  const isShowcaseCompact = variant === 'showcase-compact'
  const isShowcase = variant === 'showcase' || isShowcaseCompact
  const showPrice = !product.hidePrice

  return (
    <article className={`productCard productsCatalogCard${isShowcase ? ' productCard--showcase' : ''}${isShowcaseCompact ? ' productCard--showcase-compact' : ''}${!showPrice ? ' productCard--noPrice' : ''}`}>
      <Link
        href={detailHref}
        className="productCardStretched"
        aria-label={`View details for ${product.title}`}
      />
      <div className="productImgWrap">
        {product.badge && <span className="productBadge">{product.badge}</span>}
        <img
          src={product.img}
          alt={product.title}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = product.category
              ? productImageForCategory(product.category)
              : defaultProductImage
          }}
        />
        {!isShowcase && (
          <span className="productsQuickView"><EyeIcon /> Quick View</span>
        )}
        <button
          type="button"
          className={`wishlistBtn${wishlisted ? ' active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onToggleWishlist()
          }}
          aria-label={`Wishlist ${product.title}`}
        >
          <HeartIcon />
        </button>
      </div>
      <div className="productBody">
        {isShowcaseCompact ? (
          <>
            <h3>{product.title}</h3>
            <div className="productShowcaseFooter productShowcaseFooter--compact">
              {showPrice ? (
                <div className="productPriceWrap">
                  <strong><PriceDisplay value={product.price} as="span" /></strong>
                </div>
              ) : (
                <span className="productEnquireHint">Enquire for price</span>
              )}
            </div>
          </>
        ) : isShowcase ? (
          <>
            {showCategory && product.category && (
              <div className="productCategory">{product.category}</div>
            )}
            <h3>{product.title}</h3>
            <div className="productShowcaseRating">
              <span className="productShowcaseStars" aria-hidden>★★★★★</span>
              <span>{product.rating} · In stock</span>
            </div>
            <div className="productShowcaseFooter">
              {showPrice ? (
                <div className="productPriceWrap">
                  <strong><PriceDisplay value={product.price} as="span" /></strong>
                  {product.compareAt && <s className="productCompareAt"><PriceDisplay value={product.compareAt} as="span" /></s>}
                </div>
              ) : (
                <span className="productEnquireHint">Enquire for price</span>
              )}
              <span className="productShowcaseBtn">
                <CartIcon /> Enquire Now
              </span>
            </div>
          </>
        ) : (
          <>
            {showCategory && product.category && (
              <div className="productCategory">{product.category}</div>
            )}
            <div className="productMeta">
              <span>{product.rating} rating</span>
              <span>In stock</span>
            </div>
            <h3>{product.title}</h3>
            <div className="productBuyRow">
              {showPrice ? (
                <div className="productPriceWrap">
                  <strong><PriceDisplay value={product.price} as="span" /></strong>
                  {product.compareAt && <s className="productCompareAt"><PriceDisplay value={product.compareAt} as="span" /></s>}
                </div>
              ) : (
                <span className="productEnquireHint">Enquire for price</span>
              )}
              <span className="quickAdd"><CartIcon /> Enquire Now</span>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
