'use client'

import { useCatalog } from '@/components/CatalogProvider'
import { ScrollReveal } from '@/components/ScrollReveal'

export function SteelMarqueeSection() {
  const { marqueeTerms } = useCatalog()
  const source = marqueeTerms.length > 0 ? marqueeTerms : ['CURATED PRODUCTS']
  const terms = [...source, ...source]

  return (
    <section className="uniSteelMarquee" aria-label="Product highlights">
      <ScrollReveal direction="up" bounce>
        <div className="uniSteelMarqueeViewport">
          <div className="uniSteelMarqueeTrack">
            {terms.map((term, i) => (
              <span key={`${term}-${i}`} className="uniSteelMarqueeItem">
                {term}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
