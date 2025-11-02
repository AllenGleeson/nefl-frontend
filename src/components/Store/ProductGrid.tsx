"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/types/product"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[]
    search?: string
    category?: string
    sortBy?: string
}

export default function ProductGrid({ products, search = "", category = "All", sortBy = "name" }: Props) {
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8
    const showPaginationThreshold = 8

    // Reset page when search, category, or sortBy changes
    useEffect(() => {
        setCurrentPage(1)
    }, [search, category, sortBy])

    // Filter and sort products
    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            (category === "All" || p.category === category)
    )

    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case "name":
                return a.name.localeCompare(b.name)
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            case "category":
                return a.category.localeCompare(b.category)
            default:
                return 0
        }
    })

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = sorted.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPages = Math.ceil(sorted.length / productsPerPage)

    return (
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            {sorted.length === 0 ? (
                <p className="text-center text-[var(--md-on-surface-variant)] py-8">No products found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {filtered.length > showPaginationThreshold && (
                        <div className="flex justify-center mt-6 sm:mt-8">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[var(--md-on-primary)] bg-[var(--md-primary)] rounded-lg hover:bg-[var(--md-primary-fixed-dim)] disabled:opacity-50 disabled:cursor-default disabled:hover:bg-[var(--md-primary)] transition-all duration-200 flex items-center gap-1 sm:gap-2 cursor-pointer"
                                >
                                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Prev</span>
                                </button>

                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                                                currentPage === i + 1
                                                    ? "bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary)] shadow-sm"
                                                    : "text-[var(--md-on-primary)] bg-[var(--md-primary)] hover:bg-[var(--md-primary-fixed-dim)]"
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[var(--md-on-primary)] bg-[var(--md-primary)] rounded-lg hover:bg-[var(--md-primary-fixed-dim)] disabled:opacity-50 disabled:cursor-default disabled:hover:bg-[var(--md-primary)] transition-all duration-200 flex items-center gap-1 sm:gap-2 cursor-pointer"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}