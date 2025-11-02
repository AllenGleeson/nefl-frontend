"use client"

import ProductDetails from "./ProductDetails"
import { Product as ProductType } from "@/types/product"
import RelatedProducts from "./RelatedProducts"

type Props = {
    product: ProductType
    products: ProductType[]
}

export default function ProductIndex({ product, products }: Props) {
    return (
        <div className="product-page w-full sm:container sm:mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 bg-[var(--md-surface)] min-h-screen">
            <ProductDetails product={product} />
            <RelatedProducts products={products} currentProduct={product} />
        </div>
    )
}