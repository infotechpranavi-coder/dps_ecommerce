import { ScrollReveal } from '@/components/ScrollReveal'
import { productMarqueeTerms } from '@/lib/kvs-catalog'

export function SteelMarqueeSection() {
  const terms = [...productMarqueeTerms, ...productMarqueeTerms]

  return (
    <ScrollReveal as="section" className="uniSteelMarquee" direction="up" aria-label="Product categories">
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
  )
}
