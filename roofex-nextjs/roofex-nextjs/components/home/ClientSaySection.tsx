'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { jewelleryImages } from '@/lib/product-images'

type TextReview = {
  type: 'text'
  name: string
  role: string
  text: string
  avatar: string
  brand: { name: string; color: string; letter: string }
}

type ImageReview = {
  type: 'image'
  name: string
  role: string
  image: string
}

const textPool: TextReview[] = [
  {
    type: 'text',
    name: 'Sarah Thompson',
    role: 'Verified Buyer',
    text: 'Strong finish, professional packaging, and the product matched the listing exactly.',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    brand: { name: 'Netdot', color: '#22c55e', letter: 'N' },
  },
  {
    type: 'text',
    name: 'Michael Johnson',
    role: 'Verified Buyer',
    text: 'Reliable quality, clear product details, and delivery was on schedule.',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    brand: { name: 'Pulse', color: '#3b82f6', letter: 'P' },
  },
  {
    type: 'text',
    name: 'Priya Sharma',
    role: 'Retail Customer',
    text: 'The product looked exactly like the photos. Great quality and arrived well packed.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    brand: { name: 'Aura', color: '#e8a020', letter: 'A' },
  },
  {
    type: 'text',
    name: 'David Chen',
    role: 'Verified Buyer',
    text: 'Ordered for our store — quality felt premium and packing was export-ready.',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    brand: { name: 'Orbit', color: '#ef4444', letter: 'O' },
  },
  {
    type: 'text',
    name: 'Ananya Mehta',
    role: 'Repeat Customer',
    text: 'Product matched the photos perfectly. Good quality and exactly what we needed.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    brand: { name: 'Lumen', color: '#14b8a6', letter: 'L' },
  },
  {
    type: 'text',
    name: 'Kavya Reddy',
    role: 'Verified Buyer',
    text: 'Order arrived well packed and looked great — smooth delivery and clear communication.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    brand: { name: 'Vela', color: '#6366f1', letter: 'V' },
  },
]

const imagePool: ImageReview[] = [
  { type: 'image', name: 'Ananya Mehta', role: 'Verified Buyer', image: jewelleryImages.earrings },
  { type: 'image', name: 'Riya Kapoor', role: 'Retail Partner', image: jewelleryImages.bridal },
  { type: 'image', name: 'Neha Patel', role: 'Repeat Customer', image: jewelleryImages.necklace },
  { type: 'image', name: 'Kavya Reddy', role: 'Verified Buyer', image: jewelleryImages.bangles },
  { type: 'image', name: 'Sneha Iyer', role: 'Wholesale Buyer', image: jewelleryImages.rings },
  { type: 'image', name: 'Meera Joshi', role: 'Verified Buyer', image: jewelleryImages.display },
]

const HOLD_MS = 2500
const MOVE_S = 1.05
const slideEase = [0.32, 0.72, 0.25, 1] as const

function setRippleOrigin(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--ripple-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--ripple-y', `${e.clientY - rect.top}px`)
}

function TextCard({ review }: { review: TextReview }) {
  return (
    <article
      className="clientSayCard clientSayCard--text"
      onPointerEnter={setRippleOrigin}
      onPointerMove={setRippleOrigin}
    >
      <span className="clientSayRipple" aria-hidden />
      <div className="clientSayCardInner">
        <div className="clientSayCardHead">
          <img src={review.avatar} alt={review.name} />
          <div>
            <strong>{review.name}</strong>
            <span>{review.role}</span>
          </div>
        </div>
        <p className="clientSayQuote">&ldquo;{review.text}&rdquo;</p>
        <div className="clientSayCardFoot">
          <div className="clientSayStars" aria-label="5 out of 5 stars">
            ★★★★★
          </div>
          <div className="clientSayBrand">
            <span
              className="clientSayBrandIcon"
              style={{ background: review.brand.color }}
              aria-hidden
            >
              {review.brand.letter}
            </span>
            {review.brand.name}
          </div>
        </div>
      </div>
    </article>
  )
}

function ImageCard({ review }: { review: ImageReview }) {
  return (
    <article
      className="clientSayCard clientSayCard--image"
      onPointerEnter={setRippleOrigin}
      onPointerMove={setRippleOrigin}
    >
      <span className="clientSayRipple" aria-hidden />
      <img src={review.image} alt={review.name} />
      <div className="clientSayImageOverlay">
        <div className="clientSayImageMeta">
          <strong>{review.name}</strong>
          <span>{review.role}</span>
        </div>
      </div>
    </article>
  )
}

