import Link from 'next/link'

type HomeCtaSectionProps = {
  eyebrow: string
  title: string
  lead: string
  cta: string
  href: string
  variant?: 'light' | 'dark'
}

export function HomeCtaSection({
  eyebrow,
  title,
  lead,
  cta,
  href,
  variant = 'light',
}: HomeCtaSectionProps) {
  return (
    <section className={`uniHomeCta uniHomeCta--${variant}`}>
      <div className="uniContainer uniHomeCtaInner">
        <div>
          <p className="uniHomeCtaEyebrow">{eyebrow}</p>
          <h2 className="uniHomeCtaTitle">{title}</h2>
          <p className="uniHomeCtaLead">{lead}</p>
        </div>
        <Link href={href} className="uniHomeCtaBtn">
          {cta}
        </Link>
      </div>
    </section>
  )
}
