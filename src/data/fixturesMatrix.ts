// src/data/fixturesMatrix.ts

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

// Mock team logos - in a real app these would be actual image URLs
const teamLogos: Record<string, string> = {
  // Men's teams
  'man-city': '/images/logos/UHY_Logo.webp',
  'arsenal': '/images/logos/oneills_logo.webp',
  'liverpool': '/images/logos/fai.webp',
  'chelsea': '/images/logos/lfa.webp',
  'tottenham': '/images/logos/conrad.webp',
  'man-united': '/images/logos/superior.webp',
  'newcastle': '/images/logos/pm-blinds.webp',
  'brighton': '/images/logos/UHY_Logo.webp',
  'real-madrid': '/images/logos/oneills_logo.webp',
  'barcelona': '/images/logos/fai.webp',
  'atletico-madrid': '/images/logos/lfa.webp',
  'real-sociedad': '/images/logos/conrad.webp',
  'inter-milan': '/images/logos/superior.webp',
  'juventus': '/images/logos/pm-blinds.webp',
  'ac-milan': '/images/logos/UHY_Logo.webp',
  'napoli': '/images/logos/oneills_logo.webp',
  'bayern-munich': '/images/logos/fai.webp',
  'dortmund': '/images/logos/lfa.webp',
  'leipzig': '/images/logos/conrad.webp',
  'psg': '/images/logos/superior.webp',
  'monaco': '/images/logos/pm-blinds.webp',
  'lyon': '/images/logos/UHY_Logo.webp',
  'ajax': '/images/logos/oneills_logo.webp',
  'psv': '/images/logos/fai.webp',
  'feyenoord': '/images/logos/lfa.webp',
  
  // Women's teams
  'chelsea-women': '/images/logos/UHY_Logo.webp',
  'arsenal-women': '/images/logos/oneills_logo.webp',
  'man-united-women': '/images/logos/fai.webp',
  'man-city-women': '/images/logos/lfa.webp',
  'liverpool-women': '/images/logos/conrad.webp',
  'tottenham-women': '/images/logos/superior.webp',
  'portland-thorns': '/images/logos/pm-blinds.webp',
  'ol-reign': '/images/logos/UHY_Logo.webp',
  'angel-city': '/images/logos/oneills_logo.webp',
  'san-diego-wave': '/images/logos/fai.webp',
  'barcelona-femeni': '/images/logos/lfa.webp',
  'real-madrid-femenino': '/images/logos/conrad.webp',
  'atletico-madrid-femenino': '/images/logos/superior.webp',
  'levante-femenino': '/images/logos/pm-blinds.webp',
  'athletic-femenino': '/images/logos/UHY_Logo.webp',
};

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
    logo: teamLogos[id] || '/images/logos/oneills_logo.webp',
    fixtures,
  };
}

