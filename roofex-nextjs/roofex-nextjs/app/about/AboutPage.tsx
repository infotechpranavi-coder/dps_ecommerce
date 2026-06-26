'use client'

import Link from 'next/link'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import {
  CraftMedalIcon,
  CommitmentSealIcon,
  SolutionsBulbIcon,
  ProtectionChartIcon,
  CheckIcon,
  ClockIcon,
  HeartIcon,
  MailIcon,
} from '@/components/Icons'
import { brand } from '@/lib/brand'

const values = [
  {
    icon: <CraftMedalIcon size={96} color="#e8a020" />,
    title: 'Craftsmanship',
    desc: 'We use quality plating, neat stone work, and careful finishing so every piece feels premium and festive-ready.',
  },
  {
    icon: <CommitmentSealIcon size={96} color="#e8a020" />,
    title: 'Commitment',
    desc: 'Your satisfaction is our priority. We communicate clearly, fulfil on time, and stand behind every order we supply.',
  },
  {
    icon: <SolutionsBulbIcon size={96} color="#e8a020" />,
    title: 'Solutions',
    desc: 'From bridal edits to wholesale supply, we bring thoughtful jewellery selections and practical support for every need.',
  },
  {
    icon: <ProtectionChartIcon size={96} color="#e8a020" />,
    title: 'Protection',
    desc: 'Secure enquiries, honest product details, and dependable packaging — jewellery that arrives as promised, every time.',
  },
]

const journey = [
  { year: '2018', title: 'Company Founded', desc: 'DB International Ventures began with a focused edit of imitation jewellery for festive and bridal wear.' },
  { year: '2020', title: 'Online Catalogue Launched', desc: 'Expanded our digital catalogue with necklaces, earrings, and bangle collections.' },
  { year: '2022', title: 'Wholesale Partnerships', desc: 'Started supplying retailers, event planners, and designers across Maharashtra and Gujarat.' },
  { year: '2024', title: 'Pan-India Reach', desc: 'Scaled delivery and support for customers and partners across India.' },
  { year: '2026', title: 'Global Supply Network', desc: 'Growing international enquiries with the same commitment — global reach, reliable supply.' },
]

const trustStats = [
  { num: '5,000+', label: 'Happy Customers' },
  { num: '15,000+', label: 'Pieces Delivered' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '98%', label: 'Repeat Orders' },
]

const shoppingPerks = [
  {
    icon: <CraftMedalIcon size={56} color="#e8a020" />,
    title: 'Curated Jewellery',
    desc: 'Handpicked imitation jewellery for weddings, festivals, gifting, and everyday elegance.',
  },
  {
    icon: <ClockIcon />,
    title: 'Fast Delivery',
    desc: 'Reliable pan-India shipping with clear timelines and tracking on every order.',
  },
  {
    icon: <HeartIcon />,
    title: 'Gift-Ready Packaging',
    desc: 'Premium packaging that makes every order feel special — ideal for bridal and festive gifting.',
  },
  {
    icon: <MailIcon />,
    title: 'Personal Enquiries',
    desc: 'Ask about any piece directly — our team responds with availability, pricing, and guidance.',
  },
]

