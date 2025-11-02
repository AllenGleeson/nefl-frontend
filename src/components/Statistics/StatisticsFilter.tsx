"use client"

import { useState } from 'react'

type FilterState = {
    statType: "goals" | "assists"
    season: string
    league: string
}

type Props = {
    onFilterChange: (newFilters: Partial<FilterState>) => void
    onReset: () => void
    currentFilters: FilterState
}

export default function StatisticsFilter({ onFilterChange, onReset, currentFilters }: Props) {
    const [isExpanded, setIsExpanded] = useState(false)

    const statTypeOptions = [
        { value: "goals", label: "Goals", icon: "⚽", color: "text-blue-600" },
        { value: "assists", label: "Assists", icon: "🎯", color: "text-green-600" }
    ]

    const seasonOptions = [
        { value: "2025-26", label: "2025/26", badge: "Current" },
        { value: "2024-25", label: "2024/25", badge: null },
        { value: "all", label: "All Seasons", badge: null }
    ]

    const leagueOptions = [
        { value: "all", label: "All Leagues", icon: "🌍" },
        { value: "Premier League", label: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
        { value: "La Liga", label: "La Liga", icon: "🇪🇸" },
        { value: "Serie A", label: "Serie A", icon: "🇮🇹" },
        { value: "Bundesliga", label: "Bundesliga", icon: "🇩🇪" },
        { value: "Championship", label: "Championship", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }
    ]

    const getActiveFiltersCount = () => {
        let count = 0
        if (currentFilters.statType !== "goals") count++
        if (currentFilters.season !== "2025-26") count++
        if (currentFilters.league !== "all") count++
        return count
    }

    const activeFiltersCount = getActiveFiltersCount()

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            {/* Filter Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Filter Statistics</h3>
                            <p className="text-sm text-gray-600">Customize your data view</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {activeFiltersCount > 0 && (
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                            </span>
                        )}
                        
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <span>{isExpanded ? 'Hide' : 'Show'} Filters</span>
                            <svg 
                                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Content */}
            {isExpanded && (
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stat Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                <span className="flex items-center gap-2">
                                    <span>📊</span>
                                    Statistic Type
                                </span>
                            </label>
                            <div className="space-y-2">
                                {statTypeOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                            currentFilters.statType === option.value
                                                ? 'border-indigo-300 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="statType"
                                            value={option.value}
                                            checked={currentFilters.statType === option.value}
                                            onChange={(e) => onFilterChange({ statType: e.target.value as "goals" | "assists" })}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <span className="text-lg">{option.icon}</span>
                                        <span className={`font-medium ${option.color}`}>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Season Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                <span className="flex items-center gap-2">
                                    <span>📅</span>
                                    Season
                                </span>
                            </label>
                            <div className="space-y-2">
                                {seasonOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                            currentFilters.season === option.value
                                                ? 'border-indigo-300 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="season"
                                                value={option.value}
                                                checked={currentFilters.season === option.value}
                                                onChange={(e) => onFilterChange({ season: e.target.value })}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                            />
                                            <span className="font-medium text-gray-900">{option.label}</span>
                                        </div>
                                        {option.badge && (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                {option.badge}
                                            </span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* League Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                <span className="flex items-center gap-2">
                                    <span>🏆</span>
                                    League
                                </span>
                            </label>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {leagueOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                            currentFilters.league === option.value
                                                ? 'border-indigo-300 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="league"
                                            value={option.value}
                                            checked={currentFilters.league === option.value}
                                            onChange={(e) => onFilterChange({ league: e.target.value })}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                        />
                                        <span className="text-lg">{option.icon}</span>
                                        <span className="font-medium text-gray-900">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            {activeFiltersCount > 0 ? (
                                <span>Filters applied: {activeFiltersCount} of 3</span>
                            ) : (
                                <span>No filters applied - showing all data</span>
                            )}
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={onReset}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reset All
                                </span>
                            </button>
                            
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Filter Pills */}
            {!isExpanded && (
                <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                            {statTypeOptions.find(opt => opt.value === currentFilters.statType)?.icon} {statTypeOptions.find(opt => opt.value === currentFilters.statType)?.label}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            📅 {seasonOptions.find(opt => opt.value === currentFilters.season)?.label}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            🏆 {leagueOptions.find(opt => opt.value === currentFilters.league)?.label}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}