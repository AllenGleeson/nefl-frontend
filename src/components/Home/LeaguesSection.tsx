"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import LeagueSummary from "../Leagues/LeagueSummary";
import { LeagueControls, LeagueStandings, leaguesHref, useLeagueSelection } from "../Leagues/LeagueBrowser";
import { leagueTablesDataLong } from "@/data/leagueTablesDataLong";
import { buttonStyles } from "@/components/ui/Button";

/** Home page preview of the leagues page: same controls and cards, top five teams only */
export default function LeaguesSection() {
  const selection = useLeagueSelection();
  const table = leagueTablesDataLong[selection.gender][selection.league] ?? [];

  return (
    <section className="leagues-section py-8 sm:py-10 md:py-12 bg-[var(--md-surface)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">Leagues</h2>
          <Link
            href="/leagues"
            className="text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 transition-colors duration-200 flex items-center gap-1"
          >
            GO TO LEAGUES
            <ChevronRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>

        <LeagueControls selection={selection} />

        <LeagueSummary league={selection.league} women={selection.gender === "Women"} table={table} />

        <div className="mt-6">
          <LeagueStandings
            selection={selection}
            maxRows={5}
            footer={
              <Link href={leaguesHref(selection)} className={buttonStyles({ variant: "outline", size: "sm" })}>
                {selection.view === "table" ? "View full table" : "View full results grid"}
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
}
