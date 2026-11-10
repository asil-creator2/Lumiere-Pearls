import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../../types/store'

const STORAGE_KEY = 'lumiere-cart'

const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const initialState: CartItem[] = loadCart()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.find(
        (item) =>
          item.productId === action.payload.productId &&
          (item.selectedColor ?? '') === (action.payload.selectedColor ?? '') &&
          (item.personalization ?? '') === (action.payload.personalization ?? ''),
      )

      if (existing) {
        existing.quantity += action.payload.quantity
        return
      }

      state.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.productId !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const item = state.find((cartItem) => cartItem.productId === action.payload.productId)
      if (!item) return

      item.quantity = Math.max(1, action.payload.quantity)
    },
    clearCart: () => [],
  },
})

cartSlice.actions

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export const persistCart = (state: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export default cartSlice.reducer
