'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MailIcon, PhoneIcon } from '@/components/Icons'
import { brand } from '@/lib/brand'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.45 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.64a11.9 11.9 0 005.75 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.18-1.24-6.17-3.45-8.42zM12.04 21.8h-.01a9.86 9.86 0 01-5.02-1.37l-.36-.21-3.73.98 1-3.63-.24-.37a9.84 9.84 0 01-1.5-5.27C2.18 6.48 6.6 2.07 12.04 2.07c2.63 0 5.1 1.02 6.96 2.88a9.78 9.78 0 012.87 6.95c0 5.44-4.42 9.9-9.83 9.9zm5.4-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a8 8 0 01-8 8H7l-4 3V12a8 8 0 018-8h2a8 8 0 018 8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const whatsappHref = `https://wa.me/${brand.phoneTel.replace(/\D/g, '')}?text=${encodeURIComponent(
  `Hi ${brand.shortName}, I would like to enquire about your products.`,
)}`

export function FloatingActionButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fabStack" aria-label="Quick actions">
      <button
        type="button"
        className={`fabBtn fabBtn--top${showTop ? ' is-visible' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
      >
        <ChevronUpIcon />
      </button>

      <Link href="/contact#contact-form" className="fabBtn fabBtn--contact" aria-label="Contact us form">
        <ChatIcon />
      </Link>

      <a
        href={whatsappHref}
        className="fabBtn fabBtn--whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <a href={`tel:${brand.phoneTel}`} className="fabBtn fabBtn--call" aria-label={`Call ${brand.phone}`}>
        <PhoneIcon size={20} color="currentColor" />
      </a>
    </div>
  )
}
