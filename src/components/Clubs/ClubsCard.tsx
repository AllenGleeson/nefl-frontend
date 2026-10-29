import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Club } from "@/data/club";
import { assetUrl } from "@/utils/assetUrl";
import { byDivision, shortLeagueName } from "@/utils/leagueNames";

interface ClubsCardProps {
  club: Club;
  /** League position, shown when the list is filtered to one league */
  leagueRank?: number | null;
}

// Faint mown-pitch stripes behind the card content
const pitchStripes = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 28px, transparent 28px 56px), radial-gradient(120% 80% at 50% 0%, rgba(139,208,239,0.25), transparent 60%)",
};

export default function ClubsCard({ club, leagueRank = null }: ClubsCardProps) {
  const leagues = [...club.leagues].sort(byDivision);
  const logo = assetUrl(club.logo);

  return (
    <Link
      href={`/clubs/${club.slug}`}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[var(--md-primary-hover)] to-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[var(--md-primary)]/30 hover:ring-2 hover:ring-[var(--md-primary-container)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--md-primary-container)]"
    >
      <span aria-hidden className="absolute inset-0 -z-10" style={pitchStripes} />

      {/* Oversized crest watermark */}
      <span
        aria-hidden
        className="absolute -right-10 -bottom-10 -z-10 h-40 w-40 opacity-[0.08] grayscale transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
      >
        <Image src={logo} alt="" fill className="object-contain" sizes="160px" />
      </span>

      {leagueRank != null && (
        <span
          className="absolute top-3 left-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-[var(--md-primary-container)] px-2 text-sm font-extrabold text-[var(--md-on-primary-container)] shadow-lg"
          title={`League position ${leagueRank}`}
        >
          {leagueRank}
          <span className="sr-only"> in the league</span>
        </span>
      )}

      <div className="flex flex-1 flex-col items-center px-4 pt-6 pb-4 text-center">
        {/* Crest on a glowing disc */}
        <span className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.08),0_10px_30px_-5px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105">
          <span className="relative h-16 w-16 sm:h-20 sm:w-20">
            <Image src={logo} alt="" fill className="object-contain" sizes="80px" />
          </span>
        </span>

        <h3 className="mt-4 text-base sm:text-lg font-extrabold leading-tight tracking-tight">{club.name}</h3>

        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {leagues.map((l) => (
            <span
              key={l}
              className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--md-primary-container)]"
            >
              {shortLeagueName(l)}
            </span>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-black/15 px-4 py-2.5 text-xs text-white/70">
        <span className="flex min-w-0 items-center gap-1">
          {club.ground && (
            <>
              <MapPin className="w-3 h-3 shrink-0" aria-hidden />
              <span className="truncate">{club.ground}</span>
            </>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-1 font-semibold text-white/80">
          {club.founded ? `Est. ${club.founded}` : null}
          <ArrowRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
