// src/components/Leagues/LeagueBrowser.tsx
// Shared pieces for browsing league tables, used by the leagues page and the home page.
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { MdMan, MdWoman } from "react-icons/md";
import { CalendarDays, CalendarX2, ListOrdered } from "lucide-react";
import LeagueTable from "./LeagueTable";
import FixturesMatrix from "./FixturesMatrix";
import LeagueSelect from "./LeagueSelect";
import IconToggle from "@/components/ui/IconToggle";
import { buttonStyles } from "@/components/ui/Button";
import { leagueTablesDataLong } from "@/data/leagueTablesDataLong";
import { fixturesMatrixData } from "@/data/fixturesMatrix";

export type Gender = "Men" | "Women";
export type ViewMode = "table" | "fixtures";

export type LeagueSelection = {
  gender: Gender;
  league: string;
  view: ViewMode;
  setGender: (gender: Gender) => void;
  setLeague: (league: string) => void;
  setView: (view: ViewMode) => void;
};

const firstLeague = (gender: Gender) => Object.keys(leagueTablesDataLong[gender])[0] ?? "";

/** Link to the leagues page that opens on this league and view */
export function leaguesHref({ gender, league, view }: Pick<LeagueSelection, "gender" | "league" | "view">) {
  const params = new URLSearchParams({ gender, league, view });
  return `/leagues?${params}`;
}

/**
 * Which league, gender and view are showing. With `fromUrl`, it starts from ?gender=&league=&view=
 * (see leaguesHref), so links from elsewhere open the right table.
 */
export function useLeagueSelection({ fromUrl = false } = {}): LeagueSelection {
  const [gender, setGenderState] = useState<Gender>("Men");
  const [league, setLeague] = useState(() => firstLeague("Men"));
  const [view, setView] = useState<ViewMode>("table");

  useEffect(() => {
    if (!fromUrl) return;
    const params = new URLSearchParams(window.location.search);
    const g = params.get("gender") === "Women" ? "Women" : "Men";
    const l = params.get("league");
    setGenderState(g);
    setLeague(l && l in leagueTablesDataLong[g] ? l : firstLeague(g));
    if (params.get("view") === "fixtures") setView("fixtures");
  }, [fromUrl]);

  const setGender = (g: Gender) => {
    setGenderState(g);
    setLeague(firstLeague(g));
  };

  return { gender, league, view, setGender, setLeague, setView };
}

/** League picker, men/women switch and table/results-grid switch */
export function LeagueControls({ selection }: { selection: LeagueSelection }) {
  const { gender, league, view, setGender, setLeague, setView } = selection;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <LeagueSelect leagues={Object.keys(leagueTablesDataLong[gender])} value={league} onChange={setLeague} />
      <div className="flex items-center gap-3 sm:ml-auto">
        <IconToggle<Gender>
          ariaLabel="Men's or women's leagues"
          value={gender}
          onChange={setGender}
          options={[
            { value: "Men", label: "Men's leagues", icon: <MdMan className="w-6 h-6 sm:w-7 sm:h-7" /> },
            { value: "Women", label: "Women's leagues", icon: <MdWoman className="w-6 h-6 sm:w-7 sm:h-7" /> },
          ]}
        />
        <IconToggle<ViewMode>
          ariaLabel="Table or results grid"
          value={view}
          onChange={setView}
          options={[
            { value: "table", label: "League table", icon: <ListOrdered className="w-5 h-5" /> },
            { value: "fixtures", label: "Results grid", icon: <CalendarDays className="w-5 h-5" /> },
          ]}
        />
      </div>
    </div>
  );
}

type StandingsProps = {
  selection: Pick<LeagueSelection, "gender" | "league" | "view">;
  /** Only show the top few teams (home page preview) */
  maxRows?: number;
  /** Shown under the table, e.g. a "View full table" link */
  footer?: ReactNode;
};

/** The league table or results grid in a card with a title bar */
export function LeagueStandings({ selection, maxRows, footer }: StandingsProps) {
  const { gender, league, view } = selection;
  const matrix = fixturesMatrixData[gender][league];
  const title = view === "table" ? (maxRows ? "Top of the table" : "League table") : "Results grid";
  const hint =
    view === "table" ? "Tap a club to see its page" : "Home team down the side, away team along the top";

  return (
    <section
      aria-label={title}
      className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm overflow-hidden"
    >
      <h2 className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[var(--md-surface-container)] text-sm sm:text-base font-bold text-[var(--md-on-surface)]">
        {title}
        <span className="hidden sm:inline text-xs font-medium text-[var(--md-on-surface-variant)]">{hint}</span>
      </h2>

      {view === "table" ? (
        <LeagueTable
          leagueTables={leagueTablesDataLong}
          showMore={false}
          selectedGender={gender}
          selectedLeague={league}
          maxRows={maxRows}
          flush
        />
      ) : matrix ? (
        <FixturesMatrix leagueFixtures={matrix} maxRows={maxRows} />
      ) : (
        <div className="text-center py-14 px-4">
          <CalendarX2 className="mx-auto w-12 h-12 text-[var(--md-on-surface-variant)]/60" aria-hidden />
          <h3 className="mt-4 text-lg font-semibold text-[var(--md-on-surface)]">No results grid for this league yet</h3>
          <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">
            You can still find every match for this league on the fixtures page.
          </p>
          <Link href="/fixtures" className={buttonStyles({ variant: "outline", size: "sm", className: "mt-4" })}>
            Go to fixtures &amp; results
          </Link>
        </div>
      )}

      {footer && (
        <div className="flex justify-center px-4 py-4 border-t border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)]">
          {footer}
        </div>
      )}
    </section>
  );
}
