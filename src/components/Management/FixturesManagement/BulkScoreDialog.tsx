"use client";

import { useState, type FormEvent } from "react";
import Modal from "../../Modal";
import { buttonStyles } from "@/components/ui/Button";
import type { AdminFixture } from "./types";

type Scores = Record<string, { home: string; away: string }>;

type Props = {
  fixtures: AdminFixture[];
  onClose: () => void;
  /** Called with only the matches that have both scores filled in */
  onSave: (scores: { id: string; homeScore: number; awayScore: number }[]) => void;
};

const scoreCls =
  "h-10 w-14 rounded-lg border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] text-center text-lg font-bold tabular-nums text-[var(--md-on-surface)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

// Enter scores for several matches at once: one row per match, home and away only.
export default function BulkScoreDialog({ fixtures, onClose, onSave }: Props) {
  // Pre-fill existing results so completed matches can be corrected
  const [scores, setScores] = useState<Scores>(() =>
    Object.fromEntries(fixtures.map((f) => [f.id, { home: f.homeScore?.toString() ?? "", away: f.awayScore?.toString() ?? "" }]))
  );
  const [error, setError] = useState("");
  const [allHome, setAllHome] = useState("");
  const [allAway, setAllAway] = useState("");
  const digits = (v: string) => v.replace(/\D/g, "").slice(0, 2);

  /** Fill every match with the same score */
  const applyToAll = (home: string, away: string) => {
    setError("");
    setScores(Object.fromEntries(fixtures.map((f) => [f.id, { home, away }])));
  };

  const set = (id: string, side: "home" | "away", value: string) => {
    setError("");
    setScores((s) => ({ ...s, [id]: { ...s[id], [side]: value.replace(/\D/g, "").slice(0, 2) } }));
  };

  const filled = fixtures.filter((f) => scores[f.id].home !== "" && scores[f.id].away !== "");
  const half = fixtures.filter((f) => (scores[f.id].home === "") !== (scores[f.id].away === ""));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (half.length) {
      setError(`Enter both scores for ${half.map((f) => `${f.homeTeam} v ${f.awayTeam}`).join(", ")}, or leave both blank.`);
      return;
    }
    if (!filled.length) {
      setError("Enter at least one score.");
      return;
    }
    onSave(filled.map((f) => ({ id: f.id, homeScore: Number(scores[f.id].home), awayScore: Number(scores[f.id].away) })));
  };

  return (
    <Modal isOpen onClose={onClose} title={`Enter or edit scores (${fixtures.length} match${fixtures.length === 1 ? "" : "es"})`} size="lg">
      <form onSubmit={submit} className="space-y-4">
        {/* Same score for every selected match */}
        {fixtures.length > 1 && (
          <div className="rounded-2xl bg-[var(--md-surface-container-low)] border border-[var(--md-outline-variant)] p-4">
            <p className="text-sm font-semibold text-[var(--md-on-surface)]">Same score for all {fixtures.length} matches</p>
            <p className="text-xs text-[var(--md-on-surface-variant)]">Useful for cancelled matches (0–0) or when several finished the same way.</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-[var(--md-on-surface-variant)]">
                Home
                <input inputMode="numeric" aria-label="Home score for all matches" value={allHome} onChange={(e) => setAllHome(digits(e.target.value))} className={scoreCls} />
              </label>
              <span className="font-bold text-[var(--md-on-surface-variant)]">–</span>
              <label className="flex items-center gap-2 text-sm text-[var(--md-on-surface-variant)]">
                <input inputMode="numeric" aria-label="Away score for all matches" value={allAway} onChange={(e) => setAllAway(digits(e.target.value))} className={scoreCls} />
                Away
              </label>
              <button
                type="button"
                disabled={allHome === "" || allAway === ""}
                onClick={() => applyToAll(allHome, allAway)}
                className={buttonStyles({ variant: "tonal", size: "sm", className: "ml-1" })}
              >
                Apply to all
              </button>
              <button
                type="button"
                onClick={() => {
                  setAllHome("0");
                  setAllAway("0");
                  applyToAll("0", "0");
                }}
                className={buttonStyles({ variant: "outline", size: "sm" })}
                title="Set every selected match to 0–0"
              >
                All 0 – 0
              </button>
            </div>
          </div>
        )}

        <p className="text-sm text-[var(--md-on-surface-variant)]">Existing results are filled in so you can correct them. Leave a match blank to skip it. Matches with a score are marked completed.</p>

        <ul className="divide-y divide-[var(--md-outline-variant)] rounded-2xl border border-[var(--md-outline-variant)]">
          {fixtures.map((f) => {
            const s = scores[f.id];
            const incomplete = half.includes(f);
            return (
              <li key={f.id} className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 sm:px-4 py-3 ${incomplete && error ? "bg-red-50" : ""}`}>
                <span className="text-right text-sm font-semibold text-[var(--md-on-surface)] leading-tight">{f.homeTeam}</span>
                <span className="flex items-center gap-2">
                  <input
                    inputMode="numeric"
                    aria-label={`${f.homeTeam} score`}
                    value={s.home}
                    onChange={(e) => set(f.id, "home", e.target.value)}
                    className={scoreCls}
                  />
                  <span className="font-bold text-[var(--md-on-surface-variant)]">–</span>
                  <input
                    inputMode="numeric"
                    aria-label={`${f.awayTeam} score`}
                    value={s.away}
                    onChange={(e) => set(f.id, "away", e.target.value)}
                    className={scoreCls}
                  />
                </span>
                <span className="text-sm font-semibold text-[var(--md-on-surface)] leading-tight">
                  {f.awayTeam}
                  {f.homeScore !== undefined && (
                    <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-800">Result</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {error && (
          <p role="alert" className="text-sm text-[var(--md-error)]">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-1">
          <span className="text-sm text-[var(--md-on-surface-variant)] sm:mr-auto">
            {filled.length} of {fixtures.length} ready
          </span>
          <button type="button" onClick={onClose} className={buttonStyles({ variant: "outline" })}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles()}>
            Save scores
          </button>
        </div>
      </form>
    </Modal>
  );
}
