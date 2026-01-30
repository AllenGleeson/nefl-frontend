"use client"

import Image from "next/image"
import { useCart } from './CartContext'
import { CartItem as CartItemType } from '@/types/cart'
import { assetUrl } from '@/utils/assetUrl'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={assetUrl(item.product.image)}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {item.product.name}
        </h4>
        <p className="text-sm text-gray-500">
          €{item.product.price.toFixed(2)}
        </p>
        {(item.size || item.color) && (
          <div className="text-xs text-gray-400 mt-1">
            {item.size && <span>Size: {item.size}</span>}
            {item.size && item.color && <span> • </span>}
            {item.color && <span>Color: {item.color}</span>}
          </div>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Item Total */}
      <div className="text-sm font-medium text-gray-900 min-w-0">
        €{(item.product.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove item from cart"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
