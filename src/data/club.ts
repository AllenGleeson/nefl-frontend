// /data/clubs.ts
import { getClubLogo } from "@/utils/clubLogos";
import { localLeagueTablesData } from "@/data/localLeagueTables";

export type Fixture = {
  date: string;
  opponent: string;
  result?: string; // "3-2", "0-0", or undefined if upcoming
};

export type Player = {
  name: string;
  position: string;
  number: number;
};

export type Club = {
  name: string;
  slug: string;
  logo: string;
  leagues: string[];
  founded: number;
  ground: string;
  bio: string;
  website?: string;

  // 🔽 extra fields for club detail page
  stats?: {
    leaguePosition: number;
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };

  squad?: Player[];

  fixtures?: Fixture[];

  history?: {
    narrative: string;
    achievements?: string[];
  };

  achievements?: Array<{
    id: string;
    title: string;
    year: number;
    type: 'league' | 'cup' | 'trophy' | 'award';
    competition: string;
    position?: 'winner' | 'runner-up' | 'semi-finalist' | 'quarter-finalist';
    description?: string;
  }>;

  formation?: {
    id: string;
    name: string;
    description?: string;
    positions: Array<{
      id: string;
      position: string;
      x: number;
      y: number;
      playerId?: string;
      playerName?: string;
    }>;
  };
};

// Helper function to get stats from league tables
const getClubStats = (clubName: string, leagueName: string) => {
  const leagueData = localLeagueTablesData[leagueName];
  if (!leagueData) return undefined;
  
  const team = leagueData.find(t => t.name === clubName);
  if (!team) return undefined;
  
  return {
    leaguePosition: team.position,
    matchesPlayed: team.played,
    wins: team.won,
    draws: team.drawn,
    losses: team.lost,
    goalsFor: team.goalsFor,
    goalsAgainst: team.goalsAgainst,
  };
};

