import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FloatingNavbar } from '@/components/FloatingNavbar'
import { Footer } from '@/components/Footer'
import { getSectorBySlug } from '@/lib/sectors'

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sector = getSectorBySlug(params.slug)
  if (!sector) notFound()

  return (
    <>
      <FloatingNavbar activePage="home" />
      <main className="sectorPage">
        <section className="sectorHero">
          <img src={sector.img} alt="" className="sectorHeroBg" />
          <div className="uniContainer sectorHeroInner">
            <p className="uniSkillsEyebrow">{sector.tagline}</p>
            <h1>{sector.headline}</h1>
            {sector.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="sectorHeroLead">{p}</p>
            ))}
            <Link href="/products" className="uniHomeCtaBtn">Shop this edit</Link>
          </div>
        </section>
        <section className="sectorDetail">
          <div className="uniContainer">
            <h2>What&apos;s included</h2>
            <ul>
              {sector.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
