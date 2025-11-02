// src/hooks/useStatisticsFilter.ts
import { useState, useMemo } from "react"
import { statisticsData, StatRow } from "@/data/statistics"

type FilterState = {
  statType: "goals" | "assists"
  season: string
  league: string
}

export function useStatisticsFilter() {
  const [filters, setFilters] = useState<FilterState>({
    statType: "goals",
    season: "2025-26",
    league: "all",
  })

  const filteredStats = useMemo(() => {
    let data = statisticsData

    // filter by season
    if (filters.season !== "all") {
      data = data.filter((d) => d.season === filters.season)
    }

    // filter by league
    if (filters.league !== "all") {
      data = data.filter((d) => d.league === filters.league)
    }

    // sort by stat type (goals or assists)
    return [...data]
      .sort((a, b) => b[filters.statType] - a[filters.statType])
      .map((d, i) => ({ ...d, rank: i + 1 }))
  }, [filters])

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleReset = () => {
    setFilters({ statType: "goals", season: "2025-26", league: "all" })
  }

  return { filters, filteredStats, handleFilterChange, handleReset }
}