/**
 * Slot motion: the grid reads as one continuous clockwise flow, every card
 * gliding to its next position in the same beat, no bounce.
 *
 *   a1 (top-left)      in from right (came from a2), out to the left
 *   a2 (top-center)    in from below (came from b2), out to the left
 *   b2 (bottom-center) new card in from the right, out upward
 *   b1 (bottom-left)   new image in from below, out upward
 *   a3 (right, tall)   gentle crossfade
 */
const slotMotion = {
  a1: {
    initial: { x: '112%', opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-112%', opacity: 0 },
  },
  a2: {
    initial: { y: '112%', opacity: 1 },
    animate: { y: 0, opacity: 1 },
    exit: { x: '-112%', opacity: 0 },
  },
  b2: {
    initial: { x: '112%', opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { y: '-112%', opacity: 0 },
  },
  b1: {
    initial: { y: '112%', opacity: 1 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-112%', opacity: 0 },
  },
  a3: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
} as const

export function ClientSaySection() {
  const reducedMotion = useReducedMotion()

  // Text rotation: a1 <- a2 <- b2 <- next from pool
  const [textIdx, setTextIdx] = useState({ a1: 0, a2: 1, b2: 2 })
  // Image slots step through the pool together
  const [imgIdx, setImgIdx] = useState({ b1: 0, a3: 1 })
  const nextTextRef = useRef(3)

  useEffect(() => {
    if (reducedMotion) return

    const id = setInterval(() => {
      setTextIdx((prev) => {
        const incoming = nextTextRef.current
        nextTextRef.current = (incoming + 1) % textPool.length
        return { a1: prev.a2, a2: prev.b2, b2: incoming }
      })
      setImgIdx((prev) => ({
        b1: (prev.b1 + 1) % imagePool.length,
        a3: (prev.a3 + 1) % imagePool.length,
      }))
    }, HOLD_MS + MOVE_S * 1000)

    return () => clearInterval(id)
  }, [reducedMotion])

  const transition = { duration: MOVE_S, ease: slideEase }

  return (
    <section className="clientSaySection" id="reviews">
      <div className="container">
        <Reveal className="clientSayHeader">
          <h2 className="clientSayTitle">Trusted by buyers and partners</h2>
          <p className="clientSayTagline">
            Real feedback on product quality, packaging, and reliable supply from customers and business partners.
          </p>
        </Reveal>

        <div className="clientSayGrid">
          <div className="clientSayGridItem clientSayGridItem--a1">
            <div className="clientSaySlot">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`a1-${textIdx.a1}`}
                  className="clientSayMover"
                  initial={slotMotion.a1.initial}
                  animate={slotMotion.a1.animate}
                  exit={slotMotion.a1.exit}
                  transition={transition}
                >
                  <TextCard review={textPool[textIdx.a1]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="clientSayGridItem clientSayGridItem--a2">
            <div className="clientSaySlot">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`a2-${textIdx.a2}`}
                  className="clientSayMover"
                  initial={slotMotion.a2.initial}
                  animate={slotMotion.a2.animate}
                  exit={slotMotion.a2.exit}
                  transition={transition}
                >
                  <TextCard review={textPool[textIdx.a2]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="clientSayGridItem clientSayGridItem--a3">
            <div className="clientSaySlot">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`a3-${imgIdx.a3}`}
                  className="clientSayMover"
                  initial={slotMotion.a3.initial}
                  animate={slotMotion.a3.animate}
                  exit={slotMotion.a3.exit}
                  transition={transition}
                >
                  <ImageCard review={imagePool[imgIdx.a3]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="clientSayGridItem clientSayGridItem--b1">
            <div className="clientSaySlot">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`b1-${imgIdx.b1}`}
                  className="clientSayMover"
                  initial={slotMotion.b1.initial}
                  animate={slotMotion.b1.animate}
                  exit={slotMotion.b1.exit}
                  transition={transition}
                >
                  <ImageCard review={imagePool[imgIdx.b1]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="clientSayGridItem clientSayGridItem--b2">
            <div className="clientSaySlot">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`b2-${textIdx.b2}`}
                  className="clientSayMover"
                  initial={slotMotion.b2.initial}
                  animate={slotMotion.b2.animate}
                  exit={slotMotion.b2.exit}
                  transition={transition}
                >
                  <TextCard review={textPool[textIdx.b2]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
