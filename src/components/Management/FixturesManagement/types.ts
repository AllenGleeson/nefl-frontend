import { clubs } from "@/data/club";
import { leaguesInDivisionOrder, shortLeagueName } from "@/utils/leagueNames";

export type FixtureStatus = "scheduled" | "completed";

export interface AdminFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  /** YYYY-MM-DD */
  date: string;
  venue: string;
  league: string;
  homeScore?: number;
  awayScore?: number;
  /** Shown on the public fixtures page only when published */
  published: boolean;
  /** Username of the person who added it */
  createdBy: string;
}

/** A fixture is completed once both scores are in, otherwise it's scheduled */
export const fixtureStatus = (f: Pick<AdminFixture, "homeScore" | "awayScore">): FixtureStatus =>
  f.homeScore !== undefined && f.awayScore !== undefined ? "completed" : "scheduled";

export const fixtureStatusLabel: Record<FixtureStatus, string> = { scheduled: "Scheduled", completed: "Completed" };

/** Club names, A–Z */
export const teamOptions = [...clubs.map((c) => c.name)].sort((a, b) => a.localeCompare(b));

/** League names as used on fixtures ("Premier Division", "Division 1"…) in division order */
export const leagueOptions = Array.from(new Set(leaguesInDivisionOrder.map(shortLeagueName)));

/** Every club ground plus the league's own MDL grounds, A–Z */
export const venueOptions = Array.from(
  new Set(["MDL Grounds, Navan", ...clubs.map((c) => c.grounds?.name ?? c.ground).filter(Boolean)])
).sort((a, b) => a.localeCompare(b));

/** Make sure a saved value that isn't in the standard list still shows as an option */
export const withCurrent = (options: string[], current?: string) =>
  current && !options.includes(current) ? [current, ...options] : options;
