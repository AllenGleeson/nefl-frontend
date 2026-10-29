"use client";

// src/components/Management/FixturesManagement/FixturesList.tsx
import { useState, useMemo } from 'react';
import ScoreEntry from './ScoreEntry';
import EditFixtureForm from './EditFixtureForm';
import BulkScoreDialog from './BulkScoreDialog';
import { adminUsers, canDelete, currentUser, roleBadge, roleLabels } from '@/data/adminUsers';

/** Display name for a username (falls back to the username) */
/** "Added by" with the same role badge used on the Users and Activity pages */
function AddedBy({ username }: { username: string }) {
  const u = adminUsers.find((x) => x.username === username);
  return (
    <span className="inline-flex items-center gap-1.5">
      · Added by <span className="font-semibold text-[var(--md-on-surface)]">{u?.name ?? username}</span>
      {u && <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${roleBadge[u.role]}`}>{roleLabels[u.role]}</span>}
    </span>
  );
}
import { fixtureStatus, fixtureStatusLabel, type AdminFixture } from './types';
import { buttonStyles } from "@/components/ui/Button";
import { CalendarX2, ClipboardPen, Eye, EyeOff, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { ConfirmDialog, Notice, RevertButton, RowCheckbox, SelectionBar, selectableRow, selectOnRowClick, useNotice, useSelection, useUndoable, type PendingConfirm } from "../Selection";

type Fixture = AdminFixture;

interface FixturesListProps {
  filters?: {
    status: string;
    league: string;
    team: string;
    dateRange: string;
  };
  onScoreEntry?: (fixture: Fixture) => void;
}

export default function FixturesList({ filters, onScoreEntry }: FixturesListProps) {
  const history = useUndoable<Fixture[]>([
    // Division 1 Fixtures
    {
      id: '1',
      homeTeam: 'Walshestown FC',
      awayTeam: 'Athboy Celtic',
      date: '2024-01-15',
      venue: 'Walshestown Park',
      league: 'Division 1',
      published: false,
      createdBy: 'lisa.anderson',
    },
    {
      id: '2',
      homeTeam: 'Dublin United',
      awayTeam: 'Cork City',
      date: '2024-01-14',
      venue: 'Dublin Sports Ground',
      league: 'Division 1',
      published: true,
      createdBy: 'sarah.johnson',
      homeScore: 2,
      awayScore: 1,
    },
    {
      id: '3',
      homeTeam: 'Athboy Celtic',
      awayTeam: 'Walshestown FC',
      date: '2024-01-12',
      venue: 'Athboy Sports Complex',
      league: 'Division 1',
      published: true,
      createdBy: 'mike.wilson',
      homeScore: 0,
      awayScore: 3,
    },
    {
      id: '4',
      homeTeam: 'Cork City',
      awayTeam: 'Dublin United',
      date: '2024-01-20',
      venue: 'Turner\'s Cross',
      league: 'Division 1',
      published: true,
      createdBy: 'john.smith',
    },
    
    // Division 2 Fixtures
    {
      id: '5',
      homeTeam: 'Galway United',
      awayTeam: 'Limerick FC',
      date: '2024-01-13',
      venue: 'Eamonn Deacy Park',
      league: 'Division 2',
      published: true,
      createdBy: 'lisa.anderson',
      homeScore: 1,
      awayScore: 0,
    },
    {
      id: '6',
      homeTeam: 'Limerick FC',
      awayTeam: 'Galway United',
      date: '2024-01-10',
      venue: 'Markets Field',
      league: 'Division 2',
      published: true,
      createdBy: 'sarah.johnson',
      homeScore: 2,
      awayScore: 2,
    },
    {
      id: '7',
      homeTeam: 'Waterford FC',
      awayTeam: 'Sligo Rovers',
      date: '2024-01-18',
      venue: 'Waterford Regional Sports Centre',
      league: 'Division 2',
      published: true,
      createdBy: 'mike.wilson',
    },
    
    // Premier League Fixtures
    {
      id: '8',
      homeTeam: 'Shamrock Rovers',
      awayTeam: 'Bohemians',
      date: '2024-01-16',
      venue: 'Tallaght Stadium',
      league: 'Premier League',
      published: true,
      createdBy: 'john.smith',
    },
    {
      id: '9',
      homeTeam: 'St. Patrick\'s Athletic',
      awayTeam: 'Shamrock Rovers',
      date: '2024-01-11',
      venue: 'Richmond Park',
      league: 'Premier League',
      published: true,
      createdBy: 'lisa.anderson',
      homeScore: 1,
      awayScore: 2,
    },
    {
      id: '10',
      homeTeam: 'Bohemians',
      awayTeam: 'St. Patrick\'s Athletic',
      date: '2024-01-09',
      venue: 'Dalymount Park',
      league: 'Premier League',
      published: true,
      createdBy: 'sarah.johnson',
    },
    
    // More Division 1
    {
      id: '11',
      homeTeam: 'Walshestown FC',
      awayTeam: 'Cork City',
      date: '2024-01-22',
      venue: 'Walshestown Park',
      league: 'Division 1',
      published: true,
      createdBy: 'mike.wilson',
    },
    {
      id: '12',
      homeTeam: 'Dublin United',
      awayTeam: 'Athboy Celtic',
      date: '2024-01-21',
      venue: 'Dublin Sports Ground',
      league: 'Division 1',
      published: true,
      createdBy: 'john.smith',
      homeScore: 1,
      awayScore: 1,
    }
  ]);
  const fixtures = history.value;

  const [showScoreEntry, setShowScoreEntry] = useState<string | null>(null);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [showEditFixture, setShowEditFixture] = useState(false);
  const [editingFixture, setEditingFixture] = useState<Fixture | null>(null);
  const [addingFixture, setAddingFixture] = useState(false);

  // Filter fixtures based on applied filters
  const filteredFixtures = useMemo(() => {
    if (!filters) return fixtures;

    return fixtures.filter(fixture => {
      // Status filter
      if (filters.status !== 'all' && fixtureStatus(fixture) !== filters.status) {
        return false;
      }

      // League filter
      if (filters.league !== 'all' && fixture.league !== filters.league) {
        return false;
      }

      // Team filter
      if (filters.team !== 'all' && 
          fixture.homeTeam !== filters.team && 
          fixture.awayTeam !== filters.team) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const fixtureDate = new Date(fixture.date);
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        switch (filters.dateRange) {
          case 'today':
            const todayEnd = new Date(todayStart);
            todayEnd.setDate(todayEnd.getDate() + 1);
            if (fixtureDate < todayStart || fixtureDate >= todayEnd) return false;
            break;
          case 'week':
            const weekStart = new Date(todayStart);
            weekStart.setDate(weekStart.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);
            if (fixtureDate < weekStart || fixtureDate >= weekEnd) return false;
            break;
          case 'month':
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            if (fixtureDate < monthStart || fixtureDate >= monthEnd) return false;
            break;
        }
      }

      return true;
    });
  }, [fixtures, filters]);

  // Selection and bulk actions
  const selection = useSelection(filteredFixtures.map((f) => f.id));
  const mayDelete = canDelete(currentUser.role);
  const chosen = fixtures.filter((f) => selection.isSelected(f.id));
  const [pending, setPending] = useState<PendingConfirm | null>(null);
  const [notice, setNotice] = useNotice();

  const revert = () => {
    const undone = history.undo();
    if (undone) setNotice(`Reverted: ${undone.replace(/\.$/, "")}.`);
  };
  const matchName = (f: Fixture) => `${f.homeTeam} v ${f.awayTeam}`;
  const canPublish = chosen.filter((f) => !f.published);
  const canScore = chosen; // scheduled and completed matches
  const [scoring, setScoring] = useState<Fixture[] | null>(null);

  const saveScores = (scores: { id: string; homeScore: number; awayScore: number }[]) => {
    const byId = new Map(scores.map((x) => [x.id, x]));
    const label = scores.length === 1 ? "Score saved." : `${scores.length} scores saved.`;
    history.change((list) => list.map((f) => (byId.has(f.id) ? { ...f, homeScore: byId.get(f.id)!.homeScore, awayScore: byId.get(f.id)!.awayScore } : f)), label);
    setNotice(label);
    setScoring(null);
  };
  const canUnpublish = chosen.filter((f) => f.published);

  const setPublished = (items: Fixture[], published: boolean) => {
    const ids = new Set(items.map((f) => f.id));
    const what = items.length === 1 ? matchName(items[0]) : `${items.length} fixtures`;
    const label = published ? `${what} published.` : `${what} moved to drafts.`;
    history.change((list) => list.map((f) => (ids.has(f.id) ? { ...f, published } : f)), label);
    setNotice(label);
  };

  const askDelete = (items: Fixture[]) =>
    setPending({
      title: items.length === 1 ? "Delete fixture?" : `Delete ${items.length} fixtures?`,
      message: "They'll be removed from the fixtures and results pages. This can't be undone.",
      names: items.map(matchName),
      confirmLabel: "Delete",
      danger: true,
      onConfirm: () => {
        const ids = items.map((f) => f.id);
        const label = items.length === 1 ? "Fixture deleted." : `${items.length} fixtures deleted.`;
        history.change((list) => list.filter((f) => !ids.includes(f.id)), label);
        selection.remove(ids);
        setNotice(label);
      },
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-[var(--md-primary-container)]/60 text-[var(--md-on-primary-container)]';
      case 'completed': return 'bg-[var(--md-surface-container)] text-[var(--md-on-surface)]';
      default: return 'bg-[var(--md-surface-container)] text-[var(--md-on-surface)]';
    }
  };

  const handleScoreUpdate = (fixtureId: string, homeScore: number, awayScore: number) => {
    const label = "Score saved.";
    history.change((prev) => prev.map((fixture) => (fixture.id === fixtureId ? { ...fixture, homeScore, awayScore } : fixture)), label);
    setNotice(label);
    setShowScoreEntry(null);
    setSelectedFixture(null);
  };

  const handleScoreEntry = (fixture: Fixture) => {
    if (onScoreEntry) {
      onScoreEntry(fixture);
    } else {
      setSelectedFixture(fixture);
      setShowScoreEntry(fixture.id);
    }
  };

  const handleEditFixture = (fixture: Fixture) => {
    setEditingFixture(fixture);
    setShowEditFixture(true);
  };

  const handleCancelScoreEntry = () => {
    setShowScoreEntry(null);
    setSelectedFixture(null);
  };

  const handleCloseEditFixture = () => {
    setShowEditFixture(false);
    setEditingFixture(null);
  };

  const handleFixtureUpdated = (updated: Fixture) => {
    const label = `Saved changes to ${matchName(updated)}.`;
    history.change((list) => list.map((f) => (f.id === updated.id ? updated : f)), label);
    setNotice(label);
    setShowEditFixture(false);
    setEditingFixture(null);
  };

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[var(--md-on-surface)]">Fixtures</h2>
          <p className="text-sm text-[var(--md-on-surface-variant)]">
            Showing {filteredFixtures.length} of {fixtures.length} fixtures
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <RevertButton canUndo={history.canUndo} lastLabel={history.lastLabel} onRevert={revert} />
          <button type="button" onClick={() => setAddingFixture(true)} className={buttonStyles({ size: "sm" })}>
            <Plus className="w-4 h-4" aria-hidden />
            Add fixture
          </button>
        </div>
      </div>

      <Notice text={notice} onUndo={history.canUndo && !notice.startsWith("Reverted") ? revert : undefined} />

      {filteredFixtures.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--md-outline-variant)]">
          <CalendarX2 className="mx-auto w-12 h-12 text-[var(--md-on-surface-variant)]/60" aria-hidden />
          <p className="mt-4 text-lg font-semibold text-[var(--md-on-surface)]">No fixtures found</p>
          <p className="text-sm text-[var(--md-on-surface-variant)]">Try adjusting your filters to see more results</p>
        </div>
      ) : (
        <>
          <SelectionBar
            total={filteredFixtures.length}
            noun="fixtures"
            selection={selection}
            items={[
              { label: "Enter or edit scores", icon: <ClipboardPen className="w-4 h-4" aria-hidden />, count: canScore.length, onSelect: () => setScoring(canScore) },
              { label: "Publish", divider: true, icon: <Eye className="w-4 h-4" aria-hidden />, count: canPublish.length, onSelect: () => setPublished(canPublish, true) },
              { label: "Unpublish", icon: <EyeOff className="w-4 h-4" aria-hidden />, count: canUnpublish.length, onSelect: () => setPublished(canUnpublish, false) },
              ...(mayDelete ? [{ label: "Delete", icon: <Trash2 className="w-4 h-4" aria-hidden />, count: chosen.length, danger: true, divider: true, onSelect: () => askDelete(chosen) }] : []),
            ]}
          />

          <ul className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm divide-y divide-[var(--md-outline-variant)]">
            {filteredFixtures.map((fixture) => {
              const isSel = selection.isSelected(fixture.id);
              const played = fixture.homeScore !== undefined && fixture.awayScore !== undefined;
              return (
                <li
                  key={fixture.id}
                  onClick={selectOnRowClick(() => selection.toggle(fixture.id))}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3 first:rounded-t-2xl last:rounded-b-2xl ${selectableRow(isSel)}`}
                >
                  <RowCheckbox checked={isSel} onChange={() => selection.toggle(fixture.id)} label={matchName(fixture)} />

                  <div className="w-24 shrink-0 text-xs text-[var(--md-on-surface-variant)]">
                    <p className="font-semibold text-[var(--md-on-surface)]">
                      {new Date(`${fixture.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                  </div>

                  <div className="min-w-0 flex-1 basis-60">
                    <p className="flex flex-wrap items-center gap-x-2 font-semibold text-[var(--md-on-surface)]">
                      <span className="truncate">{fixture.homeTeam}</span>
                      {played ? (
                        <span className="rounded-md bg-[var(--md-primary)] px-2 py-0.5 text-sm font-bold tabular-nums text-[var(--md-on-primary)]">
                          {fixture.homeScore}–{fixture.awayScore}
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-[var(--md-on-surface-variant)]">v</span>
                      )}
                      <span className="truncate">{fixture.awayTeam}</span>
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-[var(--md-on-surface-variant)]">
                      <span className="font-semibold text-[var(--md-primary)]">{fixture.league}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" aria-hidden />
                        {fixture.venue}
                      </span>
                      <AddedBy username={fixture.createdBy} />
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(fixtureStatus(fixture))}`}>
                      {fixtureStatusLabel[fixtureStatus(fixture)]}
                    </span>
                    {!fixture.published && (
                      <span className="rounded-full border border-dashed border-[var(--md-outline)] px-2.5 py-0.5 text-xs font-semibold text-[var(--md-on-surface-variant)]" title="Not shown on the public site">
                        Draft
                      </span>
                    )}
                  </span>

                  <div className="ml-auto flex items-center gap-1">
                    {fixtureStatus(fixture) === "scheduled" && (
                      <button type="button" onClick={() => handleScoreEntry(fixture)} className={buttonStyles({ variant: "tonal", size: "sm" })}>
                        Enter score
                      </button>
                    )}
                    <button type="button" onClick={() => handleEditFixture(fixture)} className={buttonStyles({ variant: "ghost", size: "icon-sm" })} aria-label={`Edit ${matchName(fixture)}`} title="Edit">
                      <Pencil className="w-4 h-4" aria-hidden />
                    </button>
                    {mayDelete && (
                      <button type="button" onClick={() => askDelete([fixture])} className={buttonStyles({ variant: "danger-ghost", size: "icon-sm" })} aria-label={`Delete ${matchName(fixture)}`} title="Delete">
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <ConfirmDialog pending={pending} onClose={() => setPending(null)} />

      {/* Score Entry Modal */}
      {showScoreEntry && selectedFixture && (
        <ScoreEntry
          isOpen={true}
          onClose={handleCancelScoreEntry}
          onSuccess={handleCancelScoreEntry}
          fixtureId={selectedFixture.id}
          homeTeam={selectedFixture.homeTeam}
          awayTeam={selectedFixture.awayTeam}
          currentHomeScore={selectedFixture.homeScore}
          currentAwayScore={selectedFixture.awayScore}
          onScoreUpdate={handleScoreUpdate}
        />
      )}

      {/* Edit Fixture Modal */}
      {showEditFixture && editingFixture && (
        <EditFixtureForm key={editingFixture.id} onClose={handleCloseEditFixture} onSave={handleFixtureUpdated} fixture={editingFixture} />
      )}

      {scoring && <BulkScoreDialog fixtures={scoring} onClose={() => setScoring(null)} onSave={saveScores} />}

      {addingFixture && (
        <EditFixtureForm
          onClose={() => setAddingFixture(false)}
          onSave={(created) => {
            const label = `${created.homeTeam} v ${created.awayTeam} added${created.published ? "" : " as a draft"}.`;
            history.change((list) => [created, ...list], label);
            setNotice(label);
            setAddingFixture(false);
          }}
        />
      )}
    </section>
  );
}
