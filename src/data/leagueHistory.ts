// Full league history, decade by decade.
// Source: https://nefl.ie/history-of-the-league-in-depth/ (the league's own site), with thanks to The Meath Chronicle.

export type HistoryPhoto = { src: string; caption: string };

export type SeasonResult = { competition: string; winner: string; runnerUp: string };

export type HistorySeason = {
  season: string;
  league: string;
  paragraphs: string[];
  results: SeasonResult[];
  officers: string | null;
  photos: HistoryPhoto[];
};

export type HistoryDecade = {
  slug: string;
  years: string;
  title: string;
  summary: string;
  cover: string;
  intro: string[];
  introPhotos: HistoryPhoto[];
  seasons: HistorySeason[];
  /** Every photo for the decade, shown together in the gallery at the end */
  photos: HistoryPhoto[];
};

export const leagueHistory: HistoryDecade[] = [
  {
    "slug": "1980s",
    "years": "1980 – 1989",
    "title": "Let the game of Thornes begin",
    "summary": "The league took its first steps as the Mid-Meath League, kicking off with eight teams on 23rd November 1980, after a group of enthusiasts from Kilmessan began meeting at Thornes Lounge.",
    "cover": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1980.jpg",
    "intro": [
      "Some 40 years ago, the North East Football League, as it is now known, was taking its first tentative steps in the form of the Mid-Meath League that kicked-off with eight teams in 1980.",
      "The build-up to that first round of action on 23rd November 1980 began around May 1980 with a crew on enthusiasts from Kilmessan who were eager to play the ‘beautiful game’ and they talked about entering teams in local seven-a-side tournaments during the summer months when the traditional soccer season was closed.",
      "Thornes Lounge in Kilmessan was the venue for the informal meetings to discuss plans for the new venture.",
      "Thornes would become the traditional home of the League for many years, a fact that was acknowledged at the 2019 FAI Festival of Football in the Royal County.",
      "All that would be in the future and one man would maintain a link to that inaugural ‘discussion’ back in 1980 – Gerry Gorman.",
      "The more established soccer teams in Meath at that time (1980) included Parkvilla, Stackallen Rovers, Kells Celtic, Trim Celtic, Ratoath Harps, Ashbourne, Dunboyne and Duleek. They all played in the progressive Dublin-based leagues.",
      "However, buoyed by the enthusiasm from those seven-a-side tournaments, the trio of Vincent Brennan, Gerry Gorman and Dom Doyle attempted to affiliate a Kilmessan club to the Leinster Junior League, but that was unsuccessful as the deadline for entry had passed.",
      "They then tried to join Louth League, but it was a similar story there and the advice offered was to apply again for the following season.",
      "Another plan was hatched and an advertisement was placed in the Meath Chronicle seeking teams to participate in a Mid-Meath Soccer League.",
      "Applications were received from nine teams, but one from Oldcastle was rejected as the ‘committee’ deemed that it was too far away?",
      "Eight teams were accepted – Kilmessan; KIlmessan B; Skryne; Dunshaughlin; Turmec (Athboy area); Cosmos (Navan); Moynalvey and Robinstown and eventually a schedule of fixtures and a proposed kick-off date were agreed."
    ],
    "seasons": [
      {
        "season": "1980/81",
        "league": "Mid-Meath League",
        "paragraphs": [
          "Eight teams togged out for the relatively short inaugural season with the title decided on a one-round basis with the top two teams contesting the final – not unlike the GAA version of the National Football League.",
          "For good measure, the soccer teams were populated with GAA regulars who opted to fill the void that then existed in Meath GAA club football.",
          "The initial success of the Mid-Meath League for the first five seasons ultimately prompted a response from the GAA with the eventual introduction of the All-County GAA Leagues – it also had the impact of improving the time-keeping for scheduling of GAA games.",
          "There were three fixtures on the opening day, due to unavailability of pitches, with the following results: Skryne 6, KIlmessan 2; Moynalvey 3, Cosmos 2; Dunshaughlin 6, Turmec 2; the game between Robinstown and Kilmessan B was played the following weekend.",
          "An interesting statistic was the multi-tasking ability of Moynalvey manager Eugene Lynch, he was also the goalkeeper for Robinstown and the two teams duly took the top two places after the seven round series of games.",
          "Moynalvey won the final by 3-2 with a stalwart from the Parkvilla club, Shane Faulkner filling the role of referee.",
          "Moynalvey were unbeaten in the inaugural season and amazingly only lost three games in the next three seasons.",
          "The League finalists were ineligible to play in the Challenge Cup and that produced a win for KIlmessan at the expense of Navan side Cosmos. (It was only many years later that the club added Navan to the name)."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Moynalvey",
            "runnerUp": "Robinstown"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Kilmessan",
            "runnerUp": "Cosmos"
          }
        ],
        "officers": "Chairman – Vincent Brennan; secretary – Gerry Gorman; treasurer – Dom Doyle",
        "photos": []
      },
      {
        "season": "1981/82",
        "league": "Mid-Meath League",
        "paragraphs": [
          "Extra teams joined for the second season with two divisions featuring 17 teams.",
          "Div 1 was played on a one-round basis with 10 teams while Div 2 was a two round basis for the six teams as a team from Bailieboro Co-op withdrew after the initial outing.",
          "The league final was scrapped and Moynalvey duly topped the Div 1 table after nine games, but they lost the Challenge Cup final to Cosmos. The Div 2 title was won by a team from Ballivor playing under the name of Albion Rovers with Skane Ramblers (Kilmessan B from the previous season) in the runner-up position."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Moynalvey",
            "runnerUp": "Castle Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Cosmos",
            "runnerUp": "Moynalvey"
          }
        ],
        "officers": "Chairman – Gerry Gorman; secretary – John Holden; treasurer – Dom Doyle",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Navan-Cosmos-1981-82-Challenge-Cup-Winners.jpg",
            "caption": "Navan Cosmos, 1981/'82 Challenge Cup winners"
          }
        ]
      },
      {
        "season": "1982/83",
        "league": "Mid-Meath League",
        "paragraphs": [
          "This was an important season for what would be the last under the banner of the Mid-Meath League.",
          "There was official recognition from the Leinster Football Association (LFA) and Football Association of Ireland (FAI).",
          "All that meant the end of Kilmessan FC organising the competitions, the introduction of a constitution and rule book and the election of the first official officers of the Mid-Meath League. There was another bonus in the affiliation of 27 teams graded in Div 1 and Div 2. Both grades were played on a one-round basis, but it was agreed at that inaugural AGM that subsequent seasons would be on the standard two-round (home and away).",
          "Moynalvey made it three in-a-row in Div 1 with Shambo (formerly Robinstown) in runner-up position.",
          "Athboy Blues took Div 2 ahead of Archers (Dunshaughlin).",
          "Moynalvey won the Challenge Cup with a 6-2 win against Athboy Blues."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Moynalvey",
            "runnerUp": "Shambo"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Moynalvey",
            "runnerUp": "Athboy Blues"
          }
        ],
        "officers": "Chairman – Gerry Gorman; secretary – John Holden; treasurer – David Pryle",
        "photos": []
      },
      {
        "season": "1983/84",
        "league": "Meath & District League",
        "paragraphs": [
          "At the annual general meeting in Claremont Stadium, Navan the name of the Mid-Meath League was changed and a crest was introduced as 39 teams affiliated.",
          "Four divisions were necessary to cater for the teams with Moynalvey once more winning the Div 1 title at the expense of Navan side OMP Utd.",
          "The Navan men needed a point to win the title from their last game of the season against Moynalvey, but the defending champions hit an 89th minute winner through Harry Donovan to complete an unprecedented four in-a-row.",
          "Archers won Div 2 ahead of Kells Celtic while Navan side Brewery took Div 3 and also won the Challenge Cup. Moynalvey did not enter the Challenge Cup.",
          "OMP Utd 2nds won the Div 4 title from nearby rivals Windtown Utd.",
          "The MDL also fielded a representative team for the first time in the FAI Oscar Traynor Trophy with a spirited display in a 0-2 defeat in December 1983 against the Leinster Junior League.",
          "The MDL panel was: John Gorman; Shea Englishby, John Cahill, Tommy Ennis, Robbie Melia, Kieran O’Brien, Aidan Gorman, Peter O’Brien, Christy Duignan, Aidan Crickley, Johnny Kiernan, R Fox, Davy Cahill, Brendan Melia, Mick Curley, John Summerville. Management – Eugene Lynch and Joe Garvey.",
          "A yearbook to cover the first four seasons was produced under the guidance of Gerry Moore and that trend continued annually until 2003."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Moynalvey",
            "runnerUp": "OMP Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Brewery",
            "runnerUp": "Shambo"
          }
        ],
        "officers": "Chairman – Gerry Gorman; secretary – John Holden; treasurer – David Pryle",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-4-Rossin-Rovers-1984-Copy.jpg",
            "caption": "Rossin Rovers, 1984"
          }
        ]
      },
      {
        "season": "1984/85",
        "league": "Meath & District League",
        "paragraphs": [
          "A number of firsts included the introduction of the weekly forecast cards – this was a fundraiser for the MDL and the clubs. Coupons were distributed / collected each Saturday morning, clubs retained 50 per cent of sales and the MDL covered the prizes with a weekly increase of £100 in the jackpot fund.",
          "The scheme was introduced to raise money to purchase a property that would become the permanent home for the MDL and it continued for 17 years until the 1999 / 2000 season.",
          "The Kilmessan Shield and the Gerry Bradley Memorial Shield were introduced (won by OMP Utd and OMP Utd 2nds).",
          "The inaugural manager of the year award went to Joe Garvey (OMP Utd) and player of the year to Mickey Regan (Moynalvey).",
          "The first match programme for the Challenge Cup final was also published"
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "OMP Utd",
            "runnerUp": "Corbawn Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Moynalvey",
            "runnerUp": "OMP Utd"
          }
        ],
        "officers": "Chairman – Gerry Gorman; secretary – John Holden; treasurer – David Pryle",
        "photos": []
      },
      {
        "season": "1985/86",
        "league": "Meath & District League",
        "paragraphs": [
          "Expansion from four to six divisions to cater for 64 teams. Ratoath Harps opened their new pitch hosting the then League of Ireland new boys Derry City in a pre-season friendly in July 1985.",
          "A Fair Play League was introduced and remained in place until 1999 / 2000, the inaugural winners were Rossin Rovers.",
          "Player of the year awards were introduced for each division, a trend that has continued since.",
          "A first victory was achieved in the FAI Oscar Traynor Trophy at the expense of the Amateur League.",
          "OMP shaded Moynalvey in Div 1 while Ratoath Harps did the same to Dunboyne in Div",
          "Moynalvey won the Challenge Cup."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "OMP Utd",
            "runnerUp": "Moynalvey"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Moynalvey",
            "runnerUp": "Kentstown Rovers"
          }
        ],
        "officers": "Chairman – Gerry Moore; secretary – Gerry Gorman; treasurer – Eugene Lynch",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Torro-a-v-Torro-B-1885-Tully-Cup-first-round.jpg",
            "caption": "Torro A v Torro B, Tully Cup first round"
          }
        ]
      },
      {
        "season": "1986/87",
        "league": "Meath & District League",
        "paragraphs": [
          "Navan side OMP Utd maintained their dominance as they won the Div 1 title again.",
          "Moynalvey won the Challenge Cup, it was their last trophy as they completed a remarkable seven seasons with four Div 1 titles and four Challenge Cup wins – a feat not repeated since.",
          "Moynalvey defeated Dunboyne in the Challenge Cup final – John Ryan played for Dunboyne in that game and would later feature for Bray Wanderers in the 1990 FAI Cup final where he scored a hat-trick.",
          "Off the field, former Meath Chronicle reporter Cathal Dervan, who had taken a position with the Sunderland Echo, arranged trails for three MDL players with Newcastle Utd – the trio comprised Brendan Reilly (Dunboyne), Vinny Moore (Dunshaughlin) and Larry McCormack (Nobber). They were accompanied by MDL secretary Gerry Gorman."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "OMP Utd",
            "runnerUp": "Dunboyne"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Moynalvey",
            "runnerUp": "Dunboyne"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary – Gerry Gorman; treasurer – Eugene Lynch",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Presention-to-Cathal-1987.jpg",
            "caption": "MDL chairman Donal Gaynor makes a presentation to Meath Chronicle reporter Cathal Dervan, 1987"
          }
        ]
      },
      {
        "season": "1987/88",
        "league": "Meath & District League",
        "paragraphs": [
          "The MDL took on a more serious demeanour with the purchase of property outside Navan that has been developed into the ‘home of the MDL’ in the intervening 30 years.",
          "The first tentative steps were taken when they property was purchased for £40,000 (€50,000). Despite a 50 per cent deposit, it was problematic to source a loan although that issue was eventually addressed.",
          "That was only the start of the problems for the MDL committee.",
          "The next obstacle was an unsuccessful attempt to get planning permission to develop a sports facility.",
          "That issue continued for three years until An Bord Pleanala approved the development at the start of the 1990/’91 season.",
          "On the field, a new grade, Div 1A was introduced much to the annoyance of the previous season’s Div 2 champions Archers.",
          "Oldcastle Utd, who had been denied entry in the inaugural season, took the Div 1 title ahead of Dunboyne.",
          "The first Challenge Cup final was played at United Park, Drogheda with Stackallen Rovers getting the better of Kingscourt side Cabra Utd."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Oldcastle Utd",
            "runnerUp": "Dunboyne"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Stackallen Rovers",
            "runnerUp": "Cabra Utd"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary – Gerry Gorman; treasurer – Eugene Lynch",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Shambo-87.jpg",
            "caption": "The Shambo panel that won the MDL Div 4 title, 1987/'88"
          },
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Meath-Branch-ISRS-1988.jpg",
            "caption": "Meath Branch referees team, 1988"
          }
        ]
      },
      {
        "season": "1988/89",
        "league": "Meath & District League",
        "paragraphs": [
          "Some 91 teams, the same as the previous season, affiliated and were graded in eight divisions.",
          "Oldcastle won the Div 1 title again while top Louth side Dromin Utd beat Skryne Rangers in the Challenge Cup final.",
          "FAI National Coaching Officer Noel King arrived in Navan to conduct the first introductory coaching course that was attended by close to 100 club representatives.",
          "Navan Rugby Club generously provided facilities for the sessions.",
          "The quest for planning permission at the new ‘home’ of the MDL continued while the property lay vacant."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Oldcastle Utd",
            "runnerUp": "Ratoath Harps"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Dromin Utd",
            "runnerUp": "Skryne Rangers"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary – Gerry Gorman; treasurer – Donal Giles",
        "photos": []
      },
      {
        "season": "1989/90",
        "league": "Meath & District League",
        "paragraphs": [
          "One of the notable incidents related to a ban that was imposed by Cavan GAA Co Board on Maghera GFC after that club permitted Virginia side Chestnut Rovers play a MDL game on their pitch against Ballivor in September 1989.",
          "The MDL also continued to seek planning permission for the development of a sports facility outside Navan, but the application was rejected and an amended application had to be submitted. The subsequent rejection was then appealed to An Bord Pleanala.",
          "On the field, Stackallen Rovers won the Div 1 title, Div 1A required a play-off for the third season in-a-row while Kentstown Rovers defeated Square Utd in a Challenge Cup final replay.",
          "Current Meath GAA senior football manager Andy McEntee helped Clonee Utd to win the Div 3 title ahead of Dunboyne 2nds. Former Meath selector Tom Keague also featured for Clonee."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Stackallen Rovers",
            "runnerUp": "OMP Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Kentstown Rovers",
            "runnerUp": "Square Utd"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary – Gerry Gorman; treasurer – John Holden",
        "photos": []
      }
    ],
    "photos": [
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Presention-to-Cathal-1987.jpg",
        "caption": "MDL chairman Donal Gaynor makes a presentation to Meath Chronicle reporter Cathal Dervan, 1987"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Shambo-87.jpg",
        "caption": "The Shambo panel that won the MDL Div 4 title, 1987/'88"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1980.jpg",
        "caption": "The early days, 1980"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Torro-a-v-Torro-B-1885-Tully-Cup-first-round.jpg",
        "caption": "Torro A v Torro B, Tully Cup first round"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-4-Rossin-Rovers-1984-Copy.jpg",
        "caption": "Rossin Rovers, 1984"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-3-PARKVILLA-1979-Copy.jpg",
        "caption": "Parkvilla, 1979"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/ST-MARYS-PARK-1977.jpg",
        "caption": "St Mary's Park, 1977"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/ROBINSTOWN-1978.jpg",
        "caption": "Robinstown, 1978. Groundsman Gerry 'Muller' Moore is second from right"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Oldcastle-1973.jpg",
        "caption": "Oldcastle Utd, 1973"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Navan-Cosmos-1981-82-Challenge-Cup-Winners.jpg",
        "caption": "Navan Cosmos, 1981/'82 Challenge Cup winners"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Meath-Branch-ISRS-1988.jpg",
        "caption": "Meath Branch referees team, 1988"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/KELLS-CELTIC-1960.jpg",
        "caption": "Kells Celtic, 1960"
      }
    ],
    "introPhotos": [
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1980.jpg",
        "caption": "The early days, 1980"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-3-PARKVILLA-1979-Copy.jpg",
        "caption": "Parkvilla, 1979"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/ST-MARYS-PARK-1977.jpg",
        "caption": "St Mary's Park, 1977"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/ROBINSTOWN-1978.jpg",
        "caption": "Robinstown, 1978. Groundsman Gerry 'Muller' Moore is second from right"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Oldcastle-1973.jpg",
        "caption": "Oldcastle Utd, 1973"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/KELLS-CELTIC-1960.jpg",
        "caption": "Kells Celtic, 1960"
      }
    ]
  },
  {
    "slug": "1990s",
    "years": "1990 – 1999",
    "title": "Time of growth and a place to call home",
    "summary": "Planning permission for the MDL grounds finally came through on appeal, team numbers climbed to record highs, and Louth clubs dominated the top division.",
    "cover": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1.jpg",
    "intro": [
      "Thornes Lounge in Kilmessan was the venue for the weekly committee meetings and for the purpose of checking the weekly forecast cards each Saturday night as part of fundraising for the development of facilities at the sports complex outside Navan that is now known as the MDL.",
      "The closing years of the first decade saw the committee encounter problems obtaining planning permission for the 22-acre property that was purchased in 1988.",
      "However, all that changed at the start of the 11th season (1990/1991) with the green light from a successful appeal to An Board Pleanala.",
      "That 11th season also saw the number of teams affiliated peak at a hew high of 93, an impressive tally when compared to the eight teams that took tentative first steps under the banner of the Mid-Meath League in 1980.",
      "Applications had been received from nine teams, but one from Oldcastle in north Meath was rejected as the ‘committee’ deemed that it was too far away?",
      "The eight teams that were accepted for that first season were – Kilmessan; KIlmessan B; Skryne; Dunshaughlin; Turmec (Athboy area); Cosmos (Navan); Moynalvey and Robinstown.",
      "Meath dominance faded during the 1990s with Louth teams winning the top grade in nine of the 10 seasons with Dromin completing a three in-a-row while Ardee side Square also won three titles.",
      "It was a similar story in the Challenge Cup as the silverware made the journey into the Wee County after seven of the 10 finals."
    ],
    "seasons": [
      {
        "season": "1990/91",
        "league": "Meath & District League",
        "paragraphs": [
          "Positives and negatives highlighted the build up to the start of the 11th season with 93 teams affiliating and graded across eight divisions.",
          "The numbers willing to serve on the MDL Committee was only seven, a decrease of three from the previous season and the lowest number since the MDL took over from the Mid-Meath League.",
          "One very positive report was that An Bord Pleanala overturned a decision by Meath Co Council to refuse planning permission for the development of the 22-acre sports complex outside Navan. In his annual report MDL secretary Gerry Gorman specifically thanked the members of Kells UDC for support as well as Jack Gordon of Kentstown Rovers, Frank McCullough of Dromin Utd and Declan Forde of College Green FC.",
          "On the under-age front, the North Eastern Counties Schoolboys’ League was launched to take over from the MDL Schoolboys.",
          "The MDL u-18 team hosted English club QPR in a friendly at Ratoath and the MDL also competed in the SFAI Kennedy Cup for the first time with Graham Clarke (Ratoath Harps) scoring the first goal in the competition in a 3-1 win against Limerick.",
          "On the pitch at adult level, Patrick Kilcoyne captained Square Utd to the Div 1 title while former League of Ireland star Ray McGuigan was at the helm as Drumcar Celtic won the Challenge Cup at the expense of Kentstown Rovers."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Square Utd",
            "runnerUp": "Albion Rovers"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Drumcar Celtic",
            "runnerUp": "Kentstown Rovers"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1.jpg",
            "caption": "Early 1990s"
          },
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-6-TRIM-CELTIC-EARLY-NINETIES.jpg",
            "caption": "Trim Celtic, early 1990s"
          }
        ]
      },
      {
        "season": "1991/92",
        "league": "Meath & District League",
        "paragraphs": [
          "Nine divisions were required for the 12th season as 103 teams affiliated. Guidelines for participation included compulsory dressing rooms for any club playing in the top two grades.",
          "Fundraising was well supported and the loan that had been obtained five years earlier for the purchase of the 22-acre site outside Navan was cleared.",
          "That paved the way for overdue development through grants and funds raised by the MDL with a number of innovative measures including an ambitious car draw that would be inaugurated for the 1992 / 1993 season.",
          "The race for the Div 1 title was one of the most exciting for many years with Meath sides Newtown Utd and OMP Utd requiring a three-game series of play-offs before the trophy was eventually handed over to Newtown Utd captain Noel Duff following a 2-1 victory in Ratoath.",
          "Jimmy Duff and Paul Carolan scored for Newtown with Brian Duignan on target for OMP Utd.",
          "Square Utd won the Challenge Cup at the expense of Kells Celtic.",
          "The final of the Gerry Bradley Memorial Shield produced a thriller at Tully Park, Trim as Trim Town and Robinstown set a MDL penalty shoot-out record with 34 spot kicks required. Trim Town won by 15-14 with goalkeeper Paul Mulligan making a crucial save from Mark Cahill."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Newtown Utd",
            "runnerUp": "OMP Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Square Utd",
            "runnerUp": "Kells Celtic"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-5-Square-Utd-1992-Cup-winners-Copy.jpg",
            "caption": "Square Utd, 1992 cup winners"
          }
        ]
      },
      {
        "season": "1992/93",
        "league": "Meath & District League",
        "paragraphs": [
          "Another increase in the number of teams to 116 and they were catered for across 10 divisions, but it was off the field where significant progress was made.",
          "The FAI provided a £25,000 (€30,000 approx) grant for the development of facilities at the property in Navan and a further £15,000 was generated through the innovative car draw.",
          "For an outlay of £10 a patron was entered into a three-monthly car draw with a cash alternative also available. A good deal was secured for an Opel Corsa each month from Navan-based Riverside Motors.",
          "Gerry Gorman secured a seat on the FAI Senior Council and FAI president Michael Hyland duly attended the launch of the aforementioned car draw.",
          "The first phase of the development was completed by the firm operated by former Meath GAA star Paraic Lyons who was awarded the contract.",
          "Square Utd won the Div 1 title for the second time in three season while Drumcar Celtic got the better of the Ardee men in the Challenge Cup final."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Square Utd",
            "runnerUp": "Clonee Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Drumcar Celtic",
            "runnerUp": "Square Utd"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": []
      },
      {
        "season": "1993/94",
        "league": "Meath & District League",
        "paragraphs": [
          "A reduction in the number of teams was a significant development and focused the nine-man MDL Committee to look at structures.",
          "Nevertheless, a total of 107 teams affiliated and competed across 10 grades with the honours split equally between Meath and Lough clubs.",
          "Notably, Dromin Utd took the Div 1 title for the first time when they edged out Kells Celtic while at the other end of the scale, KIlmessan 2nds won the Div 5 South title.",
          "Dromin Utd also won the Challenge Cup when they also got the better of Kells Celtic in the decider and completed a great season for the Dermot Gaffney-managed Louth side.",
          "Two MDL officials, Gerry Gorman and Conall Collier, were members of the FAI North East Area committee for the 12th UEFA u-16 Championships that were played in Ireland for the first time.",
          "MDL players Declan Mahon (Clonee Utd) and Eamonn O’Brien (Slane Wanderers) were on a North East selection for a game against Drogheda Utd at United Park to mark the new floodlights at the venue that were turned on officially on 23rd September 1993.",
          "A proposal from the MDL for area status for FAI Junior Cup Louth / Meath was also successful with Clones Town (Monaghan) defeating Dromin Utd 1-0 in the inaugural decider.",
          "There was also a further boost for development plans with another grant from the FAI for £30,000 (€37,000 approx)."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Dromin Utd",
            "runnerUp": "Kells Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Dromin Utd",
            "runnerUp": "Kells Celtic"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": []
      },
      {
        "season": "1994/95",
        "league": "Meath & District League",
        "paragraphs": [
          "Trim Celtic and Bellurgan Utd (Louth) both made the move to the MDL as 109 affiliated with a new structure in place for second teams with the introduction of three Reserve Leagues to augment six first team Leagues.",
          "Dromin Utd retained the Div 1 title under manager Dermot Gaffney while Stackallen Rovers won the Challenge Cup when they defeated Square Utd.",
          "Slane Wanderers won the FAI Junior Cup Louth / Meath Area final.",
          "The Tailteann Cup pre-season competition was introduced to facilitate the MDL representative team preparations.",
          "Leinster Senior League side Parkvilla and League of Ireland side Longford Town made it a three-team tournament for the Kerr Reilly Tailteann Cup."
        ],
        "results": [
          {
            "competition": "Division 1",
            "winner": "Dromin Utd",
            "runnerUp": "Newtown Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Stackallen Rovers",
            "runnerUp": "Square Utd"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-2-DROMIN-UTD-MDL-LEAGUE-CHAMPIONS-1994-1995-Copy.jpg",
            "caption": "Dromin Utd, MDL league champions 1994/'95"
          }
        ]
      },
      {
        "season": "1995/96",
        "league": "Meath & District League",
        "paragraphs": [
          "Another development this season was the introduction of the Premier Division for the first time and the end of Div 1A. Dromin Utd made it three in-a-row as the inaugural Premier champions and they also won the Challenge Cup again.",
          "Dromin also represented the MDL in the Leinster Senior Cup losing out narrowly to League of Ireland side Athlone Town at St Mel’s Park.",
          "Another notable feat was a fine hat-trick for Kells Celtic winning the Reserve Cup for the third year in-a-row,",
          "Funding for development came in at £30,000 from the FAI and £15,000 from the National Lottery."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Dromin Utd",
            "runnerUp": "Newtown Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Dromin Utd",
            "runnerUp": "Kentstown Rovers"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": []
      },
      {
        "season": "1996/97",
        "league": "Meath & District League",
        "paragraphs": [
          "Donal Gaynor stepped down as chairman after 11 seasons and he was replaced by Eugene Lynch.",
          "Some 107 teams affiliated with Monaghan club Carrick Rovers (Carrickmacross) joining for the first time.",
          "Bellurgan Utd swept the boards winning the Premier League, Challenge Cup, Kilmessan Shield and the",
          "Louth / Meath area final of the FAI Junior Cup."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Bellurgan Utd",
            "runnerUp": "OMP Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Bellurgan Utd",
            "runnerUp": "Newtown Utd"
          }
        ],
        "officers": "Chairman – Donal Gaynor; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": []
      },
      {
        "season": "1997/98",
        "league": "Meath & District League",
        "paragraphs": [
          "A notable achievement this season was the staging of the first Challenge Cup final at the MDL and it was appropriate that the decider would produce an all-Meath pairing with TnaG (now TG4) featuring the action as Kentstown Rovers took the silverware at the expense of OMP Utd.",
          "Carrick Rovers won the Premier title taking the silverware to Monaghan for the first time with Newtown Utd taking the runner-up position for the third time in four seasons."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Carrick Rovers",
            "runnerUp": "Newtown Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Kentstown Rovers",
            "runnerUp": "OMP Utd"
          }
        ],
        "officers": "Chairman – Eugene Lynch; secretary / treasurer – Gerry Gorman; registrar – Mick Wall",
        "photos": []
      },
      {
        "season": "1998/99",
        "league": "Meath & District League",
        "paragraphs": [
          "The MDL, along with the Carlow League, Kildare League, Wexford League, Wicklow League and the Amateur League (Dublin) formed a lobby group over issues in relation to the influence of a number of Dublin Leagues controlling the Leinster Football Association. It took time for more equitable representation, but it was achieved by the end of the 1999 / 2000 season.",
          "The MDL secured a three-year sponsorship with Drogheda-based Stafford Oil and announced plans for the development of floodlit all-weather pitches.",
          "The talk also spread to the possible re-location to the MDL of the Navan greyhound track which had been sold for what was supposed to be a rail link terminal to Dublin!",
          "The FAI announced an ambitious plan for The Arena – Eircom Park.",
          "Some 102 teams affiliated with Bellurgan Utd winning the Premier title and Dunderry causing a shock in the Challenge Cup when they defeated Rock Celtic with Paddy Darcy scoring the winner. Dunderry was the first team from the fourth grade to win the trophy."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Bellurgan Utd",
            "runnerUp": "Carrick Rovers"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Dunderry",
            "runnerUp": "Rock Celtic"
          }
        ],
        "officers": "Chairman – Eugene Lynch; secretary / treasurer – Gerry Gorman; registrar – Tom Flynn",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/dunderry-panle-90s.jpg",
            "caption": "Dunderry, 1998/'99 Challenge Cup winners, without conceding a goal"
          },
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Bellurgan-Ubited-Lewague-champions-1999.jpg",
            "caption": "Bellurgan United, league champions 1999"
          }
        ]
      },
      {
        "season": "1999/00",
        "league": "Meath & District League",
        "paragraphs": [
          "The number of teams was 102 as Rock Celtic bounced back in the Challenge Cup beating Slane Wanderers in the final while Square Utd pipped Bellurgan Utd to the Premier title.",
          "There was also an O’Neill Shield final win for Summerhill Celtic when they made it two in-a-row after beating Duleek 3rds the previous season and retaining the trophy against Botown 2nds. Plans were under discussion to mark the 21st anniversary of the Mid-Meath / Meath & District League in 2001."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Square Utd",
            "runnerUp": "Bellurgan Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Rock Celtic",
            "runnerUp": "Slane Wanderers"
          }
        ],
        "officers": "Chairman – Eugene Lynch; secretary / treasurer – Gerry Gorman; registrar – Tom Flynn",
        "photos": []
      }
    ],
    "photos": [
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1.jpg",
        "caption": "Early 1990s"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/dunderry-panle-90s.jpg",
        "caption": "Dunderry, 1998/'99 Challenge Cup winners, without conceding a goal"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/Bellurgan-Ubited-Lewague-champions-1999.jpg",
        "caption": "Bellurgan United, league champions 1999"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-6-TRIM-CELTIC-EARLY-NINETIES.jpg",
        "caption": "Trim Celtic, early 1990s"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-5-Square-Utd-1992-Cup-winners-Copy.jpg",
        "caption": "Square Utd, 1992 cup winners"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-2-DROMIN-UTD-MDL-LEAGUE-CHAMPIONS-1994-1995-Copy.jpg",
        "caption": "Dromin Utd, MDL league champions 1994/'95"
      }
    ],
    "introPhotos": []
  },
  {
    "slug": "2000s",
    "years": "2000 – 2009",
    "title": "Surviving emergencies and building a lasting legacy",
    "summary": "A 21st anniversary banquet and commemorative book, a season disrupted by foot-and-mouth, new floodlit all-weather pitches, and a record number of teams by the decade's end.",
    "cover": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/21-years.jpg",
    "intro": [
      "One highlight from the early part of the third decade was the 21st anniversary (1980 – 2001) banquet at the Headfort Arms Hotel, Kells on Friday 23rd November 2001.",
      "At that event, attended by FAI chief executive Brendan Menton, the MDL also launched a commemorative publication that covered all aspects of the first 21 years (1980 – 2001) – Not Just Another Brick In The Wall.",
      "Eight teams took tentative first steps under the banner of the Mid-Meath League on 23rd November 1980. The eight teams for that first season were – Kilmessan; Kilmessan B; Skryne; Dunshaughlin; Turmec (Athboy area); Cosmos (Navan); Moynalvey and Robinstown.",
      "An excerpt from the introduction to Not Just Another Brick In The Wall reads:",
      "The Meath & District League was fortunate to bring together a group of individuals who shared the same vision and were prepared to work voluntarily to achieve that goal. Sometimes it was difficult, sometimes it was easy, but at all times it was memorable and rewarding and the legacy for future sports enthusiasts is richer as a result of those endeavours."
    ],
    "seasons": [
      {
        "season": "2000/01",
        "league": "Meath & District League",
        "paragraphs": [
          "The Foot & Mouth epidemic was the main concern during the latter part of the 21st season as the farming community was severely impacted, particularly in the Louth area. The problems were resolved after a complete close-down of all sports fixtures over a two-month period.",
          "This resulted in a reduced competition format with the Leagues and the Challenge Cup completed while the other competitions were shelved.",
          "It also marked the conclusion of the three-year sponsorship deal with Stafford Oil and the opening of the six all-weather floodlit pitches at the MDL sports complex.",
          "Some 99 teams affiliated and competed across nine divisions.",
          "Bellurgan Utd won the Premier title ahead of Louth rivals Rock Celtic while Trim Celtic won the Challenge Cup with a 2-1 victory against Albion Rovers as the decider returned to United Park, Drogheda due to development work at the MDL in Navan."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Bellurgan Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Trim Celtic",
            "runnerUp": "Albion Rovers"
          }
        ],
        "officers": "Chairman – Eugene Lynch; secretary / treasurer – Gerry Gorman; registrar – Tom Flynn",
        "photos": []
      },
      {
        "season": "2001/02",
        "league": "Meath & District League",
        "paragraphs": [
          "The AGM was held outside Meath for the first time at Hotel Bailie in Bailieboro. The main item for consideration was the second attempt to change the playing season, but the Duleek FC proposal while achieving a narrow overall majority in favour fell short of the required two thirds majority.",
          "Some 90 teams affiliated and Bellurgan Utd successfully defended the Premier title and a great run in the FAI Junior Cup from a starting entry of 360 teams saw them exit (0-1) away to Ballymun in the quarter-final.",
          "They narrowly missed out on a notable double when losing (0-1) to local rivals Rock Celtic in the Challenge Cup final.",
          "Cloghertown Utd exited in the semi-final of the Leinster Junior Shield against top Dublin side St Kevin Boys, the tie was played outside Dublin for the first time at the MDL in Navan."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Bellurgan Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Rock Celtic",
            "runnerUp": "Bellurgan Utd"
          }
        ],
        "officers": "Chairman – Eugene Lynch; secretary / treasurer – Gerry Gorman; – registrar – Tom Flynn",
        "photos": []
      },
      {
        "season": "2002/03",
        "league": "Meath & District League",
        "paragraphs": [
          "A small drop to 88 teams and Bellurgan continued their dominance securing a hat-trick of League titles and a fifth success in seven seasons.",
          "They also got revenge for the previous season’s defeat by Rock Celtic in the Challenge Cup final when defeating them 2-0 to secure the double.",
          "Bellurgan made it to the quarter-final of the FAI Junior Cup again and on this occasion lost a penalty shoot-out away to top Munster side Peake Villa from Thurles."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Bellurgan Utd",
            "runnerUp": "Trim Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Bellurgan Utd",
            "runnerUp": "Rock Celtic"
          }
        ],
        "officers": "Chairman – Eugene Lynch; secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2003/04",
        "league": "Meath & District League",
        "paragraphs": [
          "This season will always be sadly remembered for a tragic accident that took place at Navan Town’s home ground on Sunday 14th September 2003 in which a 10-year-old from Dundalk, Lee Myles-Luchessi lost his life.",
          "Once again 88 teams affiliated and Rock Celtic became the first club in the League to install floodlights.",
          "Bellurgan transfrerred to the Dublin-based Athletic Union League and made an immediate impact gaining promotion to the top flight at the first attempt.",
          "Another Louth side, Monasterboice-based Albion Rovers won the double narrowly finishing ahead of Dundalk based Glenmuir in the Premier League and defeating Dunderry who amazingly defied the odds for a second time in reaching the Challenge Cup final after winning the trophy for the first time in 1999."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Albion Rovers",
            "runnerUp": "Glemuir Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Albion Rovers",
            "runnerUp": "Dunderry"
          }
        ],
        "officers": "Chairman – Eugene Lynch secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2004/05",
        "league": "Meath & District League",
        "paragraphs": [
          "The number of teams increased to 94 teams. The battle at the top of the Premier League saw two Meath sides Slane Wanderers and Trim Celtic go right to the wire and Slane prevailed to become the first side from the Royal County to take the honours since Newtown Utd 13 years earlier in 1992 when they required three play-off games to get the better of Navan side OMP Utd.",
          "Albion Rovers became the first side to successfully defend the Challenge Cup since Moynalvey almost in 1986 when they denied Slane a double in a very exciting final.",
          "The MDL completed the development of a top class grass pitch and received planning permission for further development.",
          "Carrick Rovers became the first MDL side to win a provincial competition when their second team took the honours in the Leinster Junior Shield."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Slane Wanderers",
            "runnerUp": "Trim Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Albion Rovers",
            "runnerUp": "Slane Wanderers"
          }
        ],
        "officers": "Chairman – Eugene Lynch; secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2005/06",
        "league": "Meath & District League",
        "paragraphs": [
          "The sad passing of former founding member and League official John Holden and also of George Briggs former Leinster Football Association secretary marked this season.",
          "Some 63 clubs affiliated and the number of teams reached 100 with the ratio of teams from outside Meath in a slight majority.",
          "Outgoing Chairman Eugene Lynch who was at the helm since 1997 declared he was not going in the position of chairman. Glowing tributes were paid to him by a number of delegates. He switched to a less demanding committee role thus keeping up a remarkable unbroken sequence of involvement since 1982. He was replaced as Chairman by another long-term stalwart John Gorman from Kilmessan.",
          "Albion Rovers regained the Premier title while Duleek were victorious in an all-Meath Challenge Cup final at the expense .",
          "Another phase of development at the MDL sports complex was completed to comprise the extras of a community hall, meeting rooms, two more dressing rooms and storage rooms.",
          "Woodview Celtic followed in the footsteps of Carrick Rovers success the previous season by winning the Leinster Junior Shield."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Albion Rovers",
            "runnerUp": "Slane Wanderers"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Duleek",
            "runnerUp": "Slane Wanderers"
          }
        ],
        "officers": "Chairman – John Gorman secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-1-ALBION-ROVERS-MDL-LEAGUE-WINNERS-2006-Copy.jpg",
            "caption": "Albion Rovers, MDL league winners 2006"
          }
        ]
      },
      {
        "season": "2006/07",
        "league": "Meath & District League",
        "paragraphs": [
          "Some 63 clubs fielding 101 teams affiliated and Trim Celtic became the second Meath team in three seasons to win the Premier League in a tight finish involving Square Utd,",
          "There was plenty of controversy as the League title hinged on a successful protest to the MDL lodged by Square Utd following allegations of Trim using a suspended player in their end of season clash.",
          "However, Trim Celtic successfully appealed the MDL decision to the Leinster Football Association.",
          "Navan Town became the first Navan side to win the Challenge Cup in 25 years following a penalty shoot out against Rock Celtic at Claremont Stadium for the first time.",
          "Albion Rovers became the second MDL side to install floodlights, and were closely followed by Parkvilla and at the MDL grounds, although in the MDL case it was the first phase of plans for a full sized Astro Pitch with the lights being sited on a then undeveloped pitch. A second full sized grass pitch was also fully upgraded."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Trim Celtic",
            "runnerUp": "Square Utd"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Navan Town",
            "runnerUp": "Rock Celtic"
          }
        ],
        "officers": "Chairman – John Gorman secretary / treasurer – Gerry Gorman; Fixtures Secretary – Pat O’ Brien registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2007/08",
        "league": "Meath & District League",
        "paragraphs": [
          "Another season where 63 clubs affiliated fielding a record high of 104 teams.",
          "There was another campaign for a change of season from the traditional August / April season to a calendar year season that would run from March to October annually.",
          "It was narrowly defeated. Notable in the voting was the members of the Executive Committee did not vote and left the matter solely to the club delegates.",
          "For the first time in the League’s history all member clubs were represented at the AGM and the motion for change failed by two votes to get a necessary two-thirds majority.",
          "On the pitch, Glenmuir Utd from Dundalk brought the Premier League title back to Louth and Rock Celtic bounced back from the previous season’s final defeat to take the Challenge Cup at the expense of 2006 champions Duleek."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Glenmuir Utd",
            "runnerUp": "Rock Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Rock Celtic",
            "runnerUp": "Duleek"
          }
        ],
        "officers": "Chairman – John Gorman; secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2008/09",
        "league": "Meath & District League",
        "paragraphs": [
          "Similar numbers to the previous season affiliated fielding 103 teams. Kingscourt Harps became the first club to install a floodlit astro-pitch.",
          "The destination of the Premier League went to the last kick of the season when Rock Celtic needing a draw against fellow title contenders Woodview Celtic managed a 2-2 result.",
          "Woodview scored with what looked to be a winning goal, only to see it cancelled as a result of a linesman’s flag.",
          "Glenmuir made it a double swoop for Dundalk teams when they managed to hold on to their playing pool from the previous League winning campaign, and they beat Trim Celtic in the Challenge Cup decider.",
          "With more clubs availing of facilities with floodlights more matches were scheduled for Thursday and Friday evenings."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Rock Celtic",
            "runnerUp": "Woodview Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Glenmuir Utd",
            "runnerUp": "Trim Celtic"
          }
        ],
        "officers": "Chairman – John Gorman; secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2009/10",
        "league": "Meath & District League",
        "paragraphs": [
          "Despite the growing recession a record 105 teams affiliated",
          "Secretary Gerry Gorman commented in his annual report.",
          "“Unfortunately our game has not escaped the effects of the dramatic and rapid downturn in the economy over the last 12 months.”",
          "“The most notable aspect being the stalling of development plans as a result of the uncertainty of capital grants from the Department of Arts, Sport, and Tourism.",
          "“It is hoped that it will be a relatively short period that hopefully will be measured in months, rather than years that the vital aid will be back on stream.",
          "“Otherwise, not only will the future plans be shattered, but also a lot of good work and planning could end up being a waste of time, money and effort if the development to date is not allowed to reach its potential.”",
          "Kingscourt Harps was crowned FAI club-of-the-year.",
          "Belluragn returned to the MDL with their first team after a number of seasons in the Dublin-based AUL.",
          "Rock Celtic defended their Premier League title following a play off win over Carrick Rovers while Clones Town won the Challenge Cup at the expense of relatively new team from Trim, Knightsbrook.",
          "The end of season awards night saw a boost for the MDL when FAI chief executive officer John Delaney handed over a grant cheque for €30,000."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Rock Celtic",
            "runnerUp": "Carrick Rovers"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Clones Town",
            "runnerUp": "Knightsbrook"
          }
        ],
        "officers": "Chairman – John Gorman; secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      }
    ],
    "photos": [
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/21-years-part-2.jpg",
        "caption": "Celebrating 21 years of the league"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/21-years.jpg",
        "caption": "Not Just Another Brick In The Wall, the 21-year commemorative publication"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/03/PIC-1-ALBION-ROVERS-MDL-LEAGUE-WINNERS-2006-Copy.jpg",
        "caption": "Albion Rovers, MDL league winners 2006"
      }
    ],
    "introPhotos": [
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/21-years-part-2.jpg",
        "caption": "Celebrating 21 years of the league"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/21-years.jpg",
        "caption": "Not Just Another Brick In The Wall, the 21-year commemorative publication"
      }
    ]
  },
  {
    "slug": "2010s",
    "years": "2010 – 2019",
    "title": "Riding out the storm",
    "summary": "Recession stalled capital grants, the league became the North East Football League in 2014, and the switch to a calendar-year season brought summer soccer in 2019.",
    "cover": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Trim-Celtic-2010-2019-1.jpg",
    "intro": [],
    "seasons": [
      {
        "season": "2010/11",
        "league": "Meath & District League",
        "paragraphs": [
          "The economic downturn saw the suspension of Capital grants for 2009 and what looked likely at the time for a few years as there was no indication about a timeline for resumption.",
          "It prompted a concerned statement within the annual secretary’s report as follows:",
          "“In common with similar projects countrywide evidence is there for all to see half finished developments with the frustration and all that goes with it of knowing it is not possible to make any meaningful progress without the aid of Capital Grants.”",
          "“While we all have to accept inevitable cutbacks due to the present gloomy economic outlook, the funding generated from the proceeds of the National Lottery is vital for club development in any meaningful fashion.”",
          "The MDL continued to receive great support from the FAI. The secretary’s report acknowledged receipt of a €30,000 grant, the second phase of a pledged €90,000 overall grant towards development. A fourth attempt to change the playing season was unsuccessful."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Woodview Celtic",
            "runnerUp": "Carrick Rovers"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Clones Town",
            "runnerUp": "Woodview Celtic"
          }
        ],
        "officers": "Chairman – John Gorman; secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2011/12",
        "league": "Meath & District League",
        "paragraphs": [
          "Kilmessan man John Gorman stepped down from his role as chairman after six years at the helm and he was replaced by long-time committee man David Tully who was first elected to the MDL in 1996.",
          "A total of 72 clubs representing 115 teams were affiliated which represented a new record entry (still remains as an all time high) following an increase of five teams from the previous season.",
          "An official PRO Justin Burke was put in place thus clearly defining the position and easing the then workload of the secretary and fixtures’ secretary.",
          "On the pitch Woodview Celtic maintained their dominance when they completed a Premier League and Challenge Cup double. The cup final against Dundalk rivals Quay Celtic and it was a memorable one where they claimed a narrow 3-2 win.",
          "Trim Celtic as runners up in the league were laying foundations for greater things later in the decade when they would eventually break the stranglehold of north Louth-based teams dominating the honours list."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Woodview Celtic",
            "runnerUp": "Trim Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Woodview Celtic",
            "runnerUp": "Quay Celtic"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – John O’Byrne",
        "photos": []
      },
      {
        "season": "2012/13",
        "league": "Meath & District League",
        "paragraphs": [
          "The total of 57 clubs representing 109 teams was a drop of six from the previous record high, and it started a downward trend that has continued to the present day.",
          "Christmas 2012 saw an announcement of Sports Capital grant allocations after an absence of four years and the MDL officials were in festive mood after learning of a pledge of €250,000 towards the development of a full sized artificial turf pitch.",
          "With floodlights already in place since 2007 it meant the rest of the development could be completed with a contribution of €120,000 from the MDL.",
          "David Doyle of Kentstown was the winner of the inaugural Meath Chronicle weekly forecast competition that continued throughout the season and sports editor Conall Collier and MDL chairman David Tully made presentations at the annual awards night.",
          "The Premier League ended in controversial circumstances. Duleek required a win against Rock Celtic where they triumphed 1-0 only for the result to be reversed following a successful protest which was further appealed to the LFA and the FAI before Rock Celtic was eventually declared champions.",
          "Duleek won the Challenge Cup by defeating Kingscourt Harps 5-1 in the final."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Rock Celtic",
            "runnerUp": "Woodview Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Duleek",
            "runnerUp": "Kingscourt Harps"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Sean Farrell",
        "photos": []
      },
      {
        "season": "2013/14",
        "league": "Meath & District League",
        "paragraphs": [
          "Trim Celtic became the second MDL club crowned as FAI club of the year and among a number of incentives received €5,000.",
          "Secretary Gerry Gorman received an FAI lifetime achievement award and after only one year as PRO Justin Burke received a special merit award.",
          "The MDL began the development of the astro pitch, but work had was suspended during the spring as a result of inclement weather conditions. Pat O’Brioen stood down from his position as fixtures’ secretary after eight years and was replaced by OMP Utd official Declan Jordan.",
          "On the pitch, 107 teams competed and Woodview Celtic made it three Premier League wins in five seasons when they edged out Navan Cosmos while Drogheda-based Newfoundwell defeated Bellurgan 2 1- in a thrilling Challenge Cup final ."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Woodview Celtic",
            "runnerUp": "Navan Cosmos"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Newfoundwell",
            "runnerUp": "Bellurgan Utd"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Sean Farrell",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/MDL-AStro-DAy-1-scaled.jpg",
            "caption": "The new FIFA One Star pitch on its opening day"
          }
        ]
      },
      {
        "season": "2014/15",
        "league": "North East Football League",
        "paragraphs": [
          "Almost 34 years after the dawning of the Mid-Meath League the title name was officially changed for a second time (Mid-Meath League to Meath & District League) to the North East Football League in a move that reflected the clubs and teams from Louth, Cavan and Monghan.",
          "The official announcement also coincided with the official opening of the all weather pitch at the MDL sports complex (as it is is still known). The ceremony was performed by the FAI chief executive John Delaney.",
          "On the field of play the dominance of north Louth was replaced by a south Louth-based side which saw Drogheda team Boyne Harps win the Premier League.",
          "Meath Branch Irish Soccer Referees’ Society official Conor Byrne was appointed to handle the FAI Junior Cup final which ended in a thrilling Dublin inner city derby which saw Liffey Celtic overcome Sheriff YC 1–0."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Boyne Harps",
            "runnerUp": "Woodview Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Belluragn Utd",
            "runnerUp": "Navan Cosmos"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Sean Farrell",
        "photos": []
      },
      {
        "season": "2015/16",
        "league": "North East Football League",
        "paragraphs": [
          "The debut season of the NEFL saw a total of 61 clubs representing 112 teams.",
          "This was an increase of three from the previous season, but was in reality a reduction of 10 teams, as the overall total included 13 teams from the over-35 section, plus for the first time, 11 teams in a Youth section.",
          "On the field of play Navan Cosmos became the first Navan side to win the Premier League since OMP (Div 1) almost 30 years earlier in 1987.",
          "They missed out on a double when losing (1-3) to Trim Celtic in the Challenge Cup final. It was the first time since 2007 that Meath sides won both top honours.",
          "At administrative level Damien Smith replaced Carrickmacross native Sean Farrell as registrar. A Sports Capital Grant of €250,000 was secured towards the upgrading the six small sided pitches and the development of a new grass pitch."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Navan Cosmos",
            "runnerUp": "Newfoundwell"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Trim Celtic",
            "runnerUp": "Navan Cosmos"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Damien Smith",
        "photos": []
      },
      {
        "season": "2016/17",
        "league": "North East Football League",
        "paragraphs": [
          "The Youth League was discontinued and 99 teams affiliated.The main focus at the AGM was a motion put forward by Duleek FC to change the playing season to a calendar year in line with the League of Ireland.",
          "A number of clubs opposed the motion – Quay Celtic, Rock Celtic and BMC Utd.",
          "Following a lengthy discussion, the vote was 31 in favour and 22 against, leaving it deficient by six votes for the necessary two-thirds majority.",
          "On the pitch referee Conor Byrne joined an elite group of officials when he was appointed to take charge of the Leinster Junior Cup final (Collinstown v Sheriff YC).",
          "The popular official had previously taken charge of the FAI Junior Cup final and the FAI Oscar Traynor Trophy final."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Muirhevna Mor",
            "runnerUp": "Newfoundwell"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Navan Cosmos",
            "runnerUp": "Bellurgan Utd"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Damien Smith",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/07/Conor-Byrne-Jimmy-Geoghan-Podge-Newman.jpg",
            "caption": "Conor Byrne, Jimmy Geoghan and Podge Newman"
          }
        ]
      },
      {
        "season": "2017/18",
        "league": "North East Football League",
        "paragraphs": [
          "The total of 57 Clubs representing 96 teams saw a reduction of three from 2017 and for the shortened transitional season the number had fallen by a further nine with the total at 76. For the first time in four campaigns there was no over-35 section.",
          "The last Tuesday in May 2018 will be enshrined as a watershed moment for the NEFL when after a number of attempts to change the playing season to all activity taking place within a calendar year was passed when 40 of the 48 delegates eligible to vote were in favour of the change.",
          "The aftermath of the decision saw the NEFL declare in line with other Leagues that made the change in recent times, that the transitional changeover would initially involve a shortened season staring early August with a view to conclude in November.",
          "Another stumbling block was alleviated somewhat when a motion put forward by Duleek to reduce the present requirements of a two thirds majority in favour of any future motions was reduced to 60 per cent.",
          "After many years in the Leinster Senior League (the majority at Intermediate level) Navan club Parkvilla declared they were putting forward their first team as an entry to the NEFL alongside their Reserves"
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Newfoundwell",
            "runnerUp": "Trim Celtic"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Muirhevna Mor",
            "runnerUp": "Bellurgan Utd"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Damien Smith",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2018/05/Gerry-2.jpg",
            "caption": "Martin O'Neill visits the MDL, May 2018"
          }
        ]
      },
      {
        "season": "2018",
        "league": "NEFL transition season",
        "paragraphs": [
          "The short season facilitated the transition from the traditional calendar of fixtures to a calendar-year schedule for 2019."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Boyne Harps",
            "runnerUp": "Muirhevna Mor"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Muirhevna Mor",
            "runnerUp": "Trim Celtic"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Damien Smith",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2018/06/Pic-3-NECSL-PRO-Jonathan-Purvis2c-NEFL-Secretarry-Gerry-Gorman2c-NEFL-PRO-Tommy-Melia.jpg",
            "caption": "NECSL PRO Jonathan Purvis, NEFL Secretary Gerry Gorman and NEFL PRO Tommy Melia"
          }
        ]
      },
      {
        "season": "2019",
        "league": "North East Football League",
        "paragraphs": [
          "The total of 48 clubs representing 69 teams saw a reduction of seven from 2018 in line with trends countrywide that reported an alarming drop off in the number of participants at group sporting activities.",
          "Meath hosted the FAI festival of football and although the association was in turmoil each club showcased it’s facilities. The MDL ground was open for a history presentation of football in the county co-ordinated by Parkvilla PRO Eddie Starrs.",
          "The week-long festivities concluded with the FAI AGM at Knightsbrook Hotel, Trim.",
          "On pitch it was the year of Trim Celtic as they took the Premier League and the Challenge Cup.",
          "Guided by former League of Ireland star and twice FAI Cup winner Alan Murphy they raised the bar in terms of applying a professional type approach and in doing so brought the level of football to arguably a standard not previously achieved.",
          "They aimed for outright glory at national and provincial level and notched up some notable victories against highly rated opponents before bowing out at the last 16 to Ferrybank (Waterford) in the FAI Junior Cup and Bluebell Utd (Dublin) in the Leinster Junior Cup."
        ],
        "results": [
          {
            "competition": "Premier Division",
            "winner": "Trim Celtic",
            "runnerUp": "Boyne Harps"
          },
          {
            "competition": "Challenge Cup",
            "winner": "Trim Celtic",
            "runnerUp": "Kentstown Rovers"
          }
        ],
        "officers": "Chairman – David Tully; secretary / treasurer – Gerry Gorman; registrar – Damien Smith",
        "photos": [
          {
            "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Trim-Celtic-2010-2019-1.jpg",
            "caption": "Trim Celtic"
          }
        ]
      }
    ],
    "photos": [
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/MDL-AStro-DAy-1-scaled.jpg",
        "caption": "The new FIFA One Star pitch on its opening day"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Trim-Celtic-2010-2019-1.jpg",
        "caption": "Trim Celtic"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2019/07/Conor-Byrne-Jimmy-Geoghan-Podge-Newman.jpg",
        "caption": "Conor Byrne, Jimmy Geoghan and Podge Newman"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2018/06/Pic-3-NECSL-PRO-Jonathan-Purvis2c-NEFL-Secretarry-Gerry-Gorman2c-NEFL-PRO-Tommy-Melia.jpg",
        "caption": "NECSL PRO Jonathan Purvis, NEFL Secretary Gerry Gorman and NEFL PRO Tommy Melia"
      },
      {
        "src": "https://i0.wp.com/nefl.ie/wp-content/uploads/2018/05/Gerry-2.jpg",
        "caption": "Martin O'Neill visits the MDL, May 2018"
      }
    ],
    "introPhotos": []
  }
];

export function getDecade(slug: string) {
  return leagueHistory.find((d) => d.slug === slug);
}
