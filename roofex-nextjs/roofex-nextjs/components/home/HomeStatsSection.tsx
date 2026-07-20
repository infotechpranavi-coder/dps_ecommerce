'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type StatItem = {
  value: number
  label: string
  icon: ReactNode
}

const stats: StatItem[] = [
  {
    value: 500,
    label: 'Products Sold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    value: 1000,
    label: 'Happy Customers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    value: 250,
    label: 'Orders Delivered',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    value: 350,
    label: 'Products Listed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M4 18V8l8-5 8 5v10a3 3 0 01-3 3H7a3 3 0 01-3-3z" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
  },
]

function DialDigit({
  digit,
  active,
  delayMs,
}: {
  digit: number
  active: boolean
  delayMs: number
}) {
  // One full 0–9 spin, then land on the target digit (bag-lock dial feel)
  const faces = Array.from({ length: 20 }, (_, i) => i % 10)
  const targetIndex = active ? 10 + digit : 0
  const facePercent = 100 / faces.length

  return (
    <span className="homeStatsDialDigit" aria-hidden>
      <span
        className="homeStatsDialReel"
        style={{
          transform: `translateY(-${targetIndex * facePercent}%)`,
          transitionDelay: active ? `${delayMs}ms` : '0ms',
        }}
      >
        {faces.map((n, i) => (
          <span key={`${n}-${i}`} className="homeStatsDialFace">
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}

function DialNumber({ value, active, startDelay = 0 }: { value: number; active: boolean; startDelay?: number }) {
  const digits = String(value).split('').map(Number)

  return (
    <span className="homeStatsDial" aria-label={`${value}+`}>
      {digits.map((digit, index) => (
        <DialDigit
          key={`${value}-${index}`}
          digit={digit}
          active={active}
          delayMs={startDelay + index * 140}
        />
      ))}
      <span className="homeStatsDialPlus">+</span>
    </span>
  )
}

export function HomeStatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="homeStatsSection" aria-label="Store highlights">
      <div className="container homeStatsGrid">
        {stats.map((stat, index) => (
          <article
            key={stat.label}
            className={`homeStatsItem${active ? ' is-active' : ''}`}
            style={{ ['--stat-i' as string]: index }}
          >
            <div className="homeStatsIcon">{stat.icon}</div>
            <DialNumber value={stat.value} active={active} startDelay={index * 90} />
            <p className="homeStatsLabel">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
