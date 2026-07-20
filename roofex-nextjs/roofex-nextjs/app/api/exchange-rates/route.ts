import { NextResponse } from 'next/server'
import { BASE_CURRENCY, SUPPORTED_CODES } from '@/lib/currency'

export const revalidate = 3600

type FrankfurterResponse = {
  amount: number
  base: string
  date: string
  rates: Record<string, number>
}

export async function GET() {
  try {
    const targets = SUPPORTED_CODES.join(',')
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=${BASE_CURRENCY}&to=${targets}`,
      { next: { revalidate: 3600 } },
    )

    if (!res.ok) throw new Error('Rate provider unavailable')

    const data = (await res.json()) as FrankfurterResponse

    return NextResponse.json({
      base: BASE_CURRENCY,
      date: data.date,
      rates: data.rates,
      fetchedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      {
        base: BASE_CURRENCY,
        date: new Date().toISOString().slice(0, 10),
        rates: {
          USD: 0.012,
          GBP: 0.0095,
          EUR: 0.011,
          AED: 0.044,
          SGD: 0.016,
          CAD: 0.016,
          AUD: 0.018,
        },
        fetchedAt: new Date().toISOString(),
        fallback: true,
      },
      { status: 200 },
    )
  }
}
