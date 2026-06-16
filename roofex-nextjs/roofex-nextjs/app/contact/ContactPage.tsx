'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { EcomTrustBar } from '@/components/EcomTrustBar'
import { ChatIcon, ChevronIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon, ShieldIcon } from '@/components/Icons'

const contactMethods = [
  { icon: <PhoneIcon size={22} color="#e8a020" />, title: 'Call Us', detail: '+1 (800) 555-0198', sub: 'Mon–Sat, 9am–7pm EST' },
  { icon: <MailIcon />, title: 'Email Us', detail: 'support@roofex.com', sub: 'Response within 24 hours' },
  { icon: <ChatIcon />, title: 'Live Support', detail: 'Available 24/7', sub: 'Instant help when you need it' },
  { icon: <MailIcon />, title: 'Business Inquiries', detail: 'wholesale@roofex.com', sub: 'Partnerships & bulk orders' },
]

const orderHelp = [
  { title: 'Track My Order', desc: 'Enter your order number and email to see real-time delivery status.', link: '#faq' },
  { title: 'Returns & Exchanges', desc: 'Start a hassle-free return within 30 days of delivery. Refunds in 5–7 business days.', link: '#faq' },
  { title: 'Shipping Information', desc: 'Free standard shipping on orders over $150. Express delivery available at checkout.', link: '#faq' },
  { title: 'Product Warranty', desc: 'Electronics include 1–2 year warranty. Leather goods backed by craftsmanship guarantee.', link: '#faq' },
]

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping arrives in 3–7 business days. Express shipping (1–3 business days) is available at checkout for select regions. Orders over $150 qualify for free standard shipping.' },
  { q: 'Do you offer returns?', a: 'Yes. We offer hassle-free returns within 30 days. Items must be unused and in original packaging. Refunds are processed within 5–7 business days after we receive your return.' },
  { q: 'How can I track my order?', a: 'A tracking link is emailed once your order ships. You can also contact support@roofex.com with your order number for real-time updates from our logistics team.' },
  { q: 'Do products include warranty?', a: 'Selected products include warranty coverage ranging from 6 months to 2 years. Electronics carry 1–2 year warranties; leather goods include craftsmanship guarantees. Details are listed on each product page.' },
  { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and select buy-now-pay-later options at checkout. All transactions are encrypted and secure.' },
  { q: 'Do you ship internationally?', a: 'Yes. We ship to 40+ countries including the US, UK, EU, UAE, India, and Australia. Shipping costs and delivery times vary by destination and are calculated at checkout.' },
  { q: 'How do I choose the right product?', a: 'Every product page includes material specs, dimensions, features, and verified customer reviews. Our support team can also recommend products for gifting, home styling, or travel — just reach out.' },
  { q: 'Are gift wrapping options available?', a: 'Premium gift packaging is included free on orders over $150. You can add a personalized gift message at checkout. Individual products also arrive in branded boxes suitable for gifting.' },
  { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. Contact support@roofex.com or use live chat with your order number for the fastest response.' },
]

const supportHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM IST' },
  { day: 'Saturday', time: '10:00 AM – 5:00 PM IST' },
  { day: 'Sunday & Holidays', time: 'Email & live chat only' },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <FloatingNavbar activePage="contact" />
      <main className="contactPage">
        <section className="contactHero">
          <div className="container contactHeroInner">
            <Reveal>
              <div className="eyebrow eyebrow--light">Contact Us</div>
              <h1>We&apos;re Here To Help</h1>
              <p>
                Whether you have questions about products, orders, or partnerships,
                our team is ready to assist.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section contactMethods">
          <div className="container">
            <div className="contactMethodsGrid">
              {contactMethods.map((method, i) => (
                <Reveal key={method.title} className="contactMethodCard" delay={i * 0.07}>
                  <div className="contactMethodIcon">{method.icon}</div>
                  <h3>{method.title}</h3>
                  <strong>{method.detail}</strong>
                  <span>{method.sub}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <EcomTrustBar />

        <section className="section section--surface">
          <div className="container">
            <Reveal className="sectionHeader">
              <div className="eyebrow">Order Help</div>
              <h2 className="sectionTitle">Quick Links For Shoppers</h2>
              <p className="sectionDesc">Common requests from our ecommerce customers — answered fast.</p>
            </Reveal>
            <div className="contactHelpGrid">
              {orderHelp.map((item, i) => (
                <Reveal key={item.title} className="contactHelpCard" delay={i * 0.06}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <a href={item.link} className="learnMore">Learn more</a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section contactFormSection">
          <div className="container contactFormGrid">
            <Reveal className="contactFormVisual">
              <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=900&q=80" alt="Customer support team" />
              <div className="contactFormGlass">
                <ClockIcon />
                <div>
                  <strong>Average response time</strong>
                  <span>Under 2 hours during business hours</span>
                </div>
              </div>
              <div className="contactLocationCard">
                <MapPinIcon />
                <div>
                  <strong>Visit Our Studio</strong>
                  <span>245 Mercer Street, New York, NY 10012</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="contactFormCard" delay={0.1}>
              <h2 className="sectionTitle">Send Us A Message</h2>
              <p className="sectionDesc" style={{ marginTop: 12, marginBottom: 28 }}>
                Fill out the form below and our concierge team will get back to you shortly.
              </p>
              <form className="bookingForm contactForm" onSubmit={(e) => e.preventDefault()}>
                <div className="formGroup">
                  <label htmlFor="fullName">Full Name</label>
                  <input id="fullName" type="text" placeholder="Your full name" required />
                </div>
                <div className="formGroup">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" placeholder="you@email.com" required />
                </div>
                <div className="formGroup">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" placeholder="+1 (800) 555-0198" />
                </div>
                <div className="formGroup">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" defaultValue="general">
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="product">Product Question</option>
                    <option value="business">Business & Partnerships</option>
                  </select>
                </div>
                <div className="formGroup formGroupFull">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows={5} placeholder="Tell us more about your inquiry..." required />
                </div>
                <button type="submit" className="btnSubmit">Send Message</button>
              </form>
            </Reveal>
          </div>
        </section>

        <section className="section section--surface">
          <div className="container contactHoursGrid">
            <Reveal className="contactHoursCard">
              <div className="eyebrow">Support Hours</div>
              <h2 className="sectionTitle">When We&apos;re Available</h2>
              <ul className="contactHoursList">
                {supportHours.map((row) => (
                  <li key={row.day}>
                    <span>{row.day}</span>
                    <strong>{row.time}</strong>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="contactHoursCard contactHoursCard--dark" delay={0.1}>
              <div className="trustItemIcon"><ShieldIcon /></div>
              <h3>Secure & Trusted Checkout</h3>
              <p>Every order is protected with encrypted payments, order confirmation emails, and dedicated post-purchase support.</p>
              <Link href="/products" className="btnOrange">Continue Shopping</Link>
            </Reveal>
          </div>
        </section>

        <section className="section contactFaq" id="faq">
          <div className="container contactFaqGrid">
            <Reveal className="contactFaqIntro">
              <div className="eyebrow">FAQ</div>
              <h2 className="sectionTitle">Questions, Answered</h2>
              <p className="sectionDesc">
                Quick answers to the most common questions from our customers — shipping, returns, payments, and more.
              </p>
            </Reveal>
            <div className="contactFaqList">
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.04}>
                  <button
                    type="button"
                    className={`contactFaqItem${openFaq === i ? ' open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <div className="contactFaqQuestion">
                      <span>{faq.q}</span>
                      <ChevronIcon open={openFaq === i} />
                    </div>
                    <div className="contactFaqAnswer">
                      <p>{faq.a}</p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--navy contactPromise">
          <div className="container">
            <Reveal className="contactPromiseCard">
              <div className="eyebrow eyebrow--light">Customer Support Promise</div>
              <h2 className="sectionTitle" style={{ color: '#fff' }}>Support Beyond The Purchase</h2>
              <p>
                Our commitment to customers continues long after checkout. We&apos;re here to ensure
                every experience with our brand is smooth, reliable, and exceptional — from browsing
                to delivery, returns, and everything in between.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
