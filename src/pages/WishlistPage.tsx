import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../features/cart/cartSlice'
import { removeFromWishlist } from '../features/wishlist/wishlistSlice'
import { products } from '../data/products'
import type { RootState } from '../store/store'

export function WishlistPage() {
  const dispatch = useDispatch()
  const wishlist = useSelector((state: RootState) => state.wishlist)
  const savedProducts = products.filter((product) => wishlist.some((item) => item.productId === product.id))

  const moveToCart = (productId: number) => {
    dispatch(addToCart({ productId, quantity: 1 }))
    dispatch(removeFromWishlist(productId))
  }

  if (savedProducts.length === 0) {
    return (
      <main className="container empty-state page-empty">
        <h1>Your wishlist is empty.</h1>
        <p>Save a few favorites and come back anytime.</p>
        <Link to="/shop" className="primary-cta">
          Explore the shop
        </Link>
      </main>
    )
  }

  return (
    <main className="container wishlist-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Wishlist</p>
          <h1>Saved favorites</h1>
        </div>
      </div>

      <div className="wishlist-grid">
        {savedProducts.map((product) => (
          <article key={product.id} className="wishlist-item">
            <Link to={`/product/${product.slug}`}>
              <img src={product.images[0]} alt={product.name} />
            </Link>
            <div className="wishlist-copy">
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <strong>${product.price}</strong>
              <div className="wishlist-actions">
                <button type="button" className="primary-cta small-cta" onClick={() => moveToCart(product.id)}>
                  Move to cart
                </button>
                <button type="button" className="secondary-cta small-cta" onClick={() => dispatch(removeFromWishlist(product.id))}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
