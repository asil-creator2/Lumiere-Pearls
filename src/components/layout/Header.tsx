import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiMagnifyingGlass, HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi2'
import type { RootState } from '../../store/store'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Custom Orders', to: '/custom-orders' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Account', to: '/account' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const cartCount = useSelector((state: RootState) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  )

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav">
        <Link to="/" className="brand-block" aria-label="Lumière Pearls home">
          <div className="brand-mark">L</div>
          <div>
            <span className="brand-name">Lumière Pearls</span>
            <span className="brand-tag">Little treasures</span>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="icon-button" aria-label="Search">
            <HiMagnifyingGlass />
          </button>
          <Link to="/wishlist" className="icon-button" aria-label="Wishlist">
            <HiOutlineHeart />
          </Link>
          <Link to="/cart" className="cart-button" aria-label="Shopping bag">
            <HiOutlineShoppingBag />
            <span>{cartCount}</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
