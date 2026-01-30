export type Match = {
  id: number
  home_team: string
  away_team: string
  home_score?: number
  away_score?: number
  date: string // e.g. "2025-08-15"
  time: string // e.g. "15:00"
  status: "FT" | "Scheduled"
  home_badge: string
  away_badge: string
  league: "Premier" | "Division1" | "Cup" | "Shield"
  season: string // e.g. "2025-26"
  competition: string // e.g. "NEFL Premier League", "NEFL Cup"
  venue?: string
  referee?: string
}

export type Matchweek = {
  id: number
  title: string // e.g. "Matchweek 1"
  range: string // e.g. "Fri 15 Aug - Mon 18 Aug"
  days: {
    date: string
    dayLabel: string // e.g. "Fri 15 Aug"
    matches: Match[]
  }[]
}

// Import the JSON data
import fixturesData from './fixtures.json'

// Export the fixtures data with proper typing
export const fixtures: Matchweek[] = fixturesData as Matchweek[]

// Utility functions for working with fixtures
export function getMatchweeks(): Matchweek[] {
  return fixtures
}

export function getMatchesByWeek(weekId: number): Match[] {
  const week = fixtures.find(w => w.id === weekId)
  return week ? week.days.flatMap(day => day.matches) : []
}

export function getMatchesByDate(date: string): Match[] {
  return fixtures
    .flatMap(week => week.days)
    .find(day => day.date === date)?.matches || []
}

export function getUpcomingMatches(): Match[] {
  const today = new Date().toISOString().split('T')[0]
  return fixtures
    .flatMap(week => week.days.flatMap(day => day.matches))
    .filter(match => match.date >= today && match.status === 'Scheduled')
}

export function getCompletedMatches(): Match[] {
  return fixtures
    .flatMap(week => week.days.flatMap(day => day.matches))
    .filter(match => match.status === 'FT')
}

export function getMatchesByTeam(teamName: string): Match[] {
  return fixtures
    .flatMap(week => week.days.flatMap(day => day.matches))
    .filter(match => 
      match.home_team.toLowerCase().includes(teamName.toLowerCase()) ||
      match.away_team.toLowerCase().includes(teamName.toLowerCase())
    )
}

/** All match ids for static export (fixtures/[slug]) */
export function getAllFixtureSlugs(): { slug: string }[] {
  const matches = fixtures.flatMap(week =>
    week.days.flatMap(day => day.matches)
  )
  return matches.map(m => ({ slug: String(m.id) }))
}
