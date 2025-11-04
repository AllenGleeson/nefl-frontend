import { leagueTablesDataLong } from "@/data/leagueTablesDataLong"

// Map competition names to league names
const competitionToLeagueMap: Record<string, string> = {
  "NEFL Premier League": "UHY Farrelly Dawe White Premier Division",
  "NEFL Division 1": "O Neills Sportswear Division 1",
  "NEFL Division 2": "PM Blinds & Shutters Division 2",
  "NEFL Division 3": "Superior Racking & Shelving Division 3",
  "NEFL Division 3A": "Superior Racking & Shelving Division 3A",
  "NEFL Division 4": "Superior Racking & Shelving Division 4",
  "NEFL Womens Premier League": "UHY Farrelly Dawe White Womens Premier Division",
  "NEFL Womens Division 1": "UHY Farrelly Dawe White Womens Division 1",
  "NEFL Womens Division 2": "UHY Farrelly Dawe White Division 2",
}

// Get league name for a match based on teams
export function getLeagueNameForMatch(homeTeam: string, awayTeam: string, competition?: string): string {
  // First try to map by competition name
  if (competition && competitionToLeagueMap[competition]) {
    return competitionToLeagueMap[competition]
  }

  // Try to find league by team names
  const homeTeamLower = homeTeam.toLowerCase()
  const awayTeamLower = awayTeam.toLowerCase()

  // Check Men's leagues
  for (const [leagueName, teams] of Object.entries(leagueTablesDataLong.Men)) {
    const teamNames = teams.map(t => t.name.toLowerCase())
    if (teamNames.includes(homeTeamLower) || teamNames.includes(awayTeamLower)) {
      return leagueName
    }
  }

  // Check Women's leagues
  for (const [leagueName, teams] of Object.entries(leagueTablesDataLong.Women)) {
    const teamNames = teams.map(t => t.name.toLowerCase())
    if (teamNames.includes(homeTeamLower) || teamNames.includes(awayTeamLower)) {
      return leagueName
    }
  }

  // Fallback to competition name if available
  return competition || "League Match"
}

