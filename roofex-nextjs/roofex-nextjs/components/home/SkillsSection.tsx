'use client'

import type { MouseEvent } from 'react'
import { KvsSkillsBrandMark } from '@/components/KvsSkillsBrandMark'
import { ScrollReveal } from '@/components/ScrollReveal'
import { FeatureIcon } from '@/components/UniIcons'
import { aboutUsHome } from '@/lib/content'

function setRippleOrigin(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--ripple-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--ripple-y', `${e.clientY - rect.top}px`)
}

export function SkillsSection() {
  return (
    <section className="uniSkills" id="about">
      <KvsSkillsBrandMark />
      <div className="uniContainer uniSkillsInner">
        <div className="uniAboutSplit">
          <ScrollReveal className="uniAboutIntro" direction="left" bounce>
            <h2 className="uniSkillsTitle">
              <span className="uniSkillsTitleAccent">{aboutUsHome.tagline}</span>{' '}
              {aboutUsHome.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal className="uniSkillsText" direction="right" delay={0.1} bounce>
            {aboutUsHome.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </ScrollReveal>
        </div>

        <div className="uniAboutFeatures">
          <div className="uniFeatures">
            {aboutUsHome.features.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                className="uniFeatureReveal"
                delay={0.08 + index * 0.08}
                direction="up"
                bounce
              >
                <article
                  className="uniFeature"
                  onPointerEnter={setRippleOrigin}
                  onPointerMove={setRippleOrigin}
                >
                  <span className="uniFeatureRipple" aria-hidden />
                  <div className="uniFeatureInner">
                    <FeatureIcon title={feature.title} />
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
