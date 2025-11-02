"use client"

import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types/product"

type Props = {
    products: Product[]
    currentProduct: Product
}

export default function RelatedProducts({ products, currentProduct }: Props) {
    // get related by same category, but exclude current product
    const related = products
        .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4) // limit to 4 items

    if (related.length === 0) return null

    return (
        <div className="mt-6 sm:mt-8 md:mt-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0 text-[var(--md-on-surface)]">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {related.map((product) => (
                    <Link
                        key={product.id}
                        href={`/store/product/${product.slug}`}
                        className="block flex flex-col group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-3 sm:p-4 space-y-2">
                            <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2 mb-1 sm:mb-2 text-[var(--md-on-surface)] leading-tight">{product.name}</h3>
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-[var(--md-primary)] font-bold text-sm sm:text-base md:text-lg">
                                    €{product.price.toFixed(2)}
                                </p>
                                {product.category && (
                                    <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)] bg-[var(--md-surface-container-low)] px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap">{product.category}</span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}