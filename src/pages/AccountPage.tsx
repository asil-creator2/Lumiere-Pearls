export function AccountPage() {
  return (
    <main className="container account-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Your personal space</h1>
        </div>
      </div>

      <div className="account-grid">
        <div className="info-card">
          <h3>Register</h3>
          <p>New customers can create an account to save details and follow custom requests.</p>
        </div>
        <div className="info-card">
          <h3>Login</h3>
          <p>Return to your profile to manage saved favorites and track order updates.</p>
        </div>
        <div className="info-card">
          <h3>Profile</h3>
          <p>Manage your contact details, delivery preferences, and personal gifting profile.</p>
        </div>
        <div className="info-card">
          <h3>My orders</h3>
          <p>Review order history, shipping status, and custom-order approvals.</p>
        </div>
      </div>
    </main>
  )
}
