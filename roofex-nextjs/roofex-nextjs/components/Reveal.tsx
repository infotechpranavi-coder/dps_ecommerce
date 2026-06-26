'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight * 0.98 && rect.bottom > 0
}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.05, margin: '0px 0px -24px 0px' })
  const [hydrated, setHydrated] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useLayoutEffect(() => {
    if (!hydrated) return
    const el = ref.current
    if (!el) return

    if (reduceMotion || isInViewport(el)) {
      setReady(true)
    }
  }, [hydrated, reduceMotion])

  if (!hydrated) {
    return <div className={className}>{children}</div>
  }

  const show = reduceMotion || ready || inView

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: show ? delay : 0 }}
    >
      {children}
    </motion.div>
  )
}
