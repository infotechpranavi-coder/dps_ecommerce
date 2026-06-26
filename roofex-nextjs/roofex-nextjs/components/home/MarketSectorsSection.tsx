'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { sectorsSection } from '@/lib/content'
import { jewelleryCollections } from '@/lib/jewellery-collections'

export function MarketSectorsSection() {
  const slides = [...jewelleryCollections, ...jewelleryCollections]

  return (
    <section className="uniSectors" id="sectors">
      <div className="uniContainer">
        <ScrollReveal as="header" className="uniSectorsTitleWrap">
          <p className="uniSectorsEyebrow">Collections</p>
          <h2 className="uniSectorsTitle">{sectorsSection.title}</h2>
          <p className="uniSectorsTagline">{sectorsSection.tagline}</p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="uniSectorsMarqueeWrap" delay={0.12} direction="up">
        <div aria-label="Jewellery collections">
          <div className="uniSectorsMarqueeViewport">
            <div className="uniSectorsMarqueeTrack">
              {slides.map((collection, index) => (
                <Link
                  key={`${collection.slug}-${index}`}
                  href={`/products?category=${collection.slug}`}
                  className="uniSectorsSlide"
                >
                  <div className="uniSectorsSlideMedia">
                    <img
                      src={collection.img}
                      alt={collection.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = collection.img
                      }}
                    />
                  </div>
                  <div className="uniSectorsSlideBody">
                    <h3>{collection.name}</h3>
                    <p className="uniSectorsSlideTagline">{collection.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
