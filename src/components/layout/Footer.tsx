import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <span className="brand-name">Lumière Pearls</span>
          <p>Little treasures, handmade with love.</p>
        </div>

        <div className="footer-links">
          <Link to="/shop">Shop</Link>
          <Link to="/custom-orders">Custom Orders</Link>
          <Link to="/account">Account</Link>
          <Link to="/admin">Admin</Link>
        </div>

        <div className="footer-contact">
          <p>hello@lumierepearls.com</p>
          <p>+1 (555) 487-2118</p>
        </div>
      </div>
    </footer>
  )
}
