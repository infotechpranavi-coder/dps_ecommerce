'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ChatIcon, ChevronIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/Icons'
import { brand } from '@/lib/brand'

const contactMethods = [
  {
    icon: <PhoneIcon size={22} color="#e8a020" />,
    title: 'Call Us',
    detail: brand.phone,
    sub: 'Mon–Sat, 9am–7pm IST',
    href: `tel:${brand.phoneTel}`,
  },
  {
    icon: <MailIcon />,
    title: 'Email Us',
    detail: brand.supportEmail,
    sub: 'Response within 24 hours',
    href: `mailto:${brand.supportEmail}`,
  },
  {
    icon: <ChatIcon />,
    title: 'Product Enquiries',
    detail: 'Quick quotes & availability',
    sub: 'Share product name or SKU',
    href: '#contact-form',
  },
  {
    icon: <MailIcon />,
    title: 'Business Inquiries',
    detail: brand.wholesaleEmail,
    sub: 'Partnerships & bulk orders',
    href: `mailto:${brand.wholesaleEmail}`,
  },
]

const helpTopics = [
  {
    num: '01',
    title: 'Product Enquiries',
    desc: 'Ask about materials, sizing, availability, and pricing for any item in our catalogue.',
  },
  {
    num: '02',
    title: 'Bulk & Corporate Orders',
    desc: 'Planning a large order or corporate gifting? Our team will prepare a tailored quote.',
  },
  {
    num: '03',
    title: 'Order & Delivery',
    desc: 'Track shipments, update delivery details, or get help with an existing order.',
  },
  {
    num: '04',
    title: 'Partnerships',
    desc: `Retailers, designers, and collaborators — reach out to explore working with ${brand.shortName}.`,
  },
]

const faqs = [
  {
    q: 'How do I enquire about a product?',
    a: 'Open any product page and click Enquire, or use the contact form below with your product name. Our team responds with availability, pricing, and delivery timelines.',
  },
  {
    q: 'How quickly will I hear back?',
    a: 'We aim to reply within 2 hours during business hours (Mon–Sat, 9am–7pm IST). Messages received outside these hours are answered the next working day.',
  },
  {
    q: 'Do you offer bulk or corporate pricing?',
    a: `Yes. Email ${brand.wholesaleEmail} or select Business & Partnerships in the form. Share quantities and timelines for a custom quote.`,
  },
  {
    q: 'Where do you deliver?',
    a: 'We deliver across India with reliable pan-India shipping. Delivery timelines and charges are confirmed when you place your enquiry.',
  },
  {
    q: 'How do I choose the right product?',
    a: 'Every product page includes materials, sizing, and finishing details. Our team can also recommend pieces for weddings, festivals, gifting, or wholesale — just ask.',
  },
  {
    q: 'What payment options are available?',
    a: 'We accept UPI, bank transfer, and major cards. Payment details are shared after your enquiry is confirmed by our team.',
  },
]

const supportHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM IST' },
  { day: 'Saturday', time: '10:00 AM – 5:00 PM IST' },
  { day: 'Sunday & Holidays', time: 'Email support only' },
]

