export function AdminPage() {
  return (
    <main className="container admin-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Atelier dashboard</h1>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total orders</span>
          <strong>148</strong>
        </div>
        <div className="stat-card">
          <span>Custom requests</span>
          <strong>23</strong>
        </div>
        <div className="stat-card">
          <span>Low stock items</span>
          <strong>5</strong>
        </div>
        <div className="stat-card">
          <span>Pending approvals</span>
          <strong>8</strong>
        </div>
      </div>

      <div className="admin-grid">
        <div className="info-card">
          <h3>Product management</h3>
          <p>Create, edit, and archive pearl accessories with stock and image updates.</p>
        </div>
        <div className="info-card">
          <h3>Orders</h3>
          <p>View orders, update shipping states, and review fulfillment details.</p>
        </div>
        <div className="info-card">
          <h3>Custom requests</h3>
          <p>Accept, decline, or request edits before a custom piece is confirmed.</p>
        </div>
      </div>
    </main>
  )
}
