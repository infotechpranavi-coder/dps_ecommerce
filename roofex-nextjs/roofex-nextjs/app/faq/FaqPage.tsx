'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { ChevronIcon } from '@/components/Icons'
import { brand } from '@/lib/brand'

const faqs = [
  {
    q: 'How do I enquire about a product?',
    a: 'Open any product page and click Enquire, or use the contact form with your product name. Our team responds with availability, pricing, and delivery timelines.',
  },
  {
    q: 'How quickly will I hear back?',
    a: 'We aim to reply within 2 hours during business hours (Mon–Sat, 9am–7pm IST). Messages received outside these hours are answered the next working day.',
  },
  {
    q: 'Do you offer bulk or corporate pricing?',
    a: `Yes. Email ${brand.wholesaleEmail} or select Business & Partnerships in the contact form. Share quantities and timelines for a custom quote.`,
  },
  {
    q: 'Where do you deliver?',
    a: 'We deliver across India with reliable pan-India shipping. Delivery timelines and charges are confirmed when you place your enquiry.',
  },
  {
    q: 'How do I choose the right product?',
    a: 'Every product page includes specifications, availability, and finishing details. Our team can also recommend products for retail, wholesale, or export — just ask.',
  },
  {
    q: 'What payment options are available?',
    a: 'We accept UPI, bank transfer, and major cards. Payment details are shared after your enquiry is confirmed by our team.',
  },
]

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <FloatingNavbar activePage="faq" />
      <main className="sitePage faqPage">
        <section className="faqHero">
          <div className="container faqHeroInner">
            <Reveal>
              <div className="eyebrow eyebrow--light">FAQ</div>
              <h1>Frequently Asked Questions</h1>
              <p className="faqHeroLead">
                Quick answers about product enquiries, delivery, payments, and support.
                Can&apos;t find what you need? Our team is one message away.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section faqContent" id="faq">
          <div className="container faqLayout">
            <Reveal className="faqIntro">
              <div className="eyebrow">Common Questions</div>
              <h2 className="sectionTitle">Everything you need to know</h2>
              <p className="sectionDesc">
                Browse the most common questions below. Still stuck? Reach out and we&apos;ll
                get back to you shortly.
              </p>
              <div className="faqIntroActions">
                <Link href="/contact" className="btnOrange">Contact Us</Link>
                <Link href="/products" className="faqIntroLink">Browse Products →</Link>
              </div>
            </Reveal>

            <div className="faqList" role="list">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={faq.q} className={`faqItem${isOpen ? ' open' : ''}`} role="listitem">
                    <button
                      type="button"
                      className="faqItemTrigger"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="faqItemQuestion">{faq.q}</span>
                      <span className="faqItemIcon" aria-hidden>
                        <ChevronIcon open={isOpen} />
                      </span>
                    </button>
                    <div className="faqItemAnswer" hidden={!isOpen}>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="siteMidCta">
          <div className="container">
            <Reveal className="siteMidCtaInner" direction="up">
              <div className="siteMidCtaCopy">
                <div className="eyebrow eyebrow--light">Still Have Questions?</div>
                <h2>We&apos;re here to help</h2>
                <p>Send us a message and our team will reply with clear answers and next steps.</p>
              </div>
              <div className="siteMidCtaActions">
                <Link href="/contact" className="btnOrange">Contact Us</Link>
                <Link href="/products" className="btnOutlineWhite">Browse Products</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
