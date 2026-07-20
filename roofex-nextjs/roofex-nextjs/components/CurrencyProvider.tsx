'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  BASE_CURRENCY,
  formatStoredPrice,
  isCurrencyCode,
  parseInrAmount,
  type CurrencyCode,
} from '@/lib/currency'

const STORAGE_KEY = 'dbi-preferred-currency'
const RATES_CACHE_KEY = 'dbi-exchange-rates'

type RatesPayload = {
  base: string
  date: string
  rates: Partial<Record<CurrencyCode, number>>
  fetchedAt?: string
  fallback?: boolean
}

type CurrencyContextValue = {
  currency: CurrencyCode
  setCurrency: (code: CurrencyCode) => void
  rates: Partial<Record<CurrencyCode, number>>
  ratesDate: string | null
  loading: boolean
  formatPrice: (inrPrice: string) => string
  parseInr: (price: string) => number
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

function readStoredCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return BASE_CURRENCY
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored && isCurrencyCode(stored) ? stored : BASE_CURRENCY
}

function readCachedRates(): RatesPayload | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(RATES_CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as RatesPayload
    if (parsed.date !== new Date().toISOString().slice(0, 10)) return null
    return parsed
  } catch {
    return null
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(BASE_CURRENCY)
  const [rates, setRates] = useState<Partial<Record<CurrencyCode, number>>>({})
  const [ratesDate, setRatesDate] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrencyState(readStoredCurrency())
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadRates = async () => {
      const cached = readCachedRates()
      if (cached) {
        setRates(cached.rates)
        setRatesDate(cached.date)
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/exchange-rates', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to load rates')
        const data = (await res.json()) as RatesPayload
        if (cancelled) return
        setRates(data.rates)
        setRatesDate(data.date)
        sessionStorage.setItem(RATES_CACHE_KEY, JSON.stringify(data))
      } catch {
        if (!cancelled) setRatesDate(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadRates()
    return () => {
      cancelled = true
    }
  }, [])

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code)
    localStorage.setItem(STORAGE_KEY, code)
  }, [])

  const formatPrice = useCallback(
    (inrPrice: string) => formatStoredPrice(inrPrice, currency, rates),
    [currency, rates],
  )

  const parseInr = useCallback((price: string) => parseInrAmount(price), [])

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      rates,
      ratesDate,
      loading,
      formatPrice,
      parseInr,
    }),
    [currency, setCurrency, rates, ratesDate, loading, formatPrice, parseInr],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return ctx
}
