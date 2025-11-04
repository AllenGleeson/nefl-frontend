"use client"
import { LeagueTables, TeamRow } from "@/types/league"
import Link from "next/link"

type Props = {
  leagueTables: LeagueTables
  showMore?: boolean
  selectedGender?: keyof LeagueTables
  selectedLeague?: string
  maxRows?: number
}

export default function LeagueTable({ leagueTables, showMore = true, selectedGender = "Men", selectedLeague, maxRows }: Props) {
  type Gender = keyof LeagueTables
  type LeagueKey<T extends Gender> = keyof typeof leagueTables[T]

  // Use props if provided, otherwise fall back to defaults
  const currentGender = selectedGender || "Men"
  const currentLeague = selectedLeague || Object.keys(leagueTables[currentGender])[0]

  const fullTable: TeamRow[] =
    currentGender === "Men"
      ? leagueTables.Men[currentLeague as LeagueKey<"Men">] || []
      : leagueTables.Women[currentLeague as LeagueKey<"Women">] || []
  
  // Limit table to maxRows if specified
  const table = maxRows ? fullTable.slice(0, maxRows) : fullTable

  return (
    <section className="league-table pt-0 pb-4 sm:py-6 lg:py-8 relative overflow-hidden">
      <div className="container mx-auto px-2 relative z-10">
        {/* League Table */}
        <div className="max-w-6xl mx-auto bg-[var(--md-surface-container-lowest)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-0 sm:min-w-[600px]">
              <thead className="bg-[var(--md-primary)]">
                <tr>
                  <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider w-10 sm:w-auto">
                    Pos
                  </th>
                  <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider min-w-[100px] sm:min-w-0">
                    Team
                  </th>
                  <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider w-8 sm:w-auto">
                    P
                  </th>
                  <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider w-8 sm:w-auto">
                    W
                  </th>
                  <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider w-8 sm:w-auto">
                    D
                  </th>
                  <th className="px-1 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider w-8 sm:w-auto">
                    L
                  </th>
                  <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-center text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider w-12 sm:w-auto">
                    Pts
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[var(--md-surface-container-lowest)] divide-y divide-[var(--md-outline-variant)]">
                {table.map((team, index) => (
                  <tr 
                    key={team.position} 
                    className={`transition-all duration-200 ${
                      index % 2 === 0 
                        ? 'bg-[var(--md-surface-container-lowest)] hover:bg-[var(--md-surface-container-low)]' 
                        : 'bg-[var(--md-surface-container-low)] hover:bg-[var(--md-surface-container)]'
                    }`}
                  >
                    <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm font-semibold text-[var(--md-primary)]">
                      {team.position}
                    </td>
                    <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm font-medium text-[var(--md-on-surface)] truncate max-w-[120px] sm:max-w-none">
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
                    <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-sm sm:text-base font-bold text-[var(--md-primary)] text-center bg-[var(--md-primary-container)]/50">
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showMore && (
          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/leagues"
              className="inline-flex items-center gap-2 bg-[var(--md-primary)] hover:bg-[var(--md-primary-fixed-dim)] text-[var(--md-on-primary)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl border border-[var(--md-outline)] hover:border-[var(--md-primary-container)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              View Full Table
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}