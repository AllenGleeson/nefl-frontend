"use client"

import { useState } from "react"
import { ShoppingCart, ChevronDown } from "lucide-react"
import SearchBar from "./SearchBar"

type Props = {
    setSearch?: (q: string) => void   // ✅ optional
    setCategory?: (category: string) => void // ✅ optional
    categories?: string[]             // ✅ optional
    showSearch?: boolean              // ✅ optional
    sortBy?: string                   // ✅ optional
    setSortBy?: (sort: string) => void // ✅ optional
}

export default function StoreHeader({
    setSearch,
    setCategory,
    categories,
    showSearch = true,
    sortBy = "name",
    setSortBy,
}: Props) {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!setCategory) return
        const value = e.target.value
        setSelectedCategory(value)
        setCategory(value)
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!setSortBy) return
        setSortBy(e.target.value)
    }

    return (
        <div className="py-4 sm:py-6 relative">
            <div className="container mx-auto px-2 sm:px-4">
                {/* Mobile Layout */}
                <div className="sm:hidden">
                    {/* NEFL Store text - top left on mobile */}
                    <div className="absolute top-4 left-2">
                        <h1 className="text-lg sm:text-xl font-bold text-[var(--md-on-surface)]">NEFL Store</h1>
                    </div>

                    {/* Cart icon - top right on mobile */}
                    <div className="absolute top-4 right-2 flex-shrink-0">
                        <button 
                            className="group relative p-2 text-[var(--md-on-primary)] hover:opacity-80 transition-all duration-200 cursor-not-allowed bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg shadow-sm hover:shadow-md disabled"
                            disabled
                            title="Cart feature temporarily disabled"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {/* Disabled indicator */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--md-error)] rounded-full flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    {/* Search bar - above buttons on mobile with margin to avoid cart/store text overlap */}
                    {showSearch && setSearch && (
                        <div className="mt-14 mb-3">
                            <SearchBar setSearch={setSearch} />
                        </div>
                    )}

                    {/* Category and Sort By - side by side on mobile */}
                    <div className="flex flex-row items-center gap-3">
                        {categories && setCategory && (
                            <div className="relative flex-1">
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="w-full appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg px-3 py-2 pr-8 text-xs font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 cursor-pointer"
                                >
                                    <option value="All" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat} className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-3 h-3 text-[var(--md-on-primary)]" />
                                </div>
                            </div>
                        )}
                        {setSortBy && (
                            <div className="relative flex-1">
                                <select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    className="w-full appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg px-3 py-2 pr-8 text-xs font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 cursor-pointer"
                                >
                                    <option value="name" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Sort by Name</option>
                                    <option value="price-low" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Price: Low to High</option>
                                    <option value="price-high" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Price: High to Low</option>
                                    <option value="category" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Sort by Category</option>
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-3 h-3 text-[var(--md-on-primary)]" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex sm:items-center sm:gap-4 lg:gap-6">
                    {/* Search bar */}
                    {showSearch && setSearch && (
                        <div className="flex-1">
                            <SearchBar setSearch={setSearch} />
                        </div>
                    )}

                    {/* Category and Sort By */}
                    <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
                        {categories && setCategory && (
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 cursor-pointer"
                                >
                                    <option value="All" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat} className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-[var(--md-on-primary)]" />
                                </div>
                            </div>
                        )}
                        {setSortBy && (
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    className="appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 cursor-pointer"
                                >
                                    <option value="name" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Sort by Name</option>
                                    <option value="price-low" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Price: Low to High</option>
                                    <option value="price-high" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Price: High to Low</option>
                                    <option value="category" className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">Sort by Category</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-[var(--md-on-primary)]" />
                                </div>
                            </div>
                        )}

                        {/* Cart icon */}
                        <div className="flex-shrink-0">
                            <button 
                                className="group relative p-3 text-[var(--md-on-primary)] hover:opacity-80 transition-all duration-200 cursor-not-allowed bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg shadow-sm hover:shadow-md disabled"
                                disabled
                                title="Cart feature temporarily disabled"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {/* Disabled indicator */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--md-error)] rounded-full flex items-center justify-center">
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}