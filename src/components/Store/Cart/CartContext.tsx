"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Cart, CartItem, CartContextType } from '@/types/cart'
import { Product } from '@/types/product'

// Cart Actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; options?: { size?: string; color?: string } } }
  | { type: 'REMOVE_FROM_CART'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }

// Initial state
const initialState = {
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  } as Cart,
  isOpen: false,
}

// Cart reducer
function cartReducer(state: typeof initialState, action: CartAction) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, options } = action.payload
      const existingItemIndex = state.cart.items.findIndex(
        item => item.product.id === product.id && 
        item.size === options?.size && 
        item.color === options?.color
      )

      let newItems: CartItem[]
      if (existingItemIndex > -1) {
        newItems = state.cart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          size: options?.size,
          color: options?.color,
        }
        newItems = [...state.cart.items, newItem]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

      return {
        ...state,
        cart: {
          items: newItems,
          totalItems,
          totalPrice,
        },
      }
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.cart.items.filter(item => item.id !== action.payload.itemId)
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

      return {
        ...state,
        cart: {
          items: newItems,
          totalItems,
          totalPrice,
        },
      }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { itemId } })
      }

      const newItems = state.cart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

      return {
        ...state,
        cart: {
          items: newItems,
          totalItems,
          totalPrice,
        },
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0,
        },
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      }

    default:
      return state
  }
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nefl-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        if (parsedCart.items && Array.isArray(parsedCart.items)) {
          dispatch({
            type: 'ADD_TO_CART',
            payload: { product: parsedCart.items[0]?.product || {}, quantity: 0 }
          })
          // Clear the dummy item and restore actual items
          dispatch({ type: 'CLEAR_CART' })
          parsedCart.items.forEach((item: CartItem) => {
            dispatch({
              type: 'ADD_TO_CART',
              payload: {
                product: item.product,
                quantity: item.quantity,
                options: { size: item.size, color: item.color }
              }
            })
          })
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nefl-cart', JSON.stringify(state.cart))
  }, [state.cart])

  const addToCart = (product: Product, quantity = 1, options?: { size?: string; color?: string }) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, options } })
  }

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  const value: CartContextType = {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isOpen: state.isOpen,
    toggleCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
