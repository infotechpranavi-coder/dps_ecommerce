import { KvsSkillsBrandMark } from '@/components/KvsSkillsBrandMark'
import { ScrollReveal } from '@/components/ScrollReveal'
import { FeatureIcon } from '@/components/UniIcons'
import { aboutUsHome } from '@/lib/content'

export function SkillsSection() {
  return (
    <section className="uniSkills" id="about">
      <KvsSkillsBrandMark />
      <div className="uniContainer uniSkillsInner">
        <div className="uniAboutSplit">
          <ScrollReveal className="uniAboutIntro" direction="left">
            <p className="uniSkillsEyebrow">{aboutUsHome.eyebrow}</p>
            <h2 className="uniSkillsTitle">
              {aboutUsHome.tagline} {aboutUsHome.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal className="uniSkillsText" direction="right" delay={0.1}>
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
                className="uniFeature"
                delay={index * 0.08}
                direction="up"
              >
                <FeatureIcon title={feature.title} />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
