import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/products/ProductCard'
import { galleryImages, products } from '../data/products'
import bag3 from '../assets/bag3.png'
import keychain2 from '../assets/keychain2.png'
import phoneAccessory3 from '../assets/phoneAccessory3.png'
import letterKeychain2 from '../assets/letterKeychain2.png'

const collectionCards = [
  {
    title: 'Pearl Bags',
    description: 'Soft silhouettes with luminous finishes for daily rituals and special occasions.',
    image: bag3,
  },
  {
    title: 'Keychains & Charms',
    description: 'Precious little keepsakes, designed to travel with you wherever you go.',
    image: keychain2,
  },
  {
    title: 'Phone Accessories',
    description: 'Elegant companions for your essentials, crafted to feel as personal as they look.',
    image: phoneAccessory3,
  },
  {
    title: 'Pearl Jewelry',
    description: 'Luxe textures and warm finishes that bring softness to every outfit.',
    image: letterKeychain2,
  },
]

const typingPhrases = [
  'Handmade with love.',
  'Little treasures, made for you.',
  'Delicate details. Beautiful memories.',
  'Your own little piece of elegance.',
]

const testimonials = [
  '“The craftsmanship feels incredibly personal and luxurious — every pearl looks intentional and beautiful.”',
  '“My custom keychain arrived beautifully boxed, and it felt like a tiny heirloom.”',
  '“Lumière Pearls makes gifting feel special. The details are exquisite and the quality is stunning.”',
]

export function HomePage() {
  const prefersReducedMotion = useReducedMotion()
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPhrase, setCurrentPhrase] = useState(0)

  useEffect(() => {
    const currentWord = typingPhrases[currentPhrase]

    if (prefersReducedMotion) {
      setTypedText(currentWord)
      return undefined
    }

    const timeout = setTimeout(() => {
      const nextText = isDeleting
        ? currentWord.slice(0, typedText.length - 1)
        : currentWord.slice(0, typedText.length + 1)

      setTypedText(nextText)

      if (!isDeleting && nextText === currentWord) {
        const hold = setTimeout(() => setIsDeleting(true), 1400)
        return () => clearTimeout(hold)
      }

      if (isDeleting && nextText === '') {
        setIsDeleting(false)
        setCurrentPhrase((prev) => (prev + 1) % typingPhrases.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, currentPhrase, prefersReducedMotion])

  return (
    <main className="min-h-screen bg-ivory text-espresso">
      <section className="hero-section container mx-auto px-4 md:px-6" id="home">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="eyebrow">Handcrafted pearl accessories</p>
          <h1>
            Little Details,
            <span> Endless Elegance.</span>
          </h1>
          <div className="typing-wrap" aria-live="polite">
            <span className="typing-text">{typedText}</span>
            <span className="cursor" aria-hidden="true" />
          </div>
          <p className="hero-description">
            Discover handmade pearl accessories, thoughtfully created to add a little magic to your everyday moments.
          </p>
          <div className="cta-row">
            <Link className="primary-cta" to="/shop">
              Explore Collection
            </Link>
            <Link className="secondary-cta" to="/custom-orders">
              Create Your Own
            </Link>
          </div>
          <div className="hero-meta">
            <div>
              <strong>500+</strong>
              <span>pieces made</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>client love</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="image-card main-card">
            <img src={keychain2} alt="Pearl handbag and accessories" />
          </div>
          <div className="floating-note floating-note-top">Handmade in small batches</div>
          <div className="floating-note floating-note-bottom">Custom orders available</div>
        </motion.div>
      </section>

      <section className="collections container" id="collections">
        <div className="section-heading">
          <p className="eyebrow">Featured collections</p>
          <h2>Curated favorites for everyday sparkle</h2>
        </div>

        <div className="collection-grid">
          {collectionCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="collection-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <div className="image-wrap">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="card-details">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <Link to="/shop">Explore collection</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="best-sellers container" id="shop">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Best sellers</p>
            <h2>Little treasures, made to be loved</h2>
          </div>
          <Link to="/shop" className="text-link">
            Shop all
          </Link>
        </div>

        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="story-section container" id="our-story">
        <div className="story-image">
          <img src={bag3} alt="Pearl accessories and hand-crafted materials" />
        </div>
        <motion.div
          className="story-copy"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Our story</p>
          <h2>Made by Hand. Made with Heart.</h2>
          <p>
            Each Lumière Pearls piece begins with a slow, thoughtful process: selecting beautiful pearls, shaping elegant forms, and finishing every detail by hand. We believe accessories should feel personal, tactile, and timeless — a little moment of beauty in everyday life.
          </p>
          <p>
            From custom keepsakes to signature pieces designed for gifting, every design is created with care, patience, and an artisan’s eye for detail.
          </p>
          <Link to="/custom-orders" className="primary-cta">
            Start a custom order
          </Link>
        </motion.div>
      </section>

      <section className="custom-order container" id="custom-orders">
        <motion.div
          className="custom-order-copy"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">Custom orders</p>
          <h2>Dream It. We&apos;ll Make It.</h2>
          <p>
            Have a special design in mind? Create a handmade piece that feels completely yours.
          </p>
          <Link to="/custom-orders" className="primary-cta">
            Request a custom piece
          </Link>
        </motion.div>
        <div className="custom-order-panel">
          <div className="mini-card">
            <span>Personalized gift sets</span>
            <strong>From concept to charm</strong>
          </div>
          <div className="mini-card accent">
            <span>Signature materials</span>
            <strong>Freshwater pearls & soft finishes</strong>
          </div>
        </div>
      </section>

      <section className="testimonials container">
        <div className="section-heading center-heading">
          <p className="eyebrow">Client notes</p>
          <h2>Thoughtful pieces, happy stories</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((quote, index) => (
            <motion.blockquote
              key={quote}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {quote}
              <footer>Sample testimonial</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section className="gallery-section container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Instagram</p>
            <h2>@lumierepearls</h2>
          </div>
          <a href="#" className="text-link">
            Follow along
          </a>
        </div>

        <div className="bubble-gallery" aria-label="Lumière Pearls product moodboard">
          {galleryImages.map((image, index) => {
            const bubbleClasses = [
              'bubble-card',
              `bubble-card--${index + 1}`,
            ].join(' ')

            return (
              <motion.div
                key={`${image}-${index}`}
                className={bubbleClasses}
                initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
              >
                <img src={image} alt="Lumière Pearls pearl accessory product styling" />
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="newsletter-section container">
        <div className="newsletter-box">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2>Fresh arrivals, thoughtful gifting ideas.</h2>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button type="submit" className="primary-cta small-cta">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
