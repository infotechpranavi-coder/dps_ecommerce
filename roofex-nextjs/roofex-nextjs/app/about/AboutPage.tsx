'use client'

import Link from 'next/link'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { EcomTrustBar } from '@/components/EcomTrustBar'
import { ProductCard } from '@/components/ProductCard'
import { AwardIcon, LeafIcon, ShieldIcon, UsersIcon } from '@/components/Icons'
import { bestSellers, categories } from '@/lib/products'

const values = [
  { icon: <AwardIcon />, title: 'Premium Craftsmanship', desc: 'Exceptional materials and meticulous attention to detail in every piece we carry.' },
  { icon: <ShieldIcon />, title: 'Timeless Design', desc: 'Products designed to remain relevant, beautiful, and useful for years to come.' },
  { icon: <UsersIcon />, title: 'Customer First', desc: 'Every product selection, policy, and experience begins with the shopper in mind.' },
  { icon: <LeafIcon />, title: 'Sustainability', desc: 'Responsible sourcing, mindful packaging, and production partners we trust.' },
]

const journey = [
  { year: '2020', title: 'Brand Founded', desc: 'Started with a small edit of home and lifestyle essentials.' },
  { year: '2021', title: 'First Premium Collection', desc: 'Launched signature accessories and home collection online.' },
  { year: '2023', title: '10,000 Happy Customers', desc: 'Reached our first major milestone with 4.9 average rating.' },
  { year: '2025', title: 'Global Expansion', desc: 'Opened shipping to 40+ countries with express delivery.' },
  { year: '2026', title: '50,000+ Customers Worldwide', desc: 'Growing community of shoppers who value quality and design.' },
]

const trustStats = [
  { num: '50,000+', label: 'Happy Customers' },
  { num: '120,000+', label: 'Orders Delivered' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '98%', label: 'Customer Satisfaction' },
]

const shoppingPerks = [
  { title: 'Curated Selection', desc: 'Every product is handpicked for quality, design, and everyday use — never mass-market filler.' },
  { title: 'Fast Delivery', desc: 'Most orders ship within 24 hours. Standard delivery in 3–7 days; express in 1–3 days.' },
  { title: 'Gift-Ready Packaging', desc: 'Premium packaging included on orders over $150. Personalized gift messages at checkout.' },
  { title: 'VIP Early Access', desc: 'Members get first access to limited drops, new arrivals, and exclusive editions.' },
]

const qualityCommitments = [
  { title: 'Material Transparency', desc: 'Every product page lists materials, dimensions, and care instructions — no guesswork.' },
  { title: 'Verified Reviews', desc: 'All reviews come from verified buyers. Our average rating is 4.9 across 8,400+ orders.' },
  { title: 'Responsible Sourcing', desc: 'We partner with makers who share our standards for ethical production and sustainable packaging.' },
]

