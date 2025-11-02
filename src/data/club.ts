// /data/clubs.ts
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

export const clubs: Club[] = [
  {
    name: "Monaghan Town FC",
    slug: "monaghan-town-fc",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Premier League"],
    founded: 1967,
    ground: "Gortakeegan Grounds",
    bio: "A proud Monaghan side with deep community roots and competitive spirit.",
    website: "https://example.com",
    stats: {
      leaguePosition: 3,
      matchesPlayed: 15,
      wins: 9,
      draws: 3,
      losses: 3,
      goalsFor: 28,
      goalsAgainst: 15,
    },
    squad: [
      { name: "John Smith", position: "GK", number: 1 },
      { name: "David Kelly", position: "GK", number: 13 },
      { name: "Michael O’Connor", position: "DF", number: 5 },
      { name: "Shane McCabe", position: "DF", number: 2 },
      { name: "Brian Duffy", position: "DF", number: 3 },
      { name: "Eoin O’Reilly", position: "DF", number: 15 },
      { name: "Patrick Byrne", position: "MF", number: 8 },
      { name: "Conor Lynch", position: "MF", number: 6 },
      { name: "Kevin Nolan", position: "MF", number: 11 },
      { name: "Ryan McKenna", position: "MF", number: 18 },
      { name: "Sean Murphy", position: "FW", number: 10 },
      { name: "Ciaran McManus", position: "FW", number: 9 },
      { name: "Liam Donnelly", position: "FW", number: 17 },
    ],
    fixtures: [
      { date: "23/03/2025", opponent: "Ardee Celtic FC", result: "3 - 3" },
      { date: "30/03/2025", opponent: "Navan Rangers" },
      { date: "06/04/2025", opponent: "Drogheda Rovers" },
      { date: "13/04/2025", opponent: "Trim Celtic" },
      { date: "20/04/2025", opponent: "Castleblayney United" },
      { date: "27/04/2025", opponent: "Kingscourt Harps" },
      { date: "04/05/2025", opponent: "Slane Wanderers" },
      { date: "11/05/2025", opponent: "Carrick Rovers" },
    ],
    history: {
      narrative:
        "Founded in 1967, Monaghan Town FC has a long tradition of community involvement and player development, with several alumni progressing to professional football in Ireland and abroad. The club continues to focus on grassroots growth while competing strongly at senior level.",
    },
    achievements: [
      {
        id: "prem-2012",
        title: "Premier League Champions",
        year: 2012,
        type: "league",
        competition: "NEFL Premier League",
        position: "winner",
        description: "Won the Premier League title with an impressive 15-point margin"
      },
      {
        id: "prem-2005",
        title: "Premier League Champions",
        year: 2005,
        type: "league",
        competition: "NEFL Premier League",
        position: "winner",
        description: "Secured the league title with a dramatic final day victory"
      },
      {
        id: "prem-1998",
        title: "Premier League Champions",
        year: 1998,
        type: "league",
        competition: "NEFL Premier League",
        position: "winner",
        description: "First Premier League title in club history"
      },
      {
        id: "fai-cup-2010",
        title: "FAI Junior Cup Winners",
        year: 2010,
        type: "cup",
        competition: "FAI Junior Cup",
        position: "winner",
        description: "Victorious in the national junior cup competition"
      },
      {
        id: "lsl-runner-2018",
        title: "Leinster Senior League Runners-up",
        year: 2018,
        type: "trophy",
        competition: "Leinster Senior League",
        position: "runner-up",
        description: "Finished second in the competitive Leinster Senior League"
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
    name: "Ardee Celtic FC",
    slug: "ardee-celtic-fc",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Championship"],
    founded: 1975,
    ground: "Townspark, Ardee",
    bio: "A historic club known for nurturing young talent in County Louth with a strong emphasis on youth development.",
    website: "https://example.com/ardee-celtic",
    stats: {
      leaguePosition: 7,
      matchesPlayed: 14,
      wins: 6,
      draws: 4,
      losses: 4,
      goalsFor: 22,
      goalsAgainst: 18,
    },
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
      { date: "22/03/2025", opponent: "Kells United", result: "2 - 1" },
      { date: "29/03/2025", opponent: "Slane Wanderers" },
      { date: "05/04/2025", opponent: "Athboy Athletic" },
      { date: "12/04/2025", opponent: "Bailieboro Shamrocks" },
      { date: "19/04/2025", opponent: "Carrick Rovers" },
    ],
    history: {
      narrative: "Established in 1975, Ardee Celtic has built a reputation for developing young players and maintaining strong community ties. The club has consistently competed at a high level while focusing on grassroots football development.",
    },
    achievements: [
      {
        id: "champ-2019",
        title: "Championship Winners",
        year: 2019,
        type: "league",
        competition: "NEFL Championship",
        position: "winner",
        description: "Won the Championship title with an unbeaten season"
      },
      {
        id: "champ-2015",
        title: "Championship Winners",
        year: 2015,
        type: "league",
        competition: "NEFL Championship",
        position: "winner",
        description: "First Championship title in club history"
      },
      {
        id: "lsl-cup-2020",
        title: "Leinster Senior League Cup Winners",
        year: 2020,
        type: "cup",
        competition: "Leinster Senior League Cup",
        position: "winner",
        description: "Victorious in the prestigious Leinster Senior League Cup"
      },
      {
        id: "fai-semi-2017",
        title: "FAI Junior Cup Semi-Finalists",
        year: 2017,
        type: "trophy",
        competition: "FAI Junior Cup",
        position: "semi-finalist",
        description: "Reached the semi-finals of the national junior cup"
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
    name: "Drogheda Rovers",
    slug: "drogheda-rovers",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Premier League"],
    founded: 1985,
    ground: "Marley Park",
    bio: "Local rivals to Drogheda United, building their own legacy in Leinster with passionate local support.",
    website: "https://example.com/drogheda-rovers",
    stats: {
      leaguePosition: 5,
      matchesPlayed: 16,
      wins: 8,
      draws: 2,
      losses: 6,
      goalsFor: 25,
      goalsAgainst: 20,
    },
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
      { date: "21/03/2025", opponent: "Castleblayney United", result: "1 - 2" },
      { date: "28/03/2025", opponent: "Monaghan Town FC" },
      { date: "04/04/2025", opponent: "Navan Rangers" },
      { date: "11/04/2025", opponent: "Kingscourt Harps" },
      { date: "18/04/2025", opponent: "Trim Celtic" },
    ],
    history: {
      achievements: [
        "Premier League Runners-up 2016, 2021",
        "FAI Junior Cup Quarter-Finalists 2018",
        "Leinster Senior League Cup Winners 2019",
      ],
      narrative: "Founded in 1985, Drogheda Rovers has established itself as a competitive force in the Premier League. The club prides itself on its attacking style of play and strong local community support.",
    },
  },
  {
    name: "Kells United",
    slug: "kells-united",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 1"],
    founded: 1990,
    ground: "Grange Park, Kells",
    bio: "Competitive side from Meath, always striving for promotion battles with a never-say-die attitude.",
    website: "https://example.com/kells-united",
    stats: {
      leaguePosition: 2,
      matchesPlayed: 13,
      wins: 8,
      draws: 3,
      losses: 2,
      goalsFor: 24,
      goalsAgainst: 12,
    },
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
      { date: "20/03/2025", opponent: "Ardee Celtic FC", result: "1 - 2" },
      { date: "27/03/2025", opponent: "Slane Wanderers" },
      { date: "03/04/2025", opponent: "Athboy Athletic" },
      { date: "10/04/2025", opponent: "Bailieboro Shamrocks" },
      { date: "17/04/2025", opponent: "Carrick Rovers" },
    ],
    history: {
      achievements: [
        "Division 1 Champions 2018",
        "FAI Junior Cup Round of 16 2019",
        "Meath County Cup Winners 2020, 2022",
      ],
      narrative: "Since 1990, Kells United has been a consistent performer in Division 1, known for their fighting spirit and determination. The club has a strong youth academy and regularly challenges for promotion.",
    },
  },
  {
    name: "Navan Rangers",
    slug: "navan-rangers",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Premier League"],
    founded: 1962,
    ground: "Navan Showgrounds",
    bio: "Established powerhouse of Meath football with loyal support and a rich tradition of success.",
    website: "https://example.com/navan-rangers",
    stats: {
      leaguePosition: 1,
      matchesPlayed: 16,
      wins: 12,
      draws: 2,
      losses: 2,
      goalsFor: 35,
      goalsAgainst: 12,
    },
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
      { date: "19/03/2025", opponent: "Monaghan Town FC", result: "2 - 0" },
      { date: "26/03/2025", opponent: "Drogheda Rovers" },
      { date: "02/04/2025", opponent: "Castleblayney United" },
      { date: "09/04/2025", opponent: "Kingscourt Harps" },
      { date: "16/04/2025", opponent: "Trim Celtic" },
    ],
    history: {
      narrative: "One of the most successful clubs in the league, Navan Rangers was founded in 1962 and has consistently been at the top of Irish junior football. The club has produced numerous players who have gone on to play professionally.",
    },
    achievements: [
      {
        id: "prem-2023",
        title: "Premier League Champions",
        year: 2023,
        type: "league",
        competition: "NEFL Premier League",
        position: "winner",
        description: "Latest Premier League title, maintaining their dominance"
      },
      {
        id: "prem-2020",
        title: "Premier League Champions",
        year: 2020,
        type: "league",
        competition: "NEFL Premier League",
        position: "winner",
        description: "Won the Premier League in a shortened season"
      },
      {
        id: "prem-2017",
        title: "Premier League Champions",
        year: 2017,
        type: "league",
        competition: "NEFL Premier League",
        position: "winner",
        description: "First of three consecutive Premier League titles"
      },
      {
        id: "fai-cup-2019",
        title: "FAI Junior Cup Winners",
        year: 2019,
        type: "cup",
        competition: "FAI Junior Cup",
        position: "winner",
        description: "Victorious in the national junior cup competition"
      },
      {
        id: "lsl-cup-2021",
        title: "Leinster Senior League Cup Winners",
        year: 2021,
        type: "cup",
        competition: "Leinster Senior League Cup",
        position: "winner",
        description: "Second Leinster Senior League Cup victory"
      },
      {
        id: "lsl-cup-2018",
        title: "Leinster Senior League Cup Winners",
        year: 2018,
        type: "cup",
        competition: "Leinster Senior League Cup",
        position: "winner",
        description: "First Leinster Senior League Cup victory"
      },
      {
        id: "meath-cup-2022",
        title: "Meath County Cup Winners",
        year: 2022,
        type: "cup",
        competition: "Meath County Cup",
        position: "winner",
        description: "Latest Meath County Cup victory"
      },
      {
        id: "meath-cup-2020",
        title: "Meath County Cup Winners",
        year: 2020,
        type: "cup",
        competition: "Meath County Cup",
        position: "winner",
        description: "Meath County Cup victory in 2020"
      },
      {
        id: "meath-cup-2018",
        title: "Meath County Cup Winners",
        year: 2018,
        type: "cup",
        competition: "Meath County Cup",
        position: "winner",
        description: "Meath County Cup victory in 2018"
      },
      {
        id: "meath-cup-2016",
        title: "Meath County Cup Winners",
        year: 2016,
        type: "cup",
        competition: "Meath County Cup",
        position: "winner",
        description: "First Meath County Cup victory"
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
    name: "Trim Celtic",
    slug: "trim-celtic",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 1"],
    founded: 1973,
    ground: "Tully Park, Trim",
    bio: "Youth development and grassroots football are at the heart of the club, with a focus on community engagement.",
    website: "https://example.com/trim-celtic",
    stats: {
      leaguePosition: 4,
      matchesPlayed: 14,
      wins: 6,
      draws: 5,
      losses: 3,
      goalsFor: 20,
      goalsAgainst: 16,
    },
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
      { date: "18/03/2025", opponent: "Athboy Athletic", result: "1 - 1" },
      { date: "25/03/2025", opponent: "Bailieboro Shamrocks" },
      { date: "01/04/2025", opponent: "Carrick Rovers" },
      { date: "08/04/2025", opponent: "Slane Wanderers" },
      { date: "15/04/2025", opponent: "Kells United" },
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
    name: "Athboy Athletic",
    slug: "athboy-athletic",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 2"],
    founded: 1988,
    ground: "The Green, Athboy",
    bio: "Passionate local side known for grit and hard-fought victories with strong community backing.",
    website: "https://example.com/athboy-athletic",
    stats: {
      leaguePosition: 6,
      matchesPlayed: 12,
      wins: 4,
      draws: 4,
      losses: 4,
      goalsFor: 16,
      goalsAgainst: 18,
    },
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
      { date: "17/03/2025", opponent: "Trim Celtic", result: "1 - 1" },
      { date: "24/03/2025", opponent: "Bailieboro Shamrocks" },
      { date: "31/03/2025", opponent: "Carrick Rovers" },
      { date: "07/04/2025", opponent: "Slane Wanderers" },
      { date: "14/04/2025", opponent: "Kells United" },
    ],
    history: {
      achievements: [
        "Division 2 Champions 2015",
        "Meath County Cup Semi-Finalists 2018",
        "FAI Junior Cup Round of 64 2019",
      ],
      narrative: "Established in 1988, Athboy Athletic has built a reputation for being a tough, hard-working team that never gives up. The club has strong local support and prides itself on its fighting spirit.",
    },
  },
  {
    name: "Kingscourt Harps",
    slug: "kingscourt-harps",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Championship"],
    founded: 1971,
    ground: "O'Rourke Park, Kingscourt",
    bio: "Cavan's representative club, blending tradition and ambition with a focus on developing local talent.",
    website: "https://example.com/kingscourt-harps",
    stats: {
      leaguePosition: 8,
      matchesPlayed: 15,
      wins: 5,
      draws: 3,
      losses: 7,
      goalsFor: 19,
      goalsAgainst: 24,
    },
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
      { date: "16/03/2025", opponent: "Monaghan Town FC", result: "0 - 2" },
      { date: "23/03/2025", opponent: "Drogheda Rovers" },
      { date: "30/03/2025", opponent: "Navan Rangers" },
      { date: "06/04/2025", opponent: "Castleblayney United" },
      { date: "13/04/2025", opponent: "Ardee Celtic FC" },
    ],
    history: {
      achievements: [
        "Championship Winners 2014, 2018",
        "Cavan County Cup Winners 2016, 2019, 2021",
        "FAI Junior Cup Round of 16 2017",
      ],
      narrative: "Founded in 1971, Kingscourt Harps represents County Cavan in the league. The club has a proud tradition and has consistently competed at a high level while maintaining strong community ties.",
    },
  },
  {
    name: "Carrick Rovers",
    slug: "carrick-rovers",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 2"],
    founded: 1999,
    ground: "Carrick Sports Grounds",
    bio: "One of the fastest-growing clubs in Monaghan with strong youth academies and ambitious plans for the future.",
    website: "https://example.com/carrick-rovers",
    stats: {
      leaguePosition: 3,
      matchesPlayed: 13,
      wins: 7,
      draws: 2,
      losses: 4,
      goalsFor: 22,
      goalsAgainst: 16,
    },
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
      { date: "15/03/2025", opponent: "Slane Wanderers", result: "3 - 1" },
      { date: "22/03/2025", opponent: "Kells United" },
      { date: "29/03/2025", opponent: "Athboy Athletic" },
      { date: "05/04/2025", opponent: "Bailieboro Shamrocks" },
      { date: "12/04/2025", opponent: "Trim Celtic" },
    ],
    history: {
      achievements: [
        "Division 2 Runners-up 2020",
        "Monaghan County Cup Winners 2019, 2022",
        "FAI Junior Cup Round of 32 2021",
      ],
      narrative: "Since its founding in 1999, Carrick Rovers has quickly established itself as a competitive force. The club has invested heavily in youth development and has ambitious plans for future growth.",
    },
  },
  {
    name: "Slane Wanderers",
    slug: "slane-wanderers",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 1"],
    founded: 1955,
    ground: "Boyne Park, Slane",
    bio: "Historic Meath club, proud of its tradition and community involvement with a rich heritage spanning decades.",
    website: "https://example.com/slane-wanderers",
    stats: {
      leaguePosition: 5,
      matchesPlayed: 14,
      wins: 6,
      draws: 3,
      losses: 5,
      goalsFor: 21,
      goalsAgainst: 19,
    },
    squad: [
      { name: "Tommy Murphy", position: "GK", number: 1 },
      { name: "James Kelly", position: "GK", number: 13 },
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
      { date: "14/03/2025", opponent: "Carrick Rovers", result: "1 - 3" },
      { date: "21/03/2025", opponent: "Kells United" },
      { date: "28/03/2025", opponent: "Athboy Athletic" },
      { date: "04/04/2025", opponent: "Bailieboro Shamrocks" },
      { date: "11/04/2025", opponent: "Trim Celtic" },
    ],
    history: {
      achievements: [
        "Division 1 Champions 2012, 2016",
        "Meath County Cup Winners 2015, 2018, 2020",
        "FAI Junior Cup Quarter-Finalists 2014",
      ],
      narrative: "One of the oldest clubs in the league, Slane Wanderers was founded in 1955 and has a rich history of success. The club has maintained its traditional values while adapting to modern football.",
    },
  },
  {
    name: "Castleblayney United",
    slug: "castleblayney-united",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Premier League"],
    founded: 1969,
    ground: "Blayney Town Park",
    bio: "Strong Monaghan club with a reputation for attacking football and passionate local support.",
    website: "https://example.com/castleblayney-united",
    stats: {
      leaguePosition: 4,
      matchesPlayed: 16,
      wins: 8,
      draws: 3,
      losses: 5,
      goalsFor: 28,
      goalsAgainst: 22,
    },
    squad: [
      { name: "Brian Murphy", position: "GK", number: 1 },
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
      { date: "13/03/2025", opponent: "Drogheda Rovers", result: "2 - 1" },
      { date: "20/03/2025", opponent: "Monaghan Town FC" },
      { date: "27/03/2025", opponent: "Navan Rangers" },
      { date: "03/04/2025", opponent: "Kingscourt Harps" },
      { date: "10/04/2025", opponent: "Ardee Celtic FC" },
    ],
    history: {
      achievements: [
        "Premier League Champions 2011, 2014",
        "FAI Junior Cup Semi-Finalists 2013",
        "Monaghan County Cup Winners 2012, 2015, 2018",
      ],
      narrative: "Founded in 1969, Castleblayney United has established itself as one of the most successful clubs in Monaghan. The club is known for its attacking style of play and strong community support.",
    },
  },
  {
    name: "Bailieboro Shamrocks",
    slug: "bailieboro-shamrocks",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 2"],
    founded: 1977,
    ground: "Shamrock Park, Bailieboro",
    bio: "A club with strong local ties and a tradition of resilience on the pitch, representing the heart of Cavan football.",
    website: "https://example.com/bailieboro-shamrocks",
    stats: {
      leaguePosition: 7,
      matchesPlayed: 12,
      wins: 3,
      draws: 4,
      losses: 5,
      goalsFor: 14,
      goalsAgainst: 18,
    },
    squad: [
      { name: "Michael Murphy", position: "GK", number: 1 },
      { name: "Tommy Kelly", position: "GK", number: 14 },
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
      { date: "12/03/2025", opponent: "Trim Celtic", result: "0 - 0" },
      { date: "19/03/2025", opponent: "Athboy Athletic" },
      { date: "26/03/2025", opponent: "Carrick Rovers" },
      { date: "02/04/2025", opponent: "Slane Wanderers" },
      { date: "09/04/2025", opponent: "Kells United" },
    ],
    history: {
      achievements: [
        "Division 2 Champions 2013",
        "Cavan County Cup Winners 2017, 2020",
        "FAI Junior Cup Round of 64 2018",
      ],
      narrative: "Established in 1977, Bailieboro Shamrocks has been a consistent presence in the league. The club prides itself on its fighting spirit and strong local community connections.",
    },
  },
  {
    name: "Dundalk Town",
    slug: "dundalk-town",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Premier League"],
    founded: 1980,
    ground: "Oriel Park",
    bio: "A competitive Louth club with a rich history and passionate fanbase.",
    website: "https://example.com/dundalk-town",
    stats: {
      leaguePosition: 6,
      matchesPlayed: 15,
      wins: 7,
      draws: 2,
      losses: 6,
      goalsFor: 23,
      goalsAgainst: 19,
    },
    squad: [
      { name: "John O'Brien", position: "GK", number: 1 },
      { name: "Michael Walsh", position: "DF", number: 2 },
      { name: "David Lynch", position: "DF", number: 3 },
      { name: "Sean Murphy", position: "MF", number: 6 },
      { name: "Kevin Byrne", position: "FW", number: 9 },
    ],
    fixtures: [
      { date: "01/04/2025", opponent: "Monaghan Town FC" },
      { date: "08/04/2025", opponent: "Navan Rangers" },
    ],
    history: {
      narrative: "Founded in 1980, Dundalk Town has established itself as a competitive force in the Premier League with strong youth development programs.",
    },
  },
  {
    name: "Drogheda City",
    slug: "drogheda-city",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Championship"],
    founded: 1995,
    ground: "United Park",
    bio: "Rising club from Drogheda with ambitious plans and growing support.",
    website: "https://example.com/drogheda-city",
    stats: {
      leaguePosition: 9,
      matchesPlayed: 13,
      wins: 4,
      draws: 3,
      losses: 6,
      goalsFor: 17,
      goalsAgainst: 21,
    },
    history: {
      narrative: "A relatively new club founded in 1995, Drogheda City is focused on building a strong foundation and developing local talent.",
    },
  },
  {
    name: "Monaghan United",
    slug: "monaghan-united",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 1"],
    founded: 1992,
    ground: "Gortakeegan",
    bio: "Community-focused club representing Monaghan with dedication and passion.",
    website: "https://example.com/monaghan-united",
    stats: {
      leaguePosition: 10,
      matchesPlayed: 12,
      wins: 3,
      draws: 3,
      losses: 6,
      goalsFor: 15,
      goalsAgainst: 20,
    },
    history: {
      narrative: "Established in 1992, Monaghan United has been a pillar of local football, nurturing talent and fostering community spirit.",
    },
  },
  {
    name: "Cavan Rovers",
    slug: "cavan-rovers",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 2"],
    founded: 1985,
    ground: "Breffni Park",
    bio: "Cavan's second club with a proud tradition and loyal following.",
    website: "https://example.com/cavan-rovers",
    stats: {
      leaguePosition: 11,
      matchesPlayed: 11,
      wins: 2,
      draws: 4,
      losses: 5,
      goalsFor: 12,
      goalsAgainst: 17,
    },
    history: {
      narrative: "Founded in 1985, Cavan Rovers continues to build its legacy while supporting grassroots football in the region.",
    },
  },
  {
    name: "Meath Athletic",
    slug: "meath-athletic",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Championship"],
    founded: 2000,
    ground: "Páirc Tailteann",
    bio: "Modern club with state-of-the-art facilities and progressive approach to football.",
    website: "https://example.com/meath-athletic",
    stats: {
      leaguePosition: 12,
      matchesPlayed: 14,
      wins: 5,
      draws: 2,
      losses: 7,
      goalsFor: 18,
      goalsAgainst: 22,
    },
    history: {
      narrative: "Since 2000, Meath Athletic has quickly risen through the ranks with a focus on professional development and community engagement.",
    },
  },
  {
    name: "Louth United",
    slug: "louth-united",
    logo: "/images/Ardee-Celtic.webp",
    leagues: ["Division 1"],
    founded: 1988,
    ground: "Drogheda Sports Centre",
    bio: "Ambitious Louth club with strong youth academy and competitive senior team.",
    website: "https://example.com/louth-united",
    stats: {
      leaguePosition: 8,
      matchesPlayed: 13,
      wins: 5,
      draws: 3,
      losses: 5,
      goalsFor: 19,
      goalsAgainst: 18,
    },
    history: {
      narrative: "Established in 1988, Louth United has become known for its excellent youth development and competitive senior performances.",
    },
  },
];