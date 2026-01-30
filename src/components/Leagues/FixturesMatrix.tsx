// src/components/Leagues/FixturesMatrix.tsx
"use client";

import Image from "next/image";
import { LeagueFixtures, FixtureResult } from "@/data/fixturesMatrix";
import "@/styles/fixtures-matrix.css";
import { assetUrl } from "@/utils/assetUrl";

type Props = {
  leagueFixtures: LeagueFixtures;
  maxRows?: number;
};

export default function FixturesMatrix({ leagueFixtures, maxRows }: Props) {
  const { teams } = leagueFixtures;
  
  // Limit teams to maxRows if specified
  const displayTeams = maxRows ? teams.slice(0, maxRows) : teams;

  const getResultClass = (result: FixtureResult | null) => {
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

  const getResultText = (result: FixtureResult | null) => {
    if (!result) return "—";
    return `${result.homeScore}-${result.awayScore}`;
  };

  return (
    <div className="fixtures-matrix-container">
      <div className="bg-[var(--md-surface-container-lowest)] overflow-hidden">
        {/* Fixtures Table */}
        <div className="overflow-x-auto">
          <div className="sp-table-wrapper">
            <div className="sp-scrollable-table-wrapper">
              <table className="w-full sp-event-matrix sp-data-table sp-scrollable-table min-w-max">
                <thead className="bg-[var(--md-primary)]">
                  <tr>
                    <th className="sp-event-matrix-home-label px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider">
                      Home \ Away
                    </th>
                    {displayTeams.map((team) => (
                      <th key={team.id} className="sp-event-matrix-label px-1.5 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider">
                        <div className="flex items-center justify-center">
                          <Image
                            src={assetUrl(team.logo)}
                            alt={team.name}
                            width={24}
                            height={24}
                            className="rounded-full border border-[var(--md-outline-variant)] sm:w-8 sm:h-8 sm:border-2"
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayTeams.map((homeTeam) => (
                    <tr key={homeTeam.id} className="hover:bg-[var(--md-surface-container-low)] transition-colors">
                      {/* Home Team Label */}
                      <td className="sp-event-matrix-home-label bg-[var(--md-surface-variant)] px-2 sm:px-4 py-2 sm:py-3 border-b border-[var(--md-outline-variant)]">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="relative">
                            <Image
                              src={assetUrl(homeTeam.logo)}
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
                      {displayTeams.map((awayTeam) => {
                        const isSameTeam = homeTeam.id === awayTeam.id;
                        const result = homeTeam.fixtures[awayTeam.id];

                        return (
                          <td key={awayTeam.id} className="sp-event-matrix-cell px-1 sm:px-3 py-2 sm:py-3 text-center border-b border-[var(--md-outline-variant)]">
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
  );
}
