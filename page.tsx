'use client'

import { useRef } from 'react'

/* ─────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────── */
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: '#fff' }}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
)
const PhoneIcon = ({ size = 15, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ width: size, height: size }}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 17.9l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const PhoneFillIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: '#fff' }}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 17.9l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

/* ─────────────────────────────────────────
   TOP BAR
───────────────────────────────────────── */
function TopBar() {
  return (
    <div className="topbar">
      <span><ClockIcon /> 24/7 Emergency Service</span>
      <span><PhoneIcon /> Call Us: +1 (000) 123 4567</span>
      <span><MapPinIcon /> 123 Roofex Lane, Your City, USA</span>
    </div>
  )
}

/* ─────────────────────────────────────────
   HERO (includes Navbar)
───────────────────────────────────────── */
function Hero() {
  return (
    <div className="hero">
      <div className="heroBg" />
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#" className="logo">
          <div className="logoIcon"><HomeIcon /></div>
          Roofex
        </a>
        <div className="navLinks">
          <span className="navDropdown">Pages <span style={{ fontSize: 10 }}>▾</span></span>
          <a href="#" className="active">Home</a>
          <a href="#">Company</a>
          <a href="#">Contact</a>
        </div>
        <a href="#booking" className="navCta">
          <PhoneIcon size={16} color="#fff" />
          Get A Free Call Now
        </a>
      </nav>
      {/* CONTENT */}
      <div className="heroContent">
        <h1>Your Trusted Local Residential Roofing Experts</h1>
        <div className="heroBtns">
          <a href="#booking" className="btnOrange">Book An Appointment</a>
          <a href="#" className="btnOutlineWhite">Get A Free Call Now</a>
        </div>
        <div className="heroTrust">
          <div className="trustAvatars">
            {[32, 44, 56].map((n) => (
              <img key={n} src={`https://randomuser.me/api/portraits/men/${n}.jpg`} alt="customer" />
            ))}
          </div>
          <div className="trustText">
            Trusted by 46,250+
            <span>Marketers &amp; Complains</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   BADGES BAR
───────────────────────────────────────── */
function BadgesBar() {
  return (
    <div className="badgesBar">
      {/* Google Rating */}
      <div className="googleRating">
        <div className="gBars">
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className="gBar" />)}
        </div>
        <div className="ratingInfo">
          <strong>Google Rating</strong>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="ratingNum">4.9</span>
            <span className="stars">★★★★★</span>
          </div>
          <small>See all our reviews</small>
        </div>
      </div>

      <div className="dividerV" />

      <div className="badgeIcons">
        <div className="badgeItem badgeBlue" style={{ fontSize: 8 }}>
          <span style={{ fontSize: 20 }}>👍</span>
          <span>100% GUARANTEED</span>
          <span style={{ fontSize: 7, opacity: .8 }}>SATISFACTION</span>
        </div>
        <div className="badgeItem badgeRed" style={{ fontSize: 8 }}>
          <span>BEST</span>
          <span style={{ fontSize: 13, fontWeight: 900 }}>SERVICE</span>
          <span>BEST SERVICE</span>
        </div>
        <div className="badgeItem badgeOrange" style={{ fontSize: 8, padding: 10 }}>
          <span style={{ fontSize: 7 }}>CERTIFIED</span>
          <span style={{ fontSize: 12, fontWeight: 900 }}>PROFESSIONAL</span>
          <span>✓</span>
        </div>
        <div className="badgeItem badgeGreen" style={{ fontSize: 8 }}>
          <span>EXTENDED</span>
          <span style={{ fontSize: 20 }}>✓</span>
          <span>WARRANTY</span>
        </div>
        <div className="badgeItem badgePink" style={{ fontSize: 8 }}>
          <span>BEST</span>
          <span style={{ fontSize: 14, fontWeight: 900 }}>SALES</span>
          <span>EVER</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   ABOUT / STATS
───────────────────────────────────────── */
const stats = [
  { label: 'Experience', icon: '🏠', num: '25+', desc: 'Years Of Roofing Experience' },
  { label: 'Installed', icon: '🔨', num: '35,00+', desc: 'Roofs Installed & Repaired' },
  { label: 'Satisfied', icon: '😊', num: '2,000+', desc: 'Satisfied Property Owners' },
  { label: 'Licensed', icon: '📋', num: '100%', desc: 'Licensed & Fully Insured' },
]

function About() {
  return (
    <div className="aboutSection">
      <div className="aboutTop">
        <div className="aboutLeft">
          <p className="sectionTag">→ Who We Are</p>
          <h2>Built to Protect<br />What Matters Most</h2>
        </div>
        <div className="aboutRight">
          <p>At Roofex, we believe a strong roof means a safer home and greater peace of mind. Our team of skilled roofing professionals is committed.</p>
        </div>
      </div>
      <div className="statsGrid">
        {stats.map((s) => (
          <div key={s.label} className="statCard">
            <div className="statLabelRow">
              {s.label}
              <div className="statIcon">{s.icon}</div>
            </div>
            <div className="statNum">{s.num}</div>
            <div className="statDesc">{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="aboutVideo">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
          alt="Roofing team at work"
        />
        <div className="videoBadge">
          <div className="playBtn">▶</div>
          <div>
            <div style={{ fontSize: 11, opacity: .8 }}>Watch the full video</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>1m 22s</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   TESTIMONIALS SLIDER
───────────────────────────────────────── */
const testimonials = [
  { stars: '★★★★★', text: '"We replaced our old roof in just two days, the results were amazing. The team was professional, friendly, and explained everything clearly."', name: 'John Carter', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { stars: '★★★★★', text: '"After storm damage, Roofex handled the inspection, repairs, and even helped with the insurance process. Stress-free."', name: 'Sarah Williams', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { stars: '★★★★★', text: '"We got several quotes, but Roofex stood out with their transparency and knowledge. The new roof looks fantastic and gives us real peace of mind."', name: 'James Billah', role: 'Property Owner', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { stars: '★★★★★', text: '"From the first call to project completion, communication was excellent. The crew showed up on time and delivered exactly what was promised."', name: 'Emily Thompson', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { stars: '★★★★★', text: '"We got several quotes, but Roofex stood out with their transparency and knowledge. The new roof looks fantastic and gives us real peace of mind."', name: 'James Billah', role: 'Property Owner', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
  { stars: '★★★★★', text: '"From the first call to project completion, communication was excellent. The crew showed up on time and delivered exactly what was promised."', name: 'Emily Thompson', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
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
  const onMouseLeave = () => { isDown.current = false }
  const onMouseUp = () => { isDown.current = false }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    sliderRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
  }

  return (
    <div className="testimonialsSection">
      <div
        className="testimonialsInner"
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {testimonials.map((t, i) => (
          <div key={i} className="testiCard">
            <div className="testiStars">{t.stars}</div>
            <p>{t.text}</p>
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
    </div>
  )
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
const services = [
  { title: 'Roof Installation', desc: 'Thorough roof assessments to identify damage, leaks, and potential problem areas before they worsen.', img: 'https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&q=80' },
  { title: 'Roof Replacement', desc: 'Complete roof replacement services using durable, high-performance roofing materials and techniques.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { title: 'New Roof Installation', desc: 'Professional roofing installation for homes, extensions, and newly constructed buildings.', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { title: 'Emergency Services', desc: 'Rapid response solutions to protect homes from sudden leaks, storm damage, and structural issues.', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80' },
  { title: 'Metal Roofing', desc: 'Long-lasting, energy-efficient metal roofing options that offer superior durability and lifespan.', img: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&q=80' },
  { title: 'Drainage Services', desc: 'Installation, maintenance, repair of gutter drainage systems to protect your roof from water damage.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
]

function Services() {
  return (
    <div className="servicesSection">
      <div className="sectionHeader">
        <div className="eyebrow">Our Services</div>
        <h2>Smart Solutions<br />for Stronger Roofs</h2>
      </div>
      <div className="servicesGrid">
        {services.map((s) => (
          <div key={s.title} className="serviceCard">
            <img src={s.img} alt={s.title} />
            <div className="serviceBody">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#" className="learnMore">Learn More →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   QUALITY + PROCESS
───────────────────────────────────────── */
function QualityAndProcess() {
  return (
    <>
      <div className="qualitySection">
        <div className="qualityInner">
          {/* LEFT */}
          <div className="qualityLeft">
            <div className="eyebrow">What We Do Best</div>
            <h2>Quality Roofing<br />from Start to Finish</h2>
            <div className="qualityImg">
              <img src="https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=700&q=80" alt="Quality roofing" />
            </div>
          </div>
          {/* RIGHT */}
          <div>
            <div className="featureHighlight">
              <h4>⭐ Experienced Roofing Professionals</h4>
              <p>Our skilled team brings years of hands-on roofing experience to every project to ensure precision, safety.</p>
            </div>
            <div className="featureItem">
              <div className="featIcon">🪨</div>
              <div>
                <h4>High-Quality Materials</h4>
                <p>We use trusted, weather-resistant roofing materials designed for durability, energy efficiency, and long-term performance.</p>
              </div>
            </div>
            <div className="featureItem">
              <div className="featIcon">💎</div>
              <div>
                <h4>Honest &amp; Transparent Pricing</h4>
                <p>No hidden fees, no surprises. We provide clear estimates and straightforward communication from start to finish.</p>
              </div>
            </div>
            <div className="featureItem">
              <div className="featIcon">⚡</div>
              <div>
                <h4>Fast &amp; Reliable Service</h4>
                <p>We execute and complete roofing projects efficiently while maintaining the highest quality standards.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROCESS */}
        <div className="processSection">
          <div className="processHeader">
            <div className="eyebrow">Our Process</div>
            <h2>Simple Process<br />for a Stronger Roof</h2>
          </div>
          <div className="processSteps">
            <div className="processStep">
              <div className="stepNum">01</div>
              <div className="stepArrow">→</div>
              <h4>We Start with a Detailed Assessment</h4>
              <p>Our roofing experts perform a thorough inspection to identify damage, leaks, weak spots.</p>
            </div>
            <div className="processStep">
              <div className="stepNum">02</div>
              <div className="stepArrow">→</div>
              <h4>Transparent Pricing, No Surprises</h4>
              <p>We provide a detailed, easy-to-understand estimate outlining the work needed and costs involved.</p>
            </div>
            <div className="processStep">
              <div className="stepNum">03</div>
              <h4>We Leave Your Property Clean</h4>
              <p>After the work is complete, we conduct a final quality check and thoroughly clean the site.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────
   BENEFITS
───────────────────────────────────────── */
function Benefits() {
  return (
    <div className="benefitsSection">
      <div className="benefitsInner">
        <div className="benefitsLeft">
          <div className="eyebrow">Benefits</div>
          <h2>Peace of Mind<br />Under Every Roof</h2>
          <p>At Roofex, we do more than install roofs; we deliver protection, comfort, and long-term value for your home.</p>
          <div className="benefitItem">
            <div className="benefitNum">1</div>
            <div>
              <h4>Better Energy Efficiency</h4>
              <p>Our roofing systems are built to withstand heavy rain, wind, heat, and storms — keeping you comfortable year-round.</p>
            </div>
          </div>
          <div className="benefitItem">
            <div className="benefitNum">2</div>
            <div>
              <h4>Long-Term Cost Savings</h4>
              <p>A quality installation, high-quality roof reduces future repair costs, improves energy efficiency, and adds real value.</p>
            </div>
          </div>
        </div>
        <div className="benefitsRight">
          <div className="reviewCardSmall">
            <div className="miniAvatars">
              {[22, 33, 55].map((n) => (
                <img key={n} src={`https://randomuser.me/api/portraits/women/${n}.jpg`} alt="reviewer" />
              ))}
            </div>
            <small>Trusting 3,250+ Happy Teams</small>
            <div className="miniStars">★★★★★</div>
            <strong>All Rating 5/5.0 Reviews</strong>
          </div>
          <div className="benefitsImgs">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Roofing team" />
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" alt="House" />
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" alt="Roofing" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   CLIENT REVIEWS BENTO
───────────────────────────────────────── */
const bentoReviews = [
  { text: '"Roofex repaired my roof quickly and efficiently. The team was professional, friendly, and the results were flawless."', name: 'Sarah Thompson', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/25.jpg', brand: '✓ Nordot', dark: false },
  { text: '"Their roofing experts handled our commercial building with precision. Roofex exceeded our expectations in every way."', name: 'Michael Johnson', role: 'Business Manager', avatar: 'https://randomuser.me/api/portraits/men/35.jpg', brand: '↑ Pulso', dark: false },
  { text: '"From start to finish, Roofex was incredible. Professional crew, quality materials and the roof looks amazing."', name: 'Russell Wilson', role: 'Business Owner', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', brand: '', dark: true, large: true },
  { text: '"From the initial inspection to the final repair, Roofex made the process simple and stress-free."', name: 'Emily Parker', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/women/46.jpg', brand: '🔵 InMap', dark: false },
  { text: '"Fast, reliable, and high-quality roofing services. Roofex delivers peace of mind for any property owner."', name: 'Kevin Brown', role: 'Homeowner', avatar: 'https://randomuser.me/api/portraits/men/54.jpg', brand: '▶ swift', dark: false },
  { text: '"I\'ve worked with many roofing companies, but Roofex stands out for their expertise and commitment to excellence."', name: 'David Ramirez', role: 'Business Owner', avatar: 'https://randomuser.me/api/portraits/men/72.jpg', brand: '✓ Nordot', dark: false },
]

function ClientReviews() {
  return (
    <div className="clientReviews">
      <div className="sectionHeader" style={{ marginBottom: 40 }}>
        <div className="eyebrow">Customer Reviews</div>
        <h2>What Clients Say<br />About Roofex Roofing</h2>
      </div>
      <div className="reviewsBento">
        {bentoReviews.map((r, i) => (
          <div
            key={i}
            className={`reviewBentoCard${r.large ? ' large' : ''}`}
            style={r.dark ? { background: '#1a1a1a' } : {}}
          >
            <div>
              <div className="rbStars">★★★★★</div>
              <p style={r.dark ? { color: '#ddd' } : {}}>{r.text}</p>
              <div className="rbAuthor">
                <img src={r.avatar} alt={r.name} style={r.large ? { width: 42, height: 42, borderRadius: '50%' } : {}} />
                <div>
                  <div className="rbName" style={r.dark ? { color: '#fff' } : {}}>{r.name}</div>
                  <div className="rbRole" style={r.dark ? { color: '#aaa' } : {}}>{r.role}</div>
                </div>
              </div>
              {r.brand && <div className="rbBrand">{r.brand}</div>}
            </div>
            {r.large && (
              <div style={{ marginTop: 16 }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
                  alt="featured"
                  style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   BOOKING
───────────────────────────────────────── */
function Booking() {
  return (
    <div className="bookingSection" id="booking">
      <div className="bookingCard">
        <div className="bookingLeft">
          <div className="eyebrow">Book Appointment</div>
          <h2>Book A Free<br />Appointment</h2>
          <div className="bookingContact">
            <div className="contactIcon"><PhoneFillIcon /></div>
            <div>
              <small>Call Us Anytime</small>
              <strong>+1 (000) 123 4567</strong>
            </div>
          </div>
        </div>
        <div className="bookingForm">
          <div className="formGroup">
            <label>Your Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="formGroup">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="formGroup">
            <label>Property By Address</label>
            <input type="text" placeholder="Address / Location" />
          </div>
          <div className="formGroup">
            <label>Phone Number</label>
            <input type="tel" placeholder="+1 (000) 000 0000" />
          </div>
          <button className="btnSubmit">Book An Appointment</button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   BLOG
───────────────────────────────────────── */
const blogPosts = [
  {
    img: 'https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=500&q=80',
    date: 'March 4, 2025',
    title: 'How to Know When Your Roof Needs Replacement',
    desc: "In this blog post, we cover the key signs that indicate it's time to replace your roof, from curling shingles to costly damage.",
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80',
    date: 'March 4, 2025',
    title: '5 Roofing Problems Every Homeowner Should Know',
    desc: 'From missing shingles to improper flashing, discover five most common roofing problems homeowners face in harsh conditions.',
  },
]

function Blog() {
  return (
    <div className="blogSection">
      <div className="sectionHeader">
        <div className="eyebrow">Our Blog</div>
        <h2>Latest News &amp;<br />Roofing Insights</h2>
      </div>
      <div className="blogGrid">
        {blogPosts.map((post) => (
          <div key={post.title} className="blogCard">
            <img src={post.img} alt={post.title} />
            <div className="blogBody">
              <div className="blogDate">{post.date}</div>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <a href="#" style={{ color: '#E8A020', fontSize: 13, fontWeight: 700 }}>Read More →</a>
            </div>
          </div>
        ))}
      </div>
      <div className="blogDots">
        <div className="blogDot blogDotActive" />
        <div className="blogDot" />
        <div className="blogDot" />
        <div className="blogDot" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CtaBanner() {
  return (
    <div className="ctaBanner">
      <h2>Safe Home – Book<br />Your Inspection Now!</h2>
      <a href="#booking" className="btnOrange" style={{ flexShrink: 0 }}>Book An Appointment</a>
    </div>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footerGrid">
        <div className="footerBrand">
          <a href="#" className="logo">
            <div className="logoIcon"><HomeIcon /></div>
            Roofex
          </a>
          <p>Protect your home from leaks, damage, and wear before it&apos;s too late with our expert team.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <ul>
            {['Home', 'Services', 'About Us', 'License'].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {['Roof Replacement', 'Residential Roofing', 'Roof Inspection', 'Roofing Services'].map((s) => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footerContact">
            <li>📍 123 Roofex Lane, Your City, USA</li>
            <li>📞 +1 (000) 123-4567</li>
            <li>✉️ info@roofex.com</li>
          </ul>
        </div>
      </div>
      <div className="footerBottom">
        <p>© 2026 Roofex. All Rights Reserved. Powered by <a href="#">Webflow</a></p>
        <div className="socialIcons">
          {['𝕏', 'f', 'in', '▶'].map((icon) => (
            <a key={icon} href="#" className="socialIcon">{icon}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   PAGE (root export)
───────────────────────────────────────── */
export default function RoofexPage() {
  return (
    <>
      <TopBar />
      <Hero />
      <BadgesBar />
      <About />
      <Testimonials />
      <Services />
      <QualityAndProcess />
      <Benefits />
      <ClientReviews />
      <Booking />
      <Blog />
      <CtaBanner />
      <Footer />
    </>
  )
}
