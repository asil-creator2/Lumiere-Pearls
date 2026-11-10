import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WishlistItem } from '../../types/store'

const STORAGE_KEY = 'lumiere-wishlist'

const loadWishlist = (): WishlistItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const initialState: WishlistItem[] = loadWishlist()

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      if (!state.some((item) => item.productId === action.payload.productId)) {
        state.push(action.payload)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.productId !== action.payload)
    },
    clearWishlist: () => [],
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions

export const persistWishlist = (state: WishlistItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export default wishlistSlice.reducer
