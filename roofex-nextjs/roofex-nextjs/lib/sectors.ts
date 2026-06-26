export type Sector = {
  slug: string
  name: string
  img: string
  tagline: string
  headline: string
  paragraphs: string[]
  bullets: string[]
}

export const sectors: Sector[] = [
  {
    slug: 'home-living',
    name: 'Home Living',
    img: 'https://images.unsplash.com/photo-1615874694520-474822394e73?w=900&q=80',
    tagline: 'Spaces that feel intentional',
    headline: 'Elevate the rooms you use every day',
    paragraphs: [
      'Linen, ceramic, candles, and objects that turn daily rituals into quiet luxury.',
      'Each edit is built for texture, warmth, and pieces that look refined without trying too hard.',
    ],
    bullets: ['Bedding & throws', 'Ceramic & vessels', 'Candles & scent', 'Table & serveware'],
  },
  {
    slug: 'travel-style',
    name: 'Travel & Style',
    img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
    tagline: 'Pack light, arrive polished',
    headline: 'Carry essentials built for movement',
    paragraphs: [
      'Weekenders, organizers, and leather goods designed for departures, commutes, and returns.',
      'Durable materials and thoughtful compartments keep travel feeling effortless.',
    ],
    bullets: ['Leather carryalls', 'Packing organizers', 'Passport & card cases', 'Hard-shell luggage'],
  },
  {
    slug: 'gifting',
    name: 'Gifting',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    tagline: 'Arrives ready to impress',
    headline: 'Gifts that feel personal and premium',
    paragraphs: [
      'Curated sets and standalone pieces with packaging made for birthdays, housewarmings, and milestones.',
      'Choose from bestsellers and limited editions that consistently earn five-star reactions.',
    ],
    bullets: ['Gift-ready boxes', 'Bestseller edits', 'Limited editions', 'Corporate gifting'],
  },
  {
    slug: 'tech-desk',
    name: 'Tech & Desk',
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=80',
    tagline: 'Tools that blend in beautifully',
    headline: 'Smart objects for focused work and rest',
    paragraphs: [
      'Charging docks, lighting, audio, and organizers that look at home on a desk or nightstand.',
      'Designed to disappear into your space while keeping everyday tech tidy and accessible.',
    ],
    bullets: ['Wireless charging', 'Desk lighting', 'Audio & earbuds', 'Cable organizers'],
  },
]

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug)
}