const testimonials = [
  { text: 'The kundan set looked exactly like the photos. Beautiful finishing and arrived well packed for my sister\'s wedding.', name: 'Priya Sharma', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { text: 'We order wholesale for our boutique — consistent quality and reliable supply every season.', name: 'Rahul Mehta', role: 'Retail Partner', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { text: 'Excellent jhumkas and fast delivery. DB International has become our go-to for festive jewellery.', name: 'Ananya Reddy', role: 'Verified Buyer', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
]

export default function AboutPage() {
  return (
    <>
      <FloatingNavbar activePage="about" />
      <main className="sitePage aboutPage">
        <section className="aboutHero">
          <div className="container aboutHeroGrid">
            <Reveal className="aboutHeroCopy">
              <div className="eyebrow">Our Story</div>
              <h1 className="aboutHeroTitle">Global Reach, Reliable Supply in Imitation Jewellery</h1>
              <p>
                {brand.name} was built on a simple belief: beautiful jewellery should be accessible,
                consistently supplied, and finished to a standard customers can trust. From bridal kundan
                sets and temple necklaces to everyday earrings and limited-edition pieces, we connect
                quality imitation jewellery with shoppers and partners across India and beyond.
              </p>
              <div className="aboutHeroActions">
                <Link href="/products" className="btnOrange">Shop Collection</Link>
                <Link href="/contact" className="btnOutlineWhite">Get in Touch</Link>
              </div>
            </Reveal>
            <Reveal className="aboutHeroMedia" delay={0.15}>
              <img src={brand.logoFull} alt={brand.name} />
              <div className="aboutHeroGlass">
                <span>Est. {brand.founded}</span>
                <strong>{brand.tagline}</strong>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section aboutStory" id="story">
          <div className="container aboutStoryGrid">
            <Reveal className="aboutStoryVisual">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80" alt="Imitation jewellery collection" />
              <div className="aboutStoryAccent" aria-hidden />
            </Reveal>
            <Reveal className="aboutStoryContent" delay={0.1}>
              <div className="eyebrow">Who We Are</div>
              <h2 className="sectionTitle sectionTitle--display">Built for Quality, Trusted for Supply</h2>
              <p>
                {brand.name} specialises in imitation jewellery — necklaces, earrings, bangles,
                rings, bridal sets, and limited editions. We work with trusted manufacturers and
                finishing partners to ensure every piece meets our standards for plating, stone work,
                and packaging.
              </p>
              <p>
                Our name reflects what we do: international ventures in jewellery trade with a
                commitment to reliability. Whether you are shopping for a single festive set or
                stocking a retail counter, we aim to make every experience smooth and dependable.
              </p>
              <ul className="aboutStoryList">
                <li><CheckIcon /> Handpicked jewellery from trusted makers</li>
                <li><CheckIcon /> Clear pricing, honest descriptions, and real customer reviews</li>
                <li><CheckIcon /> Premium packaging and reliable pan-India delivery</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section aboutValuesSplit" id="values">
          <div className="container aboutValuesSplitGrid">
            <Reveal className="aboutValuesSplitCopy">
              <h2 className="aboutValuesSplitTitle">
                The Core Values Behind Every Piece
              </h2>
              <p className="aboutValuesSplitLead">
                At {brand.name}, we believe beautiful imitation jewellery should be accessible,
                consistently supplied, and finished to a standard customers can trust — from bridal
                kundan sets to everyday earrings and limited-edition releases.
              </p>
            </Reveal>
            <div className="aboutValuesFeatureGrid">
              {values.map((value, i) => (
                <Reveal key={value.title} className="aboutValuesFeature" delay={i * 0.08}>
                  <div className="aboutValuesFeatureIcon">{value.icon}</div>
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
              <h2 className="sectionTitle sectionTitle--display">Growing With Our Customers</h2>
              <p className="sectionDesc">From a focused jewellery edit to a trusted name in imitation jewellery supply.</p>
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

        <section className="section section--surface aboutPerksSection">
          <div className="container">
            <Reveal className="sectionHeader aboutSectionHeader">
              <div className="eyebrow">Why Shop With Us</div>
              <h2 className="sectionTitle sectionTitle--display">The {brand.shortName} Experience</h2>
              <p className="sectionDesc">Everything you expect from a modern jewellery store — curated, clear, and personal.</p>
            </Reveal>
            <div className="aboutPerksGrid">
              {shoppingPerks.map((perk, i) => (
                <Reveal key={perk.title} className="aboutPerkCard" delay={i * 0.06}>
                  <div className="aboutPerkIcon">{perk.icon}</div>
                  <h3>{perk.title}</h3>
                  <p>{perk.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--surface aboutTrust">
          <div className="container">
            <Reveal className="sectionHeader aboutSectionHeader">
              <div className="eyebrow">Why Customers Trust Us</div>
              <h2 className="sectionTitle sectionTitle--display">Proof Behind The Promise</h2>
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

        <section className="section aboutReviewsSection">
          <div className="container">
            <Reveal className="sectionHeader aboutSectionHeader">
              <div className="eyebrow">Customer Reviews</div>
              <h2 className="sectionTitle sectionTitle--display">Loved By Shoppers &amp; Partners</h2>
            </Reveal>
            <div className="aboutReviewsGrid">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} className="aboutReviewCard" delay={i * 0.08}>
                  <div className="aboutReviewStars" aria-hidden>★★★★★</div>
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

        <section className="aboutBottomCta">
          <div className="container aboutBottomCtaInner">
            <Reveal>
              <div className="eyebrow eyebrow--light">Start Exploring</div>
              <h2>Explore Our Jewellery Collection</h2>
              <p>Discover necklaces, earrings, bangles, and bridal sets crafted for celebrations worth remembering.</p>
              <Link href="/products" className="btnOrange">Explore Our Collection</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

