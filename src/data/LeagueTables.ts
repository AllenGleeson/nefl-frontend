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
        "UHY Farrelly Dawe White Premier Division": [
            { position: 1, name: "Parkvilla FC", played: 17, won: 11, drawn: 4, lost: 2, points: 37 },
            { position: 2, name: "Duleek AFC", played: 17, won: 11, drawn: 3, lost: 3, points: 36 },
            { position: 3, name: "Rock Celtic FC", played: 17, won: 7, drawn: 5, lost: 5, points: 26 },
            { position: 4, name: "Quay Celtic FC", played: 16, won: 8, drawn: 1, lost: 7, points: 25 },
            { position: 5, name: "Bellurgan United", played: 17, won: 7, drawn: 3, lost: 7, points: 24 },
        ],
        "O Neills Sportswear Division 1": [
            { position: 1, name: "Johnstown FC", played: 15, won: 13, drawn: 1, lost: 1, points: 40 },
            { position: 2, name: "Ardee Celtic FC", played: 16, won: 10, drawn: 2, lost: 4, points: 32 },
            { position: 3, name: "Torro United FC", played: 16, won: 9, drawn: 2, lost: 5, points: 29 },
            { position: 4, name: "Robinstown FC", played: 16, won: 8, drawn: 3, lost: 5, points: 27 },
            { position: 5, name: "Kingscourt Harps AFC", played: 16, won: 6, drawn: 3, lost: 7, points: 21 },
        ],
        "PM Blinds & Shutters Division 2": [
            { position: 1, name: "BJD Celtic", played: 22, won: 21, drawn: 0, lost: 1, points: 63 },
            { position: 2, name: "Black Bull FC", played: 22, won: 16, drawn: 2, lost: 4, points: 50 },
            { position: 3, name: "Enfield Celtic FC", played: 20, won: 15, drawn: 2, lost: 3, points: 47 },
            { position: 4, name: "Duleek AFC", played: 21, won: 12, drawn: 2, lost: 7, points: 38 },
            { position: 5, name: "Oldcastle United", played: 22, won: 10, drawn: 3, lost: 9, points: 33 },
        ],
        "Superior Racking & Shelving Division 3": [
            { position: 1, name: "Monaghan United FC", played: 22, won: 17, drawn: 2, lost: 3, points: 53 },
            { position: 2, name: "Monaghan Town FC", played: 22, won: 15, drawn: 3, lost: 4, points: 48 },
            { position: 3, name: "Cootehill Harps", played: 22, won: 12, drawn: 4, lost: 6, points: 40 },
            { position: 4, name: "Rossin Rovers", played: 22, won: 10, drawn: 5, lost: 7, points: 35 },
            { position: 5, name: "Ardee Celtic FC", played: 22, won: 10, drawn: 3, lost: 9, points: 33 },
        ],
        "Superior Racking & Shelving Division 3A": [
            { position: 1, name: "Aston Celtic FC", played: 22, won: 19, drawn: 2, lost: 1, points: 59 },
            { position: 2, name: "Electro Celtic FC", played: 23, won: 17, drawn: 2, lost: 4, points: 53 },
            { position: 3, name: "Longwood AFC", played: 21, won: 15, drawn: 2, lost: 4, points: 47 },
            { position: 4, name: "Enfield Celtic FC", played: 23, won: 13, drawn: 3, lost: 7, points: 42 },
            { position: 5, name: "Albion Rovers FC", played: 23, won: 11, drawn: 2, lost: 10, points: 35 },
        ],
        "Superior Racking & Shelving Division 4": [
            { position: 1, name: "Sporting BJD FC", played: 24, won: 19, drawn: 2, lost: 3, points: 59 },
            { position: 2, name: "Cootehill Harps", played: 25, won: 14, drawn: 2, lost: 9, points: 44 },
            { position: 3, name: "OMP United", played: 23, won: 12, drawn: 4, lost: 7, points: 40 },
            { position: 4, name: "Fordrew Rovers", played: 26, won: 11, drawn: 5, lost: 10, points: 38 },
            { position: 5, name: "Rathkenny Rovers", played: 26, won: 11, drawn: 1, lost: 14, points: 34 },
        ],
    },
    Women: {
        "UHY Farrelly Dawe White Womens Premier Division": [
            { position: 1, name: "Bellurgan United", played: 11, won: 11, drawn: 0, lost: 0, points: 33 },
            { position: 2, name: "Kingscourt Harps AFC", played: 13, won: 9, drawn: 0, lost: 4, points: 27 },
            { position: 3, name: "Athboy Celtic FC", played: 13, won: 7, drawn: 1, lost: 5, points: 22 },
            { position: 4, name: "Parkvilla FC", played: 13, won: 6, drawn: 1, lost: 6, points: 19 },
            { position: 5, name: "Albion Rovers FC", played: 13, won: 6, drawn: 0, lost: 7, points: 18 },
        ],
        "UHY Farrelly Dawe White Womens Division 1": [
            { position: 1, name: "Balbriggan FC", played: 12, won: 10, drawn: 2, lost: 0, points: 32 },
            { position: 2, name: "Balrath FC", played: 13, won: 8, drawn: 2, lost: 3, points: 26 },
            { position: 3, name: "Ballyhaise Celtic", played: 13, won: 6, drawn: 2, lost: 5, points: 20 },
            { position: 4, name: "Kentstown Rovers FC", played: 12, won: 5, drawn: 2, lost: 5, points: 17 },
            { position: 5, name: "Dunshaughlin Youths", played: 11, won: 4, drawn: 4, lost: 3, points: 16 },
        ],
        "UHY Farrelly Dawe White Division 2": [
            { position: 1, name: "Rossin Rovers", played: 14, won: 12, drawn: 0, lost: 2, points: 36 },
            { position: 2, name: "Termonfeckin Celtic FC", played: 14, won: 11, drawn: 0, lost: 3, points: 33 },
            { position: 3, name: "Carrick Rovers AFC", played: 14, won: 7, drawn: 1, lost: 6, points: 22 },
            { position: 4, name: "Glen Magic FC", played: 14, won: 7, drawn: 1, lost: 6, points: 22 },
            { position: 5, name: "Parkceltic Summerhill", played: 13, won: 6, drawn: 0, lost: 7, points: 18 },
        ],
    },
};
