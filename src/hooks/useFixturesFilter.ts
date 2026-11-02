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

export const DEFAULT_FILTERS: FixturesFilters = {
  view: "upcoming",
  season: fixtureSeasons[0] ?? "all",
  league: "all",
  club: "",
  dates: ANY_DATE,
  sort: "newest",
}

/** How many matches each season has, plus "all" */
export const seasonMatchCounts: Record<string, number> = allMatches.reduce<Record<string, number>>(
  (acc, m) => ({ ...acc, [m.season]: (acc[m.season] ?? 0) + 1 }),
  { all: allMatches.length }
)

/** How many matches each league has in the given season, plus "all" */
export function leagueMatchCounts(season: string): Record<string, number> {
  const counts: Record<string, number> = { all: 0 }
  for (const m of allMatches) {
    if (season !== "all" && m.season !== season) continue
    counts[m.league] = (counts[m.league] ?? 0) + 1
    counts.all++
  }
  return counts
}

export type ClubOption = { name: string; matches: number }

/** Clubs with fixtures in the given season and league, A–Z, with how many matches each has there */
export function clubsFor(season: string, league: string): ClubOption[] {
  const counts = new Map<string, number>()
  for (const m of allMatches) {
    if (season !== "all" && m.season !== season) continue
    if (league !== "all" && m.league !== league) continue
    for (const club of [m.home_team, m.away_team]) counts.set(club, (counts.get(club) ?? 0) + 1)
  }
  return Array.from(counts, ([name, matches]) => ({ name, matches })).sort((a, b) => a.name.localeCompare(b.name))
}

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
    if (window.location.hash === "#results") setFilters((f) => ({ ...f, view: "results" }))
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

  const update = (patch: Partial<FixturesFilters>) => setFilters((f) => ({ ...f, ...patch }))
  const reset = () => setFilters((f) => ({ ...DEFAULT_FILTERS, view: f.view }))
  const hasActiveFilters =
    filters.league !== "all" ||
    filters.club.trim() !== "" ||
    filters.season !== DEFAULT_FILTERS.season ||
    isDateRangeSet(filters.dates) ||
    filters.sort !== DEFAULT_FILTERS.sort

  return { filters, update, reset, hasActiveFilters, days, counts }
}
