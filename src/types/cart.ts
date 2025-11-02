import { Product } from './product'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number, options?: { size?: string; color?: string }) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  toggleCart: () => void
  closeCart: () => void
}
