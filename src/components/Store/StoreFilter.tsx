"use client"

import { useState } from "react"

type Props = {
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

export default function StoreFilter({ 
    onCategoryChange
}: Props) {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [selectedGenders, setSelectedGenders] = useState<string[]>([])
    const [selectedColours, setSelectedColours] = useState<string[]>([])
    const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    const genders = ["Men", "Women", "Unisex", "Youth"]
    const colours = ["Black", "White", "Blue", "Red", "Green", "Yellow", "Orange", "Purple"]
    const productTypes = ["Jerseys", "Shorts", "Socks", "Accessories", "Equipment"]

    const handleSizeChange = (size: string) => {
        setSelectedSizes(prev => 
            prev.includes(size) 
                ? prev.filter(s => s !== size)
                : [...prev, size]
        )
    }

    const handleGenderChange = (gender: string) => {
        setSelectedGenders(prev => 
            prev.includes(gender) 
                ? prev.filter(g => g !== gender)
                : [...prev, gender]
        )
    }

    const handleColourChange = (colour: string) => {
        setSelectedColours(prev => 
            prev.includes(colour) 
                ? prev.filter(c => c !== colour)
                : [...prev, colour]
        )
    }

    const handleProductTypeChange = (type: string) => {
        setSelectedProductTypes(prev => 
            prev.includes(type) 
                ? prev.filter(t => t !== type)
                : [...prev, type]
        )
    }

    return (
        <div className="px-4 sm:px-6 py-4 sm:py-6 lg:pl-12 w-full lg:w-64">
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="pb-2 border-b border-[var(--md-outline-variant)]">
                    <h2 className="text-base sm:text-lg font-bold text-[var(--md-on-surface)]">Filter By</h2>
                </div>

                {/* Size Filter */}
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface)] mb-2">Size</h3>
                    <div className="space-y-1 grid grid-cols-2 sm:grid-cols-1 gap-1">
                        {sizes.map((size) => (
                            <label key={size} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedSizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                    className="w-4 h-4 text-[var(--md-primary)] bg-[var(--md-surface)] border-[var(--md-outline)] rounded focus:ring-[var(--md-primary)] focus:ring-2"
                                />
                                <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">{size}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Gender Filter */}
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface)] mb-2">Gender</h3>
                    <div className="space-y-1 grid grid-cols-2 sm:grid-cols-1 gap-1">
                        {genders.map((gender) => (
                            <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedGenders.includes(gender)}
                                    onChange={() => handleGenderChange(gender)}
                                    className="w-4 h-4 text-[var(--md-primary)] bg-[var(--md-surface)] border-[var(--md-outline)] rounded focus:ring-[var(--md-primary)] focus:ring-2"
                                />
                                <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">{gender}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Colour Filter */}
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface)] mb-2">Colour</h3>
                    <div className="space-y-1 grid grid-cols-2 sm:grid-cols-1 gap-1">
                        {colours.map((colour) => (
                            <label key={colour} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedColours.includes(colour)}
                                    onChange={() => handleColourChange(colour)}
                                    className="w-4 h-4 text-[var(--md-primary)] bg-[var(--md-surface)] border-[var(--md-outline)] rounded focus:ring-[var(--md-primary)] focus:ring-2"
                                />
                                <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">{colour}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Product Type Filter */}
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface)] mb-2">Product Type</h3>
                    <div className="space-y-1 grid grid-cols-2 sm:grid-cols-1 gap-1">
                        {productTypes.map((type) => (
                            <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedProductTypes.includes(type)}
                                    onChange={() => handleProductTypeChange(type)}
                                    className="w-4 h-4 text-[var(--md-primary)] bg-[var(--md-surface)] border-[var(--md-outline)] rounded focus:ring-[var(--md-primary)] focus:ring-2"
                                />
                                <span className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters */}
                <div className="pt-3 border-t border-[var(--md-outline-variant)]">
                    <button
                        onClick={() => {
                            onCategoryChange("All")
                            setSelectedSizes([])
                            setSelectedGenders([])
                            setSelectedColours([])
                            setSelectedProductTypes([])
                        }}
                        className="w-full px-3 py-2 bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-lg text-xs sm:text-sm font-medium text-[var(--md-on-primary)] hover:bg-[var(--md-primary-fixed-dim)] hover:border-[var(--md-primary-fixed-dim)] transition-all duration-200"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    )
}
