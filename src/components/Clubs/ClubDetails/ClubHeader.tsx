import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { FaFacebook, FaGlobe, FaInstagram, FaXTwitter } from "react-icons/fa6";
import type { Club } from "@/data/club";
import { getClubRankings, getPositionText, localLeagueTablesData } from "@/data/localLeagueTables";
import { byDivision, leagueLabel } from "@/utils/leagueNames";
import { getLeagueLogo } from "@/utils/leagueLogos";
import { buttonStyles } from "@/components/ui/Button";
import { assetUrl } from "@/utils/assetUrl";

/** Medal colours for the top three; everyone else gets a plain badge */
const MEDALS: Record<number, { className: string; label: string }> = {
  1: { className: "bg-gradient-to-b from-amber-200 to-amber-400 text-amber-950", label: "Gold, 1st place" },
  2: { className: "bg-gradient-to-b from-slate-100 to-slate-300 text-slate-900", label: "Silver, 2nd place" },
  3: { className: "bg-gradient-to-b from-amber-600 to-amber-800 text-amber-50", label: "Bronze, 3rd place" },
};

/** One league the club plays in: where it sits and on how many points */
function StandingTile({ league, position, points }: { league: string; position: number; points: number }) {
  const teams = localLeagueTablesData[league]?.length ?? 0;
  const medal = MEDALS[position];

  return (
    <li className="flex items-center gap-3 py-2.5 min-w-0">
      <span className="w-9 h-9 shrink-0 rounded-full bg-[var(--md-primary-fixed)] flex items-center justify-center">
        <Image src={assetUrl(getLeagueLogo(league))} alt="" width={22} height={22} className="w-5 h-5 object-contain" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-white truncate" title={league}>
          {leagueLabel(league)}
        </span>
        <span className="block text-xs text-white/60">
          of {teams} · {points} pts
        </span>
      </span>
      <span
        title={medal?.label}
        className={`shrink-0 min-w-11 rounded-full px-2.5 py-1 text-center text-sm font-bold tabular-nums ${
          medal ? `${medal.className} shadow-sm` : "bg-white/10 text-white"
        }`}
      >
        {getPositionText(position)}
      </span>
    </li>
  );
}

export default function ClubHeader({ club }: { club: Club }) {
  const { name, logo, founded, ground, bio, website, facebook, instagram, twitter } = club;
  const standings = getClubRankings(name).sort((a, b) => byDivision(a.league, b.league));

  const socials = [
    { href: website, label: "Website", icon: <FaGlobe className="w-4 h-4" /> },
    { href: facebook, label: "Facebook", icon: <FaFacebook className="w-4 h-4" /> },
    { href: instagram, label: "Instagram", icon: <FaInstagram className="w-4 h-4" /> },
    { href: twitter, label: "X (Twitter)", icon: <FaXTwitter className="w-4 h-4" /> },
  ].filter((s) => s.href);

  return (
    <header className="text-white pb-2">
      <div className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
        {/* Identity: crest, name, details, bio, links */}
        <div className="min-w-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white p-2.5 sm:p-3 shadow-md ring-4 ring-white/10">
              <Image src={assetUrl(logo)} alt={`${name} crest`} width={112} height={112} className="w-full h-full object-contain" priority />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold leading-tight text-balance">{name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 shrink-0" aria-hidden />
                  Founded {founded}
                </span>
                {ground && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 shrink-0" aria-hidden />
                    {ground}
                  </span>
                )}
              </p>
            </div>
          </div>

          {bio && <p className="mt-5 max-w-2xl text-white/85 leading-relaxed">{bio}</p>}

          {socials.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on ${s.label}`}
                  title={s.label}
                  className={buttonStyles({ variant: "glass", size: "icon-sm" })}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Where the club sits in every league it plays in */}
        {standings.length > 0 && (
          <div className="min-w-0 lg:border-l lg:border-white/10 lg:pl-10">
            <h2 className="mb-1 text-xs font-bold uppercase tracking-wider text-white/60">
              {standings.length === 1 ? "League position" : "League positions"}
            </h2>
            <ul className="divide-y divide-white/10">
              {standings.map((s) => (
                <StandingTile key={s.league} league={s.league} position={s.team.position} points={s.team.points} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
