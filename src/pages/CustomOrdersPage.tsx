import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const customOrderSchema = z.object({
  customerName: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  productType: z.string().min(1, 'Please select a product type'),
  colorPreferences: z.string().min(2, 'Add your preferred colors'),
  pearlStyle: z.string().min(1, 'Select a pearl style'),
  initials: z.string().optional(),
  personalization: z.string().optional(),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
  referenceImage: z.any().optional(),
})

type CustomOrderForm = z.infer<typeof customOrderSchema>

export function CustomOrdersPage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomOrderForm>({
    resolver: zodResolver(customOrderSchema),
  })

  const onSubmit = async (_data: CustomOrderForm) => {
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSubmitted(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert('Reference image must be under 2MB.')
      return
    }

    const nextUrl = URL.createObjectURL(file)
    setPreview(nextUrl)
    setValue('referenceImage', file)
  }

  if (submitted) {
    return (
      <main className="container empty-state page-empty">
        <h1>Your custom request is ready.</h1>
        <p>Our atelier will review your brief and contact you before confirming the order.</p>
        <button type="button" className="primary-cta" onClick={() => setSubmitted(false)}>
          Create another request
        </button>
      </main>
    )
  }

  return (
    <main className="container custom-order-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Custom orders</p>
          <h1>Design your own little treasure</h1>
        </div>
      </div>

      <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field-grid two-col">
          <label>
            <span>Customer name</span>
            <input {...register('customerName')} />
            {errors.customerName ? <small>{errors.customerName.message}</small> : null}
          </label>
          <label>
            <span>Email</span>
            <input type="email" {...register('email')} />
            {errors.email ? <small>{errors.email.message}</small> : null}
          </label>
        </div>

        <div className="field-grid two-col">
          <label>
            <span>Product type</span>
            <select {...register('productType')}>
              <option value="">Select a product</option>
              <option value="bag">Pearl bag</option>
              <option value="keychain">Keychain</option>
              <option value="bracelet">Bracelet</option>
              <option value="gift-set">Gift set</option>
            </select>
            {errors.productType ? <small>{errors.productType.message}</small> : null}
          </label>
          <label>
            <span>Pearl style</span>
            <select {...register('pearlStyle')}>
              <option value="">Select a style</option>
              <option value="classic">Classic</option>
              <option value="rosy">Rosy</option>
              <option value="champagne">Champagne</option>
              <option value="ivory">Ivory</option>
            </select>
            {errors.pearlStyle ? <small>{errors.pearlStyle.message}</small> : null}
          </label>
        </div>

        <div className="field-grid two-col">
          <label>
            <span>Preferred colors</span>
            <input {...register('colorPreferences')} />
            {errors.colorPreferences ? <small>{errors.colorPreferences.message}</small> : null}
          </label>
          <label>
            <span>Initials</span>
            <input {...register('initials')} placeholder="Optional" />
          </label>
        </div>

        <label>
          <span>Personalization details</span>
          <textarea {...register('personalization')} rows={4} placeholder="Describe the look, names, or symbols you would like included." />
        </label>

        <label>
          <span>Reference image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview ? <img src={preview} alt="Reference preview" className="reference-preview" /> : null}
        </label>

        <label>
          <span>Additional notes</span>
          <textarea {...register('notes')} rows={4} placeholder="Share any meaningful details, gifting context, or timeline expectations." />
          {errors.notes ? <small>{errors.notes.message}</small> : null}
        </label>

        <div className="custom-order-note">
          Custom requests are reviewed and approved before they become confirmed orders.
        </div>

        <button type="submit" className="primary-cta" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit custom request'}
        </button>
      </form>
    </main>
  )
}
