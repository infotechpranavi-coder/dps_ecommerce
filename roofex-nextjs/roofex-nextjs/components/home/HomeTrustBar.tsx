import { Reveal } from '@/components/Reveal'
import { AwardIcon, ClockIcon, ShieldIcon, UsersIcon } from '@/components/Icons'

const trustItems = [
  { icon: <ShieldIcon />, title: 'Safe Checkout', desc: 'Protected payments' },
  { icon: <AwardIcon />, title: 'Gift-Ready Pack', desc: 'Looks premium on arrival' },
  { icon: <ClockIcon />, title: 'Quick Delivery', desc: 'Tracked to your door' },
  { icon: <UsersIcon />, title: 'Easy Returns', desc: '30-day support' },
] as const

export function HomeTrustBar() {
  return (
    <section className="homeTrustBar" aria-label="Store benefits">
      <div className="container">
        <div className="homeTrustBarGrid">
          {trustItems.map((item, index) => (
            <Reveal key={item.title} className="homeTrustBarItem" delay={index * 0.06}>
              <div className="homeTrustBarIcon">{item.icon}</div>
              <div className="homeTrustBarText">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
