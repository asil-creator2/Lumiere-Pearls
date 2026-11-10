import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2'
import { addToCart } from '../../features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice'
import type { RootState } from '../../store/store'
import type { Product } from '../../types/store'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch()
  const wishlist = useSelector((state: RootState) => state.wishlist)
  const isSaved = wishlist.some((item) => item.productId === product.id)

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1, selectedColor: product.colors[0] }))
  }

  const handleWishlistToggle = () => {
    if (isSaved) {
      dispatch(removeFromWishlist(product.id))
      return
    }

    dispatch(addToWishlist({ productId: product.id }))
  }

  return (
    <motion.article className="product-card" layout>
      <div className="product-image-wrap">
        {product.isBestSeller ? <span className="badge">Best Seller</span> : null}
        {product.isNew ? <span className="badge alt">New</span> : null}
        <button
          type="button"
          className={`heart-btn ${isSaved ? 'active' : ''}`}
          aria-label="Toggle wishlist"
          onClick={handleWishlistToggle}
        >
          {isSaved ? <HiHeart /> : <HiOutlineHeart />}
        </button>
        <Link to={`/product/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} />
        </Link>
      </div>
      <div className="product-meta">
        <p>{product.category}</p>
        <Link to={`/product/${product.slug}`} className="product-name-link">
          <h3>{product.name}</h3>
        </Link>
        <div className="price-row">
          <span>${product.price}</span>
          <button type="button" className="add-btn" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </motion.article>
  )
}
