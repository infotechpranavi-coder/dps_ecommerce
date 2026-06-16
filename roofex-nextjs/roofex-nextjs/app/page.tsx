'use client'

import { useRef, useState, useEffect } from 'react'

/* ── SVG ICONS ── */
const RoofLogoIcon = () => (
  <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden>
    <line x1="5" y1="19" x2="19" y2="7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="5" y1="15" x2="19" y2="3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="5" y1="23" x2="19" y2="11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="#fff" />
    <polyline points="9,22 9,12 15,12 15,22" fill="none" stroke="#fff" strokeWidth="2" />
  </svg>
)

const PhoneIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" width={size} height={size} aria-hidden>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 17.9l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={16} height={16} aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14} aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22} aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22} aria-hidden>
    <circle cx="12" cy="8" r="6" />
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
  </svg>
)

const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22} aria-hidden>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
)

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22} aria-hidden>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={24} height={24} aria-hidden>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={24} height={24} aria-hidden>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16} aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

/* ── FLOATING NAVBAR ── */
function FloatingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`floatingNav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <div className="container floatingNavWrap">
        <div className="floatingNavBar">
          <a href="#" className="floatingLogo" onClick={closeMenu}>
            <div className="floatingLogoIcon"><RoofLogoIcon /></div>
            Roofex
          </a>

          <nav className="floatingNavLinks" aria-label="Main navigation">
            <span className="floatingNavDropdown">Pages <span>▾</span></span>
            <a href="#" className="active">Home</a>
            <a href="#about" onClick={closeMenu}>Company</a>
            <a href="#booking" onClick={closeMenu}>Contact</a>
          </nav>

          <div className="floatingNavEnd">
            <a href="tel:+10001234567" className="floatingNavCta">
              <PhoneIcon size={16} color="#fff" />
              Get A Free Call Now
            </a>
            <button
              type="button"
              className="floatingMenuToggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav className={`floatingMobileNav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
          <span className="floatingNavDropdown">Pages <span>▾</span></span>
          <a href="#" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>Company</a>
          <a href="#booking" onClick={closeMenu}>Contact</a>
          <a href="tel:+10001234567" className="floatingNavCta" onClick={closeMenu}>
            <PhoneIcon size={16} color="#fff" />
            Get A Free Call Now
          </a>
        </nav>
      </div>
    </header>
  )
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="hero">
      <div className="heroBg" aria-hidden />

      <div className="heroBody">
        <h1>Your Trusted Local Residential Roofing Experts</h1>
        <div className="heroBtns">
          <a href="#booking" className="btnOrange">Book An Appointment</a>
          <a href="tel:+10001234567" className="btnOutlineWhite">Get A Free Call Now</a>
        </div>
        <div className="heroTrust">
          <div className="trustAvatars">
            {[32, 44, 56].map((n) => (
              <img key={n} src={`https://randomuser.me/api/portraits/men/${n}.jpg`} alt="" />
            ))}
          </div>
          <div className="trustText">
            Trusted by 46,250+
            <span>Marketers &amp; Complains</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TRUST BAR ── */
const trustItems = [
  { icon: <ShieldIcon />, title: 'Fully Licensed', desc: 'State-certified contractors' },
  { icon: <AwardIcon />, title: 'Satisfaction Guaranteed', desc: '100% workmanship warranty' },
  { icon: <WrenchIcon />, title: 'Expert Craftsmanship', desc: 'Certified roofing specialists' },
  { icon: <UsersIcon />, title: 'Extended Warranty', desc: 'Long-term protection plans' },
]

