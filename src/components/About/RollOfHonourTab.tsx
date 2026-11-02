// src/components/About/RollOfHonourTab.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import FilterSelect from "@/components/ui/FilterSelect";
import ClubCrest from "@/components/Clubs/ClubCrest";
import { rollOfHonour, type HonourCategory } from "@/data/rollOfHonour";
import { findClubForHonourName } from "@/utils/rollOfHonour";

/** A team name, linked to its club page (with crest) when it's a current club */
function TeamName({ name }: { name?: string }) {
  if (!name) return <span className="text-[var(--md-on-surface-variant)]">–</span>;
  const club = findClubForHonourName(name);
  if (!club) return <span>{name}</span>;
  return (
    <Link href={`/clubs/${club.slug}`} className="inline-flex items-center gap-2 min-w-0 text-[var(--md-primary)] hover:underline">
      <ClubCrest name={club.name} size="sm" />
      <span className="truncate">{name}</span>
    </Link>
  );
}

export default function RollOfHonourTab() {
  const [categoryId, setCategoryId] = useState<HonourCategory["id"]>("league");
  const category = rollOfHonour.find((c) => c.id === categoryId) ?? rollOfHonour[0];
  const [competitionId, setCompetitionId] = useState(category.competitions[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const competition = category.competitions.find((c) => c.id === competitionId) ?? category.competitions[0];
  const hasRunnersUp = competition?.entries.some((e) => e.runnerUp) ?? false;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!competition) return [];
    if (!q) return competition.entries;
    return competition.entries.filter((e) => `${e.winner ?? ""} ${e.runnerUp ?? ""}`.toLowerCase().includes(q));
  }, [competition, query]);

  const pickCategory = (id: HonourCategory["id"]) => {
    setCategoryId(id);
    setCompetitionId(rollOfHonour.find((c) => c.id === id)?.competitions[0]?.id ?? "");
  };

  return (
    <div className="roll-of-honour-tab">
      {/* Category picker */}
      <div role="group" aria-label="Roll of honour category" className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {rollOfHonour.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => pickCategory(c.id)}
            aria-pressed={categoryId === c.id}
            className={buttonStyles({ variant: categoryId === c.id ? "primary" : "outline", size: "sm", className: "shrink-0" })}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Competition and club filter */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Competition"
          value={competition?.id ?? ""}
          onChange={setCompetitionId}
          className="sm:w-72"
          options={category.competitions.map((c) => ({
            value: c.id,
            label: c.name,
            meta: `${c.entries.length} season${c.entries.length === 1 ? "" : "s"}`,
          }))}
        />
        <label className="relative flex-1 min-w-[180px] sm:flex-none">
          <span className="sr-only">Find a club</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a club"
            className="w-full sm:w-60 h-10 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] pl-9 pr-9 text-sm text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear club search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container)]"
            >
              <X className="w-4 h-4" aria-hidden />
            </button>
          )}
        </label>
      </div>

      <div className="bg-[var(--md-surface-container-lowest)] rounded-2xl border border-[var(--md-outline-variant)] shadow-sm overflow-hidden">
        <h3 className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[var(--md-surface-container)] text-sm sm:text-base font-bold text-[var(--md-on-surface)]">
          {competition?.name}
          <span className="text-xs font-medium text-[var(--md-on-surface-variant)]">
            {query ? `${rows.length} of ${competition?.entries.length}` : `${competition?.entries.length}`} seasons
          </span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--md-primary)] text-[var(--md-on-primary)]">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider w-24">Season</th>
                <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  {categoryId === "awards" ? "Winner" : "Winners"}
                </th>
                {hasRunnersUp && (
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Runners-up</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--md-outline-variant)]">
              {rows.map((e, i) => (
                <tr key={`${e.season}-${i}`} className="odd:bg-[var(--md-surface-container-lowest)] even:bg-[var(--md-surface-container-low)]">
                  <td className="px-3 sm:px-6 py-3 font-semibold tabular-nums text-[var(--md-primary)] whitespace-nowrap align-top">{e.season}</td>
                  {e.winner || e.runnerUp ? (
                    <>
                      <td className="px-3 sm:px-6 py-3 font-medium text-[var(--md-on-surface)] align-top">
                        <TeamName name={e.winner} />
                        {e.note && <span className="block mt-0.5 text-xs font-normal text-[var(--md-on-surface-variant)]">{e.note}</span>}
                      </td>
                      {hasRunnersUp && (
                        <td className="px-3 sm:px-6 py-3 text-[var(--md-on-surface-variant)] align-top">
                          <TeamName name={e.runnerUp} />
                        </td>
                      )}
                    </>
                  ) : (
                    <td colSpan={hasRunnersUp ? 2 : 1} className="px-3 sm:px-6 py-3 italic text-[var(--md-on-surface-variant)]">
                      {e.note ?? "No record"}
                    </td>
                  )}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={hasRunnersUp ? 3 : 2} className="px-4 py-10 text-center text-[var(--md-on-surface-variant)]">
                    No winners or runners-up match &ldquo;{query.trim()}&rdquo; in this competition.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-[var(--md-on-surface-variant)]">
        Team names are as the league recorded them at the time. Records run from the league&rsquo;s first season in 1980/81 up to 2019.
      </p>
    </div>
  );
}
