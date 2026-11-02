import { leagueTablesDataLong } from "@/data/leagueTablesDataLong";

/** "UHY Farrelly Dawe White Premier Division" -> "Premier Division" (drops the sponsor) */
export function shortLeagueName(league: string) {
  const m = league.match(/(Womens\s+)?(Premier Division|Division\s+\w+)$/i);
  return m ? m[0] : league;
}

/** All league names in division order: men's Premier down to Division 4, then women's */
export const leaguesInDivisionOrder = [
  ...Object.keys(leagueTablesDataLong.Men),
  ...Object.keys(leagueTablesDataLong.Women),
];

/** Sort league names by division (unknown leagues go last) */
export function byDivision(a: string, b: string) {
  const ia = leaguesInDivisionOrder.indexOf(a);
  const ib = leaguesInDivisionOrder.indexOf(b);
  return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
}

const womensLeagues = new Set(Object.keys(leagueTablesDataLong.Women));

/** Short name that also says when it's a women's league: "Women's Division 1", "Division 3" */
export function leagueLabel(league: string) {
  const short = shortLeagueName(league).replace(/^Womens\s+/i, "");
  return womensLeagues.has(league) ? `Women's ${short}` : short;
}