function TrustBar() {
  return (
    <div className="trustBar">
      <div className="container trustBarInner">
        <div className="googleRating">
          <div className="googleLogo">G</div>
          <div className="ratingInfo">
            <strong>Google Rating</strong>
            <div className="ratingRow">
              <span className="ratingNum">4.9</span>
              <span className="stars">★★★★★</span>
            </div>
            <small>Based on 350+ verified reviews</small>
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

/* ── ABOUT ── */
const stats = [
  { num: '25+', desc: 'Years of Roofing Experience', icon: <AwardIcon /> },
  { num: '3,500+', desc: 'Roofs Installed & Repaired', icon: <WrenchIcon /> },
  { num: '2,000+', desc: 'Satisfied Property Owners', icon: <UsersIcon /> },
  { num: '100%', desc: 'Licensed & Fully Insured', icon: <ShieldIcon /> },
]

function About() {
  return (
    <section className="aboutSection section--gold" id="about">
      <div className="container">
        <div className="aboutGrid">
          <div className="aboutLeft">
            <div className="eyebrow">Who We Are</div>
            <h2 className="sectionTitle">Built to Protect What Matters Most</h2>
          </div>
          <div className="aboutRight">
            <p>
              At Roofex, we believe a strong roof means a safer home and greater peace of mind. Our team of skilled roofing professionals is committed to delivering exceptional results on every project — from minor repairs to complete replacements.
            </p>
          </div>
        </div>

        <div className="statsGrid">
          {stats.map((s) => (
            <div key={s.desc} className="statCard">
              <div className="statIcon">{s.icon}</div>
              <div className="statNum">{s.num}</div>
              <div className="statDesc">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="aboutMedia">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80"
            alt="Professional roofing team at work"
          />
          <div className="videoBadge">
            <div className="playBtn">▶</div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Watch our process</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>1 min 22 sec</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ── */
const testimonials = [
  { text: 'We replaced our old roof in just two days — the results were amazing. The team was professional, friendly, and explained everything clearly.', name: 'John Carter', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { text: 'After storm damage, Roofex handled the inspection, repairs, and even helped with the insurance process. Completely stress-free.', name: 'Sarah Williams', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { text: 'We got several quotes, but Roofex stood out with their transparency and knowledge. The new roof looks fantastic.', name: 'James Billah', role: 'Property Owner', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { text: 'From the first call to project completion, communication was excellent. The crew showed up on time and delivered exactly what was promised.', name: 'Emily Thompson', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
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
        <div className="testimonialsHeader">
          <div className="sectionHeader sectionHeader--left">
            <div className="eyebrow">Testimonials</div>
            <h2 className="sectionTitle">What Our Clients Say</h2>
            <p className="sectionDesc">Real feedback from homeowners who trusted Roofex with their most important investment.</p>
          </div>
          <span className="testimonialsHint">← Drag to explore →</span>
        </div>
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
          <div key={t.name} className="testiCard">
            <div className="testiStars">★★★★★</div>
            <p>&ldquo;{t.text}&rdquo;</p>
            <div className="testiAuthor">
              <img src={t.avatar} alt={t.name} />
              <div>
                <div className="testiName">{t.name}</div>
                <div className="testiRole">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── SERVICES ── */
const services = [
  { title: 'Roof Installation', desc: 'Expert installation using premium materials for lasting protection and curb appeal.', img: 'https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&q=80' },
  { title: 'Roof Replacement', desc: 'Complete tear-off and replacement with durable, high-performance roofing systems.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { title: 'Roof Inspection', desc: 'Thorough assessments to identify damage, leaks, and potential problem areas early.', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { title: 'Emergency Services', desc: 'Rapid response for storm damage, sudden leaks, and urgent structural issues.', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80' },
  { title: 'Metal Roofing', desc: 'Energy-efficient metal options offering superior durability and a modern aesthetic.', img: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&q=80' },
  { title: 'Gutter & Drainage', desc: 'Installation and repair of gutter systems to protect your roof from water damage.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
]

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="sectionHeader">
          <div className="eyebrow">Our Services</div>
          <h2 className="sectionTitle">Smart Solutions for Stronger Roofs</h2>
          <p className="sectionDesc">Comprehensive roofing services tailored to protect your home and maximize its value.</p>
        </div>
        <div className="servicesGrid">
          {services.map((s, i) => (
            <article key={s.title} className="serviceCard">
              <div className="serviceImgWrap">
                <img src={s.img} alt={s.title} />
                <span className="serviceNum">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="serviceBody">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href="#booking" className="learnMore">Learn More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── QUALITY + PROCESS ── */
const features = [
  { icon: <WrenchIcon />, title: 'High-Quality Materials', desc: 'We use trusted, weather-resistant materials designed for durability and long-term performance.' },
  { icon: <AwardIcon />, title: 'Honest & Transparent Pricing', desc: 'No hidden fees. Clear estimates and straightforward communication from start to finish.' },
  { icon: <ShieldIcon />, title: 'Fast & Reliable Service', desc: 'Efficient project completion while maintaining the highest quality and safety standards.' },
]

function QualityAndProcess() {
  return (
    <section className="section section--surface">
      <div className="container">
        <div className="qualityInner">
          <div className="qualityLeft">
            <div className="eyebrow">What We Do Best</div>
            <h2 className="sectionTitle">Quality Roofing from Start to Finish</h2>
            <div className="qualityImg">
              <img src="https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=700&q=80" alt="Quality roofing work" />
            </div>
          </div>
          <div>
            <div className="featureHighlight">
              <h4>Experienced Roofing Professionals</h4>
              <p>Our skilled team brings decades of hands-on experience to every project, ensuring precision, safety, and results that last.</p>
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
          </div>
        </div>

        <div className="sectionHeader">
          <div className="eyebrow">Our Process</div>
          <h2 className="sectionTitle">Simple Steps to a Stronger Roof</h2>
        </div>
        <div className="processSteps">
          <div className="processStep">
            <div className="stepCircle">01</div>
            <h4>Detailed Assessment</h4>
            <p>Our experts perform a thorough inspection to identify damage, leaks, and weak spots before any work begins.</p>
          </div>
          <div className="processStep">
            <div className="stepCircle">02</div>
            <h4>Transparent Estimate</h4>
            <p>We provide a clear, itemized quote outlining all work needed and costs — no surprises, ever.</p>
          </div>
          <div className="processStep">
            <div className="stepCircle">03</div>
            <h4>Expert Installation</h4>
            <p>Our certified crew completes the job efficiently, followed by a final quality check and thorough cleanup.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── BENEFITS ── */
function Benefits() {
  return (
    <section className="section">
      <div className="container benefitsInner">
        <div className="benefitsLeft">
          <div className="eyebrow">Benefits</div>
          <h2 className="sectionTitle">Peace of Mind Under Every Roof</h2>
          <p className="sectionDesc" style={{ textAlign: 'left', margin: '0 0 28px' }}>
            We deliver more than roofs — we deliver protection, comfort, and long-term value for your home.
          </p>
          <div className="benefitItem">
            <div className="benefitNum">1</div>
            <div>
              <h4>Better Energy Efficiency</h4>
              <p>Modern roofing systems reduce heat transfer, lowering energy bills and keeping your home comfortable year-round.</p>
            </div>
          </div>
          <div className="benefitItem">
            <div className="benefitNum">2</div>
            <div>
              <h4>Long-Term Cost Savings</h4>
              <p>Quality installation reduces future repair costs, improves efficiency, and adds real value to your property.</p>
            </div>
          </div>
        </div>
        <div className="benefitsRight">
          <div className="reviewCardSmall">
            <div className="miniAvatars">
              {[22, 33, 55].map((n) => (
                <img key={n} src={`https://randomuser.me/api/portraits/women/${n}.jpg`} alt="" />
              ))}
            </div>
            <small>Trusted by 2,000+ homeowners</small>
            <div className="miniStars">★★★★★</div>
            <strong>5.0 Average Rating</strong>
          </div>
          <div className="benefitsImgs">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Roofing team" />
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" alt="Completed home" />
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" alt="Roofing project" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CLIENT REVIEWS ── */
const bentoReviews = [
  { text: 'Roofex repaired my roof quickly and efficiently. The team was professional, friendly, and the results were flawless.', name: 'Sarah Thompson', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
  { text: 'Their experts handled our commercial building with precision. Roofex exceeded our expectations in every way.', name: 'Michael Johnson', role: 'Business Manager', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' },
  { text: 'From start to finish, Roofex was incredible. Professional crew, quality materials, and the roof looks amazing.', name: 'Russell Wilson', role: 'Business Owner', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', featured: true },
  { text: 'From the initial inspection to the final repair, Roofex made the process simple and stress-free.', name: 'Emily Parker', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' },
  { text: 'Fast, reliable, and high-quality roofing services. Roofex delivers real peace of mind for any property owner.', name: 'Kevin Brown', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' },
  { text: 'I\'ve worked with many roofing companies, but Roofex stands out for their expertise and commitment to excellence.', name: 'David Ramirez', role: 'Business Owner', avatar: 'https://randomuser.me/api/portraits/men/72.jpg' },
]

function ClientReviews() {
  return (
    <section className="section section--gold clientReviews">
      <div className="container">
        <div className="sectionHeader">
          <div className="eyebrow eyebrow--light">Customer Reviews</div>
          <h2 className="sectionTitle">What Clients Say About Roofex</h2>
          <p className="sectionDesc">Hear directly from the homeowners and businesses we&apos;ve served.</p>
        </div>
        <div className="reviewsBento">
          {bentoReviews.map((r) => (
            <div key={r.name} className={`reviewBentoCard${r.featured ? ' featured' : ''}`}>
              <div>
                <div className="rbStars">★★★★★</div>
                <p>&ldquo;{r.text}&rdquo;</p>
                <div className="rbAuthor">
                  <img src={r.avatar} alt={r.name} />
                  <div>
                    <div className="rbName">{r.name}</div>
                    <div className="rbRole">{r.role}</div>
                  </div>
                </div>
              </div>
              {r.featured && (
                <div className="featuredImg">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Satisfied customer" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── BOOKING ── */
const bookingPerks = [
  'Free on-site inspection',
  'No-obligation estimate',
  'Response within 24 hours',
]

function Booking() {
  return (
    <section className="section section--surface" id="booking">
      <div className="container">
        <div className="bookingCard">
          <div className="bookingLeft">
            <div className="eyebrow">Book Appointment</div>
            <h2 className="sectionTitle">Schedule Your Free Inspection</h2>
            <p className="sectionDesc" style={{ textAlign: 'left', margin: '0 0 8px' }}>
              Tell us about your project and our team will reach out to schedule a convenient time.
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
                <PhoneIcon size={20} color="#fff" />
              </div>
              <div>
                <small>Call Us Anytime</small>
                <strong>+1 (000) 123 4567</strong>
              </div>
            </div>
          </div>
          <form className="bookingForm" onSubmit={(e) => e.preventDefault()}>
            <div className="formGroup">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="John Smith" required />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="john@email.com" required />
            </div>
            <div className="formGroup">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" placeholder="+1 (000) 000 0000" required />
            </div>
            <div className="formGroup">
              <label htmlFor="service">Service Needed</label>
              <select id="service" defaultValue="">
                <option value="" disabled>Select a service</option>
                <option>Roof Inspection</option>
                <option>Roof Repair</option>
                <option>Roof Replacement</option>
                <option>Emergency Service</option>
              </select>
            </div>
            <div className="formGroup formGroupFull">
              <label htmlFor="address">Property Address</label>
              <input id="address" type="text" placeholder="123 Main St, City, State" />
            </div>
            <button type="submit" className="btnSubmit">Request Free Inspection</button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ── BLOG ── */
const blogPosts = [
  {
    img: 'https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=500&q=80',
    date: 'March 4, 2025',
    title: 'How to Know When Your Roof Needs Replacement',
    desc: 'Key signs that indicate it\'s time to replace your roof — from curling shingles to hidden water damage.',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80',
    date: 'February 18, 2025',
    title: '5 Roofing Problems Every Homeowner Should Know',
    desc: 'From missing shingles to improper flashing — the most common issues homeowners face.',
  },
]

function Blog() {
  return (
    <section className="section">
      <div className="container">
        <div className="sectionHeader">
          <div className="eyebrow">Our Blog</div>
          <h2 className="sectionTitle">Latest News &amp; Roofing Insights</h2>
          <p className="sectionDesc">Expert advice to help you protect and maintain your home.</p>
        </div>
        <div className="blogGrid">
          {blogPosts.map((post) => (
            <article key={post.title} className="blogCard">
              <img src={post.img} alt={post.title} />
              <div className="blogBody">
                <div className="blogDate">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <a href="#" className="learnMore">Read Article →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CtaBanner() {
  return (
    <section className="ctaBanner">
      <div className="container ctaInner">
        <div>
          <h2>Protect Your Home — Book Your Inspection Today</h2>
          <p>Don&apos;t wait for small problems to become costly repairs. Get a free, no-obligation roof inspection from our certified team.</p>
        </div>
        <a href="#booking" className="btn btnPrimary" style={{ flexShrink: 0, padding: '16px 36px' }}>
          Book Free Inspection
        </a>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerGrid">
          <div className="footerBrand">
            <a href="#" className="logo">
              <div className="logoIcon"><HomeIcon /></div>
              Roofex
            </a>
            <p>Protect your home from leaks, damage, and wear with expert roofing services backed by 25+ years of experience.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              {['Home', 'Services', 'About Us', 'Reviews', 'Contact'].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(' ', '')}`}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {['Roof Replacement', 'Roof Inspection', 'Emergency Repair', 'Metal Roofing', 'Gutter Services'].map((s) => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footerContact">
              <li><MapPinIcon /> 123 Roofex Lane, Your City, USA</li>
              <li><PhoneIcon size={16} color="#c8860a" /> +1 (000) 123-4567</li>
              <li><MailIcon /> info@roofex.com</li>
            </ul>
          </div>
        </div>
        <div className="footerBottom">
          <p>© 2026 Roofex. All Rights Reserved.</p>
          <div className="socialIcons">
            {['X', 'f', 'in', '▶'].map((icon) => (
              <a key={icon} href="#" className="socialIcon" aria-label={`Social link ${icon}`}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── PAGE ── */
export default function RoofexPage() {
  return (
    <>
      <FloatingNavbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Testimonials />
        <Services />
        <QualityAndProcess />
        <Benefits />
        <ClientReviews />
        <Booking />
        <Blog />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
