import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  street: z.string().min(5, 'Street is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  shippingMethod: z.string().min(1, 'Select shipping method'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (_data: CheckoutForm) => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    alert('Order placed successfully. Payment is a frontend placeholder and not connected to a live provider.')
  }

  return (
    <main className="container checkout-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Checkout</p>
          <h1>Complete your order</h1>
        </div>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit(onSubmit)}>
        <section className="checkout-form-panel">
          <div className="form-card">
            <h2>Customer information</h2>
            <div className="field-grid two-col">
              <label>
                <span>First name</span>
                <input {...register('firstName')} />
                {errors.firstName ? <small>{errors.firstName.message}</small> : null}
              </label>
              <label>
                <span>Last name</span>
                <input {...register('lastName')} />
                {errors.lastName ? <small>{errors.lastName.message}</small> : null}
              </label>
            </div>

            <label>
              <span>Email</span>
              <input type="email" {...register('email')} />
              {errors.email ? <small>{errors.email.message}</small> : null}
            </label>
          </div>

          <div className="form-card">
            <h2>Delivery address</h2>
            <label>
              <span>Street address</span>
              <input {...register('street')} />
              {errors.street ? <small>{errors.street.message}</small> : null}
            </label>
            <div className="field-grid three-col">
              <label>
                <span>City</span>
                <input {...register('city')} />
                {errors.city ? <small>{errors.city.message}</small> : null}
              </label>
              <label>
                <span>State</span>
                <input {...register('state')} />
                {errors.state ? <small>{errors.state.message}</small> : null}
              </label>
              <label>
                <span>Postal code</span>
                <input {...register('postalCode')} />
                {errors.postalCode ? <small>{errors.postalCode.message}</small> : null}
              </label>
            </div>
          </div>

          <div className="form-card">
            <h2>Shipping</h2>
            <label>
              <span>Shipping method</span>
              <select {...register('shippingMethod')}>
                <option value="">Choose a shipping method</option>
                <option value="standard">Standard shipping</option>
                <option value="express">Express shipping</option>
              </select>
              {errors.shippingMethod ? <small>{errors.shippingMethod.message}</small> : null}
            </label>
            <div className="payment-note">
              Payment integration is a frontend placeholder only; card information is not stored or processed here.
            </div>
          </div>
        </section>

        <aside className="summary-panel">
          <h2>Order summary</h2>
          <div className="summary-row"><span>Subtotal</span><span>$168</span></div>
          <div className="summary-row"><span>Shipping</span><span>Free</span></div>
          <div className="summary-row total-row"><span>Total</span><span>$168</span></div>
          <button type="submit" className="primary-cta full-width" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </button>
        </aside>
      </form>
    </main>
  )
}
