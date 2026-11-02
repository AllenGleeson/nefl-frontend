// src/components/Leagues/LeagueSummary.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TeamRow } from "@/types/league";
import ClubCrest from "@/components/Clubs/ClubCrest";
import { assetUrl } from "@/utils/assetUrl";
import { getClubSlug } from "@/utils/clubSlug";
import { getLeagueLogo } from "@/utils/leagueLogos";
import { leagueLabel, shortLeagueName } from "@/utils/leagueNames";

type Props = {
  league: string;
  women: boolean;
  table: TeamRow[];
};

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-[var(--md-surface-container)] px-4 py-3 min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--md-on-surface-variant)]">{label}</dt>
      <dd className="mt-1 text-lg font-bold text-[var(--md-on-surface)] truncate">{children}</dd>
    </div>
  );
}

/** Sponsor, league name and a few headline numbers from the table */
export default function LeagueSummary({ league, women, table }: Props) {
  const sponsor = league.replace(shortLeagueName(league), "").trim();
  const rows = [...table].sort((a, b) => a.position - b.position);
  const [leader, second] = rows;
  const matchesPlayed = Math.round(rows.reduce((n, t) => n + t.played, 0) / 2);
  const gap = leader && second ? leader.points - second.points : null;
  const leaderSlug = leader ? getClubSlug(leader.name) : null;

  return (
    <div className="mt-4 rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-4">
        <span className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full bg-[var(--md-primary-fixed)] flex items-center justify-center">
          <Image src={assetUrl(getLeagueLogo(league))} alt="" width={40} height={40} className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
        </span>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--md-on-surface)] leading-tight">{leagueLabel(league)}</h2>
          <p className="mt-0.5 text-sm text-[var(--md-on-surface-variant)]">
            {sponsor ? `Sponsored by ${sponsor}` : league}
            {women ? " · Women's football" : ""}
          </p>
        </div>
      </div>

      {rows.length > 0 && (
        <dl className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Fact label="Teams">{rows.length}</Fact>
          <Fact label="Matches played">{matchesPlayed}</Fact>
          <Fact label="Top of the table">
            <span className="flex items-center gap-2 min-w-0">
              <ClubCrest name={leader.name} size="sm" />
              {leaderSlug ? (
                <Link href={`/clubs/${leaderSlug}`} className="truncate text-[var(--md-primary)] hover:underline">
                  {leader.name}
                </Link>
              ) : (
                <span className="truncate">{leader.name}</span>
              )}
            </span>
          </Fact>
          <Fact label="Lead">
            {gap === null ? "–" : gap === 0 ? "Level on points" : `${gap} point${gap === 1 ? "" : "s"}`}
          </Fact>
        </dl>
      )}
    </div>
  );
}
