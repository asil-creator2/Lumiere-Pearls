export type ProductCategory = 'Pearl Bags' | 'Keychains' | 'Phone Accessories' | 'Pearl Jewelry'

export type ProductVariant = {
  name: string
  value: string
}

export type Product = {
  id: number
  slug: string
  name: string
  price: number
  description: string
  category: ProductCategory
  images: string[]
  featured?: boolean
  isNew?: boolean
  isBestSeller?: boolean
  availability: 'in_stock' | 'low_stock' | 'made_to_order'
  colors: string[]
  variations?: ProductVariant[]
}

export type CartItem = {
  productId: number
  quantity: number
  selectedColor?: string
  personalization?: string
}

export type WishlistItem = {
  productId: number
}
