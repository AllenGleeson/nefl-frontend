import fixturesData from './fixtures.json'
import { Match, Matchweek } from './fixtures'

// Filter out Cup and Shield matches
function isLeagueMatch(match: any): boolean {
  if (!match.competition) return true
  return !match.competition.includes("Cup") && !match.competition.includes("Shield")
}

// Extract only league matchweeks (excluding Cup and Shield)
export function getLeagueMatchweeks(): Matchweek[] {
  return (fixturesData as Matchweek[])
    .map(week => {
      // Filter out Cup and Shield matches from each day
      const filteredDays = week.days
        .map(day => ({
          ...day,
          matches: day.matches.filter(isLeagueMatch) as Match[]
        }))
        .filter(day => day.matches.length > 0) // Remove empty days
      
      // Only return weeks that have at least one day with league matches
      if (filteredDays.length > 0) {
        return {
          ...week,
          days: filteredDays
        } as Matchweek
      }
      return null
    })
    .filter((week): week is Matchweek => week !== null)
}

// Get all matchweeks (for stats/comparison)
export function getAllMatchweeks(): Matchweek[] {
  return fixturesData as Matchweek[]
}

// Get unique matchweek titles (excluding Cup/Shield)
export function getMatchweekTitles(): string[] {
  const titles = new Set<string>()
  ;(fixturesData as Matchweek[]).forEach(week => {
    // Only add if week has league matches
    const hasLeagueMatches = week.days.some(day => 
      day.matches.some(isLeagueMatch)
    )
    if (hasLeagueMatches) {
      titles.add(week.title)
    }
  })
  return Array.from(titles).sort()
}

// Get matchweek by ID (only if it has league matches)
export function getMatchweekById(id: number): Matchweek | undefined {
  const week = (fixturesData as Matchweek[]).find(w => w.id === id)
  if (!week) return undefined
  
  const filteredDays = week.days
    .map(day => ({
      ...day,
      matches: day.matches.filter(isLeagueMatch) as Match[]
    }))
    .filter(day => day.matches.length > 0)
  
  if (filteredDays.length > 0) {
    return {
      ...week,
      days: filteredDays
    } as Matchweek
  }
  return undefined
}

// Get matchweeks by date range
export function getMatchweeksByDateRange(startDate: string, endDate: string): Matchweek[] {
  return getLeagueMatchweeks().filter(week => {
    const weekDates = week.days.flatMap(day => day.date)
    return weekDates.some(date => date >= startDate && date <= endDate)
  })
}

// Export the main league matchweeks
export const leagueMatchweeks: Matchweek[] = getLeagueMatchweeks()

