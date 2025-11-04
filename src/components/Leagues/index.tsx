// src/components/Leagues/index.tsx
"use client";

import { useState } from "react";
import LeagueTable from "./LeagueTable";
import FixturesMatrix from "./FixturesMatrix";
import LeaguesHeader from "./LeaguesHeader";
import { leagueTablesDataLong } from "@/data/leagueTablesDataLong";
import { fixturesMatrixData } from "@/data/fixturesMatrix";

type ViewMode = 'table' | 'fixtures';
type Gender = 'Men' | 'Women';

export default function LeaguesIndex() {
  const [selectedGender, setSelectedGender] = useState<Gender>('Men');
  const [selectedLeague, setSelectedLeague] = useState<string>(() => {
    const firstLeague = Object.keys(leagueTablesDataLong['Men'])[0];
    return firstLeague || '';
  });
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const availableLeagues = Object.keys(leagueTablesDataLong[selectedGender]);
  const availableFixturesLeagues = Object.keys(fixturesMatrixData[selectedGender]);

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
    const firstLeague = Object.keys(leagueTablesDataLong[gender])[0];
    setSelectedLeague(firstLeague);
  };

  const handleLeagueChange = (league: string) => {
    setSelectedLeague(league);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div
      className="relative md:pt-6 md:pb-6"
      style={{
        backgroundImage: 'url(/images/img4.webp)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Grey gradient overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to right, rgba(128,128,128,0.8) 0%, rgba(128,128,128,0.4) 50%, rgba(128,128,128,0) 100%)'
        }}
      />
      <div className="relative z-20">
        {/* Faded Background Box - Wraps Header and Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--md-surface-variant)]/80 backdrop-blur-sm">
            <LeaguesHeader
              selectedGender={selectedGender}
              selectedLeague={selectedLeague}
              viewMode={viewMode}
              availableLeagues={availableLeagues}
              onGenderChange={handleGenderChange}
              onLeagueChange={handleLeagueChange}
              onViewModeChange={handleViewModeChange}
            />

            {/* Content Container */}
            <div className="px-2 sm:px-8 lg:px-10 pb-4 sm:pb-8 lg:pb-10">
              {viewMode === 'table' ? (
                <LeagueTable
                  leagueTables={leagueTablesDataLong}
                  showMore={false}
                  selectedGender={selectedGender}
                  selectedLeague={selectedLeague}
                />
              ) : (
                <div>
                  {availableFixturesLeagues.includes(selectedLeague) ? (
                    <FixturesMatrix leagueFixtures={fixturesMatrixData[selectedGender][selectedLeague]} />
                  ) : (
                    <div className="bg-[var(--md-surface-container-lowest)] rounded-xl sm:rounded-2xl shadow-lg border border-[var(--md-outline-variant)] p-8 sm:p-12 text-center">
                      <div className="text-[var(--md-on-surface-variant)]/50 mb-4 sm:mb-6">
                        <svg className="mx-auto h-16 w-16 sm:h-20 sm:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-[var(--md-on-surface)] mb-3 sm:mb-4">
                        Fixtures Not Available
                      </h3>
                      <p className="text-[var(--md-on-surface-variant)] text-base sm:text-lg max-w-md mx-auto px-4">
                        Fixtures are not available for {selectedLeague} in {selectedGender} leagues.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}