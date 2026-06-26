export const brand = {
  name: 'DB International Ventures',
  shortName: 'DB International',
  initials: 'DB',
  tagline: 'Global Reach, Reliable Supply',
  description:
    'DB International Ventures supplies curated imitation jewellery across India and worldwide — reliable sourcing, quality finishing, and dependable delivery for retailers and shoppers.',
  logo: '/logo/dps_logo-removebg-preview.png',
  logoSmall: '/logo/dpssmall-logoremovebg-preview.png',
  logoFull: '/logo/dps%20logo.jpeg',
  email: 'info@dbinternationalventures.com',
  supportEmail: 'support@dbinternationalventures.com',
  wholesaleEmail: 'wholesale@dbinternationalventures.com',
  phone: '+91 98765 43210',
  phoneTel: '+919876543210',
  address: 'Mumbai, Maharashtra, India',
  addressFull: 'DB International Ventures, Mumbai, Maharashtra, India',
  founded: '2018',
  copyright: `Copyright ${new Date().getFullYear()} DB International Ventures. All Rights Reserved.`,
} as const

export const siteMetadata = {
  title: `${brand.name} | Imitation Jewellery`,
  description: `${brand.tagline}. Shop necklaces, earrings, bangles, bridal sets, and limited-edition imitation jewellery from ${brand.name}.`,
}
