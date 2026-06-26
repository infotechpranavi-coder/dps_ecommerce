'use client'

import Link from 'next/link'
import { CartIcon, EyeIcon, HeartIcon } from './Icons'
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
}

export function ProductCard({
  product,
  wishlisted,
  onToggleWishlist,
  showCategory = false,
  variant = 'default',
}: {
  product: ProductCardData
  wishlisted: boolean
  onToggleWishlist: () => void
  showCategory?: boolean
  variant?: 'default' | 'showcase' | 'showcase-compact'
}) {
  const detailHref = product.slug ? `/products/${product.slug}` : '/products'
  const isShowcaseCompact = variant === 'showcase-compact'
  const isShowcase = variant === 'showcase' || isShowcaseCompact

  return (
    <article className={`productCard productsCatalogCard${isShowcase ? ' productCard--showcase' : ''}${isShowcaseCompact ? ' productCard--showcase-compact' : ''}`}>
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
          loading="lazy"
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
              <div className="productPriceWrap">
                <strong>{product.price}</strong>
              </div>
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
              <div className="productPriceWrap">
                <strong>{product.price}</strong>
                {product.compareAt && <s className="productCompareAt">{product.compareAt}</s>}
              </div>
              <span className="productShowcaseBtn">
                <CartIcon /> Shop now
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
              <div className="productPriceWrap">
                <strong>{product.price}</strong>
                {product.compareAt && <s className="productCompareAt">{product.compareAt}</s>}
              </div>
              <span className="quickAdd"><CartIcon /> View Product</span>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
