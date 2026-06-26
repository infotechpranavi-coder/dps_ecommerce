import { Reveal } from '@/components/Reveal'

type TextReview = {
  type: 'text'
  placement: 'a1' | 'a2' | 'b2'
  name: string
  role: string
  text: string
  avatar: string
  brand: { name: string; color: string; letter: string }
}

type ImageReview = {
  type: 'image'
  placement: 'a3' | 'b1'
  name: string
  role: string
  image: string
}

const reviews: Array<TextReview | ImageReview> = [
  {
    type: 'text',
    placement: 'a1',
    name: 'Sarah Thompson',
    role: 'Verified Buyer',
    text: 'Beautiful finish, strong packaging, and the set looks premium in my home.',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    brand: { name: 'Netdot', color: '#22c55e', letter: 'N' },
  },
  {
    type: 'text',
    placement: 'a2',
    name: 'Michael Johnson',
    role: 'Verified Buyer',
    text: 'Elegant, useful, and exactly like the photos. Delivery was smooth too.',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    brand: { name: 'Pulse', color: '#3b82f6', letter: 'P' },
  },
  {
    type: 'image',
    placement: 'a3',
    name: 'Robert Wilson',
    role: 'Repeat Customer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
  },
  {
    type: 'image',
    placement: 'b1',
    name: 'James Anderson',
    role: 'Verified Buyer',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    type: 'text',
    placement: 'b2',
    name: 'Emily Parker',
    role: 'Verified Buyer',
    text: 'A gift-ready box with products that felt carefully selected.',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    brand: { name: 'ZenZap', color: '#8b5cf6', letter: 'Z' },
  },
]

function TextCard({ review }: { review: TextReview }) {
  return (
    <article className="clientSayCard clientSayCard--text">
      <div className="clientSayCardHead">
        <img src={review.avatar} alt={review.name} />
        <div>
          <strong>{review.name}</strong>
          <span>{review.role}</span>
        </div>
      </div>
      <p className="clientSayQuote">&ldquo;{review.text}&rdquo;</p>
      <div className="clientSayCardFoot">
        <div className="clientSayStars" aria-label="5 out of 5 stars">
          ★★★★★
        </div>
        <div className="clientSayBrand">
          <span
            className="clientSayBrandIcon"
            style={{ background: review.brand.color }}
            aria-hidden
          >
            {review.brand.letter}
          </span>
          {review.brand.name}
        </div>
      </div>
    </article>
  )
}

function ImageCard({ review }: { review: ImageReview }) {
  return (
    <article className="clientSayCard clientSayCard--image">
      <img src={review.image} alt={review.name} />
      <div className="clientSayImageOverlay">
        <div className="clientSayImageMeta">
          <strong>{review.name}</strong>
          <span>{review.role}</span>
        </div>
        <span className="clientSayPlay" aria-hidden>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </article>
  )
}

export function ClientSaySection() {
  return (
    <section className="clientSaySection" id="reviews">
      <div className="container">
        <Reveal className="clientSayHeader">
          <p className="clientSayEyebrow">Customer Love</p>
          <h2 className="clientSayTitle">Real Words From Real Shoppers</h2>
          <p className="clientSayTagline">
            Quick proof that the products look good, feel good, and arrive the way customers expect.
          </p>
        </Reveal>
        <div className="clientSayGrid">
          {reviews.map((review, index) => (
            <Reveal
              key={`${review.placement}-${review.name}`}
              className={`clientSayGridItem clientSayGridItem--${review.placement}`}
              delay={index * 0.06}
            >
              {review.type === 'text' ? (
                <TextCard review={review} />
              ) : (
                <ImageCard review={review} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
