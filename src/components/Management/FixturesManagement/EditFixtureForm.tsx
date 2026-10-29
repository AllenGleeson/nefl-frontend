"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import Modal from "../../Modal";
import { currentUser } from "@/data/adminUsers";
import { buttonStyles } from "@/components/ui/Button";
import {
  fixtureStatus,
  fixtureStatusLabel,
  leagueOptions,
  teamOptions,
  venueOptions,
  withCurrent,
  type AdminFixture,
} from "./types";

interface EditFixtureFormProps {
  onClose: () => void;
  onSave: (fixture: AdminFixture) => void;
  /** The fixture to edit; omit to add a new one */
  fixture?: AdminFixture;
}

const blank: AdminFixture = { id: "", homeTeam: "", awayTeam: "", date: "", venue: "", league: "", published: false, createdBy: currentUser.username };

const fieldCls =
  "w-full h-11 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] px-4 text-[var(--md-on-surface)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]";
const labelCls = "mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]";

function Select({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <span className="relative block">
        <select required value={value} onChange={(e) => onChange(e.target.value)} className={`${fieldCls} appearance-none pr-10`}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
      </span>
    </label>
  );
}

export default function EditFixtureForm({ onClose, onSave, fixture: existing }: EditFixtureFormProps) {
  const adding = !existing;
  const fixture = existing ?? blank;
  const [homeTeam, setHomeTeam] = useState(fixture.homeTeam);
  const [awayTeam, setAwayTeam] = useState(fixture.awayTeam);
  const [date, setDate] = useState(fixture.date);
  const [venue, setVenue] = useState(fixture.venue);
  const [league, setLeague] = useState(fixture.league);
  const [homeScore, setHomeScore] = useState(fixture.homeScore?.toString() ?? "");
  const [awayScore, setAwayScore] = useState(fixture.awayScore?.toString() ?? "");
  const [published, setPublished] = useState(fixture.published);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (homeTeam === awayTeam) {
      setError("A team can't play itself. Choose two different teams.");
      return;
    }
    const scored = homeScore !== "" && awayScore !== "";
    onSave({
      ...fixture,
      id: fixture.id || `new-${Date.now()}`,
      homeTeam,
      awayTeam,
      date,
      venue,
      league,
      homeScore: scored ? Number(homeScore) : undefined,
      awayScore: scored ? Number(awayScore) : undefined,
      published,
    });
  };

  return (
    <Modal isOpen onClose={onClose} title={adding ? "Add fixture" : "Edit fixture"} size="lg">
      <form onSubmit={submit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="Home team" value={homeTeam} onChange={(v) => { setHomeTeam(v); setError(""); }} options={withCurrent(teamOptions, fixture.homeTeam)} placeholder="Select home team" />
          <Select label="Away team" value={awayTeam} onChange={(v) => { setAwayTeam(v); setError(""); }} options={withCurrent(teamOptions, fixture.awayTeam)} placeholder="Select away team" />
        </div>
        {error && <p className="-mt-2 text-sm text-[var(--md-error)]">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className={labelCls}>Date</span>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={fieldCls} />
          </label>
          <Select label="League" value={league} onChange={setLeague} options={withCurrent(leagueOptions, fixture.league)} placeholder="Select league" />
        </div>

        <Select label="Venue" value={venue} onChange={setVenue} options={withCurrent(venueOptions, fixture.venue)} placeholder="Select venue" />

        <fieldset>
          <legend className={labelCls}>Score</legend>
          <div className="flex items-center gap-3">
            <label className="flex-1">
              <span className="sr-only">{homeTeam || "Home"} score</span>
              <input type="number" min={0} max={99} value={homeScore} onChange={(e) => setHomeScore(e.target.value)} placeholder="–" className={`${fieldCls} text-center text-lg font-bold`} />
            </label>
            <span className="text-lg font-bold text-[var(--md-on-surface-variant)]">–</span>
            <label className="flex-1">
              <span className="sr-only">{awayTeam || "Away"} score</span>
              <input type="number" min={0} max={99} value={awayScore} onChange={(e) => setAwayScore(e.target.value)} placeholder="–" className={`${fieldCls} text-center text-lg font-bold`} />
            </label>
          </div>
          <p className="mt-1.5 text-xs text-[var(--md-on-surface-variant)]">
            Leave blank until the match has been played. Status:{" "}
            <span className="font-semibold text-[var(--md-on-surface)]">
              {fixtureStatusLabel[fixtureStatus({ homeScore: homeScore === "" ? undefined : 1, awayScore: awayScore === "" ? undefined : 1 })]}
            </span>
          </p>
        </fieldset>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--md-outline-variant)] p-4 hover:bg-[var(--md-surface-container-low)]">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--md-primary)]" />
          <span>
            <span className="block text-sm font-semibold text-[var(--md-on-surface)]">Published</span>
            <span className="block text-xs text-[var(--md-on-surface-variant)]">Show this fixture on the public Fixtures &amp; Results page. Untick to keep it as a draft.</span>
          </span>
        </label>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className={buttonStyles({ variant: "outline" })}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles()}>
            {adding ? "Add fixture" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
