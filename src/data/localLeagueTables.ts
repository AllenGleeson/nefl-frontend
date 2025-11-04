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
  "UHY Farrelly Dawe White Premier Division": [
    { position: 1, name: "Parkvilla FC", played: 17, won: 11, drawn: 4, lost: 2, points: 37, goalsFor: 58, goalsAgainst: 28, goalDifference: 30 },
    { position: 2, name: "Duleek AFC", played: 17, won: 11, drawn: 3, lost: 3, points: 36, goalsFor: 50, goalsAgainst: 23, goalDifference: 27 },
    { position: 3, name: "Rock Celtic FC", played: 17, won: 7, drawn: 5, lost: 5, points: 26, goalsFor: 33, goalsAgainst: 30, goalDifference: 3 },
    { position: 4, name: "Quay Celtic FC", played: 16, won: 8, drawn: 1, lost: 7, points: 25, goalsFor: 35, goalsAgainst: 23, goalDifference: 12 },
    { position: 5, name: "Bellurgan United", played: 17, won: 7, drawn: 3, lost: 7, points: 24, goalsFor: 25, goalsAgainst: 42, goalDifference: -17 },
    { position: 6, name: "Trim Celtic AFC", played: 15, won: 6, drawn: 5, lost: 4, points: 23, goalsFor: 33, goalsAgainst: 28, goalDifference: 5 },
    { position: 7, name: "Glenmuir FC", played: 18, won: 5, drawn: 3, lost: 10, points: 18, goalsFor: 31, goalsAgainst: 36, goalDifference: -5 },
    { position: 8, name: "Carrick Rovers AFC", played: 16, won: 5, drawn: 2, lost: 9, points: 17, goalsFor: 23, goalsAgainst: 31, goalDifference: -8 },
    { position: 9, name: "Kentstown Rovers FC", played: 18, won: 4, drawn: 4, lost: 10, points: 16, goalsFor: 33, goalsAgainst: 50, goalDifference: -17 },
    { position: 10, name: "Albion Rovers FC", played: 17, won: 3, drawn: 4, lost: 10, points: 13, goalsFor: 21, goalsAgainst: 51, goalDifference: -30 },
  ],
  "O Neills Sportswear Division 1": [
    { position: 1, name: "Johnstown FC", played: 15, won: 13, drawn: 1, lost: 1, points: 40, goalsFor: 60, goalsAgainst: 22, goalDifference: 38 },
    { position: 2, name: "Ardee Celtic FC", played: 16, won: 10, drawn: 2, lost: 4, points: 32, goalsFor: 43, goalsAgainst: 27, goalDifference: 16 },
    { position: 3, name: "Torro United FC", played: 16, won: 9, drawn: 2, lost: 5, points: 29, goalsFor: 48, goalsAgainst: 28, goalDifference: 20 },
    { position: 4, name: "Robinstown FC", played: 16, won: 8, drawn: 3, lost: 5, points: 27, goalsFor: 27, goalsAgainst: 25, goalDifference: 2 },
    { position: 5, name: "Kingscourt Harps AFC", played: 16, won: 6, drawn: 3, lost: 7, points: 21, goalsFor: 36, goalsAgainst: 35, goalDifference: 1 },
    { position: 6, name: "Athboy Celtic FC", played: 15, won: 5, drawn: 2, lost: 8, points: 17, goalsFor: 0, goalsAgainst: 45, goalDifference: -8 },
    { position: 7, name: "Walshestown FC", played: 16, won: 4, drawn: 3, lost: 9, points: 15, goalsFor: 21, goalsAgainst: 43, goalDifference: -22 },
    { position: 8, name: "Trim Celtic AFC", played: 16, won: 3, drawn: 2, lost: 11, points: 11, goalsFor: 30, goalsAgainst: 43, goalDifference: -13 },
    { position: 9, name: "Navan Town Cosmos", played: 16, won: 3, drawn: 2, lost: 11, points: 11, goalsFor: 21, goalsAgainst: 55, goalDifference: -34 },
  ],
  "PM Blinds & Shutters Division 2": [
    { position: 1, name: "BJD Celtic", played: 22, won: 21, drawn: 0, lost: 1, points: 63, goalsFor: 84, goalsAgainst: 14, goalDifference: 70 },
    { position: 2, name: "Black Bull FC", played: 22, won: 16, drawn: 2, lost: 4, points: 50, goalsFor: 72, goalsAgainst: 36, goalDifference: 36 },
    { position: 3, name: "Enfield Celtic FC", played: 20, won: 15, drawn: 2, lost: 3, points: 47, goalsFor: 70, goalsAgainst: 28, goalDifference: 42 },
    { position: 4, name: "Duleek AFC", played: 21, won: 12, drawn: 2, lost: 7, points: 38, goalsFor: 61, goalsAgainst: 33, goalDifference: 28 },
    { position: 5, name: "Oldcastle United", played: 22, won: 10, drawn: 3, lost: 9, points: 33, goalsFor: 61, goalsAgainst: 44, goalDifference: 17 },
    { position: 6, name: "Termonfeckin Celtic FC", played: 20, won: 10, drawn: 2, lost: 8, points: 32, goalsFor: 57, goalsAgainst: 42, goalDifference: 15 },
    { position: 7, name: "Parkvilla FC", played: 21, won: 10, drawn: 2, lost: 9, points: 32, goalsFor: 45, goalsAgainst: 51, goalDifference: -6 },
    { position: 8, name: "Carrick Rovers AFC", played: 21, won: 6, drawn: 5, lost: 10, points: 23, goalsFor: 48, goalsAgainst: 62, goalDifference: -14 },
    { position: 9, name: "Virginia Celtic FC", played: 21, won: 6, drawn: 2, lost: 13, points: 20, goalsFor: 26, goalsAgainst: 49, goalDifference: -23 },
    { position: 10, name: "Trim Town FC", played: 22, won: 6, drawn: 2, lost: 14, points: 20, goalsFor: 33, goalsAgainst: 63, goalDifference: -30 },
    { position: 11, name: "Bailieboro Celtic AFC", played: 22, won: 2, drawn: 1, lost: 19, points: 7, goalsFor: 21, goalsAgainst: 99, goalDifference: -78 },
    { position: 12, name: "Kells Celtic Youths", played: 22, won: 1, drawn: 3, lost: 18, points: 6, goalsFor: 16, goalsAgainst: 73, goalDifference: -57 },
  ],
  "Superior Racking & Shelving Division 3": [
    { position: 1, name: "Monaghan United FC", played: 22, won: 17, drawn: 2, lost: 3, points: 53, goalsFor: 59, goalsAgainst: 27, goalDifference: 32 },
    { position: 2, name: "Monaghan Town FC", played: 22, won: 15, drawn: 3, lost: 4, points: 48, goalsFor: 73, goalsAgainst: 32, goalDifference: 41 },
    { position: 3, name: "Cootehill Harps", played: 22, won: 12, drawn: 4, lost: 6, points: 40, goalsFor: 57, goalsAgainst: 44, goalDifference: 13 },
    { position: 4, name: "Rossin Rovers", played: 22, won: 10, drawn: 5, lost: 7, points: 35, goalsFor: 55, goalsAgainst: 42, goalDifference: 13 },
    { position: 5, name: "Ardee Celtic FC", played: 22, won: 10, drawn: 3, lost: 9, points: 33, goalsFor: 46, goalsAgainst: 44, goalDifference: 2 },
    { position: 6, name: "Rock Celtic FC", played: 22, won: 10, drawn: 3, lost: 9, points: 33, goalsFor: 50, goalsAgainst: 53, goalDifference: -3 },
    { position: 7, name: "Albion Rovers FC", played: 22, won: 9, drawn: 3, lost: 10, points: 30, goalsFor: 49, goalsAgainst: 42, goalDifference: 7 },
    { position: 8, name: "Bellurgan United", played: 22, won: 9, drawn: 3, lost: 10, points: 30, goalsFor: 44, goalsAgainst: 46, goalDifference: -2 },
    { position: 9, name: "Newtown United", played: 22, won: 9, drawn: 1, lost: 12, points: 28, goalsFor: 36, goalsAgainst: 59, goalDifference: -23 },
    { position: 10, name: "Kingscourt Harps AFC", played: 22, won: 7, drawn: 2, lost: 13, points: 23, goalsFor: 36, goalsAgainst: 58, goalDifference: -22 },
    { position: 11, name: "Termonfeckin Celtic FC", played: 22, won: 4, drawn: 4, lost: 14, points: 16, goalsFor: 40, goalsAgainst: 58, goalDifference: -18 },
    { position: 12, name: "Glenmuir FC", played: 22, won: 3, drawn: 1, lost: 18, points: 10, goalsFor: 23, goalsAgainst: 63, goalDifference: -40 },
  ],
  "Superior Racking & Shelving Division 3A": [
    { position: 1, name: "Aston Celtic FC", played: 22, won: 19, drawn: 2, lost: 1, points: 59, goalsFor: 79, goalsAgainst: 23, goalDifference: 56 },
    { position: 2, name: "Electro Celtic FC", played: 23, won: 17, drawn: 2, lost: 4, points: 53, goalsFor: 75, goalsAgainst: 33, goalDifference: 42 },
    { position: 3, name: "Longwood AFC", played: 21, won: 15, drawn: 2, lost: 4, points: 47, goalsFor: 70, goalsAgainst: 30, goalDifference: 40 },
    { position: 4, name: "Enfield Celtic FC", played: 23, won: 13, drawn: 3, lost: 7, points: 42, goalsFor: 62, goalsAgainst: 47, goalDifference: 15 },
    { position: 5, name: "Albion Rovers FC", played: 23, won: 11, drawn: 2, lost: 10, points: 35, goalsFor: 58, goalsAgainst: 46, goalDifference: 12 },
    { position: 6, name: "Johnstown FC", played: 20, won: 10, drawn: 3, lost: 7, points: 33, goalsFor: 60, goalsAgainst: 61, goalDifference: -1 },
    { position: 7, name: "Robinstown FC", played: 24, won: 8, drawn: 4, lost: 12, points: 28, goalsFor: 44, goalsAgainst: 56, goalDifference: -12 },
    { position: 8, name: "OMP United", played: 22, won: 8, drawn: 2, lost: 12, points: 26, goalsFor: 54, goalsAgainst: 53, goalDifference: 1 },
    { position: 9, name: "Castle Villa", played: 23, won: 7, drawn: 4, lost: 12, points: 25, goalsFor: 45, goalsAgainst: 60, goalDifference: -15 },
    { position: 10, name: "Kentstown Rovers FC", played: 22, won: 6, drawn: 5, lost: 11, points: 23, goalsFor: 41, goalsAgainst: 55, goalDifference: -14 },
    { position: 11, name: "Bohermeen Celtic FC", played: 22, won: 6, drawn: 3, lost: 13, points: 21, goalsFor: 38, goalsAgainst: 57, goalDifference: -19 },
    { position: 12, name: "Torro United FC", played: 23, won: 4, drawn: 3, lost: 16, points: 15, goalsFor: 42, goalsAgainst: 100, goalDifference: -58 },
    { position: 13, name: "Parkceltic Summerhill", played: 24, won: 3, drawn: 3, lost: 18, points: 12, goalsFor: 40, goalsAgainst: 87, goalDifference: -47 },
  ],
  "Superior Racking & Shelving Division 4": [
    { position: 1, name: "Sporting BJD FC", played: 24, won: 19, drawn: 2, lost: 3, points: 59, goalsFor: 99, goalsAgainst: 29, goalDifference: 70 },
    { position: 2, name: "Cootehill Harps", played: 25, won: 14, drawn: 2, lost: 9, points: 44, goalsFor: 71, goalsAgainst: 45, goalDifference: 26 },
    { position: 3, name: "OMP United", played: 23, won: 12, drawn: 4, lost: 7, points: 40, goalsFor: 59, goalsAgainst: 38, goalDifference: 21 },
    { position: 4, name: "Fordrew Rovers", played: 26, won: 11, drawn: 5, lost: 10, points: 38, goalsFor: 72, goalsAgainst: 70, goalDifference: 2 },
    { position: 5, name: "Rathkenny Rovers", played: 26, won: 11, drawn: 1, lost: 14, points: 34, goalsFor: 46, goalsAgainst: 70, goalDifference: -24 },
    { position: 6, name: "Raharney United FC", played: 21, won: 8, drawn: 2, lost: 11, points: 26, goalsFor: 42, goalsAgainst: 57, goalDifference: -15 },
    { position: 7, name: "Rossin Rovers", played: 21, won: 6, drawn: 3, lost: 12, points: 21, goalsFor: 52, goalsAgainst: 48, goalDifference: 4 },
    { position: 8, name: "Newtown Celtic FC", played: 24, won: 17, drawn: 2, lost: 5, points: 15, goalsFor: 68, goalsAgainst: 35, goalDifference: 33 },
    { position: 9, name: "Enfield Celtic FC", played: 27, won: 9, drawn: 1, lost: 17, points: 12, goalsFor: 47, goalsAgainst: 70, goalDifference: -23 },
    { position: 10, name: "Grove Rangers", played: 21, won: 2, drawn: 2, lost: 17, points: 8, goalsFor: 33, goalsAgainst: 76, goalDifference: -43 },
    { position: 11, name: "Ballyhaise Celtic", played: 23, won: 1, drawn: 4, lost: 18, points: 7, goalsFor: 26, goalsAgainst: 90, goalDifference: -64 },
    { position: 12, name: "Ballivor FC", played: 25, won: 16, drawn: 2, lost: 7, points: 6, goalsFor: 64, goalsAgainst: 54, goalDifference: 10 },
    { position: 13, name: "Trim Town FC", played: 23, won: 15, drawn: 3, lost: 5, points: 4, goalsFor: 71, goalsAgainst: 56, goalDifference: 15 },
    { position: 14, name: "Castle Villa", played: 25, won: 7, drawn: 5, lost: 13, points: 3, goalsFor: 42, goalsAgainst: 54, goalDifference: -12 },
  ],
  "UHY Farrelly Dawe White Womens Premier Division": [
    { position: 1, name: "Bellurgan United", played: 11, won: 11, drawn: 0, lost: 0, points: 33, goalsFor: 67, goalsAgainst: 4, goalDifference: 63 },
    { position: 2, name: "Kingscourt Harps AFC", played: 13, won: 9, drawn: 0, lost: 4, points: 27, goalsFor: 41, goalsAgainst: 23, goalDifference: 18 },
    { position: 3, name: "Athboy Celtic FC", played: 13, won: 7, drawn: 1, lost: 5, points: 22, goalsFor: 30, goalsAgainst: 37, goalDifference: -7 },
    { position: 4, name: "Parkvilla FC", played: 13, won: 6, drawn: 1, lost: 6, points: 19, goalsFor: 42, goalsAgainst: 35, goalDifference: 7 },
    { position: 5, name: "Albion Rovers FC", played: 13, won: 6, drawn: 0, lost: 7, points: 18, goalsFor: 36, goalsAgainst: 39, goalDifference: -3 },
    { position: 6, name: "Cootehill Harps", played: 11, won: 5, drawn: 0, lost: 6, points: 15, goalsFor: 29, goalsAgainst: 25, goalDifference: 4 },
    { position: 7, name: "Torro United FC", played: 13, won: 2, drawn: 2, lost: 9, points: 8, goalsFor: 14, goalsAgainst: 53, goalDifference: -39 },
    { position: 8, name: "Kinnegad Juniors AFC", played: 13, won: 1, drawn: 2, lost: 10, points: 5, goalsFor: 24, goalsAgainst: 67, goalDifference: -43 },
  ],
  "UHY Farrelly Dawe White Womens Division 1": [
    { position: 1, name: "Balbriggan FC", played: 12, won: 10, drawn: 2, lost: 0, points: 32, goalsFor: 49, goalsAgainst: 11, goalDifference: 38 },
    { position: 2, name: "Balrath FC", played: 13, won: 8, drawn: 2, lost: 3, points: 26, goalsFor: 41, goalsAgainst: 21, goalDifference: 20 },
    { position: 3, name: "Ballyhaise Celtic", played: 13, won: 6, drawn: 2, lost: 5, points: 20, goalsFor: 17, goalsAgainst: 23, goalDifference: -6 },
    { position: 4, name: "Kentstown Rovers FC", played: 12, won: 5, drawn: 2, lost: 5, points: 17, goalsFor: 33, goalsAgainst: 34, goalDifference: -1 },
    { position: 5, name: "Dunshaughlin Youths", played: 11, won: 4, drawn: 4, lost: 3, points: 16, goalsFor: 18, goalsAgainst: 18, goalDifference: 0 },
    { position: 6, name: "Ardee Celtic FC", played: 13, won: 3, drawn: 1, lost: 9, points: 10, goalsFor: 16, goalsAgainst: 48, goalDifference: -32 },
    { position: 7, name: "Duleek AFC", played: 11, won: 2, drawn: 2, lost: 7, points: 8, goalsFor: 23, goalsAgainst: 32, goalDifference: -9 },
    { position: 8, name: "Trim Celtic AFC", played: 11, won: 2, drawn: 1, lost: 8, points: 7, goalsFor: 23, goalsAgainst: 33, goalDifference: -10 },
  ],
  "UHY Farrelly Dawe White Division 2": [
    { position: 1, name: "Rossin Rovers", played: 14, won: 12, drawn: 0, lost: 2, points: 36, goalsFor: 60, goalsAgainst: 29, goalDifference: 31 },
    { position: 2, name: "Termonfeckin Celtic FC", played: 14, won: 11, drawn: 0, lost: 3, points: 33, goalsFor: 53, goalsAgainst: 21, goalDifference: 32 },
    { position: 3, name: "Carrick Rovers AFC", played: 14, won: 7, drawn: 1, lost: 6, points: 22, goalsFor: 64, goalsAgainst: 42, goalDifference: 22 },
    { position: 4, name: "Glen Magic FC", played: 14, won: 7, drawn: 1, lost: 6, points: 22, goalsFor: 34, goalsAgainst: 33, goalDifference: 1 },
    { position: 5, name: "Parkceltic Summerhill", played: 13, won: 6, drawn: 0, lost: 7, points: 18, goalsFor: 30, goalsAgainst: 28, goalDifference: 2 },
    { position: 6, name: "Dunshaughlin Youths", played: 13, won: 5, drawn: 1, lost: 7, points: 16, goalsFor: 20, goalsAgainst: 36, goalDifference: -16 },
    { position: 7, name: "Longwood AFC", played: 14, won: 4, drawn: 1, lost: 9, points: 13, goalsFor: 16, goalsAgainst: 36, goalDifference: -20 },
    { position: 8, name: "Torro United FC", played: 14, won: 1, drawn: 0, lost: 13, points: 3, goalsFor: 8, goalsAgainst: 60, goalDifference: -52 },
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
