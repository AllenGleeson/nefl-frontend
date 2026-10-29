"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, SearchX, X } from "lucide-react";
import { activityTypeLabels, adminActivity, roleLabels, type ActivityType } from "@/data/adminActivity";
import { buttonStyles } from "@/components/ui/Button";
import ActivityItem from "./ActivityItem";
import Pagination from "@/components/ui/Pagination";
import DateRangePicker, { ANY_DATE, inDateRange, isDateRangeSet, type DateRange } from "@/components/ui/DateRangePicker";

const PAGE_SIZE = 10;

type Filter = ActivityType | "all";
const filters: Filter[] = ["all", ...(Object.keys(activityTypeLabels) as ActivityType[])];

/** Everyone who appears in the log, A–Z */
const people = Array.from(new Map(adminActivity.map((a) => [a.user.username, a.user])).values()).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const selectCls =
  "h-10 w-full appearance-none rounded-full border pl-4 pr-9 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] hover:border-[var(--md-outline)]";
const selectState = (active: boolean) =>
  active
    ? "border-[var(--md-primary)] bg-[var(--md-primary-container)]/40 text-[var(--md-on-primary-container)]"
    : "border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] text-[var(--md-on-surface)]";

function dayHeading(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// Full activity log: filter by type, search, grouped by day (newest first).
export default function ActivityLog() {
  const [type, setType] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [person, setPerson] = useState("all");
  const [range, setRange] = useState<DateRange>(ANY_DATE);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Opened from the Users page as /management/activity#user=<username>
  useEffect(() => {
    const m = window.location.hash.match(/user=([\w.-]+)/);
    if (m && people.some((p) => p.username === m[1])) setPerson(m[1]);
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: adminActivity.length };
    for (const a of adminActivity) c[a.type] = (c[a.type] ?? 0) + 1;
    return c;
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return adminActivity
      .filter((a) => type === "all" || a.type === type)
      .filter((a) => person === "all" || a.user.username === person)
      .filter((a) => inDateRange(a.at, range))
      .filter((a) => !q || `${a.title} ${a.description} ${a.user.name} ${a.user.username} ${a.user.role}`.toLowerCase().includes(q))
      .sort((a, b) => b.at.localeCompare(a.at));
  }, [type, person, query, range]);

  // Page number, reset to 1 whenever the filters change
  const filterKey = JSON.stringify([type, person, query, range]);
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 });
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const page = pageState.key === filterKey ? Math.min(pageState.page, totalPages) : 1;
  const firstIndex = (page - 1) * PAGE_SIZE;
  const pageItems = matches.slice(firstIndex, firstIndex + PAGE_SIZE);

  const goToPage = (p: number) => {
    setPageState({ key: filterKey, page: p });
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Group the current page by day
  const days = useMemo(() => {
    const byDay = new Map<string, typeof pageItems>();
    for (const a of pageItems) {
      const day = a.at.slice(0, 10);
      byDay.set(day, [...(byDay.get(day) ?? []), a]);
    }
    return Array.from(byDay, ([date, items]) => ({ date, items }));
  }, [pageItems]);

  const hasFilters = type !== "all" || person !== "all" || query.trim() !== "" || isDateRangeSet(range);

  return (
    <div ref={listTopRef} className="scroll-mt-36">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <label className="relative w-full sm:w-48">
          <span className="sr-only">Activity type</span>
          <select value={type} onChange={(e) => setType(e.target.value as Filter)} className={`${selectCls} ${selectState(type !== "all")}`}>
            {filters.map((f) => (
              <option key={f} value={f}>
                {f === "all" ? "All activity" : activityTypeLabels[f]} ({counts[f] ?? 0})
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden />
        </label>

        <label className="relative w-full sm:w-60">
          <span className="sr-only">User</span>
          <select value={person} onChange={(e) => setPerson(e.target.value)} className={`${selectCls} ${selectState(person !== "all")}`}>
            <option value="all">All users</option>
            {people.map((p) => (
              <option key={p.username} value={p.username}>
                {p.name} ({roleLabels[p.role]})
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden />
        </label>

        <DateRangePicker value={range} onChange={setRange} label="Activity date" />

        <label className="relative flex-1 min-w-[200px]">
          <span className="sr-only">Search activity</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activity"
            className="w-full h-10 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] pl-9 pr-9 text-sm text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container)]"
            >
              <X className="w-4 h-4" aria-hidden />
            </button>
          )}
        </label>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setType("all");
              setPerson("all");
              setQuery("");
              setRange(ANY_DATE);
            }}
            className={buttonStyles({ variant: "outline", size: "sm", className: "h-10" })}
          >
            <X className="w-4 h-4" aria-hidden />
            Reset Filters
          </button>
        )}
      </div>

      {/* Result count (while filtering) */}
      {hasFilters && matches.length > 0 && (
        <p className="-mt-2 mb-4 text-sm text-[var(--md-on-surface-variant)]" aria-live="polite">
          <span className="font-semibold text-[var(--md-on-surface)]">{matches.length}</span> of {adminActivity.length} changes match your
          filters
        </p>
      )}

      {matches.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--md-outline-variant)]">
          <SearchX className="mx-auto w-12 h-12 text-[var(--md-on-surface-variant)]/60" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold text-[var(--md-on-surface)]">No activity found</h2>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setType("all");
                setPerson("all");
                setQuery("");
                setRange(ANY_DATE);
              }}
              className={buttonStyles({ variant: "outline", size: "sm", className: "mt-4" })}
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {days.map(({ date, items }) => (
            <section
              key={date}
              aria-label={dayHeading(date)}
              className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm overflow-hidden"
            >
              <h2 className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[var(--md-surface-container)] text-sm font-bold text-[var(--md-on-surface)]">
                <time dateTime={date}>{dayHeading(date)}</time>
                <span className="text-xs font-medium text-[var(--md-on-surface-variant)]">
                  {items.length} change{items.length === 1 ? "" : "s"}
                </span>
              </h2>
              <ul className="px-4 sm:px-6 divide-y divide-[var(--md-outline-variant)]">
                {items.map((a) => (
                  <ActivityItem key={a.id} item={a} />
                ))}
              </ul>
            </section>
          ))}

          <div className="flex flex-col items-center gap-3 pt-2">
            <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} label="Activity pages" />
            <p className="text-xs text-[var(--md-on-surface-variant)]">
              Showing {firstIndex + 1}–{firstIndex + pageItems.length} of {matches.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
