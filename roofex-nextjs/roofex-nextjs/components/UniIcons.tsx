import type { ReactNode } from 'react'
import { AwardIcon, ShieldIcon, UsersIcon, WrenchIcon } from '@/components/Icons'

const iconMap: Record<string, () => ReactNode> = {
  'Curated Selection': () => <AwardIcon />,
  'Gift-Ready Delivery': () => <WrenchIcon />,
  'Secure Checkout': () => <ShieldIcon />,
  'Easy Returns': () => <UsersIcon />,
}

export function FeatureIcon({ title }: { title: string }) {
  const Icon = iconMap[title]
  return <div className="uniFeatureIcon">{Icon ? <Icon /> : <AwardIcon />}</div>
}

export function YellowScribble() {
  return (
    <svg className="uniProductsScribble" viewBox="0 0 180 48" fill="none" aria-hidden>
      <path
        d="M8 36 C 40 8, 80 44, 120 20 S 168 40, 172 28"
        stroke="var(--uni-orange)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}
