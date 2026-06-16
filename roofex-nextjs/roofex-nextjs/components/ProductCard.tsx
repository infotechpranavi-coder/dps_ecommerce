'use client'

import Link from 'next/link'
import { CartIcon, EyeIcon, HeartIcon } from './Icons'

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
}: {
  product: ProductCardData
  wishlisted: boolean
  onToggleWishlist: () => void
  showCategory?: boolean
}) {
  const detailHref = product.slug ? `/products/${product.slug}` : '/products'

  return (
    <article className="productCard productsCatalogCard">
      <div className="productImgWrap">
        {product.badge && <span className="productBadge">{product.badge}</span>}
        <Link href={detailHref}>
          <img src={product.img} alt={product.title} />
        </Link>
        <Link href={detailHref} className="productsQuickView"><EyeIcon /> Quick View</Link>
        <button
          type="button"
          className={`wishlistBtn${wishlisted ? ' active' : ''}`}
          onClick={onToggleWishlist}
          aria-label={`Wishlist ${product.title}`}
        >
          <HeartIcon />
        </button>
      </div>
      <div className="productBody">
        {showCategory && product.category && (
          <div className="productCategory">{product.category}</div>
        )}
        <div className="productMeta">
          <span>{product.rating} rating</span>
          <span>In stock</span>
        </div>
        <h3><Link href={detailHref}>{product.title}</Link></h3>
        <div className="productBuyRow">
          <div className="productPriceWrap">
            <strong>{product.price}</strong>
            {product.compareAt && <s className="productCompareAt">{product.compareAt}</s>}
          </div>
          <Link href={detailHref} className="quickAdd"><CartIcon /> View Product</Link>
        </div>
      </div>
    </article>
  )
}
