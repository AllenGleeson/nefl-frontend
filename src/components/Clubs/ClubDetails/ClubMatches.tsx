import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fixtures, type Match } from "@/data/fixtures";
import { assetUrl } from "@/utils/assetUrl";
import { buttonStyles } from "@/components/ui/Button";
import ClubSection from "./ClubSection";

const allMatches = fixtures.flatMap((w) => w.days.flatMap((d) => d.matches));

const UPCOMING_COUNT = 3;
const RESULTS_COUNT = 5;

type Outcome = "W" | "D" | "L";

const OUTCOME_STYLE: Record<Outcome, { className: string; label: string }> = {
  W: { className: "bg-emerald-600 text-white", label: "Won" },
  D: { className: "bg-amber-400 text-amber-950", label: "Drew" },
  L: { className: "bg-red-600 text-white", label: "Lost" },
};

function MatchRow({ match, clubName }: { match: Match; clubName: string }) {
  const home = match.home_team === clubName;
  const opponent = home ? match.away_team : match.home_team;
  const badge = home ? match.away_badge : match.home_badge;
  const played = match.status === "FT";
  const ours = (home ? match.home_score : match.away_score) ?? 0;
  const theirs = (home ? match.away_score : match.home_score) ?? 0;
  const outcome: Outcome | null = played ? (ours > theirs ? "W" : ours < theirs ? "L" : "D") : null;

  const date = new Date(`${match.date}T12:00:00`);
  const day = date.toLocaleDateString("en-GB", { day: "numeric" });
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const fullDate = date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <li>
      <Link
        href={`/fixtures/${match.id}`}
        // On hover the row turns light blue; swapping the text tokens keeps everything inside readable
        className="group flex items-center gap-3 rounded-xl px-2 py-2.5 -mx-2 hover:bg-[var(--md-primary)] hover:[--md-on-surface:var(--md-on-primary)] hover:[--md-on-surface-variant:var(--md-on-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] transition-colors"
        aria-label={
          played
            ? `${fullDate}: ${outcome && OUTCOME_STYLE[outcome].label} ${ours}–${theirs} ${home ? "at home to" : "away to"} ${opponent}`
            : `${fullDate}: ${home ? "home to" : "away to"} ${opponent}, ${match.time || "time TBC"}`
        }
      >
        <time dateTime={match.date} className="w-10 shrink-0 text-center leading-none">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--md-on-surface-variant)]">
            {month}
          </span>
          <span className="block mt-0.5 text-lg font-bold text-[var(--md-on-surface)]">{day}</span>
        </time>

        <span className="relative w-8 h-8 shrink-0">
          <Image src={assetUrl(badge)} alt="" fill className="object-contain" sizes="32px" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-[var(--md-on-surface)] truncate">{opponent}</span>
          <span className="block text-xs text-[var(--md-on-surface-variant)]">
            {home ? "Home" : "Away"} · {played ? "Full time" : match.time || "Time TBC"}
          </span>
        </span>

        {played && outcome ? (
          <span className="flex items-center gap-2 shrink-0">
            <span className="font-bold tabular-nums text-[var(--md-on-surface)]">
              {ours}–{theirs}
            </span>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${OUTCOME_STYLE[outcome].className}`}
              title={OUTCOME_STYLE[outcome].label}
              aria-hidden
            >
              {outcome}
            </span>
          </span>
        ) : (
          <ChevronRight className="w-4 h-4 shrink-0 text-[var(--md-on-surface-variant)] group-hover:translate-x-0.5 transition-transform" aria-hidden />
        )}
      </Link>
    </li>
  );
}

function MatchList({ title, matches, empty, clubName }: { title: string; matches: Match[]; empty: string; clubName: string }) {
  return (
    <div className="min-w-0">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--md-on-surface-variant)]">{title}</h3>
      {matches.length > 0 ? (
        <ul className="divide-y divide-[var(--md-outline-variant)]/60">
          {matches.map((m) => (
            <MatchRow key={m.id} match={m} clubName={clubName} />
          ))}
        </ul>
      ) : (
        <p className="py-3 text-sm text-[var(--md-on-surface-variant)]">{empty}</p>
      )}
    </div>
  );
}

/** The club's next few fixtures and most recent results */
export default function ClubMatches({ clubName }: { clubName: string }) {
  const matches = allMatches.filter((m) => m.home_team === clubName || m.away_team === clubName);
  if (matches.length === 0) return null;

  const upcoming = matches
    .filter((m) => m.status !== "FT")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, UPCOMING_COUNT);
  const results = matches
    .filter((m) => m.status === "FT")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, RESULTS_COUNT);

  return (
    <ClubSection
      title="Fixtures & results"
      defaultOpen
      action={
        <Link href="/fixtures" className={buttonStyles({ variant: "ghost", size: "sm" })}>
          All fixtures
          <ChevronRight className="w-4 h-4" aria-hidden />
        </Link>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <MatchList title="Next up" matches={upcoming} empty="No fixtures scheduled." clubName={clubName} />
        <MatchList title="Recent results" matches={results} empty="No results yet this season." clubName={clubName} />
      </div>
    </ClubSection>
  );
}
