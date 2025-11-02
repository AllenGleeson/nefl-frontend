"use client"

import { useState } from "react"
import NewsSearchBar from "./NewsSearchBar"

type Props = {
    setSearch?: (q: string) => void
    setCategory?: (category: string) => void
    setDateRange?: (range: string) => void
    setViewMode?: (mode: 'grid' | 'list') => void
    setSortBy?: (sort: string) => void
    showSearch?: boolean
    categories?: string[]
}

export default function NewsHeader({
    setSearch,
    setCategory,
    setDateRange,
    setViewMode,
    setSortBy,
    showSearch = true,
    categories = [],
}: Props) {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedDateRange, setSelectedDateRange] = useState("All")
    const [selectedViewMode, setSelectedViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedSortBy, setSelectedSortBy] = useState("newest")

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedCategory(value)
        setCategory?.(value)
    }

    const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedDateRange(value)
        setDateRange?.(value)
    }


    const handleViewModeChange = (mode: 'grid' | 'list') => {
        setSelectedViewMode(mode)
        setViewMode?.(mode)
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedSortBy(value)
        setSortBy?.(value)
    }

    return (
        <div className="py-4 sm:py-6 bg-[var(--md-surface-container)]">
            <div className="container mx-auto px-2 sm:px-4">
                {/* Top row: Search and main controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
                    {/* Left side: search */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-1">
                        {showSearch && setSearch && <NewsSearchBar setSearch={setSearch} />}
                    </div>

                    {/* Right side: View toggle and Sort */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* View Toggle */}
                        <div className="hidden sm:flex bg-[var(--md-primary-container)] border border-[var(--md-outline-variant)] rounded-lg overflow-hidden shadow-sm">
                            <button
                                onClick={() => handleViewModeChange('grid')}
                                className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${selectedViewMode === 'grid' 
                                    ? 'bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md' 
                                    : 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] hover:bg-[var(--md-primary-container-high)]'}`}
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span className="hidden sm:inline">Grid</span>
                            </button>
                            <button
                                onClick={() => handleViewModeChange('list')}
                                className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${selectedViewMode === 'list' 
                                    ? 'bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md' 
                                    : 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] hover:bg-[var(--md-primary-container-high)]'}`}
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                <span className="hidden sm:inline">List</span>
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedSortBy}
                                onChange={handleSortChange}
                                className="appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 cursor-pointer"
                            >
                                <option value="newest" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">Newest First</option>
                                <option value="oldest" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">Oldest First</option>
                                <option value="alphabetical" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">Alphabetical</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--md-on-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row: Filter controls */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 cursor-pointer"
                            >
                                <option value="All" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--md-on-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Date Range Filter */}
                    <div className="relative">
                        <select
                            value={selectedDateRange}
                            onChange={handleDateRangeChange}
                            className="appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 cursor-pointer"
                        >
                            <option value="All" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">All Time</option>
                            <option value="7days" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">Last 7 Days</option>
                            <option value="30days" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">Last 30 Days</option>
                            <option value="90days" className="text-[var(--md-on-primary)] bg-[var(--md-primary)]">Last 3 Months</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--md-on-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    <button
                        onClick={() => {
                            setSelectedCategory("All")
                            setSelectedDateRange("All")
                            setSelectedSortBy("newest")
                            setCategory?.("All")
                            setDateRange?.("All")
                            setSortBy?.("newest")
                        }}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-[var(--md-on-error)] bg-[var(--md-error)] border border-[var(--md-error)] rounded-lg hover:bg-[var(--md-error-container)] hover:text-[var(--md-on-error-container)] shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
                    >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="hidden sm:inline">Clear Filters</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
