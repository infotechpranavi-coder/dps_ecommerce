'use client'

import { ScrollReveal } from '@/components/ScrollReveal'

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  bounce = true,
  eager = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  bounce?: boolean
  /** Skip animation — content stays visible immediately */
  eager?: boolean
}) {
  if (eager) {
    return <div className={className}>{children}</div>
  }

  return (
    <ScrollReveal
      className={className}
      delay={delay}
      direction={direction}
      bounce={bounce}
    >
      {children}
    </ScrollReveal>
  )
}
