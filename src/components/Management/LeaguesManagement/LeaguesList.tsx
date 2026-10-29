"use client";

// src/components/Management/LeaguesManagement/LeaguesList.tsx
import { useState } from "react";
import Link from "next/link";
import { CircleCheck, CirclePause, Flag, Plus, Table2, Trash2 } from "lucide-react";
import { leagueTablesDataLong } from "@/data/leagueTablesDataLong";
import { shortLeagueName } from "@/utils/leagueNames";
import { buttonStyles } from "@/components/ui/Button";
import { canDelete, currentUser } from "@/data/adminUsers";
import { ConfirmDialog, Notice, RowCheckbox, SelectionBar, selectableRow, selectOnRowClick, useNotice, useSelection, type PendingConfirm } from "../Selection";

type Status = "active" | "inactive" | "completed";

type League = {
  id: string;
  name: string;
  section: "Men" | "Women";
  season: string;
  teams: number;
  status: Status;
};

const statusLabel: Record<Status, string> = { active: "Active", inactive: "Inactive", completed: "Completed" };
const statusBadge: Record<Status, string> = {
  active: "bg-emerald-100 text-emerald-800",
  inactive: "bg-amber-100 text-amber-800",
  completed: "bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)]",
};

// Real leagues from the league tables, in division order
const initialLeagues: League[] = (["Men", "Women"] as const).flatMap((section) =>
  Object.entries(leagueTablesDataLong[section]).map(([name, table]) => ({
    id: name,
    name,
    section,
    season: "2025/26",
    teams: table.length,
    status: "active" as Status,
  }))
);

type Props = {
  onAddLeague?: () => void;
};

export default function LeaguesList({ onAddLeague }: Props) {
  const [leagues, setLeagues] = useState<League[]>(initialLeagues);
  const [pending, setPending] = useState<PendingConfirm | null>(null);
  const [notice, setNotice] = useNotice();
  const selection = useSelection(leagues.map((l) => l.id));
  const mayDelete = canDelete(currentUser.role);
  const chosen = leagues.filter((l) => selection.isSelected(l.id));
  const notIn = (s: Status) => chosen.filter((l) => l.status !== s);

  const setStatusFor = (items: League[], next: Status) => {
    const ids = new Set(items.map((l) => l.id));
    setLeagues((list) => list.map((l) => (ids.has(l.id) ? { ...l, status: next } : l)));
    const what = items.length === 1 ? shortLeagueName(items[0].name) : `${items.length} leagues`;
    setNotice(`${what} marked ${statusLabel[next].toLowerCase()}.`);
  };

  const askDelete = (items: League[]) =>
    setPending({
      title: items.length === 1 ? "Delete league?" : `Delete ${items.length} leagues?`,
      message: "Their tables and fixtures will no longer appear on the site. This can't be undone.",
      names: items.map((l) => shortLeagueName(l.name)),
      confirmLabel: "Delete",
      danger: true,
      onConfirm: () => {
        const ids = items.map((l) => l.id);
        setLeagues((list) => list.filter((l) => !ids.includes(l.id)));
        selection.remove(ids);
        setNotice(items.length === 1 ? "League deleted." : `${items.length} leagues deleted.`);
      },
    });

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[var(--md-on-surface)]">Leagues</h2>
        {onAddLeague && (
          <button type="button" onClick={onAddLeague} className={buttonStyles({ size: "sm" })}>
            <Plus className="w-4 h-4" aria-hidden />
            New league
          </button>
        )}
      </div>

      <Notice text={notice} />

      <SelectionBar
        total={leagues.length}
        noun="leagues"
        selection={selection}
        items={[
          { label: "Mark active", icon: <CircleCheck className="w-4 h-4" aria-hidden />, count: notIn("active").length, onSelect: () => setStatusFor(notIn("active"), "active") },
          { label: "Mark inactive", icon: <CirclePause className="w-4 h-4" aria-hidden />, count: notIn("inactive").length, onSelect: () => setStatusFor(notIn("inactive"), "inactive") },
          { label: "Mark completed", icon: <Flag className="w-4 h-4" aria-hidden />, count: notIn("completed").length, onSelect: () => setStatusFor(notIn("completed"), "completed") },
          ...(mayDelete ? [{ label: "Delete", icon: <Trash2 className="w-4 h-4" aria-hidden />, count: chosen.length, danger: true, divider: true, onSelect: () => askDelete(chosen) }] : []),
        ]}
      />

      <ul className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm divide-y divide-[var(--md-outline-variant)]">
        {leagues.map((l) => {
          const isSel = selection.isSelected(l.id);
          const sponsor = l.name.replace(shortLeagueName(l.name), "").trim();
          return (
            <li
              key={l.id}
              onClick={selectOnRowClick(() => selection.toggle(l.id))}
              className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3 first:rounded-t-2xl last:rounded-b-2xl ${selectableRow(isSel)}`}
            >
              <RowCheckbox checked={isSel} onChange={() => selection.toggle(l.id)} label={l.name} />
              <div className="min-w-0 flex-1 basis-56">
                <p className="font-semibold text-[var(--md-on-surface)]">
                  {shortLeagueName(l.name)}
                  <span className="ml-2 text-xs font-medium text-[var(--md-on-surface-variant)]">{l.section === "Men" ? "Men's" : "Women's"}</span>
                </p>
                {sponsor && <p className="text-xs text-[var(--md-on-surface-variant)]">{sponsor}</p>}
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--md-on-surface-variant)]">
                <span>{l.teams} teams</span>
                <span>· {l.season}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge[l.status]}`}>{statusLabel[l.status]}</span>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Link href="/leagues" className={buttonStyles({ variant: "ghost", size: "icon-sm" })} aria-label={`View ${shortLeagueName(l.name)} table`} title="View table">
                  <Table2 className="w-4 h-4" aria-hidden />
                </Link>
                {mayDelete && (
                  <button type="button" onClick={() => askDelete([l])} className={buttonStyles({ variant: "danger-ghost", size: "icon-sm" })} aria-label={`Delete ${shortLeagueName(l.name)}`} title="Delete">
                    <Trash2 className="w-4 h-4" aria-hidden />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <ConfirmDialog pending={pending} onClose={() => setPending(null)} />
    </section>
  );
}
