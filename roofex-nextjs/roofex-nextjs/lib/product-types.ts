export type SubCategory = {
  title: string
  slug: string
}

export type Product = {
  id: string
  slug: string
  title: string
  price: string
  rating: string
  img: string
  images: string[]
  category: string
  /** Sub-category title under the parent category */
  subcategory?: string
  badge?: string
  compareAt?: string
  shortDescription: string
  description: string
  features: string[]
  material?: string
  dimensions?: string
  sku: string
  reviewCount: number
  inStock: boolean
  stockCount?: number
  warranty?: string
  /** Minimum order quantity required to purchase / enquire */
  moq?: number
  isNew?: boolean
  isBestSeller?: boolean
  isLimited?: boolean
  /** Show this product link in the footer Shop Products list */
  showInFooter?: boolean
  /** Hide price on product cards and detail page */
  hidePrice?: boolean
}

export type Category = {
  title: string
  slug: string
  count: string
  img: string
  size: 'large' | 'medium' | 'wide'
  description: string
  subcategories?: SubCategory[]
}

export type LimitedProduct = {
  slug: string
  title: string
  price: string
  img: string
  units: string
  description: string
}

export type HeroBanner = {
  id: string
  image: string
  alt: string
  active: boolean
  sortOrder: number
}
