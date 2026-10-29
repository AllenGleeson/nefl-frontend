// components/Fixtures/FixturesList.tsx
import Image from "next/image"
import Link from "next/link"
import { CalendarX2, ChevronRight, MapPin } from "lucide-react"
import type { Match } from "@/data/fixtures"
import type { FixturesView, MatchDay } from "@/hooks/useFixturesFilter"
import { assetUrl } from "@/utils/assetUrl"
import { shortLeagueName } from "@/utils/leagueNames"
import { buttonStyles } from "@/components/ui/Button"

/** "2025-08-16" -> "Saturday 16 August 2025" */
export function formatMatchDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function Team({ name, badge, align, bold }: { name: string; badge: string; align: "left" | "right"; bold: boolean }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 min-w-0 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <span className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
        <Image src={assetUrl(badge)} alt="" fill className="object-contain" sizes="40px" />
      </span>
      <span
        className={`text-sm sm:text-base leading-tight line-clamp-2 ${
          bold ? "font-bold text-[var(--md-on-surface)]" : "font-medium text-[var(--md-on-surface-variant)]"
        }`}
      >
        {name}
      </span>
    </div>
  )
}

function MatchRow({ match }: { match: Match }) {
  const played = match.status === "FT"
  const homeWon = played && (match.home_score ?? 0) > (match.away_score ?? 0)
  const awayWon = played && (match.away_score ?? 0) > (match.home_score ?? 0)

  return (
    <li>
      <Link
        href={`/fixtures/${match.id}`}
        className="group block px-3 sm:px-5 py-3 sm:py-4 hover:bg-[var(--md-surface-container-low)] focus:outline-none focus-visible:bg-[var(--md-surface-container-low)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--md-primary)] transition-colors"
        aria-label={
          played
            ? `${match.home_team} ${match.home_score}, ${match.away_team} ${match.away_score}, full time`
            : `${match.home_team} v ${match.away_team}`
        }
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <Team name={match.home_team} badge={match.home_badge} align="right" bold={!played || homeWon} />

          <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px]">
            {played ? (
              <>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--md-primary)] text-[var(--md-on-primary)] px-2.5 sm:px-3 py-1 text-base sm:text-lg font-bold tabular-nums">
                  {match.home_score}
                  <span className="opacity-60">–</span>
                  {match.away_score}
                </span>
                <span className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--md-on-surface-variant)]">
                  Full time
                </span>
              </>
            ) : (
              <>
                <span className="rounded-lg border border-[var(--md-outline-variant)] px-3 py-1 text-sm font-bold text-[var(--md-on-surface-variant)]">
                  v
                </span>
                <span className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--md-primary)]">
                  {match.time || "TBC"}
                </span>
              </>
            )}
          </div>

          <Team name={match.away_team} badge={match.away_badge} align="left" bold={!played || awayWon} />
        </div>

        <div className="mt-2 flex items-center justify-center gap-x-3 gap-y-1 flex-wrap text-xs text-[var(--md-on-surface-variant)]">
          <span className="font-semibold text-[var(--md-primary)]">{shortLeagueName(match.league)}</span>
          {match.venue && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" aria-hidden />
              {match.venue}
            </span>
          )}
          <ChevronRight className="w-4 h-4 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
        </div>
      </Link>
    </li>
  )
}

type Props = {
  days: MatchDay[]
  view: FixturesView
  hasActiveFilters: boolean
  onReset: () => void
}

export default function FixturesList({ days, view, hasActiveFilters, onReset }: Props) {
  if (days.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-[var(--md-outline-variant)]">
        <CalendarX2 className="mx-auto w-12 h-12 text-[var(--md-on-surface-variant)]/60" aria-hidden />
        <h2 className="mt-4 text-lg font-semibold text-[var(--md-on-surface)]">
          No {view === "results" ? "results" : "upcoming matches"} found
        </h2>
        <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">
          {hasActiveFilters ? "Try a different league or club." : "Check back soon."}
        </p>
        {hasActiveFilters && (
          <button type="button" onClick={onReset} className={buttonStyles({ variant: "outline", size: "sm", className: "mt-4" })}>
            Reset filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {days.map((day) => (
        <section
          key={day.date}
          aria-label={formatMatchDate(day.date)}
          className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm overflow-hidden"
        >
          <h2 className="flex items-center justify-between gap-3 px-3 sm:px-5 py-2.5 bg-[var(--md-surface-container)] text-sm sm:text-base font-bold text-[var(--md-on-surface)]">
            <time dateTime={day.date}>{formatMatchDate(day.date)}</time>
            <span className="text-xs font-medium text-[var(--md-on-surface-variant)]">
              {day.matches.length} match{day.matches.length === 1 ? "" : "es"}
            </span>
          </h2>
          <ul className="divide-y divide-[var(--md-outline-variant)]">
            {day.matches.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
