'use client'

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

type ScrollRevealProps = {
  as?: ElementType
  className?: string
  delay?: number
  direction?: Direction
  children: ReactNode
  id?: string
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight * 0.98 && rect.bottom > 0
}

export function ScrollReveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  direction = 'up',
  children,
  id,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [hydrated, setHydrated] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useLayoutEffect(() => {
    if (!hydrated) return
    const el = ref.current
    if (!el) return

    const reveal = () => setVisible(true)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      return
    }

    if (isInViewport(el)) {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -24px 0px', threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hydrated])

  const isVisible = !hydrated || visible

  const classes = [
    'uniReveal',
    `uniReveal--${direction}`,
    isVisible ? 'uniReveal--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      id={id}
      className={classes}
      style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
