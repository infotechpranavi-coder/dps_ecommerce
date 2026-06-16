'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ProductCard } from '@/components/ProductCard'
import { bestSellers, categories, newArrivals } from '@/lib/products'
import {
  AwardIcon,
  CheckIcon,
  MailIcon,
  ShieldIcon,
  UsersIcon,
  WrenchIcon,
} from '@/components/Icons'

function Hero() {
  return (
    <section className="hero">
      <div className="heroBg" aria-hidden />
      <Reveal className="heroBody">
        <div className="premiumBadge">Fresh finds, premium feel</div>
        <h1>Shop Beautiful Pieces That Make Everyday Feel Special</h1>
        <p className="heroCopy">
          Discover home, style, and gifting essentials chosen for quality, comfort, and a polished look you can use every day.
        </p>
        <div className="heroBtns">
          <Link href="/products" className="btnOrange">Shop Collection</Link>
          <a href="#new-arrivals" className="btnOutlineWhite">Explore New Arrivals</a>
        </div>
        <div className="heroTrust">
          <div className="trustAvatars">
            {[32, 44, 56].map((n) => (
              <img key={n} src={`https://randomuser.me/api/portraits/women/${n}.jpg`} alt="" />
            ))}
          </div>
          <div className="trustText">
            Loved by 46,250+ shoppers
            <span>Premium packaging, secure checkout, fast delivery</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const trustItems = [
  { icon: <ShieldIcon />, title: 'Safe Checkout', desc: 'Protected payments' },
  { icon: <AwardIcon />, title: 'Gift-Ready Pack', desc: 'Looks premium on arrival' },
  { icon: <WrenchIcon />, title: 'Quick Delivery', desc: 'Tracked to your door' },
  { icon: <UsersIcon />, title: 'Easy Returns', desc: '30-day support' },
]

function TrustBar() {
  return (
    <div className="trustBar">
      <div className="container trustBarInner">
        <div className="googleRating">
          <div className="googleLogo">R</div>
          <div className="ratingInfo">
            <strong>Shopper Rating</strong>
            <div className="ratingRow">
              <span className="ratingNum">4.9</span>
              <span className="stars">5.0 / 5</span>
            </div>
            <small>Based on 8,400+ verified orders</small>
          </div>
        </div>
        <div className="trustDivider" />
        <div className="trustItems">
          {trustItems.map((item) => (
            <div key={item.title} className="trustItem">
              <div className="trustItemIcon">{item.icon}</div>
              <div className="trustItemText">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const stats = [
  { num: '50K+', desc: 'Happy Shoppers', icon: <UsersIcon /> },
  { num: '120K+', desc: 'Orders Shipped', icon: <WrenchIcon /> },
  { num: '36+', desc: 'Curated Products', icon: <AwardIcon /> },
  { num: '98%', desc: 'Love the Quality', icon: <ShieldIcon /> },
]

function About() {
  return (
    <section className="aboutSection section--gold" id="about">
      <div className="container">
        <Reveal className="aboutGrid">
          <div className="aboutLeft">
            <div className="eyebrow">Why Roofex</div>
            <h2 className="sectionTitle">Premium Finds Without the Confusion</h2>
          </div>
          <div className="aboutRight">
            <p>
              Roofex brings together products that look refined, feel useful, and arrive beautifully packed. You get simple discovery, clear product choices, and pieces that make your home, travel, and gifting moments feel more special.
            </p>
          </div>
        </Reveal>

        <div className="statsGrid">
          {stats.map((s) => (
            <Reveal key={s.desc} className="statCard">
              <div className="statIcon">{s.icon}</div>
              <div className="statNum">{s.num}</div>
              <div className="statDesc">{s.desc}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="aboutMedia">
          <img
            src="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=1100&q=80"
            alt="Premium lifestyle products arranged in a refined interior"
          />
          <div className="videoBadge">
            <div className="playBtn">View</div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Now trending</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>New season favorites</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const testimonials = [
  { text: 'The Noir Home Set looked beautiful straight out of the box. Simple, elegant, and worth it.', name: 'Maya Chen', role: 'Verified Buyer - Noir Home Set', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { text: 'The carryall feels premium and the delivery updates were clear from checkout to arrival.', name: 'Sarah Williams', role: 'Verified Buyer - Atelier Carryall', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { text: 'Everything feels carefully selected. I ordered once for myself, then came back for gifts.', name: 'James Billah', role: 'Verified Buyer - Gift Edit', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { text: 'Fast shipping, clean packaging, and product pages that make choosing easy.', name: 'Emily Thompson', role: 'Verified Buyer - Linen Ritual Kit', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
]

function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
    startX.current = e.pageX - (sliderRef.current?.offsetLeft ?? 0)
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0
  }

  return (
    <section className="testimonialsSection" id="reviews">
      <div className="container">
        <Reveal className="testimonialsHeader">
          <div className="sectionHeader sectionHeader--left">
            <div className="eyebrow">Buyer Favorites</div>
            <h2 className="sectionTitle">People Notice the Details</h2>
            <p className="sectionDesc">Short, real reactions from shoppers who loved the look, feel, and delivery experience.</p>
          </div>
          <span className="testimonialsHint">Drag to explore</span>
        </Reveal>
      </div>
      <div
        className="testimonialsInner"
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseLeave={() => { isDown.current = false }}
        onMouseUp={() => { isDown.current = false }}
        onMouseMove={(e) => {
          if (!isDown.current || !sliderRef.current) return
          e.preventDefault()
          const x = e.pageX - sliderRef.current.offsetLeft
          sliderRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
        }}
        style={{ paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 24px))' }}
      >
        {testimonials.map((t) => (
          <article key={t.name} className="testiCard">
            <div className="verifiedBadge">Verified Buyer</div>
            <div className="testiStars">5.0 rating</div>
            <p>&ldquo;{t.text}&rdquo;</p>
            <div className="testiAuthor">
              <img src={t.avatar} alt={t.name} />
              <div>
                <div className="testiName">{t.name}</div>
                <div className="testiRole">{t.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const collections = categories.map((cat) => ({
  title: cat.title,
  desc: cat.description,
  img: cat.img,
  count: cat.count,
}))

function Collections() {
  return (
    <section className="section" id="collections">
      <div className="container">
        <Reveal className="sectionHeader">
          <div className="eyebrow">Shop The Edit</div>
          <h2 className="sectionTitle">Find the Right Piece Faster</h2>
          <p className="sectionDesc">Browse clear collections built around what customers actually want: style, comfort, gifting, and everyday usefulness.</p>
        </Reveal>
        <div className="servicesGrid">
          {collections.map((s, i) => (
            <Reveal key={s.title} className="serviceCard collectionCard">
              <div className="serviceImgWrap">
                <img src={s.img} alt={s.title} />
                <span className="serviceNum">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="serviceBody">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="collectionCount">{s.count}</span>
                <Link href="/products" className="learnMore">Shop the edit</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BestSellers() {
  const [wishlisted, setWishlisted] = useState<string[]>([])

  const toggleWishlist = (title: string) => {
    setWishlisted((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title])
  }

  return (
    <section className="section section--surface" id="bestsellers">
      <div className="container">
        <Reveal className="sectionHeader">
          <div className="eyebrow">Best Sellers</div>
          <h2 className="sectionTitle">Most Loved Right Now</h2>
          <p className="sectionDesc">Top-rated picks with verified reviews, detailed product pages, and secure checkout.</p>
        </Reveal>
        <div className="productGrid">
          {bestSellers.map((product) => (
            <Reveal key={product.slug}>
              <ProductCard
                product={product}
                wishlisted={wishlisted.includes(product.title)}
                onToggleWishlist={() => toggleWishlist(product.title)}
                showCategory
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="sectionCtaRow">
          <Link href="/products" className="btn btnDark">View All Products</Link>
        </Reveal>
      </div>
    </section>
  )
}

const features = [
  { icon: <AwardIcon />, title: 'Feels Premium', desc: 'We choose products with strong materials, neat finishing, and real everyday use.' },
  { icon: <WrenchIcon />, title: 'Easy To Choose', desc: 'No endless browsing. Each edit is organized so customers can decide quickly.' },
  { icon: <ShieldIcon />, title: 'Safe To Buy', desc: 'Secure checkout, clear delivery details, and simple support after purchase.' },
]

function QualityAndProcess() {
  return (
    <section className="section section--surface">
      <div className="container">
        <div className="qualityInner">
          <Reveal className="qualityLeft">
            <div className="eyebrow">Why Shop Here</div>
            <h2 className="sectionTitle">Premium Shopping Made Simple</h2>
            <div className="qualityImg">
              <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80" alt="Premium products in a refined interior" />
            </div>
          </Reveal>
          <Reveal>
            <div className="featureHighlight">
              <h4>Clear choices. Beautiful products. Smooth delivery.</h4>
              <p>Roofex makes premium shopping easy with curated edits, useful product details, secure checkout, and packaging that feels special when it arrives.</p>
            </div>
            {features.map((f) => (
              <div key={f.title} className="featureItem">
                <div className="featIcon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="sectionHeader">
          <div className="eyebrow">How It Works</div>
          <h2 className="sectionTitle">From Browse to Box in Four Simple Steps</h2>
        </Reveal>
        <div className="processSteps processStepsFour">
          {[
            ['01', 'Browse', 'Explore curated edits by style, product type, and customer favorites.'],
            ['02', 'Pick', 'Check images, ratings, price, and stock before adding to cart.'],
            ['03', 'Pay Safely', 'Complete your order through a secure and focused checkout.'],
            ['04', 'Unbox', 'Get tracked shipping, premium packaging, and easy return support.'],
          ].map(([num, title, desc]) => (
            <Reveal key={title} className="processStep">
              <div className="stepCircle">{num}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  return (
    <section className="section">
      <div className="container benefitsInner">
        <Reveal className="benefitsLeft">
          <div className="eyebrow">Service Promise</div>
          <h2 className="sectionTitle">A Premium Feel After You Click Buy</h2>
          <p className="sectionDesc" style={{ textAlign: 'left', margin: '0 0 28px' }}>
            Great shopping does not stop at the product page. Roofex keeps the full experience clear, quick, and reassuring.
          </p>
          <div className="benefitItem">
            <div className="benefitNum">1</div>
            <div>
              <h4>Helpful Support</h4>
              <p>Get guidance for product choice, gifting, delivery, and post-purchase questions.</p>
            </div>
          </div>
          <div className="benefitItem">
            <div className="benefitNum">2</div>
            <div>
              <h4>Simple Returns</h4>
              <p>Enjoy clear order updates, a 30-day return window, and packaging made to impress.</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="benefitsRight">
          <div className="reviewCardSmall">
            <div className="miniAvatars">
              {[22, 33, 55].map((n) => (
                <img key={n} src={`https://randomuser.me/api/portraits/women/${n}.jpg`} alt="" />
              ))}
            </div>
            <small>Trusted by premium shoppers</small>
            <div className="miniStars">4.9 average rating</div>
            <strong>8,400+ verified reviews</strong>
          </div>
          <div className="benefitsImgs">
            <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=80" alt="Premium home lifestyle scene" />
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80" alt="Modern lifestyle collection" />
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80" alt="Premium packaged products" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const bentoReviews = [
  {
    text: 'Beautiful finish, strong packaging, and the set looks premium in my home.',
    name: 'Sarah Thompson',
    role: 'Verified Buyer',
    product: 'Noir Ceramic Ritual Set',
    location: 'Mumbai, India',
    date: 'Purchased 2 weeks ago',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    thumb: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&q=80',
  },
  {
    text: 'Elegant, useful, and exactly like the photos. Delivery was smooth too.',
    name: 'Michael Johnson',
    role: 'Verified Buyer',
    product: 'Brushed Gold Tray',
    location: 'London, UK',
    date: 'Verified on May 2026',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    thumb: 'https://images.unsplash.com/photo-1602874801006-1f7b6611c7e3?w=200&q=80',
  },
  {
    text: 'Soft leather, neat stitching, and a premium feel from box to bag.',
    name: 'Russell Wilson',
    role: 'Verified Buyer',
    product: 'Premium Leather Travel Bag',
    location: 'New York, USA',
    date: 'Purchased 2 weeks ago',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    thumb: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=220&q=80',
    featured: true,
  },
  {
    text: 'A gift-ready box with products that felt carefully selected.',
    name: 'Emily Parker',
    role: 'Verified Buyer',
    product: 'Luxury Gift Collection',
    location: 'Dubai, UAE',
    date: 'Verified on May 2026',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    thumb: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&q=80',
  },
  {
    text: 'Soft, warm, and refined. Checkout was simple and fast.',
    name: 'Kevin Brown',
    role: 'Verified Buyer',
    product: 'Linen Lounge Throw',
    location: 'London, UK',
    date: 'Purchased 2 weeks ago',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    thumb: 'https://images.unsplash.com/photo-1583845112203-29329902330b?w=200&q=80',
  },
  {
    text: 'Structured, stylish, and easy to carry every day.',
    name: 'David Ramirez',
    role: 'Verified Buyer',
    product: 'Atelier Leather Carryall',
    location: 'Mumbai, India',
    date: 'Verified on May 2026',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    thumb: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&q=80',
  },
]

function ClientReviews() {
  const proofMetrics = [
    '★ 4.9/5 Average Rating',
    '50,000+ Happy Customers',
    '98% Satisfaction Rate',
    '120,000+ Orders Delivered',
  ]

  const displayMetrics = [
    '4.9/5 rating',
    '50k+ happy shoppers',
    '98% satisfaction',
    'Tracked delivery',
  ]

  const trustSignals = ['Secure Checkout', 'Fast Delivery', 'Premium Quality', 'Easy Returns']

  return (
    <section className="section section--gold clientReviews">
      <div className="container">
        <Reveal className="sectionHeader">
          <div className="eyebrow eyebrow--light">Customer Love</div>
          <h2 className="sectionTitle">Real Words From Real Shoppers</h2>
          <p className="sectionDesc">Quick proof that the products look good, feel good, and arrive the way customers expect.</p>
        </Reveal>
        <Reveal className="reviewMetrics">
          {displayMetrics.map((metric) => (
            <div key={metric} className="reviewMetric">{metric}</div>
          ))}
        </Reveal>
        <div className="floatingTrustIndicators" aria-hidden>
          {trustSignals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
        <div className="reviewsBento">
          {bentoReviews.map((r) => (
            <Reveal key={r.name} className={`reviewBentoCard${r.featured ? ' featured' : ''}`}>
              <div>
                <div className="reviewCardTop">
                  <div className="verifiedBadge">Verified</div>
                  <div className="reviewDate">{r.date}</div>
                </div>
                <div className="rbStars">★★★★★</div>
                <p>&ldquo;{r.text}&rdquo;</p>
                <div className="reviewProduct">
                  <img src={r.thumb} alt={r.product} />
                  <div>
                    <span>Purchased</span>
                    <strong>{r.product}</strong>
                  </div>
                </div>
                <div className="rbAuthor">
                  <img src={r.avatar} alt={r.name} />
                  <div>
                    <div className="rbName">{r.name}</div>
                    <div className="rbRoleClean">{r.role} - {r.location}</div>
                    <div className="rbRole">{r.role} · {r.location}</div>
                  </div>
                </div>
              </div>
              {r.featured && (
                <div className="featuredImg">
                  <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80" alt="Premium Leather Travel Bag" />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const newArrivalsList = newArrivals.slice(0, 6)

function NewArrivals() {
  const railRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
    startX.current = e.pageX - (railRef.current?.offsetLeft ?? 0)
    scrollLeft.current = railRef.current?.scrollLeft ?? 0
  }

  return (
    <section className="testimonialsSection arrivalsSection" id="new-arrivals">
      <div className="container">
        <Reveal className="testimonialsHeader">
          <div className="sectionHeader sectionHeader--left">
            <div className="eyebrow">New Arrivals</div>
            <h2 className="sectionTitle">New Pieces Worth Noticing</h2>
            <p className="sectionDesc">Fresh arrivals selected to make your space, style, and gifting feel instantly upgraded.</p>
          </div>
          <span className="testimonialsHint">Drag to explore</span>
        </Reveal>
      </div>
      <div
        className="newArrivalRail"
        ref={railRef}
        onMouseDown={onMouseDown}
        onMouseLeave={() => { isDown.current = false }}
        onMouseUp={() => { isDown.current = false }}
        onMouseMove={(e) => {
          if (!isDown.current || !railRef.current) return
          e.preventDefault()
          const x = e.pageX - railRef.current.offsetLeft
          railRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
        }}
        style={{ paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 24px))' }}
      >
        {newArrivalsList.map((item) => (
          <Link key={item.slug} href={`/products/${item.slug}`} className="arrivalCard">
            <img src={item.img} alt={item.title} />
            <div className="arrivalBody">
              <span>{item.badge ?? 'New Season'}</span>
              <h3>{item.title}</h3>
              <strong>{item.price}</strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

const featuredBrands = ['AURELIA', 'MONO', 'KINDRED', 'MAISON IX', 'LUNE', 'ATELIER']

function FeaturedBrands() {
  return (
    <section className="section brandSection">
      <div className="container">
        <Reveal className="sectionHeader">
          <div className="eyebrow">Featured Brands</div>
          <h2 className="sectionTitle">Names Chosen for Taste and Trust</h2>
          <p className="sectionDesc">A focused mix of makers and edits that keeps the store premium, clear, and easy to browse.</p>
        </Reveal>
        <Reveal className="brandRail">
          {featuredBrands.map((brand) => (
            <div key={brand} className="brandLogo">{brand}</div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

const bookingPerks = [
  'Early access to private launches',
  'VIP-only product drops',
  'Exclusive offers and gifting edits',
]

function Newsletter() {
  return (
    <section className="section section--surface" id="vip">
      <div className="container">
        <Reveal className="bookingCard newsletterCard">
          <div className="bookingLeft">
            <div className="eyebrow">VIP Access</div>
            <h2 className="sectionTitle">Get First Access to the Best Drops</h2>
            <p className="sectionDesc" style={{ textAlign: 'left', margin: '0 0 8px' }}>
              Join for early access to new collections, limited releases, gift edits, and members-only offers.
            </p>
            <div className="bookingPerks">
              {bookingPerks.map((perk) => (
                <div key={perk} className="bookingPerk">
                  <CheckIcon />
                  {perk}
                </div>
              ))}
            </div>
            <div className="bookingContact">
              <div className="contactIcon">
                <MailIcon />
              </div>
              <div>
                <small>Members receive</small>
                <strong>New drops before everyone else</strong>
              </div>
            </div>
          </div>
          <form className="bookingForm" onSubmit={(e) => e.preventDefault()}>
            <div className="formGroup">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="Avery Stone" required />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="avery@email.com" required />
            </div>
            <div className="formGroup">
              <label htmlFor="interest">Shopping Interest</label>
              <select id="interest" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option>Home Collection</option>
                <option>Style Essentials</option>
                <option>Gifting</option>
                <option>New Arrivals</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="frequency">Launch Preference</label>
              <select id="frequency" defaultValue="weekly">
                <option value="weekly">Weekly edit</option>
                <option value="monthly">Monthly digest</option>
                <option value="vip">VIP-only drops</option>
              </select>
            </div>
            <div className="formGroup formGroupFull">
              <label htmlFor="note">What are you shopping for?</label>
              <input id="note" type="text" placeholder="Home refresh, gifting, travel, wardrobe essentials" />
            </div>
            <button type="submit" className="btnSubmit">Join VIP List</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Blog() {
  const blogPosts = [
    {
      img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
      date: 'Style Guide',
      title: 'Make Your Home Look Expensive, Simply',
      desc: 'Five layering tricks with linen throws, ceramic vessels, and brass trays — no renovation required.',
    },
    {
      img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
      date: 'Buying Guide',
      title: 'How to Choose the Right Gift Every Time',
      desc: 'Our editors share the pieces that consistently earn five-star reviews as gifts.',
    },
    {
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
      date: 'Product Care',
      title: 'Caring for Leather, Linen & Ceramic',
      desc: 'Simple maintenance routines that keep premium materials looking their best for years.',
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <Reveal className="sectionHeader">
          <div className="eyebrow">Journal</div>
          <h2 className="sectionTitle">Quick Ideas for Better Everyday Style</h2>
          <p className="sectionDesc">Simple guides that help customers shop smarter and use their products beautifully.</p>
        </Reveal>
        <div className="blogGrid blogGridThree">
          {blogPosts.map((post) => (
            <Reveal key={post.title} className="blogCard">
              <img src={post.img} alt={post.title} />
              <div className="blogBody">
                <div className="blogDate">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <Link href="/about" className="learnMore">Read guide</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="ctaBanner limitedOffer">
      <div className="container ctaInner">
        <div>
          <div className="eyebrow eyebrow--light">Limited Offer</div>
          <h2>Free Premium Packaging on Orders Over $150</h2>
          <p>Perfect for gifts, home refreshes, and special purchases. The offer applies automatically at checkout.</p>
        </div>
        <Link href="/products" className="btn btnPrimary" style={{ flexShrink: 0, padding: '16px 36px' }}>
          Shop Best Sellers
        </Link>
      </div>
    </section>
  )
}

export default function RoofexPage() {
  return (
    <>
      <FloatingNavbar activePage="home" />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Testimonials />
        <Collections />
        <BestSellers />
        <QualityAndProcess />
        <Benefits />
        <ClientReviews />
        <NewArrivals />
        <FeaturedBrands />
        <Newsletter />
        <Blog />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
