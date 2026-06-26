'use client'

import { ScrollReveal } from '@/components/ScrollReveal'

export function Reveal({
  children,
  className = '',
  delay = 0,
  eager = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Skip animation — content stays visible immediately */
  eager?: boolean
}) {
  if (eager) {
    return <div className={className}>{children}</div>
  }

  return (
    <ScrollReveal className={className} delay={delay} direction="up">
      {children}
    </ScrollReveal>
  )
}
