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
} from '@/components/Icons'
import { brand } from '@/lib/brand'

const values = [
  {
    icon: <CraftMedalIcon size={72} color="#f0b429" />,
    title: 'Quality',
    desc: 'We focus on consistent standards, careful finishing, and products that meet professional retail and wholesale expectations.',
  },
  {
    icon: <CommitmentSealIcon size={72} color="#f0b429" />,
    title: 'Commitment',
    desc: 'Your satisfaction is our priority. We communicate clearly, fulfil on time, and stand behind every order we supply.',
  },
  {
    icon: <SolutionsBulbIcon size={72} color="#f0b429" />,
    title: 'Solutions',
    desc: 'From retail edits to wholesale supply, we bring thoughtful product selections and practical support for every need.',
  },
  {
    icon: <ProtectionChartIcon size={72} color="#f0b429" />,
    title: 'Protection',
    desc: 'Secure enquiries, honest product details, and dependable packaging — products that arrive as promised, every time.',
  },
]

const journey = [
  { year: '2018', title: 'Company Founded', desc: 'DB International Ventures began with a focused catalogue of quality products for retail and wholesale customers.' },
  { year: '2020', title: 'Online Catalogue Launched', desc: 'Expanded our digital catalogue with clearer categories, imagery, and stock details.' },
  { year: '2022', title: 'Wholesale Partnerships', desc: 'Started supplying retailers, distributors, and businesses across Maharashtra and Gujarat.' },
  { year: '2024', title: 'Pan-India Reach', desc: 'Scaled delivery and support for customers and partners across India.' },
  { year: '2026', title: 'Global Supply Network', desc: 'Growing international enquiries with the same commitment — global reach, reliable supply.' },
]

export default function AboutPage() {
  return (
    <>
      <FloatingNavbar activePage="about" />
      <main className="sitePage aboutPage">
        <section className="aboutHero">
          <div className="container aboutHeroGrid">
            <Reveal className="aboutHeroCopy">
              <div className="eyebrow eyebrow--light">Our Story</div>
              <h1 className="aboutHeroTitle">{brand.tagline}</h1>
              <p>
                {brand.name} was built on a simple belief: quality products should be accessible,
                consistently supplied, and delivered to a standard customers can trust. From everyday
                essentials to limited-edition collections, we connect reliable products with shoppers
                and partners across India and beyond.
              </p>
              <div className="aboutHeroActions">
                <Link href="/products" className="btnOrange">Shop Products</Link>
                <Link href="/contact" className="btnOutlineWhite">Get in Touch</Link>
              </div>
            </Reveal>
            <Reveal className="aboutHeroMedia" delay={0.15} direction="left">
              <div className="aboutHeroLogoPanel">
                <img src={brand.logoSmall} alt={brand.name} />
              </div>
              <div className="aboutHeroGlass">
                <span>Est. {brand.founded}</span>
                <strong>{brand.tagline}</strong>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section aboutStory" id="story">
          <div className="container aboutStoryGrid">
            <Reveal className="aboutStoryVisual" direction="right">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80" alt="Product collection showcase" />
              <div className="aboutStoryAccent" aria-hidden />
            </Reveal>
            <div className="aboutStoryContent">
              <Reveal direction="left" delay={0.05}>
                <div className="eyebrow">Who We Are</div>
                <h2 className="sectionTitle">Built for Quality, Trusted for Supply</h2>
              </Reveal>
              <Reveal direction="left" delay={0.15}>
                <p>
                  {brand.name} specialises in curated product supply across multiple categories.
                  We work with trusted manufacturers and partners to ensure every item meets our
                  standards for quality, finishing, and packaging.
                </p>
                <p>
                  Our name reflects what we do: international ventures in product trade with a
                  commitment to reliability. Whether you are shopping for a single order or
                  stocking a retail counter, we aim to make every experience smooth and dependable.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.25}>
                <ul className="aboutStoryList">
                  <li><CheckIcon /> Handpicked products from trusted makers</li>
                  <li><CheckIcon /> Clear pricing, honest descriptions, and real customer reviews</li>
                  <li><CheckIcon /> Premium packaging and reliable pan-India delivery</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="siteMidCta">
          <div className="container">
            <Reveal className="siteMidCtaInner" direction="up">
              <div className="siteMidCtaCopy">
                <div className="eyebrow eyebrow--light">Start Exploring</div>
                <h2>Explore Our Product Collection</h2>
                <p>Curated products for customers and partners who value quality and reliable supply.</p>
              </div>
              <div className="siteMidCtaActions">
                <Link href="/products" className="btnOrange">Explore Collection</Link>
                <Link href="/contact" className="btnOutlineWhite">Contact Us</Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section aboutValuesSplit" id="values">
          <div className="container aboutValuesSplitGrid">
            <Reveal className="aboutValuesSplitCopy">
              <div className="eyebrow">Our Values</div>
              <h2 className="aboutValuesSplitTitle">
                The Core Values Behind Every Product
              </h2>
              <p className="aboutValuesSplitLead">
                At {brand.name}, we believe quality products should be accessible,
                consistently supplied, and delivered to a standard customers can trust — from
                everyday essentials to limited-edition releases.
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
            <Reveal className="sectionHeader aboutSectionHeader">
              <div className="eyebrow">Our Journey</div>
              <h2 className="sectionTitle">Growing With Our Customers</h2>
              <p className="sectionDesc">From a focused product edit to a trusted name in reliable product supply.</p>
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

      </main>
      <Footer />
    </>
  )
}
