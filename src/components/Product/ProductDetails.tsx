"use client"

import Image from "next/image"
import { Product as ProductType } from "@/types/product"

type Props = {
  product: ProductType
}

export default function ProductDetails({ product }: Props) {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Product Image */}
      <div className="relative w-full lg:w-1/2 h-80 sm:h-96 md:h-[28rem] lg:h-[40rem] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight text-[var(--md-on-surface)]">{product.name}</h1>
          
          {/* Rating placeholder */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4 text-yellow-500">
            <div className="flex text-sm sm:text-base">
              ⭐⭐⭐⭐☆
            </div>
            <span className="text-[var(--md-on-surface-variant)] text-xs sm:text-sm">(24 reviews)</span>
          </div>

          <p className="text-[var(--md-primary)] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4">
            €{product.price.toFixed(2)}
          </p>

          {product.category && (
            <div className="mb-3 sm:mb-4 md:mb-6">
              <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] bg-[var(--md-surface-container-low)] px-2 sm:px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Short summary */}
        <p className="text-[var(--md-on-surface)] leading-relaxed text-sm sm:text-base">
          This is a short description of the product. Highlight key features,
          quality, or unique selling points here so customers understand why
          it's worth buying.
        </p>

        {/* Stock info */}
        <div className="inline-block">
          <span className="text-[var(--md-tertiary)] font-medium text-sm sm:text-base bg-[var(--md-tertiary-container)] px-3 py-1 rounded-full">
            In Stock
          </span>
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="text-xs sm:text-sm font-medium text-[var(--md-on-surface)]">Qty:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              defaultValue="1"
              disabled
              className="w-16 sm:w-20 border border-[var(--md-outline)] rounded-lg px-2 py-2 text-center text-sm sm:text-base text-[var(--md-on-surface)] bg-[var(--md-surface)] focus:ring-2 focus:ring-[var(--md-primary)] focus:border-[var(--md-primary)] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--md-surface-container-low)]"
            />
          </div>
          <button 
            disabled
            className="bg-[var(--md-primary)] text-[var(--md-on-primary)] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[var(--md-primary-fixed-dim)] transition-colors font-medium text-xs sm:text-sm md:text-base flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--md-primary)] border border-[var(--md-primary)] shadow-sm"
          >
            Add to Cart
          </button>
        </div>

        {/* Extra info */}
        <div className="pt-3 sm:pt-4 text-xs sm:text-sm text-[var(--md-on-surface-variant)] space-y-1.5 sm:space-y-2">
          <p className="flex items-center gap-2">
            <span>✅</span>
            <span>Free shipping on orders over €50</span>
          </p>
          <p className="flex items-center gap-2">
            <span>✅</span>
            <span>30-day return policy</span>
          </p>
        </div>
      </div>
    </div>
  )
}