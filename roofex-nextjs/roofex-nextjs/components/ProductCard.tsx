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
  subcategory?: string
  badge?: string
  compareAt?: string
  hidePrice?: boolean
  moq?: number
  inStock?: boolean
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
  const moq = Math.max(1, Math.floor(product.moq || 1))
  const isOutOfStock = product.inStock === false
  const ctaLabel = isOutOfStock ? 'Order on Demand' : 'Enquire Now'
  const categoryLabel = product.subcategory
    ? `${product.category} · ${product.subcategory}`
    : product.category

  return (
    <article className={`productCard productsCatalogCard${isShowcase ? ' productCard--showcase' : ''}${isShowcaseCompact ? ' productCard--showcase-compact' : ''}${!showPrice ? ' productCard--noPrice' : ''}${isOutOfStock ? ' productCard--oos' : ''}`}>
      <Link
        href={detailHref}
        className="productCardStretched"
        aria-label={`View details for ${product.title}`}
      />
      <div className="productImgWrap">
        {isOutOfStock ? (
          <span className="productBadge productBadge--oos">Out of stock</span>
        ) : product.badge ? (
          <span className="productBadge">{product.badge}</span>
        ) : null}
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
            {showCategory && categoryLabel && (
              <div className="productCategory">{categoryLabel}</div>
            )}
            <h3>{product.title}</h3>
            <div className="productShowcaseRating">
              <span className="productShowcaseStars" aria-hidden>★★★★★</span>
              <span>{product.rating} · {isOutOfStock ? 'On demand' : 'In stock'}</span>
            </div>
            {moq > 1 ? <span className="productMoqBadge">MOQ {moq}</span> : null}
            <div className="productShowcaseFooter">
              {showPrice ? (
                <div className="productPriceWrap">
                  <strong><PriceDisplay value={product.price} as="span" /></strong>
                  {product.compareAt && <s className="productCompareAt"><PriceDisplay value={product.compareAt} as="span" /></s>}
                </div>
              ) : (
                <span className="productEnquireHint">Enquire for price</span>
              )}
              <span className={`productShowcaseBtn${isOutOfStock ? ' productShowcaseBtn--demand' : ''}`}>
                <CartIcon /> {ctaLabel}
              </span>
            </div>
          </>
        ) : (
          <>
            {showCategory && categoryLabel && (
              <div className="productCategory">{categoryLabel}</div>
            )}
            <div className="productMeta">
              <span>{product.rating} rating</span>
              <span>{isOutOfStock ? 'On demand' : 'In stock'}</span>
            </div>
            <h3>{product.title}</h3>
            {moq > 1 ? <span className="productMoqBadge">MOQ {moq}</span> : null}
            <div className="productBuyRow">
              {showPrice ? (
                <div className="productPriceWrap">
                  <strong><PriceDisplay value={product.price} as="span" /></strong>
                  {product.compareAt && <s className="productCompareAt"><PriceDisplay value={product.compareAt} as="span" /></s>}
                </div>
              ) : (
                <span className="productEnquireHint">Enquire for price</span>
              )}
              <span className={`quickAdd${isOutOfStock ? ' quickAdd--demand' : ''}`}><CartIcon /> {ctaLabel}</span>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
