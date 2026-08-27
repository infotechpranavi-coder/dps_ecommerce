'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { useCatalog } from '@/components/CatalogProvider'
import { ChatIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/Icons'
import { brand } from '@/lib/brand'
import { ENQUIRY_TYPE_LABELS } from '@/lib/enquiry-types'

const contactMethods = [
  {
    icon: <PhoneIcon size={22} color="currentColor" />,
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
    desc: 'Ask about specifications, availability, pricing, and delivery for any item in our catalogue.',
  },
  {
    num: '02',
    title: 'Bulk & Corporate Orders',
    desc: 'Planning a large order or corporate supply? Our team will prepare a tailored quote.',
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

const supportHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM IST' },
  { day: 'Saturday', time: '10:00 AM – 5:00 PM IST' },
  { day: 'Sunday & Holidays', time: 'Email support only' },
]

export default function ContactPage() {
  const searchParams = useSearchParams()
  const { products } = useCatalog()
  const productName = searchParams.get('product')?.trim() ?? ''
  const enquiryType = searchParams.get('type')?.trim() ?? ''
  const isOrderOnDemand = enquiryType === 'order-on-demand'
  const isProductEnquiry = productName.length > 0

  const matchedProduct = isProductEnquiry
    ? products.find((p) => p.title.toLowerCase() === productName.toLowerCase())
    : undefined
  const moqFromQuery = Number(searchParams.get('moq')?.trim() || '')
  const productMoq = Math.max(
    1,
    Math.floor(
      matchedProduct?.moq
        || (Number.isFinite(moqFromQuery) && moqFromQuery > 0 ? moqFromQuery : 0)
        || 1,
    ),
  )
  const requestedQty = Number(searchParams.get('qty')?.trim() || '')
  // Enquiry quantity is at least the product MOQ (falls back to MOQ when qty is missing).
  const enquiryQty = Number.isFinite(requestedQty) && requestedQty > 0
    ? Math.max(productMoq, Math.floor(requestedQty))
    : productMoq

  const enquirySubject = isProductEnquiry
    ? isOrderOnDemand
      ? `Order on Demand: ${productName}`
      : `Product enquiry: ${productName}`
    : ''
  const enquiryMessage = isProductEnquiry
    ? isOrderOnDemand
      ? `Hello, I would like to place an Order on Demand for ${productName} (quantity: ${enquiryQty}, MOQ: ${productMoq}). Please confirm lead time, availability, and pricing.`
      : `Hello, I would like to enquire about ${productName} (quantity: ${enquiryQty}, MOQ: ${productMoq}). Please share availability and pricing details.`
    : ''

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (isProductEnquiry && window.location.hash === '#contact-form') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isProductEnquiry])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 5000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting || submitted) return

    setSubmitting(true)
    setSubmitError('')
    setToast(null)
    const form = e.currentTarget
    const data = new FormData(form)

    const subjectValue = String(data.get('subject') || '').trim()
    const typeValue = String(data.get('enquiryType') || subjectValue || 'general').trim()
    const subject =
      isProductEnquiry
        ? enquirySubject
        : ENQUIRY_TYPE_LABELS[subjectValue] || subjectValue || 'Website enquiry'

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          email: String(data.get('email') || '').trim(),
          phone: String(data.get('phone') || '').trim(),
          subject,
          type: isProductEnquiry ? (isOrderOnDemand ? 'order-on-demand' : 'product') : typeValue,
          message: String(data.get('message') || '').trim(),
          productName: productName || undefined,
          quantity: isProductEnquiry ? enquiryQty : undefined,
          moq: isProductEnquiry ? productMoq : undefined,
        }),
      })
      const payload = (await res.json().catch(() => null)) as { error?: string } | null
      if (!res.ok) {
        throw new Error(payload?.error || `Submit failed (${res.status})`)
      }
      setSubmitted(true)
      form.reset()
      setToast({
        type: 'success',
        text: isOrderOnDemand
          ? 'Order on Demand submitted successfully. Our team will get back to you shortly.'
          : 'Enquiry submitted successfully. Our team will get back to you shortly.',
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Could not submit enquiry.'
      setSubmitError(text)
      setToast({ type: 'error', text })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <FloatingNavbar activePage="contact" />
      {toast ? (
        <div
          className={`contactToast${toast.type === 'error' ? ' contactToast--error' : ' contactToast--success'}`}
          role="status"
          aria-live="polite"
        >
          <span>{toast.text}</span>
          <button type="button" className="contactToastClose" onClick={() => setToast(null)} aria-label="Dismiss">
            ×
          </button>
        </div>
      ) : null}
      <main className="sitePage contactPage">
        <section className="contactHero">
          <div className="container contactHeroInner">
            <Reveal>
              <div className="eyebrow eyebrow--light">Contact Us</div>
              <h1>Let&apos;s Start a Conversation</h1>
              <p className="contactHeroLead">
                Questions about a product, bulk order, or partnership? Our team is here
                with clear answers and a personal touch.
              </p>
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
              <h2 className="sectionTitle">Send Us a Message</h2>
              <p className="sectionDesc">
                Fill in the form and our business support team will get back to you shortly.
              </p>
            </Reveal>

            <div className="contactFormLayout">
              <Reveal className="contactFormCard">
                {isProductEnquiry && (
                  <div className={`contactEnquiryBanner${isOrderOnDemand ? ' contactEnquiryBanner--demand' : ''}`}>
                    <span className="contactEnquiryBannerLabel">
                      {isOrderOnDemand ? 'Order on Demand' : 'Product enquiry'}
                    </span>
                    <strong>{productName}</strong>
                    {enquiryQty ? <span>Quantity: {enquiryQty}</span> : null}
                    {isOrderOnDemand ? (
                      <span>Subject is set for Order on Demand — ready for customer enquiry / email handling later.</span>
                    ) : null}
                  </div>
                )}

                {submitted ? (
                  <div className="contactFormSuccess">
                    <h3>Enquiry submitted</h3>
                    <p>
                      Thanks — our team has received your message
                      {isOrderOnDemand ? ' for Order on Demand' : ''} and will respond shortly.
                    </p>
                    <button
                      type="button"
                      className="btnSubmit contactFormSubmit"
                      onClick={() => {
                        setSubmitted(false)
                        setToast(null)
                      }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                <form className={`contactForm${submitting ? ' contactForm--submitting' : ''}`} onSubmit={handleSubmit}>
                    <div className="contactFormRow">
                      <div className="formGroup">
                        <label htmlFor="fullName">Full Name</label>
                        <input id="fullName" name="name" type="text" placeholder="Your full name" required disabled={submitting} />
                      </div>
                      <div className="formGroup">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" name="email" type="email" placeholder="you@email.com" required disabled={submitting} />
                      </div>
                    </div>
                    <div className="contactFormRow contactFormRow--single">
                      <div className="formGroup">
                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" disabled={submitting} />
                      </div>
                    </div>
                    {!isProductEnquiry && (
                      <div className="formGroup">
                        <label htmlFor="subject">Subject</label>
                        <select id="subject" name="subject" defaultValue="general" disabled={submitting}>
                          <option value="general">General Inquiry</option>
                          <option value="product">Product Enquiry</option>
                          <option value="order-on-demand">Order on Demand</option>
                          <option value="bulk">Bulk / Corporate Order</option>
                          <option value="order">Order Status</option>
                          <option value="business">Business & Partnerships</option>
                        </select>
                      </div>
                    )}
                    {isProductEnquiry && (
                      <>
                        <input type="hidden" name="subject" value={enquirySubject} />
                        <input type="hidden" name="enquiryType" value={isOrderOnDemand ? 'order-on-demand' : 'product'} />
                        <div className="formGroup">
                          <label htmlFor="subjectVisible">Subject</label>
                          <input id="subjectVisible" type="text" value={enquirySubject} readOnly disabled={submitting} />
                        </div>
                      </>
                    )}
                    <div className="formGroup formGroupFull">
                      <label htmlFor="message">Message</label>
                      <textarea
                        key={enquiryMessage || 'blank'}
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        defaultValue={enquiryMessage}
                        required
                        disabled={submitting}
                      />
                    </div>
                    {submitError ? <p className="contactFormError">{submitError}</p> : null}
                    <button type="submit" className="btnSubmit contactFormSubmit" disabled={submitting || submitted}>
                      {submitting
                        ? 'Submitting…'
                        : isOrderOnDemand
                          ? 'Submit Order on Demand'
                          : 'Send Enquiry'}
                    </button>
                </form>
                )}
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
              <h2 className="sectionTitle">What Can We Assist You With?</h2>
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
            <Reveal className="contactFaqLinkRow" delay={0.1}>
              <p>Looking for quick answers?</p>
              <Link href="/faq" className="btnOrange">Visit our FAQ</Link>
            </Reveal>
          </div>
        </section>

        <section className="siteMidCta">
          <div className="container">
            <Reveal className="siteMidCtaInner" direction="up">
              <div className="siteMidCtaCopy">
                <div className="eyebrow eyebrow--light">Customer Support</div>
                <h2>Explore products while we get back to you</h2>
                <p>Browse the catalogue or visit FAQ for quick answers — our team replies during business hours.</p>
              </div>
              <div className="siteMidCtaActions">
                <Link href="/products" className="btnOrange">Explore Products</Link>
                <Link href="/faq" className="btnOutlineWhite">View FAQ</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
