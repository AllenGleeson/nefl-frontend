// components/Fixtures/FixturesList.tsx
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

type Match = {
  id: number
  home_team: string
  away_team: string
  home_score?: number
  away_score?: number
  date: string // e.g. "2025-08-15"
  time: string // e.g. "15:00"
  status: "FT" | "Scheduled"
  home_badge: string
  away_badge: string
  league: string
  venue?: string
  referee?: string
}

type Matchweek = {
  id: number
  title: string // e.g. "Matchweek 1"
  range: string // e.g. "Fri 15 Aug - Mon 18 Aug"
  days: {
    date: string
    dayLabel: string // e.g. "Fri 15 Aug"
    matches: Match[]
  }[]
}

type Props = {
  matchweeks: Matchweek[]
  showLeague?: boolean
}

type CollapsibleDayProps = {
  day: {
    date: string
    dayLabel: string
    matches: Match[]
  }
}

function CollapsibleDay({ day }: CollapsibleDayProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-3 sm:mb-4">
      {/* Day Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 sm:p-3 bg-[var(--md-surface-container-low)] hover:bg-[var(--md-surface-container)] rounded-lg transition-colors duration-200"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="text-sm sm:text-base font-semibold text-[var(--md-on-surface)]">
            {day.dayLabel}
          </h3>
          <div className="text-xs text-[var(--md-on-surface-variant)]">
            {day.matches.length} match{day.matches.length !== 1 ? 'es' : ''}
          </div>
        </div>
        <div className="flex items-center">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-[var(--md-on-surface-variant)]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[var(--md-on-surface-variant)]" />
          )}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 animate-in slide-in-from-top-2 duration-200">
          {day.matches.map((match) => {
            // Generate abbreviations from team names
            const getAbbr = (teamName: string) => {
              const words = teamName.split(' ');
              if (words.length > 1) {
                return words.map(w => w[0]).join('').toUpperCase().slice(0, 3);
              }
              return teamName.slice(0, 3).toUpperCase();
            };

            return (
              <Link
                key={match.id}
                href={`/fixtures/${match.id}`}
                className="bg-[var(--md-surface-container-lowest)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[var(--md-outline-variant)] overflow-hidden block cursor-pointer rounded-lg"
              >
                {/* Match Header - Competition Info */}
                <div className="px-4 sm:px-6 py-3 border-b border-[var(--md-outline-variant)]">
                  <p className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface)] mb-1">
                    {match.league}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--md-on-surface-variant)]">
                    {match.venue && (
                      <>
                        <span>{match.venue}</span>
                        {match.referee && <span>·</span>}
                      </>
                    )}
                    {match.referee && (
                      <span>Ref: {match.referee}</span>
                    )}
                  </div>
                </div>
                
                {/* Match Body - Teams and Score */}
                <div className="p-4 sm:p-6">
                  {/* Teams Display */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Home Team */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-2">
                        <Image
                          src={match.home_badge}
                          alt={match.home_team}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <abbr className="text-xs sm:text-sm font-medium text-[var(--md-on-surface)]" title={match.home_team}>
                        {getAbbr(match.home_team)}
                      </abbr>
                    </div>
                    
                    {/* Score Display */}
                    <div className="flex flex-col items-center mx-4 sm:mx-6">
                      {match.status === "FT" ? (
                        <div className="flex flex-row items-center gap-2">
                          <div className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">
                            {match.home_score}
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-gray-500">-</span>
                          <div className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">
                            {match.away_score}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-[var(--md-on-surface-variant)]">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm sm:text-base font-semibold">{match.time}</span>
                        </div>
                      )}
                      {/* Status Badge */}
                      <div className={`mt-2 px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
                        match.status === "FT" 
                          ? "bg-[var(--md-tertiary-container)] text-[var(--md-on-tertiary-container)]"
                          : "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]"
                      }`}>
                        {match.status === "FT" ? "FT" : "Scheduled"}
                      </div>
                    </div>
                    
                    {/* Away Team */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-2">
                        <Image
                          src={match.away_badge}
                          alt={match.away_team}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <abbr className="text-xs sm:text-sm font-medium text-[var(--md-on-surface)]" title={match.away_team}>
                        {getAbbr(match.away_team)}
                      </abbr>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default function FixturesList({ matchweeks, showLeague = false }: Props) {
  if (matchweeks.length === 0) {
    return (
      <div className="text-center py-8 sm:py-16 px-4">
        <div className="text-[var(--md-on-surface-variant)] mb-4 sm:mb-6">
          <svg
            className="mx-auto h-12 w-12 sm:h-16 sm:w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-[var(--md-on-surface)] mb-2 sm:mb-3">
          No matches found
        </h3>
        <p className="text-sm sm:text-base text-[var(--md-on-surface-variant)]">
          Try adjusting your filters to see more results.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 sm:p-6">
      {matchweeks.map((week) => (
        <section key={week.id} className="sm:bg-[var(--md-surface)] sm:border sm:border-[var(--md-outline-variant)] sm:rounded-xl p-4 sm:p-6 sm:hover:shadow-lg transition-all duration-300">
          {/* Matchweek Header */}
          <div className="mb-4 sm:mb-6">
            <div className="mb-2 sm:mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--md-on-surface)] mb-1 sm:mb-2">{week.title}</h2>
              <div className="flex items-center text-xs sm:text-sm text-[var(--md-on-surface-variant)] mb-2 sm:mb-3">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span>{week.range}</span>
              </div>
            </div>
            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-[var(--md-primary)] to-[var(--md-primary-container)] rounded-full"></div>
          </div>

          {week.days.map((day, i) => (
            <CollapsibleDay key={i} day={day} />
          ))}
        </section>
      ))}
    </div>
  )
}