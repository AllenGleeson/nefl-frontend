"use client"

import { useState } from "react"
import NewsSearchBar from "./NewsSearchBar"
import { buttonStyles } from "@/components/ui/Button";
import { LayoutGrid, List, X } from "lucide-react"
import IconToggle from "@/components/ui/IconToggle"
import DateRangePicker, { ANY_DATE, isDateRangeSet, type DateRange } from "@/components/ui/DateRangePicker"

type Props = {
    setSearch?: (q: string) => void
    setCategory?: (category: string) => void
    setDateRange?: (range: DateRange) => void
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
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(ANY_DATE)
    const [selectedViewMode, setSelectedViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedSortBy, setSelectedSortBy] = useState("newest")
    const hasActiveFilters = selectedCategory !== "All" || isDateRangeSet(selectedDateRange) || selectedSortBy !== "newest"

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedCategory(value)
        setCategory?.(value)
    }

    const handleDateRangeChange = (value: DateRange) => {
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
                        <div className="hidden sm:block">
                            <IconToggle<'grid' | 'list'>
                                ariaLabel="News layout"
                                value={selectedViewMode}
                                onChange={handleViewModeChange}
                                options={[
                                    { value: 'grid', label: 'Grid view', icon: <LayoutGrid className="w-5 h-5" /> },
                                    { value: 'list', label: 'List view', icon: <List className="w-5 h-5" /> },
                                ]}
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedSortBy}
                                onChange={handleSortChange}
                                className="appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-full px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-hover)] transition-all duration-200 cursor-pointer"
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
                                className="appearance-none bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-full px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-hover)] transition-all duration-200 cursor-pointer"
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
                    <DateRangePicker value={selectedDateRange} onChange={handleDateRangeChange} label="Published" />

                    {/* Reset button: only shown when a filter or sort differs from the default */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory("All")
                                setSelectedDateRange(ANY_DATE)
                                setSelectedSortBy("newest")
                                setCategory?.("All")
                                setDateRange?.(ANY_DATE)
                                setSortBy?.("newest")
                            }}
                            className={buttonStyles({variant: "outline", size: "sm"})}
                        >
                            <X className="w-4 h-4" aria-hidden />
                            <span className="hidden sm:inline">Reset Filters</span>
                            <span className="sm:hidden">Reset</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
