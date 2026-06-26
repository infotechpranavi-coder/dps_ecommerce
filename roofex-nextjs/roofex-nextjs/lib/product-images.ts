/** Verified working jewellery images on Unsplash (tested HTTP 200). */
const POOL = [
  'photo-1599643478518-a784e5dc4c8f',
  'photo-1535632066927-ab7c9ab60908',
  'photo-1573408301185-9146fe634ad0',
  'photo-1515562141207-7a88fb7ce338',
  'photo-1605100804763-247f67b3557e',
  'photo-1615874694520-474822394e73',
  'photo-1513519245088-0e12902e5a38',
  'photo-1590874103328-eac38a683ce7',
  'photo-1627123424574-724758594e93',
  'photo-1490481651871-ab68de25d43d',
  'photo-1469334031218-e382a71b716b',
  'photo-1558618666-fcd25c85cd64',
  'photo-1610701596007-11502861dcfa',
] as const

export function jewelleryImage(id: string, width = 700): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const jewelleryImages = {
  necklace: jewelleryImage('photo-1599643478518-a784e5dc4c8f'),
  necklaceAlt: jewelleryImage('photo-1515562141207-7a88fb7ce338'),
  earrings: jewelleryImage('photo-1535632066927-ab7c9ab60908'),
  earringsAlt: jewelleryImage('photo-1627123424574-724758594e93'),
  bangles: jewelleryImage('photo-1573408301185-9146fe634ad0'),
  banglesAlt: jewelleryImage('photo-1490481651871-ab68de25d43d'),
  rings: jewelleryImage('photo-1605100804763-247f67b3557e'),
  ringsAlt: jewelleryImage('photo-1469334031218-e382a71b716b'),
  bridal: jewelleryImage('photo-1515562141207-7a88fb7ce338'),
  bridalAlt: jewelleryImage('photo-1615874694520-474822394e73'),
  limited: jewelleryImage('photo-1615874694520-474822394e73'),
  limitedAlt: jewelleryImage('photo-1513519245088-0e12902e5a38'),
  flatLay: jewelleryImage('photo-1490481651871-ab68de25d43d'),
  craft: jewelleryImage('photo-1558618666-fcd25c85cd64'),
  display: jewelleryImage('photo-1610701596007-11502861dcfa'),
} as const

export const defaultProductImage = jewelleryImages.necklace

export function jewelleryGallery(main: string, ...extras: string[]): string[] {
  const urls = [main, ...extras].filter(Boolean)
  return urls.length ? urls : [defaultProductImage]
}

export function poolImage(index: number, width = 700): string {
  return jewelleryImage(POOL[index % POOL.length], width)
}

export const categoryImages: Record<string, string> = {
  'necklace-sets': jewelleryImages.necklace,
  earrings: jewelleryImages.earrings,
  'bangles-bracelets': jewelleryImages.bangles,
  rings: jewelleryImages.rings,
  'bridal-collection': jewelleryImages.bridal,
  'limited-edition': jewelleryImages.limited,
}

const categoryTitleToSlug: Record<string, string> = {
  'Necklace Sets': 'necklace-sets',
  Earrings: 'earrings',
  'Bangles & Bracelets': 'bangles-bracelets',
  Rings: 'rings',
  'Bridal Collection': 'bridal-collection',
  'Limited Edition': 'limited-edition',
}

/** Same image used on homepage category cards for this product category. */
export function productImageForCategory(categoryTitle: string): string {
  const slug = categoryTitleToSlug[categoryTitle]
  return (slug && categoryImages[slug]) || defaultProductImage
}

export function withCategoryProductImages<T extends { category: string; img: string; images?: string[] }>(
  product: T,
): T {
  const img = productImageForCategory(product.category)
  return {
    ...product,
    img,
    images: jewelleryGallery(img),
  }
}
