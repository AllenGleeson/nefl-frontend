"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ChevronDown, Search, SearchX, X } from "lucide-react"
import { clubs, type Club } from "@/data/club"
import { localLeagueTablesData } from "@/data/localLeagueTables"
import { assetUrl } from "@/utils/assetUrl"
import { byDivision, shortLeagueName } from "@/utils/leagueNames"
import { buttonStyles } from "@/components/ui/Button"
import ClubsCard from "./ClubsCard"

const ALL = "all"

/** Leagues that have at least one club, in division order */
const leagues = Array.from(new Set(clubs.flatMap((c) => c.leagues))).sort(byDivision)

/** Club name -> table position for a league */
function positionsFor(league: string): Record<string, number> {
  return Object.fromEntries((localLeagueTablesData[league] ?? []).map((row) => [row.name, row.position]))
}

function ClubGrid({ list, positions }: { list: Club[]; positions?: Record<string, number> }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
      {list.map((club) => (
        <li key={club.slug}>
          <ClubsCard club={club} leagueRank={positions?.[club.name] ?? null} />
        </li>
      ))}
    </ul>
  )
}

export default function Clubs() {
  const [query, setQuery] = useState("")
  const [league, setLeague] = useState(ALL)

  const searching = query.trim() !== ""
  const hasFilters = searching || league !== ALL

  // Search matches club name, ground or league; results are A–Z
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clubs
      .filter((c) => league === ALL || c.leagues.includes(league))
      .filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.ground?.toLowerCase().includes(q) ||
          c.leagues.some((l) => l.toLowerCase().includes(q))
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [query, league])

  // One league selected: list in table order with positions
  const leagueView = useMemo(() => {
    if (league === ALL) return null
    const positions = positionsFor(league)
    const list = [...matches].sort((a, b) => (positions[a.name] ?? 999) - (positions[b.name] ?? 999))
    return { positions, list }
  }, [league, matches])

  return (
    <div className="min-h-screen bg-[var(--md-surface)]">
      {/* Header with search */}
      <header className="relative isolate overflow-hidden bg-[var(--md-primary)] text-[var(--md-on-primary)]">
        <Image src={assetUrl("/images/clubspage.webp")} alt="" fill priority className="object-cover -z-10 opacity-25" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--md-primary)] via-[var(--md-primary)]/85 to-[var(--md-primary)]/50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--md-primary-container)]">
            {clubs.length} clubs · {leagues.length} leagues
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold">Clubs</h1>
          <p className="mt-2 text-white/80 max-w-xl">Find a club to see its details, league position, formation and grounds.</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-2xl">
            <label className="relative flex-1">
              <span className="sr-only">Search clubs</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--md-on-surface-variant)]" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by club, ground or league"
                className="w-full h-12 rounded-full bg-white pl-12 pr-11 text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)] shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--md-primary-container)] [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container)]"
                >
                  <X className="w-4 h-4" aria-hidden />
                </button>
              )}
            </label>
            <label className="relative sm:w-56">
              <span className="sr-only">League</span>
              <select
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                className="w-full h-12 appearance-none rounded-full bg-white/10 border border-white/30 pl-5 pr-10 font-medium text-white hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--md-primary-container)]"
              >
                <option value={ALL} className="text-[var(--md-on-surface)]">All leagues</option>
                {leagues.map((l) => (
                  <option key={l} value={l} className="text-[var(--md-on-surface)]">
                    {shortLeagueName(l)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden />
            </label>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Summary (only while searching or filtering) */}
        {hasFilters && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[var(--md-on-surface-variant)]" aria-live="polite">
              {`${matches.length} club${matches.length === 1 ? "" : "s"}${league !== ALL ? ` in ${shortLeagueName(league)}${searching ? "" : ", by league position"}` : ""}${searching ? ` matching “${query.trim()}”` : ""}`}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setLeague(ALL)
              }}
              className={buttonStyles({ variant: "outline", size: "sm" })}
            >
              <X className="w-4 h-4" aria-hidden />
              Reset Filters
            </button>
          </div>
        )}

        {matches.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--md-outline-variant)]">
            <SearchX className="mx-auto w-12 h-12 text-[var(--md-on-surface-variant)]/60" aria-hidden />
            <h2 className="mt-4 text-lg font-semibold text-[var(--md-on-surface)]">No clubs found</h2>
            <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">Try a different name or league.</p>
          </div>
        ) : leagueView ? (
          <ClubGrid list={leagueView.list} positions={leagueView.positions} />
        ) : (
          /* All leagues: one A–Z list (a club can be in more than one league) */
          <ClubGrid list={matches} />
        )}
      </div>
    </div>
  )
}
