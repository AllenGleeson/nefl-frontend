"use client"

import { useEffect, useMemo, useState } from "react"
import { leagueMatchweeks } from "@/data/matchweeks"
import type { Match } from "@/data/fixtures"
import { ANY_DATE, inDateRange, isDateRangeSet, type DateRange } from "@/components/ui/DateRangePicker"

export type FixturesView = "upcoming" | "results"

export type FixturesSort = "newest" | "oldest"

export type FixturesFilters = {
  view: FixturesView
  season: string // "all" or e.g. "2025-26"
  league: string // "all" or a league name
  club: string // free text, "" for any
  dates: DateRange
  sort: FixturesSort
}

export type MatchDay = { date: string; matches: Match[] }


const isPlayed = (m: Match) => m.status === "FT"

const allMatches = leagueMatchweeks.flatMap((w) => w.days.flatMap((d) => d.matches))

/** Leagues that have at least one fixture, in the order they first appear */
export const fixtureLeagues = Array.from(new Set(allMatches.map((m) => m.league as string)))

/** Seasons in the fixtures, latest first (e.g. "2025-26") */
export const fixtureSeasons = Array.from(new Set(allMatches.map((m) => m.season))).sort().reverse()

/** Upcoming fixtures read soonest first; results read most recent first */
export const defaultSort = (view: FixturesView): FixturesSort => (view === "results" ? "newest" : "oldest")

export const DEFAULT_FILTERS: FixturesFilters = {
  view: "upcoming",
  season: fixtureSeasons[0] ?? "all",
  league: "all",
  club: "",
  dates: ANY_DATE,
  sort: defaultSort("upcoming"),
}

/** Every club that appears in the fixtures, A–Z */
export const fixtureClubs = Array.from(new Set(allMatches.flatMap((m) => [m.home_team, m.away_team]))).sort()

function matchesFilters(m: Match, f: FixturesFilters) {
  if (f.season !== "all" && m.season !== f.season) return false
  if (!inDateRange(m.date, f.dates)) return false
  if (f.league !== "all" && m.league !== f.league) return false
  const q = f.club.trim().toLowerCase()
  if (q && !m.home_team.toLowerCase().includes(q) && !m.away_team.toLowerCase().includes(q)) return false
  return true
}

export function useFixturesFilter() {
  const [filters, setFilters] = useState<FixturesFilters>(DEFAULT_FILTERS)

  // Allow linking straight to results with /fixtures#results
  useEffect(() => {
    if (window.location.hash === "#results") setFilters((f) => ({ ...f, view: "results", sort: defaultSort("results") }))
  }, [])

  const { days, counts } = useMemo(() => {
    const wantPlayed = filters.view === "results"
    const counts = { upcoming: 0, results: 0 }
    const byDate = new Map<string, Match[]>()

    for (const m of allMatches) {
      if (!matchesFilters(m, filters)) continue
      counts[isPlayed(m) ? "results" : "upcoming"]++
      if (isPlayed(m) !== wantPlayed) continue
      byDate.set(m.date, [...(byDate.get(m.date) ?? []), m])
    }

    const dates = Array.from(byDate.keys()).sort()
    if (filters.sort === "newest") dates.reverse()
    const days: MatchDay[] = dates.map((date) => ({ date, matches: byDate.get(date)! }))
    return { days, counts }
  }, [filters])

  // Switching between Upcoming and Results also switches to that tab's natural order
  const update = (patch: Partial<FixturesFilters>) =>
    setFilters((f) => ({ ...f, ...patch, ...(patch.view && patch.view !== f.view ? { sort: defaultSort(patch.view) } : {}) }))
  const reset = () => setFilters((f) => ({ ...DEFAULT_FILTERS, view: f.view, sort: defaultSort(f.view) }))
  const hasActiveFilters =
    filters.league !== "all" ||
    filters.club.trim() !== "" ||
    filters.season !== DEFAULT_FILTERS.season ||
    isDateRangeSet(filters.dates) ||
    filters.sort !== defaultSort(filters.view)

  return { filters, update, reset, hasActiveFilters, days, counts }
}