export const fixturesMatrixData: FixturesMatrixData = {
  Men: {
    "Premier League": {
      leagueName: "Premier League",
      teams: [
        createTeamFixture('man-city', 'Man City', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
        createTeamFixture('arsenal', 'Arsenal', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
        createTeamFixture('liverpool', 'Liverpool', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
        createTeamFixture('chelsea', 'Chelsea', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
        createTeamFixture('tottenham', 'Tottenham', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
        createTeamFixture('man-united', 'Man United', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
        createTeamFixture('newcastle', 'Newcastle', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
        createTeamFixture('brighton', 'Brighton', ['man-city', 'arsenal', 'liverpool', 'chelsea', 'tottenham', 'man-united', 'newcastle', 'brighton']),
      ],
    },
    "La Liga": {
      leagueName: "La Liga",
      teams: [
        createTeamFixture('real-madrid', 'Real Madrid', ['real-madrid', 'barcelona', 'atletico-madrid', 'real-sociedad']),
        createTeamFixture('barcelona', 'Barcelona', ['real-madrid', 'barcelona', 'atletico-madrid', 'real-sociedad']),
        createTeamFixture('atletico-madrid', 'Atletico Madrid', ['real-madrid', 'barcelona', 'atletico-madrid', 'real-sociedad']),
        createTeamFixture('real-sociedad', 'Real Sociedad', ['real-madrid', 'barcelona', 'atletico-madrid', 'real-sociedad']),
      ],
    },
    "Serie A": {
      leagueName: "Serie A",
      teams: [
        createTeamFixture('inter-milan', 'Inter Milan', ['inter-milan', 'juventus', 'ac-milan', 'napoli']),
        createTeamFixture('juventus', 'Juventus', ['inter-milan', 'juventus', 'ac-milan', 'napoli']),
        createTeamFixture('ac-milan', 'AC Milan', ['inter-milan', 'juventus', 'ac-milan', 'napoli']),
        createTeamFixture('napoli', 'Napoli', ['inter-milan', 'juventus', 'ac-milan', 'napoli']),
      ],
    },
    "Bundesliga": {
      leagueName: "Bundesliga",
      teams: [
        createTeamFixture('bayern-munich', 'Bayern Munich', ['bayern-munich', 'dortmund', 'leipzig']),
        createTeamFixture('dortmund', 'Dortmund', ['bayern-munich', 'dortmund', 'leipzig']),
        createTeamFixture('leipzig', 'Leipzig', ['bayern-munich', 'dortmund', 'leipzig']),
      ],
    },
    "Ligue 1": {
      leagueName: "Ligue 1",
      teams: [
        createTeamFixture('psg', 'PSG', ['psg', 'monaco', 'lyon']),
        createTeamFixture('monaco', 'Monaco', ['psg', 'monaco', 'lyon']),
        createTeamFixture('lyon', 'Lyon', ['psg', 'monaco', 'lyon']),
      ],
    },
    "Eredivisie": {
      leagueName: "Eredivisie",
      teams: [
        createTeamFixture('ajax', 'Ajax', ['ajax', 'psv', 'feyenoord']),
        createTeamFixture('psv', 'PSV', ['ajax', 'psv', 'feyenoord']),
        createTeamFixture('feyenoord', 'Feyenoord', ['ajax', 'psv', 'feyenoord']),
      ],
    },
  },
  Women: {
    "WSL": {
      leagueName: "WSL",
      teams: [
        createTeamFixture('chelsea-women', 'Chelsea Women', ['chelsea-women', 'arsenal-women', 'man-united-women', 'man-city-women', 'liverpool-women', 'tottenham-women']),
        createTeamFixture('arsenal-women', 'Arsenal Women', ['chelsea-women', 'arsenal-women', 'man-united-women', 'man-city-women', 'liverpool-women', 'tottenham-women']),
        createTeamFixture('man-united-women', 'Man United Women', ['chelsea-women', 'arsenal-women', 'man-united-women', 'man-city-women', 'liverpool-women', 'tottenham-women']),
        createTeamFixture('man-city-women', 'Man City Women', ['chelsea-women', 'arsenal-women', 'man-united-women', 'man-city-women', 'liverpool-women', 'tottenham-women']),
        createTeamFixture('liverpool-women', 'Liverpool Women', ['chelsea-women', 'arsenal-women', 'man-united-women', 'man-city-women', 'liverpool-women', 'tottenham-women']),
        createTeamFixture('tottenham-women', 'Tottenham Women', ['chelsea-women', 'arsenal-women', 'man-united-women', 'man-city-women', 'liverpool-women', 'tottenham-women']),
      ],
    },
    "NWSL": {
      leagueName: "NWSL",
      teams: [
        createTeamFixture('portland-thorns', 'Portland Thorns', ['portland-thorns', 'ol-reign', 'angel-city', 'san-diego-wave']),
        createTeamFixture('ol-reign', 'OL Reign', ['portland-thorns', 'ol-reign', 'angel-city', 'san-diego-wave']),
        createTeamFixture('angel-city', 'Angel City', ['portland-thorns', 'ol-reign', 'angel-city', 'san-diego-wave']),
        createTeamFixture('san-diego-wave', 'San Diego Wave', ['portland-thorns', 'ol-reign', 'angel-city', 'san-diego-wave']),
      ],
    },
    "Liga F": {
      leagueName: "Liga F",
      teams: [
        createTeamFixture('barcelona-femeni', 'Barcelona Femení', ['barcelona-femeni', 'real-madrid-femenino', 'atletico-madrid-femenino', 'levante-femenino', 'athletic-femenino']),
        createTeamFixture('real-madrid-femenino', 'Real Madrid Femenino', ['barcelona-femeni', 'real-madrid-femenino', 'atletico-madrid-femenino', 'levante-femenino', 'athletic-femenino']),
        createTeamFixture('atletico-madrid-femenino', 'Atletico Madrid Femenino', ['barcelona-femeni', 'real-madrid-femenino', 'atletico-madrid-femenino', 'levante-femenino', 'athletic-femenino']),
        createTeamFixture('levante-femenino', 'Levante Femenino', ['barcelona-femeni', 'real-madrid-femenino', 'atletico-madrid-femenino', 'levante-femenino', 'athletic-femenino']),
        createTeamFixture('athletic-femenino', 'Athletic Femenino', ['barcelona-femeni', 'real-madrid-femenino', 'atletico-madrid-femenino', 'levante-femenino', 'athletic-femenino']),
      ],
    },
  },
};
