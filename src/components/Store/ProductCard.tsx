"use client"

import { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import { assetUrl } from "@/utils/assetUrl"

type Props = {
    product: Product
}

function ProductCard({ product }: Props) {
    return (
        <Link 
            href={`/store/product/${product.slug}`}
            className="block flex flex-col group cursor-pointer bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] overflow-hidden hover:shadow-lg transition-all duration-300"
        >
            {/* Product Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
                <Image
                    src={assetUrl(product.image)}
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <h3 className="text-sm sm:text-base md:text-xl font-bold mb-1 sm:mb-2 text-[var(--md-on-surface)] leading-tight line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between gap-2">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--md-on-surface)]">€{product.price.toFixed(2)}</p>
                    {product.category && (
                        <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] bg-[var(--md-surface-container-low)] px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap">{product.category}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default memo(ProductCard)