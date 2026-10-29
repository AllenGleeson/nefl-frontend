"use client"

import { ArrowDownWideNarrow, ArrowUpNarrowWide, ChevronDown, Search, X } from "lucide-react"
import { buttonStyles } from "@/components/ui/Button"
import {
  fixtureClubs,
  fixtureLeagues,
  fixtureSeasons,
  type FixturesFilters,
  type FixturesView,
} from "@/hooks/useFixturesFilter"
import { shortLeagueName } from "@/utils/leagueNames"
import DateRangePicker, { futurePresets, pastPresets } from "@/components/ui/DateRangePicker"

type Props = {
  filters: FixturesFilters
  counts: Record<FixturesView, number>
  hasActiveFilters: boolean
  onChange: (patch: Partial<FixturesFilters>) => void
  onReset: () => void
}

const views: { id: FixturesView; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "results", label: "Results" },
]

export default function FixturesFilter({ filters, counts, hasActiveFilters, onChange, onReset }: Props) {
  return (
    <div className="sticky top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-[var(--md-surface)]/95 backdrop-blur-sm border-b border-[var(--md-outline-variant)] sm:border-0">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Upcoming / Results */}
        <div role="tablist" aria-label="Show" className="inline-flex self-start p-1 rounded-full bg-[var(--md-surface-container)] shadow-sm">
          {views.map((v) => {
            const selected = filters.view === v.id
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  onChange({ view: v.id })
                  history.replaceState(null, "", v.id === "results" ? "#results" : location.pathname)
                }}
                className={`inline-flex items-center gap-2 rounded-full px-4 h-10 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] ${
                  selected
                    ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md"
                    : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                }`}
              >
                {v.label}
                <span
                  className={`min-w-6 rounded-full px-1.5 text-xs tabular-nums ${
                    selected ? "bg-white/20" : "bg-[var(--md-surface-container-high)]"
                  }`}
                >
                  {counts[v.id]}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-2 lg:justify-end">
          {/* Season */}
          <label className="relative flex-1 min-w-[130px] sm:flex-none">
            <span className="sr-only">Season</span>
            <select
              value={filters.season}
              onChange={(e) => onChange({ season: e.target.value })}
              className="w-full sm:w-36 h-10 appearance-none rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] pl-4 pr-9 text-sm font-medium text-[var(--md-on-surface)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]"
            >
              {fixtureSeasons.map((s) => (
                <option key={s} value={s}>
                  {s.replace("-", "/")} season
                </option>
              ))}
              <option value="all">All seasons</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
          </label>

          {/* League */}
          <label className="relative flex-1 min-w-[180px] sm:flex-none">
            <span className="sr-only">League</span>
            <select
              value={filters.league}
              onChange={(e) => onChange({ league: e.target.value })}
              className="w-full sm:w-56 h-10 appearance-none rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] pl-4 pr-9 text-sm font-medium text-[var(--md-on-surface)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]"
            >
              <option value="all">All leagues</option>
              {fixtureLeagues.map((l) => (
                <option key={l} value={l}>
                  {shortLeagueName(l)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
          </label>

          {/* Club search */}
          <label className="relative flex-1 min-w-[180px] sm:flex-none">
            <span className="sr-only">Search clubs</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
            <input
              type="search"
              list="fixture-clubs"
              value={filters.club}
              onChange={(e) => onChange({ club: e.target.value })}
              placeholder="Search for a club"
              className="w-full sm:w-60 h-10 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] pl-9 pr-9 text-sm text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] [&::-webkit-search-cancel-button]:hidden"
            />
            <datalist id="fixture-clubs">
              {fixtureClubs.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {filters.club && (
              <button
                type="button"
                onClick={() => onChange({ club: "" })}
                aria-label="Clear club search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container)]"
              >
                <X className="w-4 h-4" aria-hidden />
              </button>
            )}
          </label>

          {/* Dates */}
          <DateRangePicker
            value={filters.dates}
            onChange={(dates) => onChange({ dates })}
            presets={filters.view === "upcoming" ? futurePresets : pastPresets}
            label="Match date"
            align="right"
          />

          {/* Order */}
          <button
            type="button"
            onClick={() => onChange({ sort: filters.sort === "newest" ? "oldest" : "newest" })}
            title={filters.sort === "newest" ? "Showing newest first. Click for oldest first" : "Showing oldest first. Click for newest first"}
            className={buttonStyles({ variant: "outline", size: "sm", className: "h-10" })}
          >
            {filters.sort === "newest" ? (
              <ArrowDownWideNarrow className="w-4 h-4" aria-hidden />
            ) : (
              <ArrowUpNarrowWide className="w-4 h-4" aria-hidden />
            )}
            {filters.sort === "newest" ? "Newest first" : "Oldest first"}
          </button>

          {hasActiveFilters && (
            <button type="button" onClick={onReset} className={buttonStyles({ variant: "outline", size: "sm", className: "h-10" })}>
              <X className="w-4 h-4" aria-hidden />
              <span className="hidden sm:inline">Reset Filters</span>
              <span className="sm:hidden">Reset</span>
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
