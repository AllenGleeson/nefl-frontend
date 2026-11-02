// src/components/Leagues/index.tsx
"use client";

import Image from "next/image";
import LeagueSummary from "./LeagueSummary";
import { LeagueControls, LeagueStandings, useLeagueSelection } from "./LeagueBrowser";
import { leagueTablesDataLong } from "@/data/leagueTablesDataLong";
import { fixtureSeasons } from "@/hooks/useFixturesFilter";
import { assetUrl } from "@/utils/assetUrl";

const currentSeason = fixtureSeasons[0]?.replace("-", "/");

export default function LeaguesIndex() {
  const selection = useLeagueSelection({ fromUrl: true });
  const table = leagueTablesDataLong[selection.gender][selection.league] ?? [];

  return (
    <div className="min-h-screen bg-[var(--md-surface)]">
      {/* Header, with the league photo faded in behind */}
      <header className="relative overflow-hidden bg-[var(--md-primary)] text-[var(--md-on-primary)]">
        <Image
          src={assetUrl("/images/img4.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          {currentSeason && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--md-primary-container)]">
              {currentSeason} season
            </p>
          )}
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold">Leagues</h1>
          <p className="mt-2 text-white/80">Standings and head-to-head results for every NEFL division.</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        {/* Controls */}
        <div className="sticky top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[var(--md-surface)]/95 backdrop-blur-sm border-b border-[var(--md-outline-variant)] sm:border-0">
          <LeagueControls selection={selection} />
        </div>

        <LeagueSummary league={selection.league} women={selection.gender === "Women"} table={table} />

        <div className="mt-6">
          <LeagueStandings selection={selection} />
        </div>
      </div>
    </div>
  );
}
