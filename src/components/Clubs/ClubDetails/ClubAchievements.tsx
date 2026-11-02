import Link from "next/link";
import { Award, ChevronDown, Trophy } from "lucide-react";
import ClubSection from "./ClubSection";
import type { ClubHonour } from "@/utils/rollOfHonour";

interface ClubAchievementsProps {
  honours: ClubHonour[];
}

/** How many honours each group shows before the rest fold away */
const SHOWN = 5;

const PLACE: Record<ClubHonour["position"], { label: string; colour: string }> = {
  winner: { label: "Winners", colour: "text-amber-600 bg-amber-100" },
  "runner-up": { label: "Runners-up", colour: "text-slate-500 bg-slate-100" },
};

const GROUPS: { title: string; categories: ClubHonour["category"][] }[] = [
  { title: "League titles", categories: ["league", "reserve"] },
  { title: "Cups & shields", categories: ["cup", "shield"] },
  { title: "Club awards", categories: ["awards"] },
];

function HonourRow({ h }: { h: ClubHonour }) {
  const isAward = h.category === "awards";
  const colour = isAward ? "text-[var(--md-on-primary-container)] bg-[var(--md-primary-container)]" : PLACE[h.position].colour;
  const Icon = isAward ? Award : Trophy;
  const details = [isAward ? null : PLACE[h.position].label, h.team, h.note].filter(Boolean).join(" · ");

  return (
    <li className="flex items-start gap-3 py-3">
      <span className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${colour}`} aria-hidden>
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-snug">{h.competition}</p>
        {details && <p className="text-sm text-[var(--md-on-surface-variant)]">{details}</p>}
      </div>
      <span className="shrink-0 text-sm font-bold tabular-nums text-[var(--md-on-surface)]">{h.season}</span>
    </li>
  );
}

/** The club's entries in the league roll of honour, grouped and newest first */
export default function ClubAchievements({ honours }: ClubAchievementsProps) {
  const trophies = honours.filter((h) => h.category !== "awards" && h.position === "winner").length;
  const groups = GROUPS.map((g) => ({ ...g, items: honours.filter((h) => g.categories.includes(h.category)) })).filter(
    (g) => g.items.length > 0
  );

  return (
    <ClubSection
      title="Roll of Honour"
      action={
        trophies > 0 && (
          <span className="text-sm text-[var(--md-on-surface-variant)]">
            <strong className="text-[var(--md-on-surface)]">{trophies}</strong> {trophies === 1 ? "trophy" : "trophies"}
          </span>
        )
      }
    >
      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-1">
        {groups.map((g) => (
          <div key={g.title} className="min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--md-on-surface-variant)]">{g.title}</h3>
            <ul className="divide-y divide-[var(--md-outline-variant)]/60">
              {g.items.slice(0, SHOWN).map((h) => (
                <HonourRow key={h.id} h={h} />
              ))}
            </ul>
            {g.items.length > SHOWN && (
              <details className="group">
                <summary className="flex items-center gap-1 py-2 text-sm font-semibold text-[var(--md-primary)] list-none [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Show {g.items.length - SHOWN} more</span>
                  <span className="hidden group-open:inline">Show fewer</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <ul className="divide-y divide-[var(--md-outline-variant)]/60 border-t border-[var(--md-outline-variant)]/60">
                  {g.items.slice(SHOWN).map((h) => (
                    <HonourRow key={h.id} h={h} />
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--md-on-surface-variant)]">
        From the league&rsquo;s records up to 2019.{" "}
        <Link href="/about#roll-of-honour" className="font-semibold text-[var(--md-primary)] hover:underline">
          Full roll of honour
        </Link>
      </p>
    </ClubSection>
  );
}
