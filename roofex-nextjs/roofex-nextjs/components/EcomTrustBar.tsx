import { Reveal } from './Reveal'
import { ShieldIcon } from './Icons'

export const trustPerks = [
  { title: 'Free Shipping', desc: 'On orders over ₹5,000' },
  { title: 'Easy Returns', desc: '30-day hassle-free policy' },
  { title: 'Secure Checkout', desc: 'Safe & secured payments' },
  { title: 'Premium Support', desc: 'Dedicated business support' },
]

export function EcomTrustBar({
  variant = 'bar',
}: {
  variant?: 'bar' | 'panel'
}) {
  if (variant === 'panel') {
    return (
      <div className="productDetailTrustPanel" aria-label="Shopping benefits">
        {trustPerks.map((perk) => (
          <div key={perk.title} className="productDetailTrustItem">
            <div className="trustItemIcon" aria-hidden>
              <ShieldIcon />
            </div>
            <div className="trustItemText">
              <strong>{perk.title}</strong>
              <span>{perk.desc}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="ecomTrustBar" aria-label="Shopping benefits">
      <div className="container">
        <div className="ecomTrustBarInner">
          {trustPerks.map((perk, i) => (
            <Reveal key={perk.title} className="ecomTrustBarItem" delay={i * 0.05}>
              <div className="trustItemIcon" aria-hidden>
                <ShieldIcon />
              </div>
              <div className="trustItemText">
                <strong>{perk.title}</strong>
                <span>{perk.desc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
