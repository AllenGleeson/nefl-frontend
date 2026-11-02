import { rollOfHonour, type HonourCategory } from "@/data/rollOfHonour";
import { clubs, type Club } from "@/data/club";

export type ClubHonour = {
  id: string;
  category: HonourCategory["id"];
  competition: string;
  season: string;
  year: number;
  position: "winner" | "runner-up";
  /** "2nd team", "3rd team" when it wasn't the first team */
  team?: string;
  note?: string;
};

/**
 * Names in the roll of honour that mean the same club but don't reduce to its current name.
 * Keys are club names from data/club.ts; values are normalised names (see normalise below).
 */
const ALIASES: Record<string, string[]> = {
  "Glenmuir FC": ["glenmuir united"],
  "Kingscourt Harps AFC": ["kingscourt"],
  "Kentstown Rovers FC": ["kentstown", "kenstown rovers"],
  "BJD Celtic": ["ballyjamesduff celtic"],
};

const WORDS: Record<string, string> = { utd: "united", rov: "rovers", rvrs: "rovers", wdrs: "wanderers", cel: "celtic" };
const TEAMS: Record<string, string> = { "2nd": "2nd team", "2nds": "2nd team", "3rds": "3rd team" };

/** "Glenmuir Utd2nds" -> { name: "glenmuir united", team: "2nd team" }; "Albion Rovers (Ballivor)" -> "albion rovers" */
function normalise(raw: string): { name: string; team?: string } {
  let s = raw.toLowerCase().replace(/\(.*?\)/g, " ");
  let team: string | undefined;
  const m = s.match(/(1sts|2nds?|3rds)\s*$/);
  if (m) {
    team = TEAMS[m[1]];
    s = s.slice(0, m.index);
  }
  const words = s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => WORDS[w] ?? w)
    .filter((w) => w !== "fc" && w !== "afc");
  return { name: words.join(" "), team };
}

/** The current club a roll of honour team name belongs to, e.g. "Glenmuir Utd 2nds" -> Glenmuir FC */
export function findClubForHonourName(raw: string): Club | undefined {
  const { name } = normalise(raw);
  return clubs.find((c) => normalise(c.name).name === name || ALIASES[c.name]?.includes(name));
}

/** Every roll of honour entry a club won or finished runner-up in, newest first */
export function getClubHonours(clubName: string): ClubHonour[] {
  const names = new Set([normalise(clubName).name, ...(ALIASES[clubName] ?? [])]);
  const out: ClubHonour[] = [];

  for (const category of rollOfHonour) {
    for (const comp of category.competitions) {
      for (const e of comp.entries) {
        for (const [position, raw] of [["winner", e.winner], ["runner-up", e.runnerUp]] as const) {
          if (!raw) continue;
          const { name, team } = normalise(raw);
          if (!names.has(name)) continue;
          out.push({
            id: `${comp.id}-${e.season}-${position}`,
            category: category.id,
            competition: comp.name,
            season: e.season,
            year: e.year,
            position,
            team,
            note: e.note,
          });
        }
      }
    }
  }

  return out.sort((a, b) => b.year - a.year || a.competition.localeCompare(b.competition));
}
