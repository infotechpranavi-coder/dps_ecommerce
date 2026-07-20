'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { brand } from '@/lib/brand'
import { useCatalog } from '@/components/CatalogProvider'
import { useCurrency } from '@/components/CurrencyProvider'

const MIN_MS = 1300
const FADE_MS = 520

export function PageLoader() {
  const { loading: catalogLoading } = useCatalog()
  const { loading: currencyLoading } = useCurrency()
  const [mounted, setMounted] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [minElapsed, setMinElapsed] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setMinElapsed(true), MIN_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!minElapsed || exiting || !mounted) return
    if (catalogLoading || currencyLoading) return

    const ready =
      typeof document !== 'undefined' &&
      (document.readyState === 'complete' || document.readyState === 'interactive')

    const startExit = () => {
      setExiting(true)
      window.setTimeout(() => setMounted(false), FADE_MS)
    }

    if (!ready) {
      const onReady = () => {
        if (document.readyState === 'complete') startExit()
      }
      document.addEventListener('readystatechange', onReady)
      return () => document.removeEventListener('readystatechange', onReady)
    }

    startExit()
  }, [minElapsed, catalogLoading, currencyLoading, exiting, mounted])

  if (!mounted) return null

  return (
    <div
      className={`pageLoader${exiting ? ' is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-hidden={exiting}
    >
      <div className="pageLoaderRing">
        <svg className="pageLoaderSpin" viewBox="0 0 100 100" aria-hidden>
          <circle className="pageLoaderTrack" cx="50" cy="50" r="46" />
          <circle className="pageLoaderArc" cx="50" cy="50" r="46" />
        </svg>
        <div className="pageLoaderCore">
          <Image
            src={brand.logoSmall}
            alt=""
            width={110}
            height={110}
            className="pageLoaderLogo"
            priority
          />
        </div>
      </div>
    </div>
  )
}
