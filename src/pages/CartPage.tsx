import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice'
import type { RootState } from '../store/store'

export function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart)

  const cartItems = cart.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId)
    return product ? [{ ...item, product }] : []
  })

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 150 ? 0 : cartItems.length > 0 ? 12 : 0
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <main className="container empty-state page-empty">
        <h1>Your shopping bag is empty.</h1>
        <p>Browse our handcrafted pieces and add something special.</p>
        <Link to="/shop" className="primary-cta">
          Continue shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="container cart-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>Your bag</h1>
        </div>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article key={`${item.product.id}-${item.selectedColor ?? 'default'}`} className="cart-item">
              <Link to={`/product/${item.product.slug}`}>
                <img src={item.product.images[0]} alt={item.product.name} />
              </Link>
              <div className="cart-item-copy">
                <div>
                  <h3>{item.product.name}</h3>
                  <p>{item.product.category}</p>
                  {item.selectedColor ? <span>{item.selectedColor}</span> : null}
                </div>
                <div className="cart-tools">
                  <div className="quantity-picker compact-picker">
                    <button
                      type="button"
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity - 1 }))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity + 1 }))}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="text-link small-text" onClick={() => dispatch(removeFromCart(item.product.id))}>
                    Remove
                  </button>
                </div>
              </div>
              <strong>${item.product.price * item.quantity}</strong>
            </article>
          ))}
        </section>

        <aside className="summary-panel">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Link to="/checkout" className="primary-cta full-width center-cta">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="secondary-cta full-width center-cta">
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}
