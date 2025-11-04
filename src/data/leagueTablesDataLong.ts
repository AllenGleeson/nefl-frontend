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

export const leagueTablesDataLong: LeagueTables = {
  Men: {
    "UHY Farrelly Dawe White Premier Division": [
      { position: 1, name: "Parkvilla FC", played: 17, won: 11, drawn: 4, lost: 2, points: 37 },
      { position: 2, name: "Duleek AFC", played: 17, won: 11, drawn: 3, lost: 3, points: 36 },
      { position: 3, name: "Rock Celtic FC", played: 17, won: 7, drawn: 5, lost: 5, points: 26 },
      { position: 4, name: "Quay Celtic FC", played: 16, won: 8, drawn: 1, lost: 7, points: 25 },
      { position: 5, name: "Bellurgan United", played: 17, won: 7, drawn: 3, lost: 7, points: 24 },
      { position: 6, name: "Trim Celtic AFC", played: 15, won: 6, drawn: 5, lost: 4, points: 23 },
      { position: 7, name: "Glenmuir FC", played: 18, won: 5, drawn: 3, lost: 10, points: 18 },
      { position: 8, name: "Carrick Rovers AFC", played: 16, won: 5, drawn: 2, lost: 9, points: 17 },
      { position: 9, name: "Kentstown Rovers FC", played: 18, won: 4, drawn: 4, lost: 10, points: 16 },
      { position: 10, name: "Albion Rovers FC", played: 17, won: 3, drawn: 4, lost: 10, points: 13 },
    ],
    "O Neills Sportswear Division 1": [
      { position: 1, name: "Johnstown FC", played: 15, won: 13, drawn: 1, lost: 1, points: 40 },
      { position: 2, name: "Ardee Celtic FC", played: 16, won: 10, drawn: 2, lost: 4, points: 32 },
      { position: 3, name: "Torro United FC", played: 16, won: 9, drawn: 2, lost: 5, points: 29 },
      { position: 4, name: "Robinstown FC", played: 16, won: 8, drawn: 3, lost: 5, points: 27 },
      { position: 5, name: "Kingscourt Harps AFC", played: 16, won: 6, drawn: 3, lost: 7, points: 21 },
      { position: 6, name: "Athboy Celtic FC", played: 15, won: 5, drawn: 2, lost: 8, points: 17 },
      { position: 7, name: "Walshestown FC", played: 16, won: 4, drawn: 3, lost: 9, points: 15 },
      { position: 8, name: "Trim Celtic AFC", played: 16, won: 3, drawn: 2, lost: 11, points: 11 },
      { position: 9, name: "Navan Town Cosmos", played: 16, won: 3, drawn: 2, lost: 11, points: 11 },
    ],
    "PM Blinds & Shutters Division 2": [
      { position: 1, name: "BJD Celtic", played: 22, won: 21, drawn: 0, lost: 1, points: 63 },
      { position: 2, name: "Black Bull FC", played: 22, won: 16, drawn: 2, lost: 4, points: 50 },
      { position: 3, name: "Enfield Celtic FC", played: 20, won: 15, drawn: 2, lost: 3, points: 47 },
      { position: 4, name: "Duleek AFC", played: 21, won: 12, drawn: 2, lost: 7, points: 38 },
      { position: 5, name: "Oldcastle United", played: 22, won: 10, drawn: 3, lost: 9, points: 33 },
      { position: 6, name: "Termonfeckin Celtic FC", played: 20, won: 10, drawn: 2, lost: 8, points: 32 },
      { position: 7, name: "Parkvilla FC", played: 21, won: 10, drawn: 2, lost: 9, points: 32 },
      { position: 8, name: "Carrick Rovers AFC", played: 21, won: 6, drawn: 5, lost: 10, points: 23 },
      { position: 9, name: "Virginia Celtic FC", played: 21, won: 6, drawn: 2, lost: 13, points: 20 },
      { position: 10, name: "Trim Town FC", played: 22, won: 6, drawn: 2, lost: 14, points: 20 },
      { position: 11, name: "Bailieboro Celtic AFC", played: 22, won: 2, drawn: 1, lost: 19, points: 7 },
      { position: 12, name: "Kells Celtic Youths", played: 22, won: 1, drawn: 3, lost: 18, points: 6 },
    ],
    "Superior Racking & Shelving Division 3": [
      { position: 1, name: "Monaghan United FC", played: 22, won: 17, drawn: 2, lost: 3, points: 53 },
      { position: 2, name: "Monaghan Town FC", played: 22, won: 15, drawn: 3, lost: 4, points: 48 },
      { position: 3, name: "Cootehill Harps", played: 22, won: 12, drawn: 4, lost: 6, points: 40 },
      { position: 4, name: "Rossin Rovers", played: 22, won: 10, drawn: 5, lost: 7, points: 35 },
      { position: 5, name: "Ardee Celtic FC", played: 22, won: 10, drawn: 3, lost: 9, points: 33 },
      { position: 6, name: "Rock Celtic FC", played: 22, won: 10, drawn: 3, lost: 9, points: 33 },
      { position: 7, name: "Albion Rovers FC", played: 22, won: 9, drawn: 3, lost: 10, points: 30 },
      { position: 8, name: "Bellurgan United", played: 22, won: 9, drawn: 3, lost: 10, points: 30 },
      { position: 9, name: "Newtown United", played: 22, won: 9, drawn: 1, lost: 12, points: 28 },
      { position: 10, name: "Kingscourt Harps AFC", played: 22, won: 7, drawn: 2, lost: 13, points: 23 },
      { position: 11, name: "Termonfeckin Celtic FC", played: 22, won: 4, drawn: 4, lost: 14, points: 16 },
      { position: 12, name: "Glenmuir FC", played: 22, won: 3, drawn: 1, lost: 18, points: 10 },
    ],
    "Superior Racking & Shelving Division 3A": [
      { position: 1, name: "Aston Celtic FC", played: 22, won: 19, drawn: 2, lost: 1, points: 59 },
      { position: 2, name: "Electro Celtic FC", played: 23, won: 17, drawn: 2, lost: 4, points: 53 },
      { position: 3, name: "Longwood AFC", played: 21, won: 15, drawn: 2, lost: 4, points: 47 },
      { position: 4, name: "Enfield Celtic FC", played: 23, won: 13, drawn: 3, lost: 7, points: 42 },
      { position: 5, name: "Albion Rovers FC", played: 23, won: 11, drawn: 2, lost: 10, points: 35 },
      { position: 6, name: "Johnstown FC", played: 20, won: 10, drawn: 3, lost: 7, points: 33 },
      { position: 7, name: "Robinstown FC", played: 24, won: 8, drawn: 4, lost: 12, points: 28 },
      { position: 8, name: "OMP United", played: 22, won: 8, drawn: 2, lost: 12, points: 26 },
      { position: 9, name: "Castle Villa", played: 23, won: 7, drawn: 4, lost: 12, points: 25 },
      { position: 10, name: "Kentstown Rovers FC", played: 22, won: 6, drawn: 5, lost: 11, points: 23 },
      { position: 11, name: "Bohermeen Celtic FC", played: 22, won: 6, drawn: 3, lost: 13, points: 21 },
      { position: 12, name: "Torro United FC", played: 23, won: 4, drawn: 3, lost: 16, points: 15 },
      { position: 13, name: "Parkceltic Summerhill", played: 24, won: 3, drawn: 3, lost: 18, points: 12 },
    ],
    "Superior Racking & Shelving Division 4": [
      { position: 1, name: "Sporting BJD FC", played: 24, won: 19, drawn: 2, lost: 3, points: 59 },
      { position: 2, name: "Cootehill Harps", played: 25, won: 14, drawn: 2, lost: 9, points: 44 },
      { position: 3, name: "OMP United", played: 23, won: 12, drawn: 4, lost: 7, points: 40 },
      { position: 4, name: "Fordrew Rovers", played: 26, won: 11, drawn: 5, lost: 10, points: 38 },
      { position: 5, name: "Rathkenny Rovers", played: 26, won: 11, drawn: 1, lost: 14, points: 34 },
      { position: 6, name: "Raharney United FC", played: 21, won: 8, drawn: 2, lost: 11, points: 26 },
      { position: 7, name: "Rossin Rovers", played: 21, won: 6, drawn: 3, lost: 12, points: 21 },
      { position: 8, name: "Newtown Celtic FC", played: 24, won: 17, drawn: 2, lost: 5, points: 15 },
      { position: 9, name: "Enfield Celtic FC", played: 27, won: 9, drawn: 1, lost: 17, points: 12 },
      { position: 10, name: "Grove Rangers", played: 21, won: 2, drawn: 2, lost: 17, points: 8 },
      { position: 11, name: "Ballyhaise Celtic", played: 23, won: 1, drawn: 4, lost: 18, points: 7 },
      { position: 12, name: "Ballivor FC", played: 25, won: 16, drawn: 2, lost: 7, points: 6 },
      { position: 13, name: "Trim Town FC", played: 23, won: 15, drawn: 3, lost: 5, points: 4 },
      { position: 14, name: "Castle Villa", played: 25, won: 7, drawn: 5, lost: 13, points: 3 },
    ],
  },
  Women: {
    "UHY Farrelly Dawe White Womens Premier Division": [
      { position: 1, name: "Bellurgan United", played: 11, won: 11, drawn: 0, lost: 0, points: 33 },
      { position: 2, name: "Kingscourt Harps AFC", played: 13, won: 9, drawn: 0, lost: 4, points: 27 },
      { position: 3, name: "Athboy Celtic FC", played: 13, won: 7, drawn: 1, lost: 5, points: 22 },
      { position: 4, name: "Parkvilla FC", played: 13, won: 6, drawn: 1, lost: 6, points: 19 },
      { position: 5, name: "Albion Rovers FC", played: 13, won: 6, drawn: 0, lost: 7, points: 18 },
      { position: 6, name: "Cootehill Harps", played: 11, won: 5, drawn: 0, lost: 6, points: 15 },
      { position: 7, name: "Torro United FC", played: 13, won: 2, drawn: 2, lost: 9, points: 8 },
      { position: 8, name: "Kinnegad Juniors AFC", played: 13, won: 1, drawn: 2, lost: 10, points: 5 },
    ],
    "UHY Farrelly Dawe White Womens Division 1": [
      { position: 1, name: "Balbriggan FC", played: 12, won: 10, drawn: 2, lost: 0, points: 32 },
      { position: 2, name: "Balrath FC", played: 13, won: 8, drawn: 2, lost: 3, points: 26 },
      { position: 3, name: "Ballyhaise Celtic", played: 13, won: 6, drawn: 2, lost: 5, points: 20 },
      { position: 4, name: "Kentstown Rovers FC", played: 12, won: 5, drawn: 2, lost: 5, points: 17 },
      { position: 5, name: "Dunshaughlin Youths", played: 11, won: 4, drawn: 4, lost: 3, points: 16 },
      { position: 6, name: "Ardee Celtic FC", played: 13, won: 3, drawn: 1, lost: 9, points: 10 },
      { position: 7, name: "Duleek AFC", played: 11, won: 2, drawn: 2, lost: 7, points: 8 },
      { position: 8, name: "Trim Celtic AFC", played: 11, won: 2, drawn: 1, lost: 8, points: 7 },
    ],
    "UHY Farrelly Dawe White Division 2": [
      { position: 1, name: "Rossin Rovers", played: 14, won: 12, drawn: 0, lost: 2, points: 36 },
      { position: 2, name: "Termonfeckin Celtic FC", played: 14, won: 11, drawn: 0, lost: 3, points: 33 },
      { position: 3, name: "Carrick Rovers AFC", played: 14, won: 7, drawn: 1, lost: 6, points: 22 },
      { position: 4, name: "Glen Magic FC", played: 14, won: 7, drawn: 1, lost: 6, points: 22 },
      { position: 5, name: "Parkceltic Summerhill", played: 13, won: 6, drawn: 0, lost: 7, points: 18 },
      { position: 6, name: "Dunshaughlin Youths", played: 13, won: 5, drawn: 1, lost: 7, points: 16 },
      { position: 7, name: "Longwood AFC", played: 14, won: 4, drawn: 1, lost: 9, points: 13 },
      { position: 8, name: "Torro United FC", played: 14, won: 1, drawn: 0, lost: 13, points: 3 },
    ],
  },
};
