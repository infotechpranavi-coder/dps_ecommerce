'use client'

import { useCurrency } from '@/components/CurrencyProvider'

type PriceDisplayProps = {
  value: string
  className?: string
  as?: 'strong' | 'span' | 'em' | 's'
}

export function PriceDisplay({ value, className, as = 'strong' }: PriceDisplayProps) {
  const { formatPrice } = useCurrency()
  const Tag = as
  return <Tag className={className}>{formatPrice(value)}</Tag>
}