const testimonials = [
  { text: 'The quality feels genuinely premium — from the product to the unboxing experience.', name: 'Maya Chen', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { text: 'Finally an online store where everything looks as good as the photos. Fast shipping too.', name: 'James Billah', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { text: 'I have ordered three times now. Consistent quality and excellent customer support.', name: 'Sarah Williams', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
]

const partners = ['AURELIA', 'MONO', 'KINDRED', 'MAISON IX', 'LUNE', 'ATELIER']

export default function AboutPage() {
  return (
    <>
      <FloatingNavbar activePage="about" />
      <main className="aboutPage">
        <section className="aboutHero">
          <div className="container aboutHeroGrid">
            <Reveal className="aboutHeroCopy">
              <div className="eyebrow">Our Story</div>
              <h1>Crafting Products That Elevate Everyday Living</h1>
              <p>
                We believe exceptional products should do more than serve a purpose. They should inspire confidence,
                enhance daily experiences, and reflect timeless design — whether it is a linen throw on your sofa,
                a leather carryall for weekend trips, or a limited-edition piece for your collection.
              </p>
              <div className="aboutHeroActions">
                <Link href="/products" className="btnOrange">Shop Collection</Link>
                <Link href="/contact" className="btnOutlineWhite">Contact Us</Link>
              </div>
            </Reveal>
            <Reveal className="aboutHeroMedia" delay={0.15}>
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80" alt="Premium lifestyle interior" />
              <div className="aboutHeroGlass">
                <span>Est. 2020</span>
                <strong>Premium lifestyle, thoughtfully curated</strong>
              </div>
            </Reveal>
          </div>
        </section>

        <EcomTrustBar />

        <section className="section aboutStory">
          <div className="container aboutStoryGrid">
            <Reveal className="aboutStoryVisual">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80" alt="Craftsmanship and design" />
              <div className="aboutStoryAccent" aria-hidden />
            </Reveal>
            <Reveal className="aboutStoryContent" delay={0.1}>
              <h2 className="sectionTitle">Designed Around Quality, Built Around People</h2>
              <p>
                Every product in our collection is selected with one purpose: to bring together premium craftsmanship,
                thoughtful functionality, and modern aesthetics. We believe in creating experiences that go beyond
                ownership and become part of everyday life.
              </p>
              <p>
                From the first sketch to the final unboxing, we obsess over the details that turn a simple purchase
                into a lasting relationship — because luxury is not loud. It is felt, used, and remembered.
              </p>
              <ul className="aboutStoryList">
                <li>Handpicked products from trusted makers worldwide</li>
                <li>Clear pricing, honest descriptions, and real customer reviews</li>
                <li>Premium packaging and reliable delivery on every order</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section section--surface">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Why Shop With Us</div>
              <h2 className="sectionTitle">The Roofex Shopping Experience</h2>
              <p className="sectionDesc">Everything you expect from a modern luxury ecommerce store — and more.</p>
            </Reveal>
            <div className="aboutPerksGrid">
              {shoppingPerks.map((perk, i) => (
                <Reveal key={perk.title} className="featureItem" delay={i * 0.06}>
                  <h4>{perk.title}</h4>
                  <p>{perk.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--navy aboutValues">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow eyebrow--light">Our Values</div>
              <h2 className="sectionTitle" style={{ color: '#fff' }}>What Guides Every Decision</h2>
            </Reveal>
            <div className="aboutValuesGrid">
              {values.map((value, i) => (
                <Reveal key={value.title} className="aboutValueCard" delay={i * 0.08}>
                  <div className="aboutValueIcon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section aboutJourney">
          <div className="container">
            <Reveal className="sectionHeader sectionHeader--left">
              <div className="eyebrow">Our Journey</div>
              <h2 className="sectionTitle">A Story Still Being Written</h2>
              <p className="sectionDesc">From a single collection to a global community of discerning customers.</p>
            </Reveal>
            <div className="aboutTimeline">
              {journey.map((step, i) => (
                <Reveal key={step.year} className="aboutTimelineItem" delay={i * 0.06}>
                  <div className="aboutTimelineYear">{step.year}</div>
                  <div className="aboutTimelineDot" aria-hidden />
                  <div className="aboutTimelineCard">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--surface aboutTrust">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Why Customers Trust Us</div>
              <h2 className="sectionTitle">Proof Behind The Promise</h2>
            </Reveal>
            <div className="aboutTrustGrid">
              {trustStats.map((stat, i) => (
                <Reveal key={stat.label} className="aboutTrustCard" delay={i * 0.08}>
                  <div className="aboutTrustNum">{stat.num}</div>
                  <div className="aboutTrustLabel">{stat.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Customer Reviews</div>
              <h2 className="sectionTitle">Loved By Shoppers Worldwide</h2>
            </Reveal>
            <div className="aboutReviewsGrid">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} className="testiCard" delay={i * 0.08}>
                  <div className="testiStars">5.0 rating</div>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <div className="testiAuthor">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <div className="testiName">{t.name}</div>
                      <div className="testiRole">{t.role}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Our Commitment</div>
              <h2 className="sectionTitle">Quality You Can Verify</h2>
              <p className="sectionDesc">We stand behind every product with transparent information and post-purchase support.</p>
            </Reveal>
            <div className="aboutPerksGrid">
              {qualityCommitments.map((item, i) => (
                <Reveal key={item.title} className="featureItem" delay={i * 0.06}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--surface brandSection">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Shop By Collection</div>
              <h2 className="sectionTitle">Six Curated Edits, One Standard of Quality</h2>
            </Reveal>
            <div className="aboutCollectionsGrid">
              {categories.map((cat, i) => (
                <Reveal key={cat.title} className="aboutCollectionCard" delay={i * 0.05}>
                  <img src={cat.img} alt={cat.title} />
                  <div>
                    <span>{cat.count}</span>
                    <h3>{cat.title}</h3>
                    <p>{cat.description}</p>
                    <Link href="/products" className="learnMore">Browse collection</Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--surface brandSection">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Featured Brands</div>
              <h2 className="sectionTitle">Partners We Proudly Carry</h2>
            </Reveal>
            <div className="brandRail">
              {partners.map((brand, i) => (
                <Reveal key={brand} className="brandLogo" delay={i * 0.05}>{brand}</Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section aboutFounder">
          <div className="container">
            <Reveal className="aboutFounderCard">
              <div className="aboutFounderQuote">
                <div className="eyebrow">Founder Message</div>
                <h2 className="sectionTitle">A Commitment To Excellence</h2>
                <p>
                  Our mission has always been simple: create products that people genuinely love using every day.
                  Every detail matters, from craftsmanship and design to packaging and customer experience.
                </p>
                <p>
                  When you shop with us, you are not just buying a product — you are investing in something
                  thoughtfully made, carefully delivered, and backed by a team that truly cares.
                </p>
              </div>
              <div className="aboutFounderPortrait">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" alt="Founder portrait" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section--surface">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Shop Favorites</div>
              <h2 className="sectionTitle">Best Sellers From Our Store</h2>
            </Reveal>
            <div className="productGrid">
              {bestSellers.map((product, i) => (
                <Reveal key={product.title} delay={i * 0.05}>
                  <ProductCard product={product} wishlisted={false} onToggleWishlist={() => {}} showCategory />
                </Reveal>
              ))}
            </div>
            <Reveal className="sectionCtaRow">
              <Link href="/products" className="btn btnDark">View All Products</Link>
            </Reveal>
          </div>
        </section>

        <section className="ctaBanner limitedOffer">
          <div className="container ctaInner">
            <div>
              <div className="eyebrow eyebrow--light">Start Exploring</div>
              <h2>Explore Our Collection</h2>
              <p>Discover the pieces that turn everyday routines into moments worth savoring.</p>
            </div>
            <Link href="/products" className="btn btnPrimary" style={{ flexShrink: 0, padding: '16px 36px' }}>
              Explore Our Collection
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
