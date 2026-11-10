import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addToCart } from '../features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice'
import { getProductBySlug } from '../data/products'
import { ProductCard } from '../components/products/ProductCard'
import { products } from '../data/products'
import type { RootState } from '../store/store'

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug ?? '')
  const dispatch = useDispatch()
  const wishlist = useSelector((state: RootState) => state.wishlist)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const isSaved = product ? wishlist.some((item) => item.productId === product.id) : false

  const relatedProducts = useMemo(
    () => products.filter((item) => item.id !== product?.id).slice(0, 3),
    [product?.id],
  )

  if (!product) {
    return (
      <main className="container empty-state page-empty">
        <h1>Product not found</h1>
        <Link to="/shop" className="primary-cta">
          Back to shop
        </Link>
      </main>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity, selectedColor }))
  }

  const handleWishlistToggle = () => {
    if (isSaved) {
      dispatch(removeFromWishlist(product.id))
      return
    }

    dispatch(addToWishlist({ productId: product.id }))
  }

  return (
    <main className="container product-detail-page">
      <div className="product-detail-grid">
        <div className="gallery-panel">
          <div className="main-image-panel">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="thumb-row">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={selectedImage === index ? 'thumb active' : 'thumb'}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price-tag">${product.price}</p>
          <p className="product-description">{product.description}</p>

          <div className="detail-section">
            <label>Color</label>
            <div className="chip-list small-chips">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={selectedColor === color ? 'chip active' : 'chip'}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {product.variations ? (
            <div className="detail-section">
              <label>{product.variations[0]?.name}</label>
              <div className="chip-list small-chips">
                {product.variations.map((variation) => (
                  <button key={`${variation.name}-${variation.value}`} type="button" className="chip">
                    {variation.value}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="detail-section quantity-row">
            <label>Quantity</label>
            <div className="quantity-picker">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="buy-actions">
            <button type="button" className="primary-cta" onClick={handleAddToCart}>
              Add to cart
            </button>
            <button type="button" className="secondary-cta" onClick={handleWishlistToggle}>
              {isSaved ? 'Saved to wishlist' : 'Add to wishlist'}
            </button>
          </div>

          <div className="availability-row">
            <span className={`status-pill ${product.availability}`}>
              {product.availability === 'in_stock'
                ? 'In stock'
                : product.availability === 'low_stock'
                  ? 'Low stock'
                  : 'Made to order'}
            </span>
            <span>Handmade with care</span>
          </div>
        </div>
      </div>

      <div className="detail-info-blocks">
        <div className="info-card">
          <h3>Product information</h3>
          <p>
            Each piece is individually crafted with premium freshwater pearls and soft, elegant finishes for refined everyday luxury.
          </p>
        </div>
        <div className="info-card">
          <h3>Handmade details</h3>
          <p>
            Designed in small runs and finished by hand to preserve the natural beauty, subtle glow, and thoughtful details of every pearl.
          </p>
        </div>
      </div>

      <section className="related-products">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">You may also like</p>
            <h2>Related pieces</h2>
          </div>
        </div>
        <div className="product-grid shop-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  )
}
