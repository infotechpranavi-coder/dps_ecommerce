import { Reveal } from '@/components/Reveal'
import { CheckIcon, MailIcon } from '@/components/Icons'

const bookingPerks = [
  'Early access to private launches',
  'VIP-only product drops',
  'Exclusive offers and gifting edits',
]

type VipAccessSectionProps = {
  id?: string
  className?: string
}

export function VipAccessSection({ id = 'vip', className = '' }: VipAccessSectionProps) {
  return (
    <section className={`section vipAccessSection${className ? ` ${className}` : ''}`} id={id}>
      <div className="container">
        <Reveal className="bookingCard newsletterCard">
          <div className="bookingLeft">
            <div className="eyebrow">VIP Access</div>
            <h2 className="sectionTitle">Get First Access to the Best Drops</h2>
            <p className="homeSectionLead">
              Join for early access to new collections, limited releases, gift edits, and members-only offers.
            </p>
            <div className="bookingPerks">
              {bookingPerks.map((perk) => (
                <div key={perk} className="bookingPerk">
                  <CheckIcon />
                  {perk}
                </div>
              ))}
            </div>
            <div className="bookingContact">
              <div className="contactIcon">
                <MailIcon />
              </div>
              <div>
                <small>Members receive</small>
                <strong>New drops before everyone else</strong>
              </div>
            </div>
          </div>
          <form className="bookingForm" onSubmit={(e) => e.preventDefault()}>
            <div className="formGroup">
              <label htmlFor="vip-name">Full Name</label>
              <input id="vip-name" type="text" placeholder="Avery Stone" required />
            </div>
            <div className="formGroup">
              <label htmlFor="vip-email">Email Address</label>
              <input id="vip-email" type="email" placeholder="avery@email.com" required />
            </div>
            <div className="formGroup">
              <label htmlFor="vip-interest">Shopping Interest</label>
              <select id="vip-interest" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option>Home Collection</option>
                <option>Style Essentials</option>
                <option>Gifting</option>
                <option>New Arrivals</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="vip-frequency">Launch Preference</label>
              <select id="vip-frequency" defaultValue="weekly">
                <option value="weekly">Weekly edit</option>
                <option value="monthly">Monthly digest</option>
                <option value="vip">VIP-only drops</option>
              </select>
            </div>
            <div className="formGroup formGroupFull">
              <label htmlFor="vip-note">What are you shopping for?</label>
              <input id="vip-note" type="text" placeholder="Home refresh, gifting, travel, wardrobe essentials" />
            </div>
            <button type="submit" className="btnSubmit">Join VIP List</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
