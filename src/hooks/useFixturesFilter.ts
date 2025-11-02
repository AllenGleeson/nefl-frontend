"use client"

import { useState, useMemo } from 'react'
import { fixtures } from '@/data/fixtures'

type FilterState = {
  competition: string
  season: string
  matchweek: string
  club: string
}

export function useFixturesFilter() {
  const [filters, setFilters] = useState<FilterState>({
    competition: "all",
    season: "2025-26",
    matchweek: "all",
    club: "all"
  })

  const filteredMatchweeks = useMemo(() => {
    let filtered = [...fixtures]

    // Filter by competition
    if (filters.competition !== "all") {
      filtered = filtered.map(week => ({
        ...week,
        days: week.days.map(day => ({
          ...day,
          matches: day.matches.filter(match => {
            if (filters.competition === "premier") {
              return match.league === "Premier"
            } else if (filters.competition === "division1") {
              return match.league === "Division1"
            } else if (filters.competition === "cup") {
              return match.league === "Cup"
            } else if (filters.competition === "shield") {
              return match.league === "Shield"
            }
            return true
          })
        })).filter(day => day.matches.length > 0)
      })).filter(week => week.days.length > 0)
    }

    // Filter by season
    if (filters.season !== "all") {
      filtered = filtered.map(week => ({
        ...week,
        days: week.days.map(day => ({
          ...day,
          matches: day.matches.filter(match => match.season === filters.season)
        })).filter(day => day.matches.length > 0)
      })).filter(week => week.days.length > 0)
    }

    // Filter by matchweek
    if (filters.matchweek !== "all") {
      filtered = filtered.filter(week => {
        if (filters.matchweek === "1") {
          return week.title === "Matchweek 1"
        } else if (filters.matchweek === "2") {
          return week.title === "Matchweek 2"
        } else if (filters.matchweek === "3") {
          return week.title === "Matchweek 3"
        } else if (filters.matchweek === "cup1") {
          return week.title === "Cup Round 1"
        } else if (filters.matchweek === "cup2") {
          return week.title === "Cup Round 2"
        } else if (filters.matchweek === "shield1") {
          return week.title === "Shield Round 1"
        }
        return true
      })
    }

    // Filter by club - this affects individual matches within weeks
    if (filters.club !== "all") {
      filtered = filtered.map(week => ({
        ...week,
        days: week.days.map(day => ({
          ...day,
          matches: day.matches.filter(match => {
            const homeTeam = match.home_team.toLowerCase()
            const awayTeam = match.away_team.toLowerCase()
            const clubName = filters.club.toLowerCase()
            
            return homeTeam.includes(clubName) || awayTeam.includes(clubName)
          })
        })).filter(day => day.matches.length > 0) // Remove days with no matches
      })).filter(week => week.days.length > 0) // Remove weeks with no matches
    }

    return filtered
  }, [filters])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleReset = () => {
    setFilters({
      competition: "all",
      season: "2025-26",
      matchweek: "all",
      club: "all"
    })
  }

  const getFilterStats = () => {
    const totalMatches = fixtures.flatMap(week => 
      week.days.flatMap(day => day.matches)
    ).length

    const filteredMatches = filteredMatchweeks.flatMap(week => 
      week.days.flatMap(day => day.matches)
    ).length

    return {
      total: totalMatches,
      filtered: filteredMatches,
      weeks: filteredMatchweeks.length
    }
  }

  return {
    filters,
    filteredMatchweeks,
    handleFilterChange,
    handleReset,
    getFilterStats
  }
}
