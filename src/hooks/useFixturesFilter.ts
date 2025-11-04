"use client"

import { useState, useMemo } from 'react'
import { leagueTablesDataLong } from '@/data/leagueTablesDataLong'
import { leagueMatchweeks } from '@/data/matchweeks'

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
    // Start with league matchweeks (already excludes Cup and Shield)
    let filtered = [...leagueMatchweeks]

    // Filter by competition (league name from leagueTablesDataLong)
    if (filters.competition !== "all") {
      // Check if it's a league from leagueTablesDataLong
      const isLeague = leagueTablesDataLong.Men[filters.competition] || leagueTablesDataLong.Women[filters.competition]
      
      if (isLeague) {
        // Get teams from the selected league
        const leagueTeams = isLeague.map(team => team.name.toLowerCase())
        
        // Filter fixtures by matching teams
        filtered = filtered.map(week => ({
          ...week,
          days: week.days.map(day => ({
            ...day,
            matches: day.matches.filter(match => {
              const homeTeam = match.home_team.toLowerCase()
              const awayTeam = match.away_team.toLowerCase()
              
              // Match if either team is in the league
              return leagueTeams.includes(homeTeam) || leagueTeams.includes(awayTeam)
            })
          })).filter(day => day.matches.length > 0)
        })).filter(week => week.days.length > 0)
      }
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
      const weekId = parseInt(filters.matchweek)
      filtered = filtered.filter(week => week.id === weekId)
    }

    // Filter by club - this affects individual matches within weeks
    if (filters.club !== "all") {
      filtered = filtered.map(week => ({
        ...week,
        days: week.days.map(day => ({
          ...day,
          matches: day.matches.filter(match => {
            const homeTeam = match.home_team.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            const awayTeam = match.away_team.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            const clubSlug = filters.club.toLowerCase()
            
            return homeTeam === clubSlug || awayTeam === clubSlug || 
                   homeTeam.includes(clubSlug) || awayTeam.includes(clubSlug)
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
    // Count total matches from league matchweeks
    const totalMatches = leagueMatchweeks.flatMap(week => 
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
