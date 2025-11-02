"use client";

import { useState } from "react";
import Link from "next/link";
import LeagueTable from "../Leagues/LeagueTable";
import FixturesMatrix from "../Leagues/FixturesMatrix";
import LeaguesHeader from "../Leagues/LeaguesHeader";
import { leagueTablesDataLong } from "@/data/leagueTablesDataLong";
import { fixturesMatrixData } from "@/data/fixturesMatrix";

type ViewMode = 'table' | 'fixtures';
type Gender = 'Men' | 'Women';

export default function LeaguesSection() {
  const [selectedGender, setSelectedGender] = useState<Gender>('Men');
  const [selectedLeague, setSelectedLeague] = useState<string>('Premier League');
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
      className="leagues-section relative py-8 sm:py-12 lg:py-16"
      style={{
        backgroundImage: 'url(/images/img4.png)',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        margin: '0',
      }}
    >
      {/* Grey gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to right, rgba(128,128,128,0.6) 0%, rgba(128,128,128,0.3) 50%, rgba(128,128,128,0) 100%)'
        }}
      />
      <div className="relative z-20">
        {/* Faded Background Box - Wraps Header and Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--md-surface-variant)]/80 backdrop-blur-sm shadow-lg">
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
                  maxRows={5}
                />
              ) : (
                <div>
                  {availableFixturesLeagues.includes(selectedLeague) ? (
                    <FixturesMatrix
                      leagueFixtures={fixturesMatrixData[selectedGender][selectedLeague]}
                      maxRows={5}
                    />
                  ) : (
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center">
                      <div className="text-gray-400 mb-4 sm:mb-6">
                        <svg className="mx-auto h-16 w-16 sm:h-20 sm:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                        Fixtures Matrix Not Available
                      </h3>
                      <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto px-4">
                        Fixtures matrix is not available for {selectedLeague} in {selectedGender} leagues.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* View Full Tables/Matrix Link */}
              <div className="text-center mt-6 sm:mt-8">
                <Link
                  href="/leagues"
                  className="inline-flex items-center gap-2 bg-[var(--md-primary)] text-[var(--md-on-primary)] px-6 py-3 rounded-lg hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base font-medium"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  View Full {viewMode === 'table' ? 'Tables' : 'Matrix'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
