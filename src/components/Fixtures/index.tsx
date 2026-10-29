"use client"

// src/components/Fixtures/index.tsx
import FixturesList from "./FixturesList"
import FixturesFilter from "./FixturesFilter"
import { useFixturesFilter } from "@/hooks/useFixturesFilter"
import { describeDateRange, isDateRangeSet } from "@/components/ui/DateRangePicker"

export default function Fixtures() {
  const { filters, update, reset, hasActiveFilters, days, counts } = useFixturesFilter()
  const shown = counts[filters.view]

  return (
    <div className="min-h-screen bg-[var(--md-surface)]">
      {/* Header */}
      <header className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--md-primary-container)]">
            {filters.season === "all" ? "All seasons" : `${filters.season.replace("-", "/")} season`}
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold">Fixtures &amp; Results</h1>
          <p className="mt-2 text-white/80">Every league match in one place. Filter by season or league, or search for your club.</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <FixturesFilter
          filters={filters}
          counts={counts}
          hasActiveFilters={hasActiveFilters}
          onChange={update}
          onReset={reset}
        />

        <p className="mt-4 mb-6 text-sm text-[var(--md-on-surface-variant)]" aria-live="polite">
          Showing {shown} {filters.view === "results" ? "result" : "upcoming match"}
          {shown === 1 ? "" : filters.view === "results" ? "s" : "es"}
          {filters.season !== "all" ? ` from ${filters.season.replace("-", "/")}` : " from all seasons"}
          {isDateRangeSet(filters.dates) ? `, ${describeDateRange(filters.dates).replace(/^(From|Until)/, (m) => m.toLowerCase())}` : ""}
          {filters.sort === "newest" ? ", newest first" : ", oldest first"}
        </p>

        <FixturesList days={days} view={filters.view} hasActiveFilters={hasActiveFilters} onReset={reset} />
      </div>
    </div>
  )
}
