import { useMemo, useState } from 'react'
import { ProductCard } from '../components/products/ProductCard'
import { products } from '../data/products'

const categories = ['All', 'Pearl Bags', 'Keychains', 'Phone Accessories', 'Pearl Jewelry']

export function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyBestSellers, setShowOnlyBestSellers] = useState(false)
  const [maxPrice, setMaxPrice] = useState(200)

  const filteredProducts = useMemo(() => {
    let results = [...products]

    if (category !== 'All') {
      results = results.filter((product) => product.category === category)
    }

    if (search.trim()) {
      const value = search.toLowerCase()
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(value) ||
          product.description.toLowerCase().includes(value),
      )
    }

    if (maxPrice) {
      results = results.filter((product) => product.price <= maxPrice)
    }

    if (showOnlyNew) {
      results = results.filter((product) => product.isNew)
    }

    if (showOnlyBestSellers) {
      results = results.filter((product) => product.isBestSeller)
    }

    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'newest') {
      results.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    }

    if (sortBy === 'featured') {
      results.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
    }

    return results
  }, [category, maxPrice, search, showOnlyBestSellers, showOnlyNew, sortBy])

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setSortBy('featured')
    setShowOnlyNew(false)
    setShowOnlyBestSellers(false)
    setMaxPrice(200)
  }

  return (
    <main className="container shop-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>Handmade pearl treasures</h1>
        </div>
        <span className="result-count">{filteredProducts.length} items</span>
      </div>

      <div className="shop-layout">
        <aside className="filters-panel">
          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
            />
          </div>

          <div className="filter-group">
            <label>Category</label>
            <div className="chip-list">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? 'chip active' : 'chip'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="priceRange">Max price: ${maxPrice}</label>
            <input
              id="priceRange"
              type="range"
              min="20"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </div>

          <div className="filter-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={showOnlyNew}
                onChange={() => setShowOnlyNew((value) => !value)}
              />
              New arrivals
            </label>
            <label>
              <input
                type="checkbox"
                checked={showOnlyBestSellers}
                onChange={() => setShowOnlyBestSellers((value) => !value)}
              />
              Best sellers
            </label>
          </div>

          <div className="filter-group">
            <label htmlFor="sortBy">Sort by</label>
            <select id="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <button type="button" className="secondary-cta full-width" onClick={clearFilters}>
            Clear filters
          </button>
        </aside>

        <section className="shop-results">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h2>No products match your filters.</h2>
              <p>Try a different search or clear your filters.</p>
            </div>
          ) : (
            <div className="product-grid shop-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
