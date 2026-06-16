import { Reveal } from './Reveal'
import { ShieldIcon } from './Icons'

const perks = [
  { title: 'Free Shipping', desc: 'On orders over $150' },
  { title: 'Easy Returns', desc: '30-day hassle-free policy' },
  { title: 'Secure Checkout', desc: '256-bit encrypted payments' },
  { title: 'Premium Support', desc: 'Concierge help 24/7' },
]

export function EcomTrustBar() {
  return (
    <section className="ecomTrustBar">
      <div className="container">
        <div className="ecomTrustBarInner">
          {perks.map((perk, i) => (
            <Reveal key={perk.title} className="ecomTrustBarItem" delay={i * 0.05}>
              <div className="trustItemIcon"><ShieldIcon /></div>
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