export const clubs: Club[] = [
  {
    name: "Parkvilla FC",
    slug: "parkvilla-fc",
    logo: getClubLogo("Parkvilla FC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1975,
    ground: "Parkvilla Stadium",
    bio: "League leaders with a strong attacking style and excellent defensive record. Consistently competing at the top of the Premier Division.",
    website: "https://example.com",
    stats: getClubStats("Parkvilla FC", "UHY Farrelly Dawe White Premier Division"),
    squad: [
      { name: "John Smith", position: "GK", number: 1 },
      { name: "David Kelly", position: "GK", number: 13 },
      { name: "Michael O'Connor", position: "DF", number: 5 },
      { name: "Shane McCabe", position: "DF", number: 2 },
      { name: "Brian Duffy", position: "DF", number: 3 },
      { name: "Eoin O'Reilly", position: "DF", number: 15 },
      { name: "Patrick Byrne", position: "MF", number: 8 },
      { name: "Conor Lynch", position: "MF", number: 6 },
      { name: "Kevin Nolan", position: "MF", number: 11 },
      { name: "Ryan McKenna", position: "MF", number: 18 },
      { name: "Sean Murphy", position: "FW", number: 10 },
      { name: "Ciaran McManus", position: "FW", number: 9 },
      { name: "Liam Donnelly", position: "FW", number: 17 },
    ],
    fixtures: [
      { date: "15/08/2025", opponent: "Duleek AFC", result: "2 - 1" },
      { date: "22/08/2025", opponent: "Duleek AFC" },
      { date: "30/08/2025", opponent: "Rock Celtic FC" },
      { date: "26/09/2025", opponent: "Carrick Rovers AFC", result: "3 - 1" },
      { date: "17/10/2025", opponent: "Rock Celtic FC", result: "3 - 1" },
    ],
    history: {
      narrative: "Founded in 1975, Parkvilla FC has established itself as a dominant force in the NEFL Premier Division. The club combines excellent youth development with a strong senior team, consistently challenging for league honors.",
    },
    achievements: [
      {
        id: "prem-2024",
        title: "Premier Division Champions",
        year: 2024,
        type: "league",
        competition: "UHY Farrelly Dawe White Premier Division",
        position: "winner",
        description: "Won the Premier Division title with a strong season"
      },
      {
        id: "prem-2021",
        title: "Premier Division Champions",
        year: 2021,
        type: "league",
        competition: "UHY Farrelly Dawe White Premier Division",
        position: "winner",
        description: "Secured the league title with consistent performances"
      },
      {
        id: "fai-cup-2019",
        title: "FAI Junior Cup Winners",
        year: 2019,
        type: "cup",
        competition: "FAI Junior Cup",
        position: "winner",
        description: "Victorious in the national junior cup competition"
      }
    ],
    formation: {
      id: "4-4-2",
      name: "4-4-2",
      description: "Classic balanced formation with two strikers",
      positions: [
        { id: "gk", position: "GK", x: 50, y: 5, playerId: "john-smith", playerName: "John Smith" },
        { id: "lb", position: "LB", x: 20, y: 25, playerId: "shane-mccabe", playerName: "Shane McCabe" },
        { id: "cb1", position: "CB", x: 35, y: 25, playerId: "michael-oconnor", playerName: "Michael O'Connor" },
        { id: "cb2", position: "CB", x: 65, y: 25, playerId: "brian-duffy", playerName: "Brian Duffy" },
        { id: "rb", position: "RB", x: 80, y: 25, playerId: "eoin-oreilly", playerName: "Eoin O'Reilly" },
        { id: "lm", position: "LM", x: 20, y: 45, playerId: "kevin-nolan", playerName: "Kevin Nolan" },
        { id: "cm1", position: "CM", x: 40, y: 45, playerId: "patrick-byrne", playerName: "Patrick Byrne" },
        { id: "cm2", position: "CM", x: 60, y: 45, playerId: "conor-lynch", playerName: "Conor Lynch" },
        { id: "rm", position: "RM", x: 80, y: 45, playerId: "ryan-mckenna", playerName: "Ryan McKenna" },
        { id: "st1", position: "ST", x: 40, y: 75, playerId: "sean-murphy", playerName: "Sean Murphy" },
        { id: "st2", position: "ST", x: 60, y: 75, playerId: "ciaran-mcmanus", playerName: "Ciaran McManus" }
      ]
    },
  },
  {
    name: "Duleek AFC",
    slug: "duleek-afc",
    logo: getClubLogo("Duleek AFC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1985,
    ground: "Duleek Sports Ground",
    bio: "Strong Premier Division side with excellent defensive record and consistent performances. Always challenging for league honors.",
    website: "https://example.com/duleek-afc",
    stats: getClubStats("Duleek AFC", "UHY Farrelly Dawe White Premier Division"),
    squad: [
      { name: "Brian Murphy", position: "GK", number: 1 },
      { name: "Sean O'Connor", position: "GK", number: 16 },
      { name: "Kevin Brady", position: "DF", number: 2 },
      { name: "Martin Kelly", position: "DF", number: 3 },
      { name: "Tony Walsh", position: "DF", number: 4 },
      { name: "Derek O'Neill", position: "DF", number: 5 },
      { name: "Paul Murphy", position: "MF", number: 6 },
      { name: "Johnny Lynch", position: "MF", number: 7 },
      { name: "Gary Smith", position: "MF", number: 8 },
      { name: "Chris Ward", position: "MF", number: 10 },
      { name: "Alan Byrne", position: "FW", number: 9 },
      { name: "Robbie Kelly", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "15/08/2025", opponent: "Parkvilla FC", result: "1 - 2" },
      { date: "22/08/2025", opponent: "Parkvilla FC" },
      { date: "03/10/2025", opponent: "Trim Celtic AFC", result: "1 - 1" },
    ],
    history: {
      achievements: [
        "Premier Division Runners-up 2016, 2021",
        "FAI Junior Cup Quarter-Finalists 2018",
        "Leinster Senior League Cup Winners 2019",
      ],
      narrative: "Founded in 1985, Duleek AFC has established itself as a competitive force in the Premier Division. The club prides itself on its attacking style of play and strong local community support.",
    },
  },
  {
    name: "Rock Celtic FC",
    slug: "rock-celtic-fc",
    logo: getClubLogo("Rock Celtic FC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1962,
    ground: "Rock Park",
    bio: "Established Premier Division side with loyal support and a rich tradition of success. Known for consistent performances.",
    website: "https://example.com/rock-celtic-fc",
    stats: getClubStats("Rock Celtic FC", "UHY Farrelly Dawe White Premier Division"),
    squad: [
      { name: "David Murphy", position: "GK", number: 1 },
      { name: "Sean Kelly", position: "GK", number: 12 },
      { name: "Mark O'Brien", position: "DF", number: 2 },
      { name: "Paul Matthews", position: "DF", number: 3 },
      { name: "Stephen Lynch", position: "DF", number: 4 },
      { name: "Danny Ward", position: "DF", number: 5 },
      { name: "Chris Murphy", position: "MF", number: 6 },
      { name: "Gary Byrne", position: "MF", number: 7 },
      { name: "Alan Smith", position: "MF", number: 8 },
      { name: "Robbie O'Connor", position: "MF", number: 10 },
      { name: "Johnny Kelly", position: "FW", number: 9 },
      { name: "Derek Murphy", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "15/08/2025", opponent: "Kentstown Rovers FC", result: "3 - 0" },
      { date: "30/08/2025", opponent: "Parkvilla FC" },
      { date: "19/09/2025", opponent: "Albion Rovers FC", result: "2 - 1" },
      { date: "03/10/2025", opponent: "Quay Celtic FC" },
      { date: "17/10/2025", opponent: "Parkvilla FC", result: "1 - 3" },
    ],
    history: {
      narrative: "One of the most successful clubs in the league, Rock Celtic FC was founded in 1962 and has consistently been at the top of Irish junior football. The club has produced numerous players who have gone on to play professionally.",
    },
    achievements: [
      {
        id: "prem-2023",
        title: "Premier Division Champions",
        year: 2023,
        type: "league",
        competition: "UHY Farrelly Dawe White Premier Division",
        position: "winner",
        description: "Latest Premier Division title, maintaining their dominance"
      },
      {
        id: "prem-2020",
        title: "Premier Division Champions",
        year: 2020,
        type: "league",
        competition: "UHY Farrelly Dawe White Premier Division",
        position: "winner",
        description: "Won the Premier Division in a shortened season"
      },
      {
        id: "fai-cup-2019",
        title: "FAI Junior Cup Winners",
        year: 2019,
        type: "cup",
        competition: "FAI Junior Cup",
        position: "winner",
        description: "Victorious in the national junior cup competition"
      }
    ],
    formation: {
      id: "3-5-2",
      name: "3-5-2",
      description: "Unconventional formation with wing-backs",
      positions: [
        { id: "gk", position: "GK", x: 50, y: 5, playerId: "david-murphy", playerName: "David Murphy" },
        { id: "cb1", position: "CB", x: 30, y: 25, playerId: "mark-obrien", playerName: "Mark O'Brien" },
        { id: "cb2", position: "CB", x: 50, y: 25, playerId: "paul-matthews", playerName: "Paul Matthews" },
        { id: "cb3", position: "CB", x: 70, y: 25, playerId: "stephen-lynch", playerName: "Stephen Lynch" },
        { id: "lwb", position: "LWB", x: 15, y: 45, playerId: "danny-ward", playerName: "Danny Ward" },
        { id: "cdm", position: "CDM", x: 50, y: 40, playerId: "chris-murphy", playerName: "Chris Murphy" },
        { id: "rwb", position: "RWB", x: 85, y: 45, playerId: "gary-byrne", playerName: "Gary Byrne" },
        { id: "cm1", position: "CM", x: 35, y: 60, playerId: "alan-smith", playerName: "Alan Smith" },
        { id: "cm2", position: "CM", x: 65, y: 60, playerId: "robbie-oconnor", playerName: "Robbie O'Connor" },
        { id: "st1", position: "ST", x: 40, y: 80, playerId: "johnny-kelly", playerName: "Johnny Kelly" },
        { id: "st2", position: "ST", x: 60, y: 80, playerId: "derek-murphy", playerName: "Derek Murphy" }
      ]
    },
  },
  {
    name: "Quay Celtic FC",
    slug: "quay-celtic-fc",
    logo: getClubLogo("Quay Celtic FC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1978,
    ground: "Quay Park",
    bio: "Competitive Premier Division side with a strong attacking style. Known for exciting football and passionate local support.",
    website: "https://example.com/quay-celtic-fc",
    stats: getClubStats("Quay Celtic FC", "UHY Farrelly Dawe White Premier Division"),
    fixtures: [
      { date: "16/08/2025", opponent: "Bellurgan United", result: "2 - 0" },
      { date: "19/09/2025", opponent: "Glenmuir FC" },
      { date: "03/10/2025", opponent: "Rock Celtic FC" },
      { date: "24/10/2025", opponent: "Albion Rovers FC", result: "2 - 0" },
    ],
    history: {
      narrative: "Founded in 1978, Quay Celtic FC has built a reputation for attractive, attacking football. The club has consistently competed in the Premier Division and maintains strong community ties.",
    },
  },
  {
    name: "Bellurgan United",
    slug: "bellurgan-united",
    logo: getClubLogo("Bellurgan United"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1972,
    ground: "Bellurgan Park",
    bio: "Established Premier Division club with a proud history and strong community presence. Known for developing local talent.",
    website: "https://example.com/bellurgan-united",
    stats: getClubStats("Bellurgan United", "UHY Farrelly Dawe White Premier Division"),
    fixtures: [
      { date: "16/08/2025", opponent: "Quay Celtic FC", result: "0 - 2" },
      { date: "30/08/2025", opponent: "Quay Celtic FC" },
      { date: "26/09/2025", opponent: "Kentstown Rovers FC" },
      { date: "10/10/2025", opponent: "Albion Rovers FC", result: "2 - 1" },
      { date: "31/10/2025", opponent: "Rock Celtic FC", result: "1 - 1" },
    ],
    history: {
      narrative: "Established in 1972, Bellurgan United has a long tradition in the NEFL. The club focuses on youth development while maintaining competitive senior teams.",
    },
  },
  {
    name: "Johnstown FC",
    slug: "johnstown-fc",
    logo: getClubLogo("Johnstown FC"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 1990,
    ground: "Johnstown Park",
    bio: "Division 1 leaders with an impressive record. Strong attacking team with excellent goal difference and consistent performances.",
    website: "https://example.com/johnstown-fc",
    stats: getClubStats("Johnstown FC", "O Neills Sportswear Division 1"),
    squad: [
      { name: "Michael Reilly", position: "GK", number: 1 },
      { name: "Tommy Walsh", position: "GK", number: 13 },
      { name: "Brian Kelly", position: "DF", number: 2 },
      { name: "Paul Lynch", position: "DF", number: 3 },
      { name: "Stephen Murphy", position: "DF", number: 4 },
      { name: "Danny O'Connor", position: "DF", number: 5 },
      { name: "Chris Byrne", position: "MF", number: 6 },
      { name: "Gary Smith", position: "MF", number: 7 },
      { name: "Alan Ward", position: "MF", number: 8 },
      { name: "Robbie Kelly", position: "MF", number: 10 },
      { name: "Johnny Murphy", position: "FW", number: 9 },
      { name: "Derek Lynch", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "16/08/2025", opponent: "Trim Celtic AFC", result: "1 - 1" },
      { date: "23/08/2025", opponent: "Ardee Celtic FC" },
      { date: "20/09/2025", opponent: "Torro United FC", result: "1 - 3" },
      { date: "27/09/2025", opponent: "Robinstown FC", result: "2 - 1" },
      { date: "18/10/2025", opponent: "Walshestown FC", result: "4 - 0" },
      { date: "25/10/2025", opponent: "Walshestown FC", result: "5 - 0" },
      { date: "01/11/2025", opponent: "Ardee Celtic FC", result: "2 - 0" },
    ],
    history: {
      achievements: [
        "Division 1 Champions 2018",
        "FAI Junior Cup Round of 16 2019",
        "Meath County Cup Winners 2020, 2022",
      ],
      narrative: "Since 1990, Johnstown FC has been a consistent performer in Division 1, known for their fighting spirit and determination. The club has a strong youth academy and regularly challenges for promotion.",
    },
  },
  {
    name: "Ardee Celtic FC",
    slug: "ardee-celtic-fc",
    logo: getClubLogo("Ardee Celtic FC"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 1975,
    ground: "Townspark, Ardee",
    bio: "A historic club known for nurturing young talent in County Louth with a strong emphasis on youth development. Currently competing strongly in Division 1.",
    website: "https://example.com/ardee-celtic",
    stats: getClubStats("Ardee Celtic FC", "O Neills Sportswear Division 1"),
    squad: [
      { name: "Tommy Murphy", position: "GK", number: 1 },
      { name: "James O'Brien", position: "GK", number: 12 },
      { name: "Mark Reilly", position: "DF", number: 2 },
      { name: "Paul Matthews", position: "DF", number: 4 },
      { name: "Stephen Kelly", position: "DF", number: 5 },
      { name: "Danny Lynch", position: "DF", number: 6 },
      { name: "Chris Byrne", position: "MF", number: 7 },
      { name: "Robbie Walsh", position: "MF", number: 8 },
      { name: "Gary O'Hanlon", position: "MF", number: 10 },
      { name: "Alan Smith", position: "MF", number: 14 },
      { name: "Derek Murphy", position: "FW", number: 9 },
      { name: "Johnny Ward", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "17/08/2025", opponent: "Torro United FC", result: "0 - 2" },
      { date: "23/08/2025", opponent: "Johnstown FC" },
      { date: "20/09/2025", opponent: "Robinstown FC", result: "2 - 2" },
      { date: "11/10/2025", opponent: "Kingscourt Harps AFC", result: "3 - 1" },
      { date: "01/11/2025", opponent: "Johnstown FC", result: "0 - 2" },
    ],
    history: {
      narrative: "Established in 1975, Ardee Celtic has built a reputation for developing young players and maintaining strong community ties. The club has consistently competed at a high level while focusing on grassroots football development.",
    },
      achievements: [
      {
        id: "div1-2019",
        title: "Division 1 Champions",
        year: 2019,
        type: "league",
        competition: "O Neills Sportswear Division 1",
        position: "winner",
        description: "Won the Division 1 title with an unbeaten season"
      },
      {
        id: "div1-2015",
        title: "Division 1 Champions",
        year: 2015,
        type: "league",
        competition: "O Neills Sportswear Division 1",
        position: "winner",
        description: "First Division 1 title in club history"
      },
      {
        id: "lsl-cup-2020",
        title: "Leinster Senior League Cup Winners",
        year: 2020,
        type: "cup",
        competition: "Leinster Senior League Cup",
        position: "winner",
        description: "Victorious in the prestigious Leinster Senior League Cup"
      }
    ],
    formation: {
      id: "4-3-3",
      name: "4-3-3",
      description: "Attacking formation with wingers",
      positions: [
        { id: "gk", position: "GK", x: 50, y: 5, playerId: "tommy-murphy", playerName: "Tommy Murphy" },
        { id: "lb", position: "LB", x: 20, y: 25, playerId: "mark-reilly", playerName: "Mark Reilly" },
        { id: "cb1", position: "CB", x: 35, y: 25, playerId: "paul-matthews", playerName: "Paul Matthews" },
        { id: "cb2", position: "CB", x: 65, y: 25, playerId: "stephen-kelly", playerName: "Stephen Kelly" },
        { id: "rb", position: "RB", x: 80, y: 25, playerId: "danny-lynch", playerName: "Danny Lynch" },
        { id: "cdm", position: "CDM", x: 50, y: 40, playerId: "chris-byrne", playerName: "Chris Byrne" },
        { id: "cm1", position: "CM", x: 35, y: 55, playerId: "robbie-walsh", playerName: "Robbie Walsh" },
        { id: "cm2", position: "CM", x: 65, y: 55, playerId: "gary-ohanlon", playerName: "Gary O'Hanlon" },
        { id: "lw", position: "LW", x: 20, y: 75, playerId: "alan-smith", playerName: "Alan Smith" },
        { id: "st", position: "ST", x: 50, y: 75, playerId: "derek-murphy", playerName: "Derek Murphy" },
        { id: "rw", position: "RW", x: 80, y: 75, playerId: "johnny-ward", playerName: "Johnny Ward" }
      ]
    },
  },
  {
    name: "Torro United FC",
    slug: "torro-united-fc",
    logo: getClubLogo("Torro United FC"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 1988,
    ground: "Torro Sports Centre",
    bio: "Competitive Division 1 side with strong attacking capabilities. Known for exciting matches and passionate local support.",
    website: "https://example.com/torro-united-fc",
    stats: getClubStats("Torro United FC", "O Neills Sportswear Division 1"),
    fixtures: [
      { date: "17/08/2025", opponent: "Ardee Celtic FC", result: "2 - 0" },
      { date: "20/09/2025", opponent: "Johnstown FC", result: "1 - 3" },
      { date: "11/10/2025", opponent: "Robinstown FC", result: "0 - 2" },
      { date: "18/10/2025", opponent: "Robinstown FC" },
      { date: "25/10/2025", opponent: "Athboy Celtic FC", result: "1 - 1" },
    ],
    history: {
      narrative: "Founded in 1988, Torro United FC has established itself as a competitive force in Division 1. The club focuses on attacking football and developing local talent.",
    },
  },
  {
    name: "Robinstown FC",
    slug: "robinstown-fc",
    logo: getClubLogo("Robinstown FC"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 1995,
    ground: "Robinstown Ground",
    bio: "Solid Division 1 team with consistent performances. Known for their disciplined approach and strong team spirit.",
    website: "https://example.com/robinstown-fc",
    stats: getClubStats("Robinstown FC", "O Neills Sportswear Division 1"),
    fixtures: [
      { date: "17/08/2025", opponent: "Kingscourt Harps AFC", result: "3 - 1" },
      { date: "20/09/2025", opponent: "Ardee Celtic FC", result: "2 - 2" },
      { date: "27/09/2025", opponent: "Johnstown FC", result: "1 - 2" },
      { date: "11/10/2025", opponent: "Torro United FC", result: "2 - 0" },
      { date: "01/11/2025", opponent: "Athboy Celtic FC", result: "3 - 2" },
    ],
    history: {
      narrative: "Established in 1995, Robinstown FC has built a reputation for consistency and team cohesion. The club prides itself on its community involvement and player development.",
    },
  },
  {
    name: "Kingscourt Harps AFC",
    slug: "kingscourt-harps-afc",
    logo: getClubLogo("Kingscourt Harps AFC"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 1971,
    ground: "O'Rourke Park, Kingscourt",
    bio: "Cavan's representative club, blending tradition and ambition with a focus on developing local talent. Competing in Division 1.",
    website: "https://example.com/kingscourt-harps-afc",
    stats: getClubStats("Kingscourt Harps AFC", "O Neills Sportswear Division 1"),
    squad: [
      { name: "Michael Murphy", position: "GK", number: 1 },
      { name: "Tommy Kelly", position: "GK", number: 13 },
      { name: "Mark Lynch", position: "DF", number: 2 },
      { name: "Paul O'Brien", position: "DF", number: 3 },
      { name: "Stephen Ward", position: "DF", number: 4 },
      { name: "Danny Murphy", position: "DF", number: 5 },
      { name: "Chris Smith", position: "MF", number: 6 },
      { name: "Gary Byrne", position: "MF", number: 7 },
      { name: "Alan Kelly", position: "MF", number: 8 },
      { name: "Robbie Lynch", position: "MF", number: 10 },
      { name: "Johnny O'Connor", position: "FW", number: 9 },
      { name: "Derek Murphy", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "17/08/2025", opponent: "Robinstown FC", result: "1 - 3" },
      { date: "20/09/2025", opponent: "Athboy Celtic FC" },
      { date: "04/10/2025", opponent: "Johnstown FC" },
      { date: "11/10/2025", opponent: "Ardee Celtic FC", result: "1 - 3" },
      { date: "25/10/2025", opponent: "Robinstown FC" },
      { date: "01/11/2025", opponent: "Torro United FC" },
    ],
    history: {
      achievements: [
        "Division 1 Champions 2014, 2018",
        "Cavan County Cup Winners 2016, 2019, 2021",
        "FAI Junior Cup Round of 16 2017",
      ],
      narrative: "Founded in 1971, Kingscourt Harps represents County Cavan in the league. The club has a proud tradition and has consistently competed at a high level while maintaining strong community ties.",
    },
  },
  {
    name: "Athboy Celtic FC",
    slug: "athboy-celtic-fc",
    logo: getClubLogo("Athboy Celtic FC"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 1988,
    ground: "The Green, Athboy",
    bio: "Passionate local side known for grit and hard-fought victories with strong community backing. Competing in Division 1.",
    website: "https://example.com/athboy-celtic-fc",
    stats: getClubStats("Athboy Celtic FC", "O Neills Sportswear Division 1"),
    squad: [
      { name: "Brian Murphy", position: "GK", number: 1 },
      { name: "Sean Kelly", position: "GK", number: 15 },
      { name: "Mark O'Brien", position: "DF", number: 2 },
      { name: "Paul Ward", position: "DF", number: 3 },
      { name: "Stephen Lynch", position: "DF", number: 4 },
      { name: "Danny Smith", position: "DF", number: 5 },
      { name: "Chris Murphy", position: "MF", number: 6 },
      { name: "Gary Byrne", position: "MF", number: 7 },
      { name: "Alan O'Connor", position: "MF", number: 8 },
      { name: "Robbie Kelly", position: "MF", number: 10 },
      { name: "Johnny Murphy", position: "FW", number: 9 },
      { name: "Derek Lynch", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "16/08/2025", opponent: "Walshestown FC", result: "4 - 2" },
      { date: "23/08/2025", opponent: "Robinstown FC" },
      { date: "04/10/2025", opponent: "Walshestown FC", result: "3 - 2" },
      { date: "11/10/2025", opponent: "Johnstown FC" },
      { date: "25/10/2025", opponent: "Torro United FC", result: "1 - 1" },
      { date: "01/11/2025", opponent: "Robinstown FC", result: "2 - 3" },
    ],
    history: {
      achievements: [
        "Division 1 Runners-up 2019",
        "Meath County Cup Semi-Finalists 2018",
        "FAI Junior Cup Round of 64 2019",
      ],
      narrative: "Established in 1988, Athboy Celtic FC has built a reputation for being a tough, hard-working team that never gives up. The club has strong local support and prides itself on its fighting spirit.",
    },
  },
  {
    name: "Walshestown FC",
    slug: "walshestown-fc",
    logo: getClubLogo("Walshestown FC"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 1980,
    ground: "Walshestown Ground",
    bio: "Division 1 side with a strong community focus. Known for their fighting spirit and commitment to developing local players.",
    website: "https://example.com/walshestown-fc",
    stats: getClubStats("Walshestown FC", "O Neills Sportswear Division 1"),
    fixtures: [
      { date: "16/08/2025", opponent: "Athboy Celtic FC", result: "2 - 4" },
      { date: "27/09/2025", opponent: "Navan Town Cosmos", result: "1 - 0" },
      { date: "04/10/2025", opponent: "Athboy Celtic FC", result: "2 - 3" },
      { date: "18/10/2025", opponent: "Johnstown FC", result: "0 - 4" },
      { date: "25/10/2025", opponent: "Johnstown FC", result: "0 - 5" },
    ],
    history: {
      narrative: "Founded in 1980, Walshestown FC has been a consistent presence in Division 1. The club focuses on community engagement and developing young talent.",
    },
  },
  {
    name: "Trim Celtic AFC",
    slug: "trim-celtic-afc",
    logo: getClubLogo("Trim Celtic AFC"),
    leagues: ["UHY Farrelly Dawe White Premier Division", "O Neills Sportswear Division 1"],
    founded: 1973,
    ground: "Tully Park, Trim",
    bio: "Youth development and grassroots football are at the heart of the club, with a focus on community engagement. Competing in both Premier Division and Division 1.",
    website: "https://example.com/trim-celtic",
    stats: getClubStats("Trim Celtic AFC", "UHY Farrelly Dawe White Premier Division"),
    squad: [
      { name: "Tommy O'Brien", position: "GK", number: 1 },
      { name: "James Murphy", position: "GK", number: 14 },
      { name: "Mark Kelly", position: "DF", number: 2 },
      { name: "Paul Lynch", position: "DF", number: 3 },
      { name: "Stephen Ward", position: "DF", number: 4 },
      { name: "Danny Smith", position: "DF", number: 5 },
      { name: "Chris Byrne", position: "MF", number: 6 },
      { name: "Gary O'Connor", position: "MF", number: 7 },
      { name: "Alan Murphy", position: "MF", number: 8 },
      { name: "Robbie Kelly", position: "MF", number: 10 },
      { name: "Johnny Lynch", position: "FW", number: 9 },
      { name: "Derek Ward", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "16/08/2025", opponent: "Johnstown FC", result: "1 - 1" },
      { date: "24/08/2025", opponent: "Carrick Rovers AFC" },
      { date: "03/10/2025", opponent: "Duleek AFC", result: "1 - 1" },
      { date: "24/10/2025", opponent: "Glenmuir FC" },
    ],
    history: {
      achievements: [
        "Division 1 Runners-up 2019",
        "FAI Junior Cup Round of 32 2020",
        "Meath County Cup Winners 2017, 2021",
      ],
      narrative: "Founded in 1973, Trim Celtic has always prioritized youth development and community involvement. The club runs one of the most successful youth academies in the region and has a strong tradition of developing local talent.",
    },
  },
  {
    name: "Navan Town Cosmos",
    slug: "navan-town-cosmos",
    logo: getClubLogo("Navan Town Cosmos"),
    leagues: ["O Neills Sportswear Division 1"],
    founded: 2005,
    ground: "Navan Sports Centre",
    bio: "Relatively new club with ambitious plans. Competing in Division 1 with a focus on building a strong foundation.",
    website: "https://example.com/navan-town-cosmos",
    stats: getClubStats("Navan Town Cosmos", "O Neills Sportswear Division 1"),
    fixtures: [
      { date: "29/08/2025", opponent: "Walshestown FC" },
      { date: "27/09/2025", opponent: "Walshestown FC", result: "0 - 1" },
      { date: "04/10/2025", opponent: "Trim Celtic AFC" },
      { date: "18/10/2025", opponent: "Ardee Celtic FC" },
    ],
    history: {
      narrative: "Founded in 2005, Navan Town Cosmos is a relatively new club with ambitious plans for growth. The club focuses on building a strong foundation and developing local talent.",
    },
  },
  {
    name: "Glenmuir FC",
    slug: "glenmuir-fc",
    logo: getClubLogo("Glenmuir FC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1965,
    ground: "Glenmuir Ground",
    bio: "Premier Division side with a long history in the NEFL. Known for their commitment to the local community.",
    website: "https://example.com/glenmuir-fc",
    stats: getClubStats("Glenmuir FC", "UHY Farrelly Dawe White Premier Division"),
    fixtures: [
      { date: "22/08/2025", opponent: "Albion Rovers FC" },
      { date: "19/09/2025", opponent: "Quay Celtic FC" },
      { date: "10/10/2025", opponent: "Kentstown Rovers FC" },
      { date: "24/10/2025", opponent: "Trim Celtic AFC" },
    ],
    history: {
      narrative: "Established in 1965, Glenmuir FC has been a consistent presence in the NEFL. The club maintains strong community ties and focuses on developing local players.",
    },
  },
  {
    name: "Carrick Rovers AFC",
    slug: "carrick-rovers-afc",
    logo: getClubLogo("Carrick Rovers AFC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1999,
    ground: "Carrick Sports Grounds",
    bio: "One of the fastest-growing clubs in Monaghan with strong youth academies and ambitious plans for the future. Competing in the Premier Division.",
    website: "https://example.com/carrick-rovers-afc",
    stats: getClubStats("Carrick Rovers AFC", "UHY Farrelly Dawe White Premier Division"),
    squad: [
      { name: "David Murphy", position: "GK", number: 1 },
      { name: "Sean Kelly", position: "GK", number: 12 },
      { name: "Mark O'Brien", position: "DF", number: 2 },
      { name: "Paul Lynch", position: "DF", number: 3 },
      { name: "Stephen Ward", position: "DF", number: 4 },
      { name: "Danny Smith", position: "DF", number: 5 },
      { name: "Chris Murphy", position: "MF", number: 6 },
      { name: "Gary Byrne", position: "MF", number: 7 },
      { name: "Alan O'Connor", position: "MF", number: 8 },
      { name: "Robbie Kelly", position: "MF", number: 10 },
      { name: "Johnny Lynch", position: "FW", number: 9 },
      { name: "Derek Ward", position: "FW", number: 11 },
    ],
    fixtures: [
      { date: "24/08/2025", opponent: "Trim Celtic AFC" },
      { date: "26/09/2025", opponent: "Parkvilla FC", result: "1 - 3" },
      { date: "17/10/2025", opponent: "Duleek AFC" },
      { date: "31/10/2025", opponent: "Kentstown Rovers FC" },
    ],
    history: {
      achievements: [
        "Premier Division Runners-up 2020",
        "Monaghan County Cup Winners 2019, 2022",
        "FAI Junior Cup Round of 32 2021",
      ],
      narrative: "Since its founding in 1999, Carrick Rovers has quickly established itself as a competitive force. The club has invested heavily in youth development and has ambitious plans for future growth.",
    },
  },
  {
    name: "Kentstown Rovers FC",
    slug: "kentstown-rovers-fc",
    logo: getClubLogo("Kentstown Rovers FC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1982,
    ground: "Kentstown Park",
    bio: "Premier Division club with a strong local following. Known for their competitive spirit and commitment to the game.",
    website: "https://example.com/kentstown-rovers-fc",
    stats: getClubStats("Kentstown Rovers FC", "UHY Farrelly Dawe White Premier Division"),
    fixtures: [
      { date: "15/08/2025", opponent: "Rock Celtic FC", result: "0 - 3" },
      { date: "26/09/2025", opponent: "Bellurgan United" },
      { date: "10/10/2025", opponent: "Glenmuir FC" },
      { date: "31/10/2025", opponent: "Carrick Rovers AFC" },
    ],
    history: {
      narrative: "Founded in 1982, Kentstown Rovers FC has been a consistent presence in the Premier Division. The club maintains strong community connections and focuses on developing local talent.",
    },
  },
  {
    name: "Albion Rovers FC",
    slug: "albion-rovers-fc",
    logo: getClubLogo("Albion Rovers FC"),
    leagues: ["UHY Farrelly Dawe White Premier Division"],
    founded: 1970,
    ground: "Navan Sports Centre",
    bio: "Premier Division side with a proud history. Working hard to maintain their position in the top flight.",
    website: "https://example.com/albion-rovers-fc",
    stats: getClubStats("Albion Rovers FC", "UHY Farrelly Dawe White Premier Division"),
    fixtures: [
      { date: "22/08/2025", opponent: "Glenmuir FC" },
      { date: "19/09/2025", opponent: "Rock Celtic FC", result: "1 - 2" },
      { date: "10/10/2025", opponent: "Bellurgan United", result: "1 - 2" },
      { date: "24/10/2025", opponent: "Quay Celtic FC", result: "0 - 2" },
    ],
    history: {
      narrative: "Established in 1970, Albion Rovers FC has a long tradition in the NEFL. The club continues to compete at the highest level while maintaining strong community ties.",
    },
  },
  {
    name: "BJD Celtic",
    slug: "bjd-celtic",
    logo: getClubLogo("BJD Celtic"),
    leagues: ["PM Blinds & Shutters Division 2"],
    founded: 2000,
    ground: "BJD Ground",
    bio: "Division 2 leaders with an exceptional record. Strong attacking team with excellent defensive organization.",
    website: "https://example.com/bjd-celtic",
    stats: getClubStats("BJD Celtic", "PM Blinds & Shutters Division 2"),
    fixtures: [
      { date: "21/09/2025", opponent: "Black Bull FC", result: "4 - 0" },
      { date: "05/10/2025", opponent: "Enfield Celtic FC", result: "0 - 2" },
      { date: "02/11/2025", opponent: "Duleek AFC", result: "3 - 0" },
    ],
    history: {
      narrative: "Founded in 2000, BJD Celtic has quickly established itself as a dominant force in Division 2. The club combines excellent organization with attacking flair.",
    },
  },
  {
    name: "Monaghan United FC",
    slug: "monaghan-united-fc",
    logo: getClubLogo("Monaghan United FC"),
    leagues: ["Superior Racking & Shelving Division 3"],
    founded: 1992,
    ground: "Gortakeegan",
    bio: "Community-focused club representing Monaghan with dedication and passion. Currently leading Division 3.",
    website: "https://example.com/monaghan-united-fc",
    stats: getClubStats("Monaghan United FC", "Superior Racking & Shelving Division 3"),
    fixtures: [
      { date: "28/09/2025", opponent: "Monaghan Town FC", result: "2 - 1" },
    ],
    history: {
      narrative: "Established in 1992, Monaghan United has been a pillar of local football, nurturing talent and fostering community spirit.",
    },
  },
  {
    name: "Monaghan Town FC",
    slug: "monaghan-town-fc",
    logo: getClubLogo("Monaghan Town FC"),
    leagues: ["Superior Racking & Shelving Division 3"],
    founded: 1967,
    ground: "Gortakeegan Grounds",
    bio: "A proud Monaghan side with deep community roots and competitive spirit. Competing in Division 3.",
    website: "https://example.com",
    stats: getClubStats("Monaghan Town FC", "Superior Racking & Shelving Division 3"),
    squad: [
      { name: "John Smith", position: "GK", number: 1 },
      { name: "David Kelly", position: "GK", number: 13 },
      { name: "Michael O'Connor", position: "DF", number: 5 },
      { name: "Shane McCabe", position: "DF", number: 2 },
      { name: "Brian Duffy", position: "DF", number: 3 },
      { name: "Eoin O'Reilly", position: "DF", number: 15 },
      { name: "Patrick Byrne", position: "MF", number: 8 },
      { name: "Conor Lynch", position: "MF", number: 6 },
      { name: "Kevin Nolan", position: "MF", number: 11 },
      { name: "Ryan McKenna", position: "MF", number: 18 },
      { name: "Sean Murphy", position: "FW", number: 10 },
      { name: "Ciaran McManus", position: "FW", number: 9 },
      { name: "Liam Donnelly", position: "FW", number: 17 },
    ],
    fixtures: [
      { date: "28/09/2025", opponent: "Monaghan United FC", result: "1 - 2" },
      { date: "26/10/2025", opponent: "Rossin Rovers" },
    ],
    history: {
      narrative: "Founded in 1967, Monaghan Town FC has a long tradition of community involvement and player development, with several alumni progressing to professional football in Ireland and abroad. The club continues to focus on grassroots growth while competing strongly at senior level.",
    },
    achievements: [
      {
        id: "div3-2012",
        title: "Division 3 Champions",
        year: 2012,
        type: "league",
        competition: "Superior Racking & Shelving Division 3",
        position: "winner",
        description: "Won the Division 3 title with an impressive 15-point margin"
      },
      {
        id: "div3-2005",
        title: "Division 3 Champions",
        year: 2005,
        type: "league",
        competition: "Superior Racking & Shelving Division 3",
        position: "winner",
        description: "Secured the league title with a dramatic final day victory"
      },
      {
        id: "fai-cup-2010",
        title: "FAI Junior Cup Winners",
        year: 2010,
        type: "cup",
        competition: "FAI Junior Cup",
        position: "winner",
        description: "Victorious in the national junior cup competition"
      }
    ],
    formation: {
      id: "4-4-2",
      name: "4-4-2",
      description: "Classic balanced formation with two strikers",
      positions: [
        { id: "gk", position: "GK", x: 50, y: 5, playerId: "john-smith", playerName: "John Smith" },
        { id: "lb", position: "LB", x: 20, y: 25, playerId: "shane-mccabe", playerName: "Shane McCabe" },
        { id: "cb1", position: "CB", x: 35, y: 25, playerId: "michael-oconnor", playerName: "Michael O'Connor" },
        { id: "cb2", position: "CB", x: 65, y: 25, playerId: "brian-duffy", playerName: "Brian Duffy" },
        { id: "rb", position: "RB", x: 80, y: 25, playerId: "eoin-oreilly", playerName: "Eoin O'Reilly" },
        { id: "lm", position: "LM", x: 20, y: 45, playerId: "kevin-nolan", playerName: "Kevin Nolan" },
        { id: "cm1", position: "CM", x: 40, y: 45, playerId: "patrick-byrne", playerName: "Patrick Byrne" },
        { id: "cm2", position: "CM", x: 60, y: 45, playerId: "conor-lynch", playerName: "Conor Lynch" },
        { id: "rm", position: "RM", x: 80, y: 45, playerId: "ryan-mckenna", playerName: "Ryan McKenna" },
        { id: "st1", position: "ST", x: 40, y: 75, playerId: "sean-murphy", playerName: "Sean Murphy" },
        { id: "st2", position: "ST", x: 60, y: 75, playerId: "ciaran-mcmanus", playerName: "Ciaran McManus" }
      ]
    },
  },
];
