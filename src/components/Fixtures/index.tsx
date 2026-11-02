"use client"

// src/components/Fixtures/index.tsx
import { useMemo, useRef, useState } from "react"
import FixturesList from "./FixturesList"
import FixturesFilter from "./FixturesFilter"
import { useFixturesFilter, type MatchDay } from "@/hooks/useFixturesFilter"
import { describeDateRange, isDateRangeSet } from "@/components/ui/DateRangePicker"
import Pagination from "@/components/ui/Pagination"

const PAGE_SIZE = 20

export default function Fixtures() {
  const { filters, update, reset, hasActiveFilters, days, counts } = useFixturesFilter()
  const shown = counts[filters.view]

  // Pagination by match, back to page 1 when filters change
  const listTopRef = useRef<HTMLDivElement>(null)
  const filterKey = JSON.stringify(filters)
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 })
  const totalPages = Math.max(1, Math.ceil(shown / PAGE_SIZE))
  const page = pageState.key === filterKey ? Math.min(pageState.page, totalPages) : 1
  const firstIndex = (page - 1) * PAGE_SIZE

  // Slice the matches for this page, then regroup them by day
  const pageDays = useMemo(() => {
    const out: MatchDay[] = []
    let i = 0
    for (const day of days) {
      const start = Math.max(firstIndex - i, 0)
      const end = Math.min(firstIndex + PAGE_SIZE - i, day.matches.length)
      if (start < end) out.push({ date: day.date, matches: day.matches.slice(start, end) })
      i += day.matches.length
    }
    return out
  }, [days, firstIndex])
  const pageCount = pageDays.reduce((n, d) => n + d.matches.length, 0)

  const goToPage = (p: number) => {
    setPageState({ key: filterKey, page: p })
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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

        <p ref={listTopRef} className="mt-4 mb-6 scroll-mt-24 text-sm text-[var(--md-on-surface-variant)]" aria-live="polite">
          Showing {shown} {filters.view === "results" ? "result" : "upcoming match"}
          {shown === 1 ? "" : filters.view === "results" ? "s" : "es"}
          {filters.season !== "all" ? ` from ${filters.season.replace("-", "/")}` : " from all seasons"}
          {isDateRangeSet(filters.dates) ? `, ${describeDateRange(filters.dates).replace(/^(From|Until)/, (m) => m.toLowerCase())}` : ""}
          {filters.sort === "newest" ? ", newest first" : ", oldest first"}
        </p>

        <FixturesList days={pageDays} view={filters.view} hasActiveFilters={hasActiveFilters} onReset={reset} />

        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} label="Fixture pages" />
            <p className="text-xs text-[var(--md-on-surface-variant)]">
              Showing {firstIndex + 1}–{firstIndex + pageCount} of {shown}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
