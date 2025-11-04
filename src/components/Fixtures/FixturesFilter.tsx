"use client"

import { useState, useMemo } from "react"
import { X } from "lucide-react"
import { fixtures } from "@/data/fixtures"
import { leagueTablesDataLong } from "@/data/leagueTablesDataLong"
import { leagueMatchweeks } from "@/data/matchweeks"

type FilterOption = {
  value: string
  label: string
}

type FilterState = {
  competition: string
  season: string
  matchweek: string
  club: string
}

type Props = {
  onFilterChange: (filters: FilterState) => void
  onReset: () => void
}

export default function FixturesFilter({ onFilterChange, onReset }: Props) {
  // Extract leagues from leagueTablesDataLong for competition dropdown
  const competitionsList = useMemo(() => {
    const comps: FilterOption[] = [{ value: "all", label: "All Competitions" }]
    
    // Add Men's leagues
    const menLeagues = Object.keys(leagueTablesDataLong.Men)
    menLeagues.forEach(league => {
      comps.push({ value: league, label: league })
    })
    
    // Add Women's leagues
    const womenLeagues = Object.keys(leagueTablesDataLong.Women)
    womenLeagues.forEach(league => {
      comps.push({ value: league, label: league })
    })
    
    return comps
  }, [])

  // Extract unique seasons from fixtures data
  const seasonsList = useMemo(() => {
    const seasonSet = new Set<string>()
    fixtures.forEach(week => 
      week.days.forEach(day => 
        day.matches.forEach(match => {
          if (match.season) seasonSet.add(match.season)
        })
      )
    )
    const seasons: FilterOption[] = [{ value: "all", label: "All Seasons" }]
    Array.from(seasonSet).sort().reverse().forEach(season => {
      seasons.push({ value: season, label: season.replace('-', '/') })
    })
    return seasons
  }, [])

  // Extract matchweeks from leagueMatchweeks data
  const matchweeksList = useMemo(() => {
    const weeks: FilterOption[] = [{ value: "all", label: "All Matchweeks" }]
    leagueMatchweeks.forEach(week => {
      weeks.push({ value: week.id.toString(), label: week.title })
    })
    return weeks
  }, [])

  // Extract unique teams from league matchweeks data
  const clubsList = useMemo(() => {
    const teamSet = new Set<string>()
    leagueMatchweeks.forEach(week => 
      week.days.forEach(day => 
        day.matches.forEach(match => {
          teamSet.add(match.home_team)
          teamSet.add(match.away_team)
        })
      )
    )
    const teams: FilterOption[] = [{ value: "all", label: "All Clubs" }]
    Array.from(teamSet).sort().forEach(team => {
      const slug = team.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      teams.push({ value: slug, label: team })
    })
    return teams
  }, [])
  const [filters, setFilters] = useState<FilterState>({
    competition: "all",
    season: "2025-26",
    matchweek: "all",
    club: "all"
  })

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      competition: "all",
      season: "2025-26",
      matchweek: "all",
      club: "all"
    }
    setFilters(resetFilters)
    onReset()
  }

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== "all").length
  }

  const hasActiveFilters = getActiveFiltersCount() > 0

  return (
    <div className="bg-[var(--md-surface-container)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--md-outline-variant)] overflow-hidden">
      {/* Filter Options */}
      <div className="p-4 sm:p-6 bg-[var(--md-surface-container-low)]">
        <div className="flex flex-row items-center justify-between gap-3 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--md-on-surface)]">Filter Matches</h3>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[var(--md-error)] text-[var(--md-on-error)] rounded-lg hover:bg-[var(--md-error-container)] transition-colors duration-200 text-sm sm:text-base"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Filters</span>
              <span className="sm:hidden">Reset</span>
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Competition Filter */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[var(--md-on-surface)]">
                Competition
              </label>
              <div className="relative">
                <select
                  value={filters.competition}
                  onChange={(e) => handleFilterChange("competition", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-[var(--md-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 text-sm sm:text-base appearance-none cursor-pointer"
                >
                  {competitionsList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--md-on-primary)]">
                    <path d="M8 11L3 6h10z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Season Filter */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[var(--md-on-surface)]">
                Season
              </label>
              <div className="relative">
                <select
                  value={filters.season}
                  onChange={(e) => handleFilterChange("season", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-[var(--md-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 text-sm sm:text-base appearance-none cursor-pointer"
                >
                  {seasonsList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--md-on-primary)]">
                    <path d="M8 11L3 6h10z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Matchweek Filter */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[var(--md-on-surface)]">
                Matchweek
              </label>
              <div className="relative">
                <select
                  value={filters.matchweek}
                  onChange={(e) => handleFilterChange("matchweek", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-[var(--md-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 text-sm sm:text-base appearance-none cursor-pointer"
                >
                  {matchweeksList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--md-on-primary)]">
                    <path d="M8 11L3 6h10z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Club Filter */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[var(--md-on-surface)]">
                Club
              </label>
              <div className="relative">
                <select
                  value={filters.club}
                  onChange={(e) => handleFilterChange("club", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 border border-[var(--md-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 text-sm sm:text-base appearance-none cursor-pointer"
                >
                  {clubsList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--md-on-primary)]">
                    <path d="M8 11L3 6h10z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[var(--md-surface-container-low)] border-t border-[var(--md-outline-variant)]">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <h4 className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface-variant)]">Active Filters:</h4>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filters.competition !== "all" && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] border border-[var(--md-outline)] hover:bg-[var(--md-primary-container)]/80 transition-colors duration-200">
                {competitionsList.find(c => c.value === filters.competition)?.label}
                <button
                  onClick={() => handleFilterChange("competition", "all")}
                  className="ml-2 hover:opacity-70 p-1 rounded-full transition-opacity duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.season !== "all" && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)] border border-[var(--md-outline)] hover:bg-[var(--md-secondary-container)]/80 transition-colors duration-200">
                {seasonsList.find(s => s.value === filters.season)?.label}
                <button
                  onClick={() => handleFilterChange("season", "all")}
                  className="ml-2 hover:opacity-70 p-1 rounded-full transition-opacity duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.matchweek !== "all" && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-[var(--md-tertiary-container)] text-[var(--md-on-tertiary-container)] border border-[var(--md-outline)] hover:bg-[var(--md-tertiary-container)]/80 transition-colors duration-200">
                {matchweeksList.find(m => m.value === filters.matchweek)?.label}
                <button
                  onClick={() => handleFilterChange("matchweek", "all")}
                  className="ml-2 hover:opacity-70 p-1 rounded-full transition-opacity duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.club !== "all" && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] border border-[var(--md-outline)] hover:bg-[var(--md-primary-container)]/80 transition-colors duration-200">
                {clubsList.find(c => c.value === filters.club)?.label}
                <button
                  onClick={() => handleFilterChange("club", "all")}
                  className="ml-2 hover:opacity-70 p-1 rounded-full transition-opacity duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
