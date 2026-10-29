"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarRange, ChevronDown, X } from "lucide-react";
import { buttonStyles } from "./Button";

/** Dates are "YYYY-MM-DD"; an empty string means that end is open. */
export type DateRange = { from: string; to: string };
export type DatePreset = { label: string; range: () => DateRange };

export const ANY_DATE: DateRange = { from: "", to: "" };

export const isDateRangeSet = (r: DateRange) => r.from !== "" || r.to !== "";

/** True if a date (or date-time) string falls inside the range, ends inclusive */
export function inDateRange(date: string, r: DateRange) {
  const d = date.slice(0, 10);
  return (!r.from || d >= r.from) && (!r.to || d <= r.to);
}

/** Local date as YYYY-MM-DD (toISOString would shift to UTC) */
export function toDateString(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toDateString(d);
};
const today = () => toDateString(new Date());

export const pastPresets: DatePreset[] = [
  { label: "Today", range: () => ({ from: today(), to: today() }) },
  { label: "Last 7 days", range: () => ({ from: addDays(-6), to: today() }) },
  { label: "Last 30 days", range: () => ({ from: addDays(-29), to: today() }) },
  { label: "Last 3 months", range: () => ({ from: addDays(-90), to: today() }) },
];

export const futurePresets: DatePreset[] = [
  { label: "Today", range: () => ({ from: today(), to: today() }) },
  { label: "Next 7 days", range: () => ({ from: today(), to: addDays(6) }) },
  { label: "Next 30 days", range: () => ({ from: today(), to: addDays(29) }) },
];

function formatShort(date: string, withYear: boolean) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

export function describeDateRange(r: DateRange) {
  if (r.from && r.to) {
    if (r.from === r.to) return formatShort(r.from, true);
    return `${formatShort(r.from, r.from.slice(0, 4) !== r.to.slice(0, 4))} – ${formatShort(r.to, true)}`;
  }
  if (r.from) return `From ${formatShort(r.from, true)}`;
  if (r.to) return `Until ${formatShort(r.to, true)}`;
  return "Any date";
}

type Props = {
  value: DateRange;
  onChange: (range: DateRange) => void;
  presets?: DatePreset[];
  label?: string;
  /** Extra classes for the trigger button */
  className?: string;
  /** Which side the panel lines up with */
  align?: "left" | "right";
};

// Pill button that opens a panel with quick presets and From / To date fields.
export default function DateRangePicker({
  value,
  onChange,
  presets = pastPresets,
  label = "Date",
  className = "",
  align = "left",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const set = isDateRangeSet(value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activePreset = presets.find((p) => {
    const r = p.range();
    return r.from === value.from && r.to === value.to;
  });

  const inputCls =
    "w-full h-10 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] px-3 text-sm text-[var(--md-on-surface)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]";

  return (
    <div ref={rootRef} className="relative">
      <div
        className={`flex h-10 items-center rounded-full border transition-colors ${
          set
            ? "border-[var(--md-primary)] bg-[var(--md-primary-container)]/40 text-[var(--md-on-primary-container)]"
            : "border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] text-[var(--md-on-surface)] hover:border-[var(--md-outline)]"
        } ${className}`}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${label}: ${describeDateRange(value)}`}
          className="flex h-full flex-1 items-center gap-2 rounded-full pl-4 pr-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]"
        >
          <CalendarRange className="w-4 h-4 shrink-0" aria-hidden />
          <span className="whitespace-nowrap">{activePreset?.label ?? describeDateRange(value)}</span>
          {!set && <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />}
        </button>
        {set && (
          <button
            type="button"
            onClick={() => onChange(ANY_DATE)}
            aria-label="Clear dates"
            className="mr-1.5 rounded-full p-1 hover:bg-[var(--md-primary-container)]"
          >
            <X className="w-4 h-4" aria-hidden />
          </button>
        )}
      </div>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={`Choose ${label.toLowerCase()} range`}
          className={`absolute z-40 mt-2 w-[19rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] p-4 shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--md-on-surface-variant)]">Quick pick</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                aria-pressed={activePreset?.label === p.label}
                onClick={() => {
                  onChange(p.range());
                  setOpen(false);
                }}
                className={buttonStyles({ variant: activePreset?.label === p.label ? "primary" : "outline", size: "sm", className: "h-8 px-3" })}
              >
                {p.label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--md-on-surface-variant)]">Custom range</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--md-on-surface-variant)]">From</span>
              <input
                type="date"
                value={value.from}
                max={value.to || undefined}
                onChange={(e) => onChange({ ...value, from: e.target.value })}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-[var(--md-on-surface-variant)]">To</span>
              <input
                type="date"
                value={value.to}
                min={value.from || undefined}
                onChange={(e) => onChange({ ...value, to: e.target.value })}
                className={inputCls}
              />
            </label>
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <button
              type="button"
              onClick={() => onChange(ANY_DATE)}
              disabled={!set}
              className={buttonStyles({ variant: "ghost", size: "sm" })}
            >
              Clear
            </button>
            <button type="button" onClick={() => setOpen(false)} className={buttonStyles({ size: "sm" })}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