export default function ContactPage() {
  const searchParams = useSearchParams()
  const productName = searchParams.get('product')?.trim() ?? ''
  const enquiryQty = searchParams.get('qty')?.trim() ?? ''
  const isProductEnquiry = productName.length > 0
  const enquirySubject = isProductEnquiry ? `Product enquiry: ${productName}` : ''
  const enquiryMessage = isProductEnquiry
    ? `Hello, I would like to enquire about ${productName}${enquiryQty ? ` (quantity: ${enquiryQty})` : ''}. Please share availability and pricing details.`
    : ''

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    if (isProductEnquiry && window.location.hash === '#contact-form') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isProductEnquiry])

  return (
    <>
      <FloatingNavbar activePage="contact" />
      <main className="sitePage contactPage">
        <section className="contactHero">
          <div className="container contactHeroInner">
            <Reveal>
              <div className="eyebrow eyebrow--light">Contact Us</div>
              <h1>Let&apos;s Start a Conversation</h1>
              <p>
                Questions about a product, bulk order, or partnership? Our team is here
                with clear answers and a personal touch.
              </p>
              <div className="contactHeroStats">
                <div className="contactHeroStat">
                  <strong>&lt; 2 hrs</strong>
                  <span>Average response</span>
                </div>
                <div className="contactHeroStat">
                  <strong>Mon–Sat</strong>
                  <span>Live support hours</span>
                </div>
                <div className="contactHeroStat">
                  <strong>Pan-India</strong>
                  <span>Delivery available</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contactMethods">
          <div className="container">
            <div className="contactMethodsGrid">
              {contactMethods.map((method, i) => (
                <Reveal key={method.title} delay={i * 0.06}>
                  <a href={method.href} className="contactMethodCard">
                    <div className="contactMethodIcon">{method.icon}</div>
                    <h3>{method.title}</h3>
                    <strong>{method.detail}</strong>
                    <span>{method.sub}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section contactFormSection" id="contact-form">
          <div className="container">
            <Reveal className="sectionHeader contactFormHeader">
              <div className="eyebrow">Get In Touch</div>
              <h2 className="sectionTitle sectionTitle--display">Send Us a Message</h2>
              <p className="sectionDesc">
                Fill in the form and our concierge team will get back to you shortly.
              </p>
            </Reveal>

            <div className="contactFormLayout">
              <Reveal className="contactFormCard">
                {isProductEnquiry && (
                  <div className="contactEnquiryBanner">
                    <span className="contactEnquiryBannerLabel">Product enquiry</span>
                    <strong>{productName}</strong>
                    {enquiryQty ? <span>Quantity: {enquiryQty}</span> : null}
                  </div>
                )}

                <form className="contactForm" onSubmit={(e) => e.preventDefault()}>
                  <div className="contactFormRow">
                    <div className="formGroup">
                      <label htmlFor="fullName">Full Name</label>
                      <input id="fullName" type="text" placeholder="Your full name" required />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" type="email" placeholder="you@email.com" required />
                    </div>
                  </div>
                  <div className="contactFormRow contactFormRow--single">
                    <div className="formGroup">
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  {!isProductEnquiry && (
                    <div className="formGroup">
                      <label htmlFor="subject">Subject</label>
                      <select id="subject" name="subject" defaultValue="general">
                        <option value="general">General Inquiry</option>
                        <option value="product">Product Enquiry</option>
                        <option value="bulk">Bulk / Corporate Order</option>
                        <option value="order">Order Status</option>
                        <option value="business">Business & Partnerships</option>
                      </select>
                    </div>
                  )}
                  {isProductEnquiry && (
                    <input id="subject" type="hidden" name="subject" value={enquirySubject} />
                  )}
                  <div className="formGroup formGroupFull">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      defaultValue={enquiryMessage}
                      required
                    />
                  </div>
                  <button type="submit" className="btnSubmit contactFormSubmit">Send Enquiry</button>
                </form>
              </Reveal>

              <Reveal className="contactInfoPanel" delay={0.08}>
                <div className="contactInfoBlocks">
                  <div className="contactInfoBlock">
                    <ClockIcon />
                    <div>
                      <strong>Fast responses</strong>
                      <span>Under 2 hours during business hours</span>
                    </div>
                  </div>
                  <div className="contactInfoBlock">
                    <MapPinIcon />
                    <div>
                      <strong>Mumbai, India</strong>
                      <span>Pan-India delivery & support</span>
                    </div>
                  </div>
                  <div className="contactInfoBlock contactInfoBlock--hours">
                    <strong className="contactInfoBlockTitle">Support Hours</strong>
                    <ul className="contactHoursList contactHoursList--compact">
                      {supportHours.map((row) => (
                        <li key={row.day}>
                          <span>{row.day}</span>
                          <strong>{row.time}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section contactTopicsSection">
          <div className="container">
            <Reveal className="sectionHeader contactTopicsHeader">
              <div className="eyebrow">How We Help</div>
              <h2 className="sectionTitle sectionTitle--display">What Can We Assist You With?</h2>
            </Reveal>
            <div className="contactTopicsGrid">
              {helpTopics.map((topic, i) => (
                <Reveal key={topic.title} className="contactTopicCard" delay={i * 0.06}>
                  <span className="contactTopicNum">{topic.num}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--surface contactFaq" id="faq">
          <div className="container contactFaqGrid">
            <Reveal className="contactFaqIntro">
              <div className="eyebrow">FAQ</div>
              <h2 className="sectionTitle sectionTitle--display">Common Questions</h2>
              <p className="sectionDesc">
                Quick answers before you reach out — product enquiries, delivery, and support.
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

        <section className="contactBottomCta">
          <div className="container contactBottomCtaInner">
            <Reveal>
              <div className="eyebrow eyebrow--light">Customer Support Promise</div>
              <h2>Thoughtful support at every step</h2>
              <p>
                From your first enquiry to delivery and beyond — we&apos;re committed to
                making every {brand.shortName} experience smooth, reliable, and exceptional.
              </p>
              <div className="contactBottomCtaActions">
                <Link href="/products" className="btnOrange">Explore Products</Link>
                <Link href="/categories" className="btnOutlineWhite">View Categories</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
