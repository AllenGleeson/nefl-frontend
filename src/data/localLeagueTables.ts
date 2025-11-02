// src/data/localLeagueTables.ts
// Local league tables for the NEFL clubs

export type LocalTeam = {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type LocalLeagueTables = {
  [leagueName: string]: LocalTeam[];
};

export const localLeagueTablesData: LocalLeagueTables = {
  "Premier League": [
    { position: 1, name: "Navan Rangers", played: 16, won: 12, drawn: 2, lost: 2, points: 38, goalsFor: 35, goalsAgainst: 12, goalDifference: 23 },
    { position: 2, name: "Monaghan Town FC", played: 15, won: 9, drawn: 3, lost: 3, points: 30, goalsFor: 28, goalsAgainst: 15, goalDifference: 13 },
    { position: 3, name: "Drogheda Rovers", played: 16, won: 8, drawn: 2, lost: 6, points: 26, goalsFor: 25, goalsAgainst: 20, goalDifference: 5 },
    { position: 4, name: "Castleblayney United", played: 16, won: 8, drawn: 3, lost: 5, points: 27, goalsFor: 28, goalsAgainst: 22, goalDifference: 6 },
    { position: 5, name: "Kingscourt Harps", played: 15, won: 5, drawn: 3, lost: 7, points: 18, goalsFor: 19, goalsAgainst: 24, goalDifference: -5 },
    { position: 6, name: "Ardee Celtic FC", played: 14, won: 6, drawn: 4, lost: 4, points: 22, goalsFor: 22, goalsAgainst: 18, goalDifference: 4 },
  ],
  "Championship": [
    { position: 1, name: "Kells United", played: 13, won: 8, drawn: 3, lost: 2, points: 27, goalsFor: 24, goalsAgainst: 12, goalDifference: 12 },
    { position: 2, name: "Ardee Celtic FC", played: 14, won: 6, drawn: 4, lost: 4, points: 22, goalsFor: 22, goalsAgainst: 18, goalDifference: 4 },
    { position: 3, name: "Kingscourt Harps", played: 15, won: 5, drawn: 3, lost: 7, points: 18, goalsFor: 19, goalsAgainst: 24, goalDifference: -5 },
    { position: 4, name: "Slane Wanderers", played: 14, won: 6, drawn: 3, lost: 5, points: 21, goalsFor: 21, goalsAgainst: 19, goalDifference: 2 },
    { position: 5, name: "Trim Celtic", played: 14, won: 6, drawn: 5, lost: 3, points: 23, goalsFor: 20, goalsAgainst: 16, goalDifference: 4 },
    { position: 6, name: "Athboy Athletic", played: 12, won: 4, drawn: 4, lost: 4, points: 16, goalsFor: 16, goalsAgainst: 18, goalDifference: -2 },
  ],
  "Division 1": [
    { position: 1, name: "Kells United", played: 13, won: 8, drawn: 3, lost: 2, points: 27, goalsFor: 24, goalsAgainst: 12, goalDifference: 12 },
    { position: 2, name: "Slane Wanderers", played: 14, won: 6, drawn: 3, lost: 5, points: 21, goalsFor: 21, goalsAgainst: 19, goalDifference: 2 },
    { position: 3, name: "Trim Celtic", played: 14, won: 6, drawn: 5, lost: 3, points: 23, goalsFor: 20, goalsAgainst: 16, goalDifference: 4 },
    { position: 4, name: "Athboy Athletic", played: 12, won: 4, drawn: 4, lost: 4, points: 16, goalsFor: 16, goalsAgainst: 18, goalDifference: -2 },
    { position: 5, name: "Bailieboro Shamrocks", played: 12, won: 3, drawn: 4, lost: 5, points: 13, goalsFor: 14, goalsAgainst: 18, goalDifference: -4 },
    { position: 6, name: "Carrick Rovers", played: 13, won: 7, drawn: 2, lost: 4, points: 23, goalsFor: 22, goalsAgainst: 16, goalDifference: 6 },
  ],
  "Division 2": [
    { position: 1, name: "Carrick Rovers", played: 13, won: 7, drawn: 2, lost: 4, points: 23, goalsFor: 22, goalsAgainst: 16, goalDifference: 6 },
    { position: 2, name: "Athboy Athletic", played: 12, won: 4, drawn: 4, lost: 4, points: 16, goalsFor: 16, goalsAgainst: 18, goalDifference: -2 },
    { position: 3, name: "Bailieboro Shamrocks", played: 12, won: 3, drawn: 4, lost: 5, points: 13, goalsFor: 14, goalsAgainst: 18, goalDifference: -4 },
    { position: 4, name: "Trim Celtic", played: 14, won: 6, drawn: 5, lost: 3, points: 23, goalsFor: 20, goalsAgainst: 16, goalDifference: 4 },
    { position: 5, name: "Slane Wanderers", played: 14, won: 6, drawn: 3, lost: 5, points: 21, goalsFor: 21, goalsAgainst: 19, goalDifference: 2 },
    { position: 6, name: "Kells United", played: 13, won: 8, drawn: 3, lost: 2, points: 27, goalsFor: 24, goalsAgainst: 12, goalDifference: 12 },
  ],
};

// Helper function to get club rankings across all leagues
export const getClubRankings = (clubName: string): Array<{
  league: string;
  team: LocalTeam;
}> => {
  const rankings: Array<{ league: string; team: LocalTeam }> = [];
  
  Object.entries(localLeagueTablesData).forEach(([leagueName, teams]) => {
    const team = teams.find(t => t.name === clubName);
    if (team) {
      rankings.push({ league: leagueName, team });
    }
  });
  
  return rankings;
};

// Helper function to get position badge color
export const getPositionBadgeColor = (position: number): string => {
  if (position === 1) return "bg-yellow-500 text-white"; // Gold for 1st
  if (position === 2) return "bg-gray-400 text-white"; // Silver for 2nd
  if (position === 3) return "bg-amber-600 text-white"; // Bronze for 3rd
  if (position <= 6) return "bg-green-500 text-white"; // Green for top 6
  if (position <= 10) return "bg-blue-500 text-white"; // Blue for mid-table
  return "bg-gray-500 text-white"; // Gray for lower positions
};

// Helper function to get position text
export const getPositionText = (position: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = position % 100;
  return position + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};
