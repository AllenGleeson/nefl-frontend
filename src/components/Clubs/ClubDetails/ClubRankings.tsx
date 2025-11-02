"use client";

import { useState } from "react";
import { getClubRankings, localLeagueTablesData } from "@/data/localLeagueTables";
import { fixturesMatrixData } from "@/data/fixturesMatrix";
import { LeagueFixtures, TeamFixture } from "@/data/fixturesMatrix";
import Image from "next/image";
import "@/styles/fixtures-matrix.css";

type ViewMode = 'table' | 'fixtures';

interface ClubRankingsProps {
  clubName: string;
}

export default function ClubRankings({ clubName }: ClubRankingsProps) {
  const rankings = getClubRankings(clubName);
  const [activeTab, setActiveTab] = useState<string | null>(rankings.length > 0 ? rankings[0].league : null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  if (rankings.length === 0) {
    return (
      <div className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">League Rankings</h2>
        <div className="text-center py-8">
          <div className="text-white/40 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No League Data Available</h3>
          <p className="text-white/70">This club is not currently participating in any tracked leagues.</p>
        </div>
      </div>
    );
  }

  const activeTeam = rankings.find(({ league }) => league === activeTab)?.team;
  const activeLeague = activeTab || rankings[0].league;

  // Get filtered table data (club + one above and below)
  const getFilteredTable = () => {
    if (!activeTab || !activeTeam) return [];
    const fullTable = localLeagueTablesData[activeTab] || [];
    const clubIndex = fullTable.findIndex(team => team.name === clubName);
    if (clubIndex === -1) return [];

    const startIndex = Math.max(0, clubIndex - 1);
    const endIndex = Math.min(fullTable.length, clubIndex + 2);
    return fullTable.slice(startIndex, endIndex);
  };

  // Get filtered fixtures matrix (only selected club)
  const getFilteredFixturesMatrix = (): LeagueFixtures | null => {
    if (!activeTab) return null;

    // Try to find the club in fixtures matrix data
    // We need to search through all leagues in fixturesMatrixData
    for (const gender of ['Men', 'Women'] as const) {
      const leagueData = fixturesMatrixData[gender][activeTab];
      if (!leagueData) continue;

      // Find the team by matching name
      const clubTeam = leagueData.teams.find(team =>
        team.name.toLowerCase().includes(clubName.toLowerCase()) ||
        clubName.toLowerCase().includes(team.name.toLowerCase())
      );

      if (clubTeam) {
        // Return a matrix with only this club's row
        return {
          leagueName: leagueData.leagueName,
          teams: [clubTeam] // Only include the selected club
        };
      }
    }

    return null;
  };

  const filteredTable = getFilteredTable();
  const filteredFixtures = getFilteredFixturesMatrix();

  const getResultClass = (result: any) => {
    if (!result) return "bg-[var(--md-surface-container-low)] text-[var(--md-on-surface-variant)]/50";

    switch (result.status) {
      case 'win':
        return "bg-[var(--md-tertiary-container)] text-[var(--md-on-tertiary-container)] hover:bg-[var(--md-tertiary-fixed-dim)]";
      case 'loss':
        return "bg-[var(--md-error-container)] text-[var(--md-on-error-container)] hover:bg-[var(--md-error-container)]/80";
      case 'draw':
        return "bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)] hover:bg-[var(--md-secondary-fixed-dim)]";
      default:
        return "bg-[var(--md-surface-container-low)] text-[var(--md-on-surface-variant)]";
    }
  };

  const getResultText = (result: any) => {
    if (!result) return "—";
    return `${result.homeScore}-${result.awayScore}`;
  };

  return (
    <div className="md:pt-6 md:pb-6">
      {/* Wraps Header and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Header */}
          <div className="pt-0 sm:pt-6">
            <div className="container mx-auto px-4">
              <div className="text-center pt-4 sm:pt-0 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--md-primary-container)] mb-2 sm:mb-3" style={{ color: '#8BD0EF' }}>
                  League Rankings
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-[var(--md-on-surface-variant)] max-w-2xl mx-auto px-4">
                  View {clubName}'s standings and fixtures across different leagues
                </p>
              </div>

              {/* Controls */}
              <div className="max-w-7xl mx-auto">
                {/* View Mode Toggle Slider */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="relative bg-[var(--md-surface-container)] rounded-full p-1 w-36 sm:w-44 lg:w-48 h-10 sm:h-12 shadow-sm">
                    <div
                      className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 shadow-md ${viewMode === 'table' ? "left-1 w-16 sm:w-20 lg:w-22" : "left-18 sm:left-22 lg:left-24 w-16 sm:w-20 lg:w-22"
                        }`}
                      style={{ backgroundColor: '#BDE9FF' }}
                    />
                    <button
                      onClick={() => setViewMode('table')}
                      className={`absolute top-1 bottom-1 w-16 sm:w-20 lg:w-22 rounded-full font-semibold flex items-center justify-center gap-1 transition-all duration-300 z-10 cursor-pointer ${viewMode === 'table'
                        ? ""
                        : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                        }`}
                      style={viewMode === 'table' ? { color: '#004D64', left: '4px' } : { left: '4px' }}
                    >
                      <span className="text-xs sm:text-sm lg:text-base">Table</span>
                    </button>
                    <button
                      onClick={() => setViewMode('fixtures')}
                      className={`absolute top-1 bottom-1 w-16 sm:w-20 lg:w-22 rounded-full font-semibold flex items-center justify-center gap-1 transition-all duration-300 z-10 cursor-pointer ${viewMode === 'fixtures'
                        ? ""
                        : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                        }`}
                      style={viewMode === 'fixtures' ? { color: '#004D64', left: '74px' } : { left: '74px' }}
                    >
                      <span className="text-xs sm:text-sm lg:text-base">Matrix</span>
                    </button>
                  </div>
                </div>

                {/* League Selection Buttons */}
                <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
        {rankings.map(({ league, team }) => (
          <button
            key={league}
            onClick={() => setActiveTab(league)}
                      className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer ${activeTab === league
                        ? "shadow-lg"
                        : "bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)]"
                        }`}
                      style={activeTab === league ? { backgroundColor: '#BDE9FF', color: '#004D64' } : {}}
                    >
                      <span className="font-medium text-xs sm:text-sm lg:text-base">{league}</span>
          </button>
        ))}
      </div>

                {/* Mobile: Dropdown Selector */}
                <div className="sm:hidden mb-6 sm:mb-0 relative">
                  <select
                    value={activeTab || ''}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full px-4 py-3 pr-12 text-base font-medium border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 appearance-none cursor-pointer"
                    style={{ backgroundColor: '#BDE9FF', borderColor: '#BDE9FF', color: '#004D64', '--tw-ring-color': '#8BD0EF' } as React.CSSProperties}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8BD0EF';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#BDE9FF';
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.backgroundColor = '#8BD0EF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.backgroundColor = '#BDE9FF';
                      }
                    }}
                  >
                    {rankings.map(({ league }) => (
                      <option key={league} value={league}>
                        {league}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#004D64' }}>
                      <path d="M8 11L3 6h10z" fill="currentColor" />
                    </svg>
              </div>
            </div>
              </div>
              </div>
            </div>
            
          {/* Content Container */}
          <div className="px-2 sm:px-8 lg:px-10 pb-4 sm:pb-8 lg:pb-10 pt-0">
            {viewMode === 'table' ? (
              <section className="league-table pt-0 pb-4 sm:pb-6 lg:pb-8 relative overflow-hidden">
                <div className="container mx-auto px-2 relative z-10">
                  {/* League Table */}
                  <div className="max-w-6xl mx-auto bg-[var(--md-surface-container-lowest)] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-0 sm:min-w-[600px]">
                        <thead style={{ backgroundColor: '#BDE9FF' }}>
                          <tr>
                            <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider w-10 sm:w-auto" style={{ color: '#004D64' }}>
                              Pos
                            </th>
                            <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider min-w-[100px] sm:min-w-0" style={{ color: '#004D64' }}>
                              Team
                            </th>
                            <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider w-8 sm:w-auto" style={{ color: '#004D64' }}>
                              P
                            </th>
                            <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider w-8 sm:w-auto" style={{ color: '#004D64' }}>
                              W
                            </th>
                            <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider w-8 sm:w-auto" style={{ color: '#004D64' }}>
                              D
                            </th>
                            <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider w-8 sm:w-auto" style={{ color: '#004D64' }}>
                              L
                            </th>
                            <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider w-12 sm:w-auto" style={{ color: '#004D64' }}>
                              Pts
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-[var(--md-surface-container-lowest)] divide-y divide-[var(--md-outline-variant)]">
                          {filteredTable.map((team, index) => (
                            <tr
                              key={team.position}
                              className={`transition-all duration-200 ${team.name === clubName
                                ? 'bg-[var(--md-primary-container)] hover:bg-[var(--md-primary-container)]'
                                : index % 2 === 0
                                  ? 'bg-[var(--md-surface-container-lowest)] hover:bg-[var(--md-surface-container-low)]'
                                  : 'bg-[var(--md-surface-container-low)] hover:bg-[var(--md-surface-container)]'
                                }`}
                            >
                              <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm font-semibold" style={{ color: '#8BD0EF' }}>
                                {team.position}
                              </td>
                              <td className={`px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm font-medium text-[var(--md-on-surface)] truncate max-w-[120px] sm:max-w-none ${team.name === clubName ? 'font-bold' : ''
                                }`}>
                                {team.name}
                              </td>
                              <td className="px-1 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm text-[var(--md-on-surface-variant)] text-center font-medium">
                                {team.played}
                              </td>
                              <td className="px-1 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm text-[var(--md-on-surface-variant)] text-center font-medium">
                                {team.won}
                              </td>
                              <td className="px-1 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm text-[var(--md-on-surface-variant)] text-center font-medium">
                                {team.drawn}
                              </td>
                              <td className="px-1 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm text-[var(--md-on-surface-variant)] text-center font-medium">
                                {team.lost}
                              </td>
                              <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-sm sm:text-base font-bold text-center" style={{ color: '#8BD0EF', backgroundColor: 'rgba(189, 233, 255, 0.5)' }}>
                                {team.points}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
              </div>
              </div>
                </div>
              </section>
            ) : (
              <div>
                {filteredFixtures ? (
                  <div className="fixtures-matrix-container">
                    <div className="bg-[var(--md-surface-container-lowest)] overflow-hidden">
                      {/* Header */}
                      <div className="p-4 sm:p-6" style={{ backgroundColor: '#BDE9FF', color: '#004D64' }}>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">{filteredFixtures.leagueName}</h2>
                        <p className="mt-1 text-sm sm:text-base" style={{ color: '#004D64', opacity: 0.8 }}>Fixtures Matrix - {clubName}</p>
            </div>
            
                      {/* Matrix Table */}
                      <div className="overflow-x-auto">
                        <div className="sp-table-wrapper">
                          <div className="sp-scrollable-table-wrapper">
                            <table className="w-full sp-event-matrix sp-data-table sp-scrollable-table min-w-max">
                              <thead>
                                <tr>
                                  <th className="sp-event-matrix-home-label bg-[var(--md-surface-variant)] px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-[var(--md-on-surface-variant)] border-b border-[var(--md-outline-variant)] text-xs sm:text-sm">
                                    Home \ Away
                                  </th>
                                  {filteredFixtures.teams[0] && Object.keys(filteredFixtures.teams[0].fixtures || {}).map((opponentId) => {
                                    // Find the opponent team to get their name
                                    const allTeams = fixturesMatrixData.Men[activeLeague]?.teams || fixturesMatrixData.Women[activeLeague]?.teams || [];
                                    const opponentTeam = allTeams.find(t => t.id === opponentId);
                                    if (!opponentTeam) return null;

                                    return (
                                      <th key={opponentId} className="sp-event-matrix-label bg-[var(--md-surface-variant)] px-1 sm:px-3 py-2 sm:py-3 text-center border-b border-[var(--md-outline-variant)]">
                                        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                                          <div className="relative">
                                            <Image
                                              src={opponentTeam.logo}
                                              alt={opponentTeam.name}
                                              width={24}
                                              height={24}
                                              className="rounded-full border border-[var(--md-outline-variant)] sm:w-8 sm:h-8 sm:border-2"
                                            />
              </div>
                                          <span className="text-xs font-medium text-[var(--md-on-surface-variant)] max-w-16 sm:max-w-20 text-center leading-tight break-words">
                                            {opponentTeam.name}
                                          </span>
              </div>
                                      </th>
                                    );
                                  })}
                        </tr>
                      </thead>
                      <tbody>
                                {filteredFixtures.teams.map((homeTeam) => (
                                  <tr key={homeTeam.id} className="hover:bg-[var(--md-surface-container-low)] transition-colors">
                                    {/* Home Team Label */}
                                    <td className="sp-event-matrix-home-label bg-[var(--md-surface-variant)] px-2 sm:px-4 py-2 sm:py-3 border-b border-[var(--md-outline-variant)]">
                                      <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="relative">
                                          <Image
                                            src={homeTeam.logo}
                                            alt={homeTeam.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full border border-[var(--md-outline-variant)] sm:w-8 sm:h-8 sm:border-2"
                                          />
                                        </div>
                                        <span className="font-medium text-[var(--md-on-surface-variant)] text-xs sm:text-sm">
                                          {homeTeam.name}
                              </span>
                                      </div>
                            </td>

                                    {/* Fixture Results */}
                                    {Object.keys(homeTeam.fixtures || {}).map((awayTeamId) => {
                                      const isSameTeam = homeTeam.id === awayTeamId;
                                      const result = homeTeam.fixtures[awayTeamId];

                                      // Find opponent team
                                      const allTeams = fixturesMatrixData.Men[activeLeague]?.teams || fixturesMatrixData.Women[activeLeague]?.teams || [];
                                      const opponentTeam = allTeams.find(t => t.id === awayTeamId);
                                      if (!opponentTeam) return null;

                                      return (
                                        <td key={awayTeamId} className="sp-event-matrix-cell px-1 sm:px-3 py-2 sm:py-3 text-center border-b border-[var(--md-outline-variant)]">
                                          {isSameTeam ? (
                                            <div className="w-8 h-6 sm:w-12 sm:h-8 bg-[var(--md-surface-container-low)] rounded flex items-center justify-center">
                                              <span className="text-[var(--md-on-surface-variant)]/50 text-xs sm:text-sm">—</span>
                                            </div>
                                          ) : (
                                            <div className="flex justify-center">
                                              <div
                                                className={`
                                                    w-8 h-6 sm:w-12 sm:h-8 rounded flex items-center justify-center text-xs sm:text-sm font-semibold
                                                    cursor-pointer transition-all duration-200
                                                    ${getResultClass(result)}
                                                  `}
                                                title={result ? `Match ID: ${result.matchId}` : 'No match played'}
                                              >
                                                {getResultText(result)}
                                              </div>
                                            </div>
                                          )}
                            </td>
                                      );
                                    })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                      </div>

                      {/* Legend */}
                      <div className="bg-[var(--md-surface-variant)] px-4 sm:px-6 py-3 sm:py-4 border-t border-[var(--md-outline-variant)]">
                        <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[var(--md-tertiary-container)] rounded"></div>
                            <span className="text-[var(--md-on-surface-variant)]">Win</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[var(--md-error-container)] rounded"></div>
                            <span className="text-[var(--md-on-surface-variant)]">Loss</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[var(--md-secondary-container)] rounded"></div>
                            <span className="text-[var(--md-on-surface-variant)]">Draw</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[var(--md-surface-container-low)] rounded"></div>
                            <span className="text-[var(--md-on-surface-variant)]">Not Played</span>
            </div>
          </div>
        </div>
            </div>
          </div>
                ) : (
                  <div className="bg-[var(--md-surface-container-lowest)] rounded-xl sm:rounded-2xl shadow-lg border border-[var(--md-outline-variant)] p-8 sm:p-12 text-center">
                    <div className="text-[var(--md-on-surface-variant)]/50 mb-4 sm:mb-6">
                      <svg className="mx-auto h-16 w-16 sm:h-20 sm:w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
            </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[var(--md-on-surface)] mb-3 sm:mb-4">
                      Fixtures Matrix Not Available
                    </h3>
                    <p className="text-[var(--md-on-surface-variant)] text-base sm:text-lg max-w-md mx-auto px-4">
                      Fixtures matrix is not available for {clubName} in {activeLeague}.
                    </p>
          </div>
                )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
