"use client"

import { useCart } from './CartContext'

interface CartSummaryProps {
  onCheckout?: () => void
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
  const { cart, clearCart } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some items to get started!</p>
      </div>
    )
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-4">
      {/* Summary */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({cart.totalItems})</span>
          <span className="font-medium">€{cart.totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {cart.totalPrice > 50 ? 'Free' : '€5.99'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">
            €{(cart.totalPrice * 0.08).toFixed(2)}
          </span>
        </div>
        <div className="border-t border-gray-300 pt-2">
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>
              €{(cart.totalPrice + (cart.totalPrice > 50 ? 0 : 5.99) + (cart.totalPrice * 0.08)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onCheckout}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={clearCart}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}
