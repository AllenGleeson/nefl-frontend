// NEFL roll of honour: every league, cup, shield and club award winner, newest first.
// Source: https://nefl.ie/roll-of-honour/ (copied 29 October 2026). The source stops at 2019.
// Player of the Year and the awards given to people (referee, manager, special merit) are left out on purpose.
// Team names are as the league recorded them ("Trim Celtic 2nds", "Kentstown Rovers"), so they don't always
// match a club's current name. getClubHonours in utils/rollOfHonour.ts links them to clubs.

export type HonourEntry = {
  /** "1995/96", or a single year once the league moved to calendar-year seasons */
  season: string;
  /** First year of the season, for sorting */
  year: number;
  winner?: string;
  runnerUp?: string;
  /** e.g. "Following a play-off", "Not played due to Foot & Mouth" */
  note?: string;
};

export type HonourCompetition = { id: string; name: string; entries: HonourEntry[] };

export type HonourCategory = {
  id: "league" | "reserve" | "cup" | "shield" | "awards";
  label: string;
  competitions: HonourCompetition[];
};

export const rollOfHonour: HonourCategory[] = [
  {
    "id": "league",
    "label": "League winners",
    "competitions": [
      {
        "id": "premier",
        "name": "Premier Division",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Trim Celtic",
            "runnerUp": "Boyne Harps"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Boyne Harps",
            "runnerUp": "Muirhevnamor"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Newfoundwell",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Muirhevnamor",
            "runnerUp": "Newfoundwell"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Navan Cosmos",
            "runnerUp": "Newfoundwell"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Boyne Harps",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Woodview Celtic",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Rock Celtic",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Woodview Celtic",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Woodview Celtic",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Rock Celtic",
            "runnerUp": "Carrick Rovers",
            "note": "Following a play-off"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Rock Celtic",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Glenmuir Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Trim Celtic",
            "runnerUp": "Square Utd"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Albion Rovers",
            "runnerUp": "Ardee Celtic"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Slane Wdrs",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Albion Rovers",
            "runnerUp": "Glenmuir Utd"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Bellurgan Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Bellurgan Utd",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Bellurgan Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Square Utd",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Bellurgan Utd",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Carrick Rovers",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bellurgan Utd",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Dromin Utd",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Dromin Utd",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Dromin Utd",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Square Utd",
            "runnerUp": "Clonee Utd"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Newtown Utd",
            "runnerUp": "OMP Utd",
            "note": "Following a play-off"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Square Utd",
            "runnerUp": "Albion Rovers"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Stackallen Rovers",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Oldcastle Utd",
            "runnerUp": "Ratoath Harps"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Oldcastle Utd",
            "runnerUp": "Dunboyne"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "OMP Utd",
            "runnerUp": "Dunboyne"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "OMP Utd",
            "runnerUp": "Moynalvey"
          },
          {
            "season": "1984/85",
            "year": 1984,
            "winner": "OMP Utd",
            "runnerUp": "Corbawn Utd"
          },
          {
            "season": "1983/84",
            "year": 1983,
            "winner": "Moynalvey",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1982/83",
            "year": 1982,
            "winner": "Moynalvey",
            "runnerUp": "Shambo"
          },
          {
            "season": "1981/82",
            "year": 1981,
            "winner": "Moynalvey",
            "runnerUp": "Castle Celtic"
          },
          {
            "season": "1980/81",
            "year": 1980,
            "winner": "Moynalvey",
            "runnerUp": "Robinstown"
          }
        ]
      },
      {
        "id": "division-1",
        "name": "Division 1",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Carrick Rovers",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Parkvilla",
            "runnerUp": "Square Utd"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Rock Celtic",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "OMP Utd",
            "runnerUp": "Black Bull"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Muirhevnamor",
            "runnerUp": "Duleek"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Abbey Celtic",
            "runnerUp": "Kingscourt Harps"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Newfoundwell",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Muirhevnamor",
            "runnerUp": "Boyne Harps"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Navan Cosmos",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Dromin Utd",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Marsh Celtic",
            "runnerUp": "Cavan Town"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Clones Town",
            "runnerUp": "Torro Utd"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Woodview Celtic",
            "runnerUp": "Navan Town"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Duleek",
            "runnerUp": "Glaslough Villa"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Navan Cosmos",
            "runnerUp": "Blackwater Utd"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Kells Celtic",
            "runnerUp": "Torro Utd"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Rathkenny Rovers",
            "runnerUp": "Trim Town"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Electro Celtic",
            "runnerUp": "Square Utd"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Ardee Celtic",
            "runnerUp": "Botown Utd"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Kentstown Rovers",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "OMP Utd",
            "runnerUp": "Ratoath Harps"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Duleek",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Albion Rovers",
            "runnerUp": "Clogherhead Celtic"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Duleek Gate",
            "runnerUp": "C & R Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Slane Wanderers",
            "runnerUp": "Stackallen Rovers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Castle Villa",
            "runnerUp": "Clonee Utd",
            "note": "Following a play-off"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "St Laurences Gate",
            "runnerUp": "Kentstown Rovers",
            "note": "Following a play-off"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Oldcastle Utd",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Clonee Utd",
            "runnerUp": "Corbawn Utd"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Drumcar Celtic",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Albion Rovers",
            "runnerUp": "Square Utd",
            "note": "Following a play-off"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Kentstown Rovers",
            "runnerUp": "Abbey Celtic",
            "note": "Following a play-off"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Cavan Town",
            "runnerUp": "Skryne Rangers",
            "note": "Following a play-off"
          }
        ]
      },
      {
        "id": "division-2",
        "name": "Division 2",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Chord Celtic",
            "runnerUp": "Athboy Celtic"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Bay FC",
            "runnerUp": "Redeemer Celtic",
            "note": "Following a play-off"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Albion Rovers",
            "runnerUp": "Torro Utd"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Rangers FC",
            "runnerUp": "Kells-Blackwater"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Navan Town",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Athboy Celtic",
            "runnerUp": "Johnstown"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Cavan Town",
            "runnerUp": "Abbey Celtic"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Kells Celtic",
            "runnerUp": "Newfoundwell"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Boyne Harps",
            "runnerUp": "Black Bull"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Knightsbrook",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Kentstown Rovers",
            "runnerUp": "Kells-Blackwater",
            "note": "Following a play-off"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Skryne-Tara",
            "runnerUp": "Bohermeen Celtic"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Longwood",
            "runnerUp": "Kentstown Rovers",
            "note": "Following a play-off"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Woodview Celtic",
            "runnerUp": "Termonfeckin"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Bellurgan Utd",
            "runnerUp": "Navan Town"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Blackwater Utd",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Northside Blues",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Rathkenny Rovers",
            "runnerUp": "Tara"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Electro Celtic",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Cloughertown Utd",
            "runnerUp": "Fordrew Rovers"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Northside Blues",
            "runnerUp": "Rathkenny Rovers"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Trim Town",
            "runnerUp": "Bridge Park"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Rock Celtic",
            "runnerUp": "Torro Utd"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Clogherhead Celtic",
            "runnerUp": "Tara"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Dunshaughlin Utd",
            "runnerUp": "Duleek Gate"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Bailieboro Celtic",
            "runnerUp": "Gormanston"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Slane",
            "runnerUp": "Castle Villa"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Robinstown",
            "runnerUp": "Electro Celtic"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Kells Celtic",
            "runnerUp": "St Laurences Gate"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Clonee Utd",
            "runnerUp": "College Green",
            "note": "Following a play-off"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Newtown Utd",
            "runnerUp": "Drumcar Celtic"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Navan Celtic",
            "runnerUp": "Rathkenny Rovers"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Corbawn Utd",
            "runnerUp": "Grove Rangers"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Archers",
            "runnerUp": "Beauparc Celtic"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Ratoath Harps",
            "runnerUp": "Dunboyne"
          },
          {
            "season": "1984/85",
            "year": 1984,
            "winner": "Spiders",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "1983/84",
            "year": 1983,
            "winner": "Archers",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1982/83",
            "year": 1982,
            "winner": "Athboy Blues",
            "runnerUp": "Archers"
          },
          {
            "season": "1981/82",
            "year": 1981,
            "winner": "Albion Rovers (Ballivor)",
            "runnerUp": "Slane Ramblers"
          }
        ]
      },
      {
        "id": "division-3",
        "name": "Division 3",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Trim Celtic 2nds",
            "runnerUp": "Boyne Harps 2nds",
            "note": "Following a play-off"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Newtown Utd",
            "runnerUp": "Donacarney Celtic"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Rathmullen Celtic",
            "runnerUp": "Bay FC"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Virginia Celtic",
            "runnerUp": "Albion Rovers"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Rangers FC",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Enfield Celtic",
            "runnerUp": "Rathkenny Rovers"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Laurences FC",
            "runnerUp": "Kells-Blackwater"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Abbey Celtic",
            "runnerUp": "Fordrew Rovers"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Oldcastle Utd",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Johnstown",
            "runnerUp": "Abbey Celtic"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Athboy Celtic",
            "runnerUp": "Knightsbrook",
            "note": "Following a play-off"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Black Bull",
            "runnerUp": "Rossin Rovers"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Summerhill Celtic",
            "runnerUp": "Boyne Harps"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Longwood",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Woodview Celtic",
            "runnerUp": "Castle Villa"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Chord Celtic",
            "runnerUp": "BMC Utd"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Termonfeckin",
            "runnerUp": "Marsh Celtic"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Kells Celtic",
            "runnerUp": "Blackwater Utd"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Summerhill Celtic",
            "runnerUp": "Navan Town"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Manor Farm",
            "runnerUp": "Sheelin Celtic"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Enfield Celtic",
            "runnerUp": "North Celtic"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Cloughertown Utd",
            "runnerUp": "Bohermeen Celtic"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Bridge Park",
            "runnerUp": "C& M Utd"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Torro Utd",
            "runnerUp": "Donore Rovers"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Clogherhead Celtic",
            "runnerUp": "Mellifont Utd"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Duleek Gate",
            "runnerUp": "Tara"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Trim Town",
            "runnerUp": "Dunshaughlin"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "College Rovers",
            "runnerUp": "Slane Wanderers"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Robinstown",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Electro Celtic",
            "runnerUp": "Athboy Utd"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Clonee Utd",
            "runnerUp": "Dunboyne 2nds"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "College Green",
            "runnerUp": "Stackallen Rov 2nds"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Navan Celtic",
            "runnerUp": "Cabra Utd"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Newtown Utd",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Beauparc Celtic",
            "runnerUp": "Summerhill Celtic"
          },
          {
            "season": "1984/85",
            "year": 1984,
            "winner": "Windtown Utd",
            "runnerUp": "OMP Utd 2nds"
          },
          {
            "season": "1983/84",
            "year": 1983,
            "winner": "Brewery",
            "runnerUp": "Killua Wanderers"
          }
        ]
      },
      {
        "id": "division-4",
        "name": "Division 4",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Lourdes Celtic",
            "runnerUp": "Carrick Rovers 2nds",
            "note": "Following a play-off"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Millmount Celtic",
            "runnerUp": "Bohermeen Celtic"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Kilmessan",
            "runnerUp": "Moneymore"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Skryne-Tara",
            "runnerUp": "Park Celtic Summerhill"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Bay FC",
            "runnerUp": "BJD Celtic"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Hazel Lane",
            "runnerUp": "Rangers FC"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Termonfechin",
            "runnerUp": "Rossin Rovers"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Boyne Valley",
            "runnerUp": "Kilmessan"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Laurences Inn",
            "runnerUp": "Lourdes Celtic"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Drogheda Crescent",
            "runnerUp": "M4 Rovers"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Moneymore",
            "runnerUp": "Donore Rovers",
            "note": "Following a play-off"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Knightsbrook",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Mosney Utd",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Donacarney",
            "runnerUp": "Townspark Rangers"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Boyne Harps",
            "runnerUp": "Johnstown"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Beaufort Wdrs",
            "runnerUp": "Skryne Rangers"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "BMC Utd",
            "runnerUp": "Kilmessan"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Glen Rangers",
            "runnerUp": "Chord Celtic"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Kells Celtic",
            "runnerUp": "Marsh Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Summerhill Celtic",
            "runnerUp": "Navan Town"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Kinnegad-Rossan",
            "runnerUp": "Sheelin Celtic"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Abbey Celtic",
            "runnerUp": "Rossin Rovers"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "North Celtic",
            "runnerUp": "Dunderry"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bridge Park",
            "runnerUp": "Cortown Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "C & M Utd",
            "runnerUp": "Donore Rovers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Torro Utd",
            "runnerUp": "Cloughertown Utd"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Dunleer",
            "runnerUp": "Mellifont"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Gormanston",
            "runnerUp": "Cabra Utd"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Slane",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Carnaross Utd",
            "runnerUp": "College Rovers",
            "note": "Following a play-off"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Robinstown",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Dunshaughlin Rebels",
            "runnerUp": "Castle Villa"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Shambo",
            "runnerUp": "College Green"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Munterconnaught",
            "runnerUp": "Cabra Utd"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Agher",
            "runnerUp": "Dunboyne 2nds"
          },
          {
            "season": "1984/85",
            "year": 1984,
            "winner": "Brewery 2nds",
            "runnerUp": "Summerhill Celtic"
          },
          {
            "season": "1983/84",
            "year": 1983,
            "winner": "OMP Utd 2nds",
            "runnerUp": "Windtown Utd"
          }
        ]
      },
      {
        "id": "division-4a",
        "name": "Division 4A",
        "entries": [
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Division discontinued"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Glen Rangers",
            "runnerUp": "Kilmessan"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Chestnut Rovers",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Townspark Rangers",
            "runnerUp": "Fordrew Rovers"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Milltownpass",
            "runnerUp": "Cloughan Celtic"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Boyneside Celtic",
            "runnerUp": "Kinnegad/Rossan Rovers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Ballivor",
            "runnerUp": "Chestnut Rovers"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Kells",
            "runnerUp": "Manor Farm"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Clogherhead",
            "runnerUp": "Cavan Town 2nds"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Mullingar Celtic",
            "runnerUp": "INF"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Newtown Utd",
            "runnerUp": "Oldcastle Utd 2nds"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Cavan Town 2nds",
            "runnerUp": "Speedwell Rvrs 2nds"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Bailieboro Celtic",
            "runnerUp": "BMC Utd"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Castlevilla",
            "runnerUp": "Dean Cogan"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Castlepollard",
            "runnerUp": "Clonee Utd"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Athboy Blues 2nds",
            "runnerUp": "Tower View Utd"
          }
        ]
      },
      {
        "id": "division-4b",
        "name": "Division 4B",
        "entries": [
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Duleek Gate",
            "runnerUp": "North Celtic"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Dunleer",
            "runnerUp": "Mellifont"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Bailieboro Celtic",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Torro Utd",
            "runnerUp": "Oldcastle Utd 2nd"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Electro Celtic",
            "runnerUp": "BMC Utd"
          }
        ]
      },
      {
        "id": "division-4c",
        "name": "Division 4C",
        "entries": [
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Boyneside",
            "runnerUp": "Torro Utd 2nds",
            "note": "Following a play-off"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Clonee Utd 2nds",
            "runnerUp": "Kentstown 2nds"
          }
        ]
      },
      {
        "id": "division-5",
        "name": "Division 5",
        "entries": [
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "College Green",
            "runnerUp": "Shambo 2nds"
          }
        ]
      },
      {
        "id": "division-5-north",
        "name": "Division 5 North",
        "entries": [
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Electro Celtic 2nds",
            "runnerUp": "Coole Ramblers"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Chestnut Rovers",
            "runnerUp": "BMC Utd"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Kells Celtic 2nds",
            "runnerUp": "Chestnut Rovers"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Electro Celtic 2nds",
            "runnerUp": "Kentstown Rov 2nds",
            "note": "Following a play-off"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Glen Rangers",
            "runnerUp": "Rathkenny Rov 2nds"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Newtown Utd 2nds",
            "runnerUp": "Rathkenny Rov 2nds",
            "note": "Following a play-off"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Reask Rovers",
            "runnerUp": "Speedwell 2nds"
          }
        ]
      },
      {
        "id": "division-5-south",
        "name": "Division 5 South",
        "entries": [
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Kilmessan 2nds",
            "runnerUp": "Agher Park 2nds"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Trim Celtic 2nds",
            "runnerUp": "Trim Town 2nds"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Clonee Utd 2nds",
            "runnerUp": "Mullingar Athletic 3rds"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Cushinstown",
            "runnerUp": "Trim Town 2nds",
            "note": "Following a play-off"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Kilmessan 2nds",
            "runnerUp": "Kentstown Rovers 2nds"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Dunboyne 3rds",
            "runnerUp": "Trim Town 2nds"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Dunshaughlin 2nds",
            "runnerUp": "Dunboyne 3rds"
          }
        ]
      }
    ]
  },
  {
    "id": "reserve",
    "label": "Reserve league winners",
    "competitions": [
      {
        "id": "premier-reserve",
        "name": "Premier Reserve",
        "entries": [
          {
            "season": "2018",
            "year": 2018,
            "winner": "Trim Celtic",
            "runnerUp": "Boyne Harps"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Newfoundwell",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Duleek",
            "runnerUp": "Newfoundwell"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Trim Celtic",
            "runnerUp": "Kingscourt Harps"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Rock Celtic",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Woodview Celtic",
            "runnerUp": "Kingscourt Harps"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Quay Celtic",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Woodview Celtic",
            "runnerUp": "Duleek"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Rock Celtic",
            "runnerUp": "Duleek"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Rock Celtic",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Duleek",
            "runnerUp": "Glenmuir Utd"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Trim Celtic",
            "runnerUp": "Glenmuir Utd"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Ardee Celtic",
            "runnerUp": "Duleek"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Carrick Rovers",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Ardee Celtic",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Carrick Rovers",
            "runnerUp": "Trim Town"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Rock Celtic",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Bellurgan Utd",
            "runnerUp": "Dromin Utd"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Bellurgan Utd",
            "runnerUp": "Duleek"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Bellurgan Utd",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Bellurgan Utd",
            "runnerUp": "Duleek Gate"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Duleek",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Slane Wanderers",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Newtown Utd",
            "runnerUp": "Slane Wanderers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Clonee Utd",
            "runnerUp": "Electro Celtic"
          }
        ]
      },
      {
        "id": "premier-a-reserve",
        "name": "Premier A Reserve",
        "entries": [
          {
            "season": "2018",
            "year": 2018,
            "winner": "Parkvilla",
            "runnerUp": "Hazel Lane"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Kingscourt Harps 3rds",
            "runnerUp": "Navan Town"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Ardee Celtic",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Newfoundwell",
            "runnerUp": "Abbey Celtic"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Kentstown Rovers",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Kingscourt Harps",
            "runnerUp": "Drogheda Town"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Quay Celtic",
            "runnerUp": "Dromin Utd"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Woodview Celtic",
            "runnerUp": "Parkvilla"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Marsh Celtic",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Ardee Celtic 3rds",
            "runnerUp": "Navan Town"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Ardee Celtic 3rds",
            "runnerUp": "Slane Wdrs"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Marsh Celtic",
            "runnerUp": "Glaslough Villa"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Torro Utd",
            "runnerUp": "Slane Wdrs"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Albion Rovers",
            "runnerUp": "Glenmuir Utd"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Square Utd",
            "runnerUp": "Summerhill Celtic"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Trim Town",
            "runnerUp": "Botown Utd"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Trim Celtic",
            "runnerUp": "Kingscourt"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Albion Rovers",
            "runnerUp": "Kenstown Rovers"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Duleek 3rds",
            "runnerUp": "Bridge Park"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Trim Celtic",
            "runnerUp": "Gormanston Celtic"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Dromin Utd",
            "runnerUp": "Carrick Rovers",
            "note": "Following a play-off"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Square Utd",
            "runnerUp": "Mellifont Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Bellurgan Utd",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Square Utd",
            "runnerUp": "Slane Wanderers"
          }
        ]
      },
      {
        "id": "premier-b-reserve",
        "name": "Premier B Reserve",
        "entries": [
          {
            "season": "2018",
            "year": 2018,
            "winner": "Virginia Cel 2nds",
            "runnerUp": "Donacarney Celtic",
            "note": "Following a play-off"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Torro Utd",
            "runnerUp": "Athboy Celtic"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Albion Rovers 2nds",
            "runnerUp": "Ardee Celtic 3rds"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Kingscourt Harps 3rds",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Dromin Utd",
            "runnerUp": "Boyne Harps"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Muirhevnamor",
            "runnerUp": "Newfoundwell"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Drogheda Marsh",
            "runnerUp": "Abbey Celtic"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Slane Wdrs",
            "runnerUp": "Boca Rovers"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Dromin Utd",
            "runnerUp": "Electro Celtic"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Kells-Blackwater",
            "runnerUp": "Longwood"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Navan Cosmos",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Chord Celtic",
            "runnerUp": "Skryne/Tara"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Ardee Celtic 3rds",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Glaslough Villa",
            "runnerUp": "Oldcastle Utd"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Rossin Rovers",
            "runnerUp": "Townspark"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Electro Celtic",
            "runnerUp": "Tara"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Summerhill Celtic",
            "runnerUp": "Trim Celtic 3rds"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Electro Celtic",
            "runnerUp": "Athboy Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Not played"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "note": "Not played"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "note": "Not played"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Ratoath Harps",
            "runnerUp": "Trim Town"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Torro Utd",
            "runnerUp": "Dunshaughlin Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Kells Celtic",
            "runnerUp": "Castle Villa"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Agher Park",
            "runnerUp": "Dunshaughlin Utd"
          }
        ]
      },
      {
        "id": "premier-c-reserve",
        "name": "Premier C Reserve",
        "entries": [
          {
            "season": "2015/16",
            "year": 2015,
            "note": "Not played"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Park Celtic Summerhill",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Boyne Valley",
            "runnerUp": "Cloghertown"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Longwood-Knightsbrook",
            "runnerUp": "OMP 3rds"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Trim Town",
            "runnerUp": "Black Bull"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Boca Rovers",
            "runnerUp": "Rossin Rovers"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Woodview Celtic",
            "runnerUp": "Abbey Celtic"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Johnstown",
            "runnerUp": "Kingscourt Harps"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Donacarney",
            "runnerUp": "Summerhill"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Bohermeen Celtic",
            "runnerUp": "Chord Celtic"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Longwood",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "note": "Not played"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Castle Villa-C&M",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Blackwater Utd",
            "runnerUp": "Tara"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Summerhill Celtic",
            "runnerUp": "Rathkenny Rovers"
          }
        ]
      }
    ]
  },
  {
    "id": "cup",
    "label": "Cup winners",
    "competitions": [
      {
        "id": "challenge-cup",
        "name": "Tully Bookmakers Challenge Cup",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Trim Celtic",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Muirhevnamor",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Muirhevnamor",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Navan Cosmos",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Trim Celtic",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Bellurgan Utd",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Newfoundwell",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Duleek",
            "runnerUp": "Kingscourt Harps"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Woodview Celtic",
            "runnerUp": "Quay Celtic"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Clones Town",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Clones Town",
            "runnerUp": "Knightsbrook"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Glenmuir Utd",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Rock Celtic",
            "runnerUp": "Duleek"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Navan Town",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Duleek",
            "runnerUp": "Slane Wdrs"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Albion Rovers",
            "runnerUp": "Slane Wdrs"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Albion Rovers",
            "runnerUp": "Dunderry"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Bellurgan Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Rock Celtic",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Trim Celtic",
            "runnerUp": "Albion Rovers"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Rock Celtic",
            "runnerUp": "Slane Wdrs"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Dunderry",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Kentstown Rovers",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bellurgan Utd",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Dromin Utd",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Stackallen",
            "runnerUp": "Square"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Dromin Utd",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Drumcar Celtic",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Square Utd",
            "runnerUp": "Kells"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Drumcar Celtic",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Kentstown Rovers",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Dromin Utd",
            "runnerUp": "Skryne Rangers"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Stackallen Rovers",
            "runnerUp": "Cabra Utd"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Moynalvey",
            "runnerUp": "Dunboyne"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Moynalvey",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "1984/85",
            "year": 1984,
            "winner": "Moynalvey",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1983/84",
            "year": 1983,
            "winner": "Brewery",
            "runnerUp": "Shambo"
          },
          {
            "season": "1982/83",
            "year": 1982,
            "winner": "Moynalvey",
            "runnerUp": "Athboy Blues"
          },
          {
            "season": "1981/82",
            "year": 1981,
            "winner": "Cosmos",
            "runnerUp": "Moynalvey"
          },
          {
            "season": "1980/81",
            "year": 1980,
            "winner": "Kilmessan",
            "runnerUp": "Cosmos"
          }
        ]
      },
      {
        "id": "reserve-cup",
        "name": "Reserve Cup",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Boyne Harps",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Trim Celtic",
            "runnerUp": "Drogheda Town"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Newfoundwell",
            "runnerUp": "Johnstown"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Ardee Celtic 2nds",
            "runnerUp": "Kingscourt Harps 3rds"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Newfoundwell",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Dromin Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Rock Celtic 3rds",
            "runnerUp": "Muirhevnamor"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Quay Celtic",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Kingscourt Harps",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Parkvilla",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Woodview Celtic",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Navan Cosmos",
            "runnerUp": "Duleek"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Glaslough Villa",
            "runnerUp": "Duleek"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Trim Celtic"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Trim Celtic"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Glenmuir Utd"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Slane Wdrs"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Ardee Celtic"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Rock Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Not played"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Bellurgan Utd",
            "runnerUp": "Torro Utd"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Dulee Gate",
            "runnerUp": "Castle Villa"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Ratoath Harps",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Kells Celtic",
            "runnerUp": "Mellifont"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Dromin Utd",
            "runnerUp": "Torro Utd"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Kells Celtic",
            "runnerUp": "Dunshaughlin"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Kells Celtic",
            "runnerUp": "Clonee Utd"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Dromin Utd",
            "runnerUp": "Duleek"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Kells Celtic",
            "runnerUp": "Stackallen Rovers"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Stackallen",
            "runnerUp": "Dromin Utd"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "OMP Utd",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Duleek",
            "runnerUp": "Kentstown"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Ratoath 3rds",
            "runnerUp": "Oldcastle"
          }
        ]
      },
      {
        "id": "fitzsimons-cup",
        "name": "Fitzsimons Cup",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "OMP Utd",
            "runnerUp": "Chord Celtic"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Torro Utd",
            "runnerUp": "Glenmuir Utd"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Carrick Rovers",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Enfield Celtic",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Johnstown",
            "runnerUp": "Athboy Celtic"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Bohermeen Celtic",
            "runnerUp": "Kells-Blackwater"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Kingscourt Harps",
            "runnerUp": "Newfoundwell"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Kingscourt Harps",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Johnstown",
            "runnerUp": "Kingscourt Harps"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Black Bull",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Parkvilla",
            "runnerUp": "Summerhill Celtic"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "note": "Not played"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Woodview Celtic"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Woodview Celtic"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Rossin Rovers"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Bellurgan Utd"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Glenmuir Utd"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Fordrew Rovers",
            "runnerUp": "Electro Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Not played due to Foot & Mouth"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Fordrew Rovers",
            "runnerUp": "Northside Blues"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "North Celtic",
            "runnerUp": "Fordrew Rovers"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Bohermeen Celtic",
            "runnerUp": "C & M Utd"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Rock Celtic",
            "runnerUp": "Mellifont Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Torro Utd",
            "runnerUp": "Rathkenny Rovers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Duleek Gate",
            "runnerUp": "Trim Town"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Bailieboro",
            "runnerUp": "College Rovers"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Slane Wanderers",
            "runnerUp": "College Rovers"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "College Rovers",
            "runnerUp": "St Laurences Gate"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Clonee Utd",
            "runnerUp": "Castle Villa"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Dunboyne 2nds",
            "runnerUp": "Clonee Utd"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Newtown",
            "runnerUp": "Rathkenny"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Navan Celtic",
            "runnerUp": "Rossin Rovers"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Cabra Utd",
            "runnerUp": "Rathkenny Rovers"
          }
        ]
      },
      {
        "id": "gerry-reilly-cup",
        "name": "Gerry Reilly Memorial Cup",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Duleek 2nds",
            "runnerUp": "Abbey Celtic"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Parkvilla",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Trim Celtic 2nds",
            "runnerUp": "Kingscourt Harps 2nds"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Ardee Celtic 2nds",
            "runnerUp": "Park Cel Summerhill 2nds"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Ardee Celtic 2nds",
            "runnerUp": "Abbey Celtic 2nds"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Kingscourt Harps 2nds",
            "runnerUp": "Abbey Celtic 2nds"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Dunshaughlin 1sts",
            "runnerUp": "Rossin Rovers 1sts"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Kentstown 2nds",
            "runnerUp": "Kingscourt 2nds"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Duleek 2nds",
            "runnerUp": "Slane 2nds"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Duleek 2nds",
            "runnerUp": "Carrick Rovers 2nds"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Woodview 2nds",
            "runnerUp": "Oldcastle 2nds"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Knightsbrook",
            "runnerUp": "Carrick Rovers 2nds"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Glenmuir Utd2nds",
            "runnerUp": "Glaslough Villa 2nds"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Glenmuir Utd 2nds"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Glenmuir Utd 2nds"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Marsh Celtic 2nds"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Slane Wdrs 2nds"
          },
          {
            "season": "2002/03",
            "year": 2002
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Glen Rangers",
            "runnerUp": "Chord Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Not played"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Blackwater Utd",
            "runnerUp": "Navan Town"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Sheelin Celtic",
            "runnerUp": "Termonfeckin"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Enfield Celtic",
            "runnerUp": "Townspark Rangers"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Cortown Utd",
            "runnerUp": "Coole Rambler"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Kinnegad/Rossan",
            "runnerUp": "Donore Rovers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Navan Town",
            "runnerUp": "Beauparc"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Tara",
            "runnerUp": "Mellifont"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Dunboyne",
            "runnerUp": "Tara"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Mullingar Celtic",
            "runnerUp": "Gormanston"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Mullingar Athletic",
            "runnerUp": "Ratoath Harps"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Carnaross Utd",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Tara",
            "runnerUp": "Carnaross"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "College Green",
            "runnerUp": "Dean Cogan"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Double D",
            "runnerUp": "College Green"
          }
        ]
      },
      {
        "id": "excel-print-cup",
        "name": "Excel Print Cup",
        "entries": [
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Trim Town"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Trim Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Not played due to Foot & Mouth"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Torro Utd",
            "runnerUp": "Townspark"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Ratoath Harps",
            "runnerUp": "Botown Utd"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Duleek",
            "runnerUp": "Duleek Gate"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bellurgan Utd",
            "runnerUp": "Ratoath Harps"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Duleek",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Slane",
            "runnerUp": "Trim Celtic"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Duleek Gate",
            "runnerUp": "Dunshaughlin"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Dunleer",
            "runnerUp": "Sheelin Celtic"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Kells Celtic",
            "runnerUp": "Clonee"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Bailieboro",
            "runnerUp": "Cushenstown"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Skryne Rangers",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Electro Celtic",
            "runnerUp": "Newtown"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Dunshaughlin",
            "runnerUp": "NLR"
          }
        ]
      },
      {
        "id": "over-35-cup",
        "name": "Over 35s Cup",
        "entries": [
          {
            "season": "2018",
            "year": 2018,
            "winner": "Doolargey All Stars",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "2017",
            "year": 2017,
            "winner": "Woodview Celtic",
            "runnerUp": "Rock Celtic"
          }
        ]
      },
      {
        "id": "youths-cup",
        "name": "Youths Cup",
        "entries": [
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Glenmuir Utd",
            "runnerUp": "Quay Celtic"
          }
        ]
      },
      {
        "id": "fai-junior-cup",
        "name": "FAI Junior Cup",
        "entries": [
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Bellurgan Utd",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Albion Rovers",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Slane Wanderers",
            "runnerUp": "Old Cross Ath"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bellurgan Utd",
            "runnerUp": "Slane Wanderers"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Bellurgan Utd",
            "runnerUp": "Slane Wanderers"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Slane",
            "runnerUp": "St Laurences Gate"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Clones Town",
            "runnerUp": "Dromin Utd"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Clonee Utd",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Drumcar",
            "runnerUp": "Dromin"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Dromin Utd",
            "runnerUp": "Oldcastle Utd"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Kentstown Rovers",
            "runnerUp": "Stackallen Rovers"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Skryne Rangers",
            "runnerUp": "Kentstown Rovers"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Duleek",
            "runnerUp": "Abbey Celtic"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Riverbank",
            "runnerUp": "Duleek"
          }
        ]
      }
    ]
  },
  {
    "id": "shield",
    "label": "Shield winners",
    "competitions": [
      {
        "id": "kilmessan-shield",
        "name": "Kilmessan Shield",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Boyne Harps",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2018",
            "year": 2018,
            "winner": "Parkvilla",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Newfoundwell",
            "runnerUp": "Ardee Celtic"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Quay Celtic",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Navan Cosmos",
            "runnerUp": "Newfoundwell"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Newfoundwell",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Kingscourt Harps",
            "runnerUp": "Woodview Celtic"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Kingscourt Harps",
            "runnerUp": "Rock Celtic"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Woodview Celtic",
            "runnerUp": "Dromin Utd"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Knightsbrook",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Rock Celtic",
            "runnerUp": "Duleek"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Duleek",
            "runnerUp": "Carrick Rovers"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Glenmuir Utd",
            "runnerUp": "Mosney Utd"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Woodview Celtic"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Carrick Rovers"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Ardee Celtic",
            "runnerUp": "Navan Cosmos"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Northside Blues",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Rock Celtic",
            "runnerUp": "Torro Utd"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Albion Rovers",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Combined with 01/02 (foot & mouth)"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Carrick Rovers",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Bellurgan Utd",
            "runnerUp": "Ratoath Harps"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Athboy Celtic",
            "runnerUp": "Duleek Gate"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bellurgan Utd",
            "runnerUp": "Duleek Gate"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "OMP Utd",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Newtown",
            "runnerUp": "Kells"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Albion Rovers",
            "runnerUp": "Clonee Utd"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Clonee Utd",
            "runnerUp": "Square Utd"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "OMP Utd",
            "runnerUp": "Newtown Utd"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Dromin Utd",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Stackallen Rovers",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Abbey Celtic",
            "runnerUp": "Stackallen Rovers"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Stackallen Rovers",
            "runnerUp": "OMP Utd"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "OMP Utd",
            "runnerUp": "Moynalvey"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "OMP Utd",
            "runnerUp": "Moynalvey"
          },
          {
            "season": "1984/85",
            "year": 1984,
            "winner": "OMP Utd",
            "runnerUp": "Kentstown Rovers"
          }
        ]
      },
      {
        "id": "fiacre-oneill-shield",
        "name": "Fiacre O’Neill Memorial Shield",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Boyne Harps 2nds",
            "runnerUp": "Parkvilla 2nds"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Donacarney Celtic",
            "runnerUp": "Bay FC"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "Park Celtic Summerhill",
            "runnerUp": "Virginia Celtic"
          },
          {
            "season": "2015/16",
            "year": 2015,
            "winner": "Rangers FC",
            "runnerUp": "Virginia Celtic"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Enfield Celtic",
            "runnerUp": "Donacarney"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Electro Celtic",
            "runnerUp": "Laurences FC"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Bohermeen Celtic",
            "runnerUp": "Laurences FC"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Boca Rovers",
            "runnerUp": "Enfield Celtic"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Drogheda Crescent",
            "runnerUp": "Bailieboro Celtic"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Knightsbrook",
            "runnerUp": "Rathkenny"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Carrick Rovers",
            "runnerUp": "Electro Celtic"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Ardee Celtic 2nds",
            "runnerUp": "Skryne/Tara"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Blackwater 2nds"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Square Utd 2nds"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Ardee Celtic 2nds"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Castle Villa-C&M"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Carrick Rovers 2nds"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Trim Town 2nds"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "note": "Not played due to Foot & Mouth"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Summerhill Celtic",
            "runnerUp": "Botown 2nds"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Summerhill Celtic",
            "runnerUp": "Duleek 3rds"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Dunderry",
            "runnerUp": "Ratoath Harps 2nds"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Torro Utd 2nds",
            "runnerUp": "Enfield Celtic 2nds"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Boyneside Celtic",
            "runnerUp": "Bellurgan Utd 2nds"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Agher Park 2nds",
            "runnerUp": "Cloughertown 2nds"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Cushinstown Celtic",
            "runnerUp": "INF"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Beaupark Celtic",
            "runnerUp": "Clonee Utd 2nds"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Ratoath Harps 2nds",
            "runnerUp": "Ennel Court"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Slane Wanderers",
            "runnerUp": "Newtown 2nds"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Castlepollard Utd",
            "runnerUp": "Speedwell 2nds"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Speedwell 2nds",
            "runnerUp": "Trim Town 2nds"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Trim Town 2nds",
            "runnerUp": "Archers 2nds"
          }
        ]
      },
      {
        "id": "gerry-bradley-shield",
        "name": "Gerry Bradley Memorial Shield",
        "entries": [
          {
            "season": "2003/04",
            "year": 2003,
            "note": "Discontinued"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Summerhill Celtic"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Slane Wanderers 2nds"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Summerhill Celtic"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Fordrew Rovers",
            "runnerUp": "Duleek 2nds"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Rathkenny Rovers",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Bridge Park",
            "runnerUp": "Gormanston Celtic"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bridge Park",
            "runnerUp": "BMC Utd"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Mellifont Utd",
            "runnerUp": "Cavan Town"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Duleek Gate",
            "runnerUp": "Dunshaughlin"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Dunleer",
            "runnerUp": "Kells Celtic"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Slane Wanderers",
            "runnerUp": "Duleek"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "Trim Town",
            "runnerUp": "Robinstown"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Clonee Utd",
            "runnerUp": "Athboy Utd"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "Robinstown",
            "runnerUp": "Cavan Town 2nds"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Robinstown",
            "runnerUp": "Dunboyne 2nds"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "winner": "Cabra Utd",
            "runnerUp": "Shambo"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "Cabra Utd",
            "runnerUp": "Dean Cogan"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Claremont",
            "runnerUp": "Clonee Utd"
          },
          {
            "season": "1984/85",
            "year": 1984,
            "winner": "OMP Utd 2nds",
            "runnerUp": "Brewery 2nds"
          }
        ]
      }
    ]
  },
  {
    "id": "awards",
    "label": "Club awards",
    "competitions": [
      {
        "id": "club-of-the-year",
        "name": "Club of the Year",
        "entries": [
          {
            "season": "2019",
            "year": 2019,
            "winner": "Trim Celtic"
          },
          {
            "season": "2017/18",
            "year": 2017,
            "winner": "Torro Utd"
          },
          {
            "season": "2016/17",
            "year": 2016,
            "winner": "OMP Utd"
          },
          {
            "season": "2014/15",
            "year": 2014,
            "winner": "Dromin United"
          },
          {
            "season": "2013/14",
            "year": 2013,
            "winner": "Trim Celtic"
          },
          {
            "season": "2012/13",
            "year": 2012,
            "winner": "Muirhevnamor"
          },
          {
            "season": "2011/12",
            "year": 2011,
            "winner": "Kingscourt Harps"
          },
          {
            "season": "2010/11",
            "year": 2010,
            "winner": "Dromin Utd"
          },
          {
            "season": "2009/10",
            "year": 2009,
            "winner": "Kingscourt Harps"
          },
          {
            "season": "2008/09",
            "year": 2008,
            "winner": "Carrick Rovers"
          },
          {
            "season": "2007/08",
            "year": 2007,
            "winner": "Glaslough Villa"
          },
          {
            "season": "2006/07",
            "year": 2006,
            "winner": "Duleek"
          },
          {
            "season": "2005/06",
            "year": 2005,
            "winner": "Newtown Utd"
          },
          {
            "season": "2004/05",
            "year": 2004,
            "winner": "Ardee Celtic"
          },
          {
            "season": "2003/04",
            "year": 2003,
            "winner": "Torro Utd"
          },
          {
            "season": "2002/03",
            "year": 2002,
            "winner": "Albion Rovers"
          },
          {
            "season": "2001/02",
            "year": 2001,
            "winner": "Summerhill Celtic"
          },
          {
            "season": "2000/01",
            "year": 2000,
            "winner": "Kentstown Rovers"
          },
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Duleek"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Bellurgan Utd"
          }
        ]
      },
      {
        "id": "fair-play",
        "name": "Fair Play League",
        "entries": [
          {
            "season": "1999/00",
            "year": 1999,
            "winner": "Rossin Rovers"
          },
          {
            "season": "1998/99",
            "year": 1998,
            "winner": "Fordrew Rovers 2nds"
          },
          {
            "season": "1997/98",
            "year": 1997,
            "winner": "Ballyjamesduff Celtic"
          },
          {
            "season": "1996/97",
            "year": 1996,
            "winner": "Bridge Park 2nds"
          },
          {
            "season": "1995/96",
            "year": 1995,
            "winner": "Boyneside Celtic"
          },
          {
            "season": "1994/95",
            "year": 1994,
            "winner": "Navan Cosmos 2nds"
          },
          {
            "season": "1993/94",
            "year": 1993,
            "winner": "Castle Villa"
          },
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Electro Celtic"
          },
          {
            "season": "1991/92",
            "year": 1991,
            "winner": "BMC Utd"
          },
          {
            "season": "1990/91",
            "year": 1990,
            "winner": "Bridge Park"
          },
          {
            "season": "1989/90",
            "year": 1989,
            "winner": "BMC Utd"
          },
          {
            "season": "1988/89",
            "year": 1988,
            "winner": "Speedwell Rovers"
          },
          {
            "season": "1987/88",
            "year": 1987,
            "note": "Not presented"
          },
          {
            "season": "1986/87",
            "year": 1986,
            "winner": "College Green"
          },
          {
            "season": "1985/86",
            "year": 1985,
            "winner": "Rossin Rovers"
          }
        ]
      },
      {
        "id": "ground-of-the-year",
        "name": "Ground of the Year",
        "entries": [
          {
            "season": "1992/93",
            "year": 1992,
            "winner": "Trim Celtic FC"
          }
        ]
      }
    ]
  }
];
