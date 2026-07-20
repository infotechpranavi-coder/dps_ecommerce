export const BASE_CURRENCY = 'INR' as const

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'INR — Indian Rupee', locale: 'en-IN' },
  { code: 'USD', symbol: '$', label: 'USD — US Dollar', locale: 'en-US' },
  { code: 'GBP', symbol: '£', label: 'GBP — British Pound', locale: 'en-GB' },
  { code: 'EUR', symbol: '€', label: 'EUR — Euro', locale: 'de-DE' },
  { code: 'AED', symbol: 'AED', label: 'AED — UAE Dirham', locale: 'en-AE' },
  { code: 'SGD', symbol: 'S$', label: 'SGD — Singapore Dollar', locale: 'en-SG' },
  { code: 'CAD', symbol: 'C$', label: 'CAD — Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', symbol: 'A$', label: 'AUD — Australian Dollar', locale: 'en-AU' },
] as const

export type CurrencyCode = (typeof CURRENCIES)[number]['code']

export const SUPPORTED_CODES = CURRENCIES.map((c) => c.code).filter(
  (code) => code !== BASE_CURRENCY,
) as Exclude<CurrencyCode, typeof BASE_CURRENCY>[]

export function parseInrAmount(price: string): number {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

export function convertFromInr(
  amountInr: number,
  code: CurrencyCode,
  rates: Partial<Record<CurrencyCode, number>>,
): number {
  if (code === BASE_CURRENCY) return amountInr
  const rate = rates[code]
  if (!rate) return amountInr
  return amountInr * rate
}

export function formatCurrency(amount: number, code: CurrencyCode): string {
  if (code === BASE_CURRENCY) {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    const meta = CURRENCIES.find((c) => c.code === code)
    return `${meta?.symbol ?? code} ${amount.toFixed(2)}`
  }
}

export function formatStoredPrice(
  price: string,
  code: CurrencyCode,
  rates: Partial<Record<CurrencyCode, number>>,
): string {
  const inr = parseInrAmount(price)
  if (!inr) return price
  const converted = convertFromInr(inr, code, rates)
  return formatCurrency(converted, code)
}

export function isCurrencyCode(value: string): value is CurrencyCode {
  return CURRENCIES.some((c) => c.code === value)
}
