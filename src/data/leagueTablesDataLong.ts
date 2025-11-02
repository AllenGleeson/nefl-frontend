// src/data/leagueTables.ts

export type Team = {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
};

export type LeagueTables = {
  Men: Record<string, Team[]>;
  Women: Record<string, Team[]>;
};

function makeTeams(names: string[]): Team[] {
  return names.map((name, i) => ({
    position: i + 1,
    name,
    played: 15,
    won: Math.floor(Math.random() * 10),
    drawn: Math.floor(Math.random() * 5),
    lost: Math.floor(Math.random() * 5),
    points: Math.floor(Math.random() * 40),
  }));
}

export const leagueTablesDataLong: LeagueTables = {
  Men: {
    "Premier League": makeTeams([
      "Man City", "Arsenal", "Liverpool", "Chelsea", "Tottenham", "Man United", "Newcastle", "Brighton",
      "Aston Villa", "West Ham", "Everton", "Wolves", "Crystal Palace", "Fulham", "Brentford",
    ]),
    "La Liga": makeTeams([
      "Real Madrid", "Barcelona", "Atletico Madrid", "Real Sociedad", "Athletic Bilbao", "Villarreal",
      "Valencia", "Sevilla", "Betis", "Getafe", "Celta Vigo", "Osasuna", "Mallorca", "Granada", "Rayo Vallecano",
    ]),
    "Serie A": makeTeams([
      "Inter Milan", "Juventus", "AC Milan", "Napoli", "Roma", "Lazio", "Atalanta", "Fiorentina", "Torino",
      "Bologna", "Sassuolo", "Udinese", "Monza", "Cagliari", "Empoli",
    ]),
    Bundesliga: makeTeams([
      "Bayern Munich", "Dortmund", "Leipzig", "Leverkusen", "Frankfurt", "Freiburg", "Wolfsburg", "Stuttgart",
      "Union Berlin", "Gladbach", "Mainz", "Augsburg", "Hoffenheim", "Bochum", "Werder Bremen",
    ]),
    "Ligue 1": makeTeams([
      "PSG", "Monaco", "Lyon", "Marseille", "Lille", "Rennes", "Nice", "Toulouse", "Montpellier",
      "Nantes", "Reims", "Strasbourg", "Brest", "Lorient", "Clermont",
    ]),
    Eredivisie: makeTeams([
      "Ajax", "PSV", "Feyenoord", "AZ Alkmaar", "Twente", "Utrecht", "Heerenveen", "Groningen", "Vitesse",
      "Sparta Rotterdam", "NEC Nijmegen", "RKC Waalwijk", "Fortuna Sittard", "Heracles", "Go Ahead Eagles",
    ]),
  },
  Women: {
    WSL: makeTeams([
      "Chelsea Women", "Arsenal Women", "Man United Women", "Man City Women", "Liverpool Women",
      "Tottenham Women", "Everton Women", "Brighton Women", "West Ham Women", "Aston Villa Women",
      "Leicester Women", "Reading Women", "Birmingham Women", "Sunderland Women", "Crystal Palace Women",
    ]),
    NWSL: makeTeams([
      "Portland Thorns", "OL Reign", "Angel City", "San Diego Wave", "Houston Dash", "Orlando Pride",
      "North Carolina Courage", "Washington Spirit", "Kansas City Current", "Chicago Red Stars",
      "Racing Louisville", "Utah Royals", "Sky Blue FC", "Boston Breakers", "Seattle Reign Reserves",
    ]),
    "Liga F": makeTeams([
      "Barcelona Femení", "Real Madrid Femenino", "Atletico Madrid Femenino", "Levante UD Femenino",
      "Athletic Club Femenino", "Valencia Femenino", "Sevilla Femenino", "Betis Femenino", "Granada Femenino",
      "Villarreal Femenino", "Rayo Vallecano Femenino", "Sporting Huelva", "Alavés Femenino",
      "Espanyol Femenino", "Zaragoza CFF",
    ]),
  },
};