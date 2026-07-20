'use client'

import { useEffect, useRef, useState } from 'react'
import { CURRENCIES } from '@/lib/currency'
import { useCurrency } from '@/components/CurrencyProvider'

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const current = CURRENCIES.find((item) => item.code === currency) ?? CURRENCIES[0]

  useEffect(() => {
    if (!open) return

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="navCurrency" ref={rootRef}>
      <button
        type="button"
        className={`navCurrencyBtn${open ? ' is-open' : ''}`}
        aria-label="Change currency"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="navCurrencyBtnCode">{current.code}</span>
        <span className="navCurrencyBtnChevron" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div className="navCurrencyMenu" role="listbox" aria-label="Currencies">
          {CURRENCIES.map((item) => {
            const active = item.code === currency
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={active}
                className={`navCurrencyOption${active ? ' is-active' : ''}`}
                onClick={() => {
                  setCurrency(item.code)
                  setOpen(false)
                }}
              >
                <span className="navCurrencyOptionCode">{item.code}</span>
                <span className="navCurrencyOptionName">{item.label.split(' — ')[1] ?? item.code}</span>
                <span className="navCurrencyOptionSymbol">{item.symbol}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
