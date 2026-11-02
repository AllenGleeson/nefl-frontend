"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getClubRankings, getPositionText, localLeagueTablesData } from "@/data/localLeagueTables";
import { getClubSlug } from "@/utils/clubSlug";
import { shortLeagueName } from "@/utils/leagueNames";
import { buttonStyles } from "@/components/ui/Button";
import LeagueSelect from "@/components/Leagues/LeagueSelect";
import ClubSection from "./ClubSection";
import ClubCrest from "../ClubCrest";
import { useRowLink } from "@/hooks/useRowLink";

/** Rows to show either side of the club */
const NEIGHBOURS = 1;

interface ClubRankingsProps {
  clubName: string;
}

/** The club's place in its league table, with the teams just above and below */
export default function ClubRankings({ clubName }: ClubRankingsProps) {
  const rankings = getClubRankings(clubName);
  const [league, setLeague] = useState(rankings[0]?.league ?? "");
  const rowLink = useRowLink();

  if (rankings.length === 0) return null;

  const table = localLeagueTablesData[league] ?? [];
  const index = table.findIndex((t) => t.name === clubName);
  const club = table[index];
  // Keep the window the same size when the club is top or bottom
  const size = NEIGHBOURS * 2 + 1;
  const start = Math.max(0, Math.min(index - NEIGHBOURS, table.length - size));
  const rows = table.slice(start, start + size);

  return (
    <ClubSection
      title="League standing"
      action={
        <Link href="/leagues" className={buttonStyles({ variant: "ghost", size: "sm" })}>
          Full tables
          <ChevronRight className="w-4 h-4" aria-hidden />
        </Link>
      }
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-4">
        {rankings.length > 1 ? (
          <LeagueSelect leagues={rankings.map((r) => r.league)} value={league} onChange={setLeague} tone="tonal" />
        ) : (
          <span className="font-semibold">{shortLeagueName(league)}</span>
        )}
        {club && (
          <span className="text-sm text-[var(--md-on-surface-variant)]">
            <strong className="text-[var(--md-on-surface)]">{getPositionText(club.position)}</strong> of {table.length} ·{" "}
            <strong className="text-[var(--md-on-surface)]">{club.points}</strong> pts
          </span>
        )}
      </div>

      <div className="rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)]/85 backdrop-blur-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] border-b-2 border-[var(--md-primary)]">
            <tr className="text-xs uppercase tracking-wider">
              <th scope="col" className="px-2 sm:px-4 py-2.5 text-left font-bold w-10">
                <abbr title="Position" className="no-underline">Pos</abbr>
              </th>
              <th scope="col" className="px-2 sm:px-4 py-2.5 text-left font-bold">Team</th>
              <th scope="col" className="px-1.5 sm:px-3 py-2.5 text-center font-bold"><abbr title="Played" className="no-underline">P</abbr></th>
              <th scope="col" className="px-1.5 sm:px-3 py-2.5 text-center font-bold"><abbr title="Won" className="no-underline">W</abbr></th>
              <th scope="col" className="px-1.5 sm:px-3 py-2.5 text-center font-bold"><abbr title="Drawn" className="no-underline">D</abbr></th>
              <th scope="col" className="px-1.5 sm:px-3 py-2.5 text-center font-bold"><abbr title="Lost" className="no-underline">L</abbr></th>
              <th scope="col" className="px-2 sm:px-4 py-2.5 text-center font-bold"><abbr title="Points" className="no-underline">Pts</abbr></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--md-outline-variant)]">
            {rows.map((team) => {
              const isClub = team.name === clubName;
              const slug = getClubSlug(team.name);
              // Other teams open their club page; the current club isn't a link
              const href = slug && !isClub ? `/clubs/${slug}` : null;
              return (
                <tr
                  key={team.name}
                  aria-current={isClub ? "true" : undefined}
                  {...rowLink(href)}
                  className={`transition-colors ${
                    isClub
                      ? "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] font-semibold"
                      : "text-[var(--md-on-surface)]"
                  } ${href ? "cursor-pointer hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)]" : "cursor-default"}`}
                >
                  <td className="px-2 sm:px-4 py-3 font-bold tabular-nums">{team.position}</td>
                  <td className="px-2 sm:px-4 py-2 max-w-0 w-full">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <ClubCrest name={team.name} />
                      <span className="truncate">
                        {href ? (
                          <Link href={href}>
                            {team.name}
                          </Link>
                        ) : (
                          team.name
                        )}
                      </span>
                    </span>
                  </td>
                  <td className="px-1.5 sm:px-3 py-3 text-center tabular-nums">{team.played}</td>
                  <td className="px-1.5 sm:px-3 py-3 text-center tabular-nums">{team.won}</td>
                  <td className="px-1.5 sm:px-3 py-3 text-center tabular-nums">{team.drawn}</td>
                  <td className="px-1.5 sm:px-3 py-3 text-center tabular-nums">{team.lost}</td>
                  <td className="px-2 sm:px-4 py-3 text-center font-bold tabular-nums">{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ClubSection>
  );
}
