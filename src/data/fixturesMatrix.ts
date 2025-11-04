// src/data/fixturesMatrix.ts

import { getClubLogo } from "@/utils/clubLogos";

export type FixtureResult = {
  homeScore: number;
  awayScore: number;
  status: 'win' | 'loss' | 'draw';
  matchId: string;
  date?: string;
}

export type TeamFixture = {
  id: string;
  name: string;
  logo: string;
  fixtures: Record<string, FixtureResult | null>; // Key is opponent team id, null means no match played
}

export type LeagueFixtures = {
  leagueName: string;
  teams: TeamFixture[];
}

export type FixturesMatrixData = {
  Men: Record<string, LeagueFixtures>;
  Women: Record<string, LeagueFixtures>;
}

// Helper function to convert team name to kebab-case ID
function toTeamId(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateFixtureResult(): FixtureResult {
  const homeScore = Math.floor(Math.random() * 5);
  const awayScore = Math.floor(Math.random() * 5);
  
  let status: 'win' | 'loss' | 'draw';
  if (homeScore > awayScore) status = 'win';
  else if (homeScore < awayScore) status = 'loss';
  else status = 'draw';
  
  return {
    homeScore,
    awayScore,
    status,
    matchId: `match-${Math.random().toString(36).substr(2, 9)}`,
  };
}

function createTeamFixture(id: string, name: string, opponentIds: string[]): TeamFixture {
  const fixtures: Record<string, FixtureResult | null> = {};
  
  opponentIds.forEach(opponentId => {
    if (opponentId !== id) {
      fixtures[opponentId] = generateFixtureResult();
    }
  });
  
  return {
    id,
    name,
    logo: getClubLogo(name),
    fixtures,
  };
}

function createLeagueFixtures(leagueName: string, teamNames: string[]): LeagueFixtures {
  const teamIds = teamNames.map(toTeamId);
  const teams = teamNames.map((name, index) => 
    createTeamFixture(teamIds[index], name, teamIds)
  );

  return {
    leagueName,
    teams,
  };
}

export const fixturesMatrixData: FixturesMatrixData = {
  Men: {
    "UHY Farrelly Dawe White Premier Division": createLeagueFixtures(
      "UHY Farrelly Dawe White Premier Division",
      [
        "Parkvilla FC",
        "Duleek AFC",
        "Rock Celtic FC",
        "Quay Celtic FC",
        "Bellurgan United",
        "Trim Celtic AFC",
        "Glenmuir FC",
        "Carrick Rovers AFC",
        "Kentstown Rovers FC",
        "Albion Rovers FC",
      ]
    ),
    "O Neills Sportswear Division 1": createLeagueFixtures(
      "O Neills Sportswear Division 1",
      [
        "Johnstown FC",
        "Ardee Celtic FC",
        "Torro United FC",
        "Robinstown FC",
        "Kingscourt Harps AFC",
        "Athboy Celtic FC",
        "Walshestown FC",
        "Trim Celtic AFC",
        "Navan Town Cosmos",
      ]
    ),
    "PM Blinds & Shutters Division 2": createLeagueFixtures(
      "PM Blinds & Shutters Division 2",
      [
        "BJD Celtic",
        "Black Bull FC",
        "Enfield Celtic FC",
        "Duleek AFC",
        "Oldcastle United",
        "Termonfeckin Celtic FC",
        "Parkvilla FC",
        "Carrick Rovers AFC",
        "Virginia Celtic FC",
        "Trim Town FC",
        "Bailieboro Celtic AFC",
        "Kells Celtic Youths",
      ]
    ),
    "Superior Racking & Shelving Division 3": createLeagueFixtures(
      "Superior Racking & Shelving Division 3",
      [
        "Monaghan United FC",
        "Monaghan Town FC",
        "Cootehill Harps",
        "Rossin Rovers",
        "Ardee Celtic FC",
        "Rock Celtic FC",
        "Albion Rovers FC",
        "Bellurgan United",
        "Newtown United",
        "Kingscourt Harps AFC",
        "Termonfeckin Celtic FC",
        "Glenmuir FC",
      ]
    ),
    "Superior Racking & Shelving Division 3A": createLeagueFixtures(
      "Superior Racking & Shelving Division 3A",
      [
        "Aston Celtic FC",
        "Electro Celtic FC",
        "Longwood AFC",
        "Enfield Celtic FC",
        "Albion Rovers FC",
        "Johnstown FC",
        "Robinstown FC",
        "OMP United",
        "Castle Villa",
        "Kentstown Rovers FC",
        "Bohermeen Celtic FC",
        "Torro United FC",
        "Parkceltic Summerhill",
      ]
    ),
    "Superior Racking & Shelving Division 4": createLeagueFixtures(
      "Superior Racking & Shelving Division 4",
      [
        "Sporting BJD FC",
        "Cootehill Harps",
        "OMP United",
        "Fordrew Rovers",
        "Rathkenny Rovers",
        "Raharney United FC",
        "Rossin Rovers",
        "Newtown Celtic FC",
        "Enfield Celtic FC",
        "Grove Rangers",
        "Ballyhaise Celtic",
        "Ballivor FC",
        "Trim Town FC",
        "Castle Villa",
      ]
    ),
  },
  Women: {
    "UHY Farrelly Dawe White Womens Premier Division": createLeagueFixtures(
      "UHY Farrelly Dawe White Womens Premier Division",
      [
        "Bellurgan United",
        "Kingscourt Harps AFC",
        "Athboy Celtic FC",
        "Parkvilla FC",
        "Albion Rovers FC",
        "Cootehill Harps",
        "Torro United FC",
        "Kinnegad Juniors AFC",
      ]
    ),
    "UHY Farrelly Dawe White Womens Division 1": createLeagueFixtures(
      "UHY Farrelly Dawe White Womens Division 1",
      [
        "Balbriggan FC",
        "Balrath FC",
        "Ballyhaise Celtic",
        "Kentstown Rovers FC",
        "Dunshaughlin Youths",
        "Ardee Celtic FC",
        "Duleek AFC",
        "Trim Celtic AFC",
      ]
    ),
    "UHY Farrelly Dawe White Division 2": createLeagueFixtures(
      "UHY Farrelly Dawe White Division 2",
      [
        "Rossin Rovers",
        "Termonfeckin Celtic FC",
        "Carrick Rovers AFC",
        "Glen Magic FC",
        "Parkceltic Summerhill",
        "Dunshaughlin Youths",
        "Longwood AFC",
        "Torro United FC",
      ]
    ),
  },
};
