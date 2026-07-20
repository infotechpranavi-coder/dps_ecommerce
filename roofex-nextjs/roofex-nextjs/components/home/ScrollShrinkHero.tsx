'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { brand } from '@/lib/brand'
import { jewelleryImages } from '@/lib/product-images'
import { useCatalog } from '@/components/CatalogProvider'

const fallbackSlides = [
  { image: jewelleryImages.bridal, alt: 'Featured product collection', id: 'fallback-1' },
  { image: jewelleryImages.bangles, alt: 'Product showcase display', id: 'fallback-2' },
  { image: jewelleryImages.earrings, alt: 'Curated product selection', id: 'fallback-3' },
] as const

const SLIDE_MS = 6000

function optimizeHeroImage(url: string): string {
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_1400/')
  }
  if (!url.includes('images.unsplash.com')) return url
  try {
    const parsed = new URL(url)
    parsed.searchParams.set('auto', 'format')
    parsed.searchParams.set('fit', 'crop')
    parsed.searchParams.set('w', '1200')
    parsed.searchParams.set('q', '75')
    return parsed.toString()
  } catch {
    return url
  }
}

export function ScrollShrinkHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { heroBanners } = useCatalog()
  const slides = useMemo(() => {
    if (heroBanners.length > 0) {
      return heroBanners.map((banner) => ({
        id: banner.id,
        image: optimizeHeroImage(banner.image),
        alt: banner.alt,
      }))
    }
    return fallbackSlides.map((slide) => ({
      ...slide,
      image: optimizeHeroImage(slide.image),
    }))
  }, [heroBanners])

  const [activeSlide, setActiveSlide] = useState(0)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const rawShrinkAmount = useTransform(scrollYProgress, [0, 0.18, 1], [0, 0.08, 1])
  const shrinkAmount = useSpring(rawShrinkAmount, {
    stiffness: 95,
    damping: 28,
    mass: 0.65,
  })
  const cardScale = useTransform(shrinkAmount, (v) => 1 - v * 0.065)
  const cardRadius = useTransform(shrinkAmount, (v) => v * 40)
  const stickyPad = useTransform(shrinkAmount, (v) => v * 28)
  const stickyPadBottom = useTransform(shrinkAmount, (v) => v * 18)
  const rawContentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -20])
  const contentY = useSpring(rawContentY, { stiffness: 90, damping: 26, mass: 0.7 })
  const rawHandoffOpacity = useTransform(scrollYProgress, [0.48, 0.88, 1], [0, 0.45, 1])
  const handoffOpacity = useSpring(rawHandoffOpacity, { stiffness: 85, damping: 28 })

  useEffect(() => {
    setActiveSlide(0)
  }, [slides.length])

  useEffect(() => {
    if (slides.length < 2 || reducedMotion) return undefined
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(interval)
  }, [slides.length, reducedMotion])

  useEffect(() => {
    const href = slides[0]?.image
    if (!href) return
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
    return () => {
      link.remove()
    }
  }, [slides])

  const visibleSlideIndexes = useMemo(() => {
    if (slides.length <= 1) return [0]
    const next = (activeSlide + 1) % slides.length
    return [activeSlide, next]
  }, [activeSlide, slides.length])

  return (
    <section ref={sectionRef} className="scrollHero" aria-label="Hero">
      <div className="scrollHeroSticky">
        <motion.div
          className="scrollHeroStickyPad"
          style={{
            paddingLeft: stickyPad,
            paddingRight: stickyPad,
            paddingBottom: stickyPadBottom,
          }}
        >
          <motion.div
            className="scrollHeroCard"
            style={{
              scale: cardScale,
              borderBottomLeftRadius: cardRadius,
              borderBottomRightRadius: cardRadius,
            }}
          >
            <div className="scrollHeroSlides" aria-hidden>
              {slides.map((slide, index) => {
                if (!visibleSlideIndexes.includes(index)) return null
                return (
                  <div
                    key={slide.id}
                    className={`scrollHeroSlide${index === activeSlide ? ' is-active' : ''}`}
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  />
                )
              })}
            </div>

            <div className="scrollHeroOverlay" aria-hidden />
            <div className="scrollHeroOverlay scrollHeroOverlay--veil" aria-hidden />
            <div className="scrollHeroOverlay scrollHeroOverlay--scroll scrollHeroOverlay--static" aria-hidden />

            <motion.div
              className="container scrollHeroContent scrollHeroContent--panel"
              style={{ y: contentY }}
            >
              <div className="scrollHeroCopy">
                <p className="scrollHeroEyeline">Est. {brand.founded} · {brand.tagline}</p>

                <h1>
                  <span className="scrollHeroTitleLead">Global products,</span>
                  <span className="scrollHeroAccent">reliable supply</span>
                </h1>

                <p className="scrollHeroLead">
                  Curated products for retail and wholesale buyers — quality finishing, honest details, and delivery you can count on.
                </p>

                <div className="scrollHeroBtns">
                  <Link href="/products" className="btnOrange scrollHeroBtn">
                    Shop Collection <span aria-hidden>↗</span>
                  </Link>
                  <Link href="/categories" className="btnOutlineWhite scrollHeroBtn">
                    View Categories <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scrollHeroHandoff"
        style={{ opacity: handoffOpacity }}
        aria-hidden
      />
    </section>
  )
}
