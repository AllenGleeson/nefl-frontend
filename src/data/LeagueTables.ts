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

export const leagueTablesData: LeagueTables = {
    Men: {
        "Premier League": [
            { position: 1, name: "Man City", played: 15, won: 12, drawn: 2, lost: 1, points: 38 },
            { position: 2, name: "Arsenal", played: 15, won: 11, drawn: 3, lost: 1, points: 36 },
            { position: 3, name: "Liverpool", played: 15, won: 10, drawn: 4, lost: 1, points: 34 },
            { position: 4, name: "Tottenham", played: 15, won: 9, drawn: 3, lost: 3, points: 30 },
            { position: 5, name: "Chelsea", played: 15, won: 8, drawn: 4, lost: 3, points: 28 },
        ],
        "La Liga": [
            { position: 1, name: "Real Madrid", played: 15, won: 13, drawn: 1, lost: 1, points: 40 },
            { position: 2, name: "Barcelona", played: 15, won: 11, drawn: 2, lost: 2, points: 35 },
            { position: 3, name: "Atletico Madrid", played: 15, won: 10, drawn: 3, lost: 2, points: 33 },
            { position: 4, name: "Real Sociedad", played: 15, won: 8, drawn: 4, lost: 3, points: 28 },
            { position: 5, name: "Athletic Bilbao", played: 15, won: 7, drawn: 5, lost: 3, points: 26 },
        ],
        "Serie A": [
            { position: 1, name: "Inter Milan", played: 15, won: 12, drawn: 2, lost: 1, points: 38 },
            { position: 2, name: "Juventus", played: 15, won: 11, drawn: 3, lost: 1, points: 36 },
            { position: 3, name: "AC Milan", played: 15, won: 10, drawn: 3, lost: 2, points: 33 },
            { position: 4, name: "Napoli", played: 15, won: 9, drawn: 4, lost: 2, points: 31 },
            { position: 5, name: "Roma", played: 15, won: 8, drawn: 3, lost: 4, points: 27 },
        ],
        Bundesliga: [
            { position: 1, name: "Bayern Munich", played: 15, won: 12, drawn: 2, lost: 1, points: 38 },
            { position: 2, name: "Dortmund", played: 15, won: 11, drawn: 3, lost: 1, points: 36 },
            { position: 3, name: "Leipzig", played: 15, won: 10, drawn: 2, lost: 3, points: 32 },
            { position: 4, name: "Leverkusen", played: 15, won: 9, drawn: 4, lost: 2, points: 31 },
            { position: 5, name: "Frankfurt", played: 15, won: 8, drawn: 3, lost: 4, points: 27 },
        ],
    },
    Women: {
        WSL: [
            { position: 1, name: "Chelsea Women", played: 15, won: 13, drawn: 1, lost: 1, points: 40 },
            { position: 2, name: "Arsenal Women", played: 15, won: 12, drawn: 2, lost: 1, points: 38 },
            { position: 3, name: "Man United Women", played: 15, won: 11, drawn: 3, lost: 1, points: 36 },
            { position: 4, name: "Man City Women", played: 15, won: 10, drawn: 2, lost: 3, points: 32 },
            { position: 5, name: "Liverpool Women", played: 15, won: 9, drawn: 3, lost: 3, points: 30 },
        ],
        NWSL: [
            { position: 1, name: "Portland Thorns", played: 15, won: 11, drawn: 2, lost: 2, points: 35 },
            { position: 2, name: "OL Reign", played: 15, won: 10, drawn: 3, lost: 2, points: 33 },
            { position: 3, name: "San Diego Wave", played: 15, won: 9, drawn: 4, lost: 2, points: 31 },
            { position: 4, name: "Angel City", played: 15, won: 8, drawn: 3, lost: 4, points: 27 },
            { position: 5, name: "Washington Spirit", played: 15, won: 7, drawn: 5, lost: 3, points: 26 },
        ],
        "Liga F": [
            { position: 1, name: "Barcelona Femení", played: 15, won: 14, drawn: 1, lost: 0, points: 43 },
            { position: 2, name: "Real Madrid Femenino", played: 15, won: 12, drawn: 2, lost: 1, points: 38 },
            { position: 3, name: "Atletico Madrid Femenino", played: 15, won: 11, drawn: 3, lost: 1, points: 36 },
            { position: 4, name: "Levante UD Femenino", played: 15, won: 9, drawn: 4, lost: 2, points: 31 },
            { position: 5, name: "Athletic Club Femenino", played: 15, won: 8, drawn: 3, lost: 4, points: 27 },
        ],
    },
};