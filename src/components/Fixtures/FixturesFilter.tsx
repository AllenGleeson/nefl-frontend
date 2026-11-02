"use client"

import { useMemo, type ReactNode } from "react"
import Image from "next/image"
import { ArrowDownWideNarrow, ArrowUpNarrowWide, CalendarDays, Layers, Trophy, X } from "lucide-react"
import { buttonStyles } from "@/components/ui/Button"
import FilterSelect, { type FilterOption } from "@/components/ui/FilterSelect"
import ClubSearch from "./ClubSearch"
import {
  clubsFor,
  fixtureLeagues,
  fixtureSeasons,
  leagueMatchCounts,
  seasonMatchCounts,
  type FixturesFilters,
  type FixturesView,
} from "@/hooks/useFixturesFilter"
import { shortLeagueName } from "@/utils/leagueNames"
import { getLeagueLogo } from "@/utils/leagueLogos"
import { assetUrl } from "@/utils/assetUrl"
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

/** Round badge holding an icon or a sponsor logo, the same size as a club crest */
function OptionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="w-7 h-7 shrink-0 rounded-full bg-[var(--md-primary-fixed)] text-[var(--md-on-primary-fixed)] flex items-center justify-center">
      {children}
    </span>
  )
}

const matchCount = (n = 0) => `${n} match${n === 1 ? "" : "es"}`

const seasonOptions: FilterOption[] = [
  ...fixtureSeasons.map((s, i) => ({
    value: s,
    label: s.replace("-", "/"),
    description: i === 0 ? "Current season" : undefined,
    icon: <OptionBadge><CalendarDays className="w-4 h-4" aria-hidden /></OptionBadge>,
    meta: matchCount(seasonMatchCounts[s]),
  })),
  {
    value: "all",
    label: "All seasons",
    icon: <OptionBadge><Layers className="w-4 h-4" aria-hidden /></OptionBadge>,
    meta: matchCount(seasonMatchCounts.all),
  },
]

export default function FixturesFilter({ filters, counts, hasActiveFilters, onChange, onReset }: Props) {
  const clubs = useMemo(() => clubsFor(filters.season, filters.league), [filters.season, filters.league])

  const leagueOptions = useMemo<FilterOption[]>(() => {
    const n = leagueMatchCounts(filters.season)
    return [
      {
        value: "all",
        label: "All leagues",
        icon: <OptionBadge><Trophy className="w-4 h-4" aria-hidden /></OptionBadge>,
        meta: matchCount(n.all),
      },
      ...fixtureLeagues.map((l) => {
        const short = shortLeagueName(l)
        return {
          value: l,
          label: short,
          description: l.replace(short, "").trim() || undefined,
          icon: (
            <OptionBadge>
              <Image src={assetUrl(getLeagueLogo(l))} alt="" width={18} height={18} className="w-[18px] h-[18px] object-contain" />
            </OptionBadge>
          ),
          meta: matchCount(n[l]),
        }
      }),
    ]
  }, [filters.season])

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
          <FilterSelect label="Season" options={seasonOptions} value={filters.season} onChange={(season) => onChange({ season })} className="sm:w-40" />

          {/* League */}
          <FilterSelect label="League" options={leagueOptions} value={filters.league} onChange={(league) => onChange({ league })} className="sm:w-52" />

          {/* Club search */}
          <ClubSearch clubs={clubs} value={filters.club} onChange={(club) => onChange({ club })} />

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
