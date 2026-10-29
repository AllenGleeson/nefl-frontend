import { clubs } from "@/data/club";

const slugByClubName: Record<string, string> = {};
clubs.forEach((c) => {
  slugByClubName[c.name] = c.slug;
});

/**
 * Returns the club page slug for a team name, or null if no matching club.
 */
export function getClubSlug(teamName: string): string | null {
  return slugByClubName[teamName] ?? null;
}
