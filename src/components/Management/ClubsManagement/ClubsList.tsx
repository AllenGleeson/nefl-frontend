"use client";

// src/components/Management/ClubsManagement/ClubsList.tsx
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { clubs as siteClubs } from '@/data/club';
import { canDelete } from '@/data/adminUsers';
import { assetUrl } from '@/utils/assetUrl';
import { CircleCheck, CirclePause, Pencil, Plus, Trash2 } from 'lucide-react';
import ClubForm, { type ClubFormValues } from './ClubForm';
import { ConfirmDialog, Notice, RowCheckbox, SelectionBar, selectableRow, selectOnRowClick, useNotice, useSelection, type PendingConfirm } from '../Selection';
import ClubsManagementControls from './ClubsManagementControls';
import { buttonStyles } from "@/components/ui/Button";

interface Club {
  id: string;
  name: string;
  logo: string;
  leagues: string[];
  founded: number;
  stadium: string;
  website?: string;
  email?: string;
  /** Formation template id, e.g. "4-4-2" */
  formation?: string;
  status: 'active' | 'inactive';
}

interface User {
  id: string;
  role: 'admin' | 'editor';
}

// Real clubs from the site data (id is the club slug)
const initialClubs: Club[] = siteClubs.map((c) => ({
  id: c.slug,
  name: c.name,
  logo: c.logo,
  leagues: c.leagues,
  founded: c.founded,
  stadium: c.grounds?.name ?? c.ground,
  website: c.website,
  email: c.contacts?.find((x) => x.email)?.email,
  formation: c.formation?.name,
  status: 'active',
}));

type Props = {
  currentUser?: User
}

export default function ClubsList({ currentUser }: Props) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [clubs, setClubs] = useState<Club[]>(initialClubs);

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)]';
  };

  // Admins and editors can do everything on this page
  const canEdit = () => currentUser?.role === 'admin' || currentUser?.role === 'editor';
  const canManage = canEdit;
  const mayDelete = currentUser ? canDelete(currentUser.role) : false;

  // Filter clubs based on search query and status
  const filteredClubs = useMemo(() => {
    return clubs.filter(club => {
      // Search filter - only search club names
      const matchesSearch = !searchQuery.trim() || 
        club.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || club.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [clubs, searchQuery, statusFilter]);

  // Determine if controls should be shown (more than 3 clubs)
  const showControls = clubs.length > 3;
  const effectiveViewMode = clubs.length <= 3 ? 'grid' : viewMode;

  // Selection and bulk actions
  const selection = useSelection(filteredClubs.map((c) => c.id));
  const chosen = clubs.filter((c) => selection.isSelected(c.id));
  const [pending, setPending] = useState<PendingConfirm | null>(null);
  const [notice, setNotice] = useNotice();
  const [editing, setEditing] = useState<Club | null | undefined>(undefined); // undefined = closed, null = new

  const saveClub = (values: ClubFormValues) => {
    if (editing) {
      setClubs((list) => list.map((c) => (c.id === editing.id ? { ...c, ...values } : c)));
      setNotice(`Saved changes to ${values.name}.`);
    } else {
      const id = values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      // League membership is managed on the Leagues page
      setClubs((list) => [...list, { id, logo: '/images/nefl-logo.webp', status: 'active', leagues: [], ...values }]);
      setNotice(`${values.name} added.`);
    }
    setEditing(undefined);
  };
  const withStatusNot = (st: Club['status']) => chosen.filter((c) => c.status !== st);

  const setStatusFor = (items: Club[], next: Club['status']) => {
    const ids = new Set(items.map((c) => c.id));
    setClubs((list) => list.map((c) => (ids.has(c.id) ? { ...c, status: next } : c)));
    setNotice(`${items.length === 1 ? items[0].name : `${items.length} clubs`} marked ${next}.`);
  };

  const askDelete = (items: Club[]) =>
    setPending({
      title: items.length === 1 ? 'Delete club?' : `Delete ${items.length} clubs?`,
      message: 'They will be removed from the clubs page and league listings. This cannot be undone.',
      names: items.map((c) => c.name),
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: () => {
        const ids = items.map((c) => c.id);
        setClubs((list) => list.filter((c) => !ids.includes(c.id)));
        selection.remove(ids);
        setNotice(items.length === 1 ? `${items[0].name} deleted.` : `${items.length} clubs deleted.`);
      },
    });

  return (
    <div>
      {/* Search and View Controls */}
      <ClubsManagementControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        showControls={showControls}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[var(--md-on-surface)]">Registered clubs</h2>
        {canEdit() && (
          <button type="button" onClick={() => setEditing(null)} className={buttonStyles({ size: 'sm' })}>
            <Plus className="w-4 h-4" aria-hidden />
            Add club
          </button>
        )}
      </div>

      <Notice text={notice} />

      {canManage() && filteredClubs.length > 0 && (
        <SelectionBar
          total={filteredClubs.length}
          noun="clubs"
          selection={selection}
          items={[
            { label: 'Mark active', icon: <CircleCheck className="w-4 h-4" aria-hidden />, count: withStatusNot('active').length, onSelect: () => setStatusFor(withStatusNot('active'), 'active') },
            { label: 'Mark inactive', icon: <CirclePause className="w-4 h-4" aria-hidden />, count: withStatusNot('inactive').length, onSelect: () => setStatusFor(withStatusNot('inactive'), 'inactive') },
            ...(mayDelete
              ? [{ label: 'Delete', icon: <Trash2 className="w-4 h-4" aria-hidden />, count: chosen.length, danger: true, divider: true, onSelect: () => askDelete(chosen) }]
              : []),
          ]}
        />
      )}

      {filteredClubs.length === 0 ? (
        <p className="py-12 text-center rounded-2xl border border-dashed border-[var(--md-outline-variant)] text-[var(--md-on-surface-variant)]">No clubs found.</p>
      ) : effectiveViewMode === 'grid' ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClubs.map((club) => {
            const isSel = selection.isSelected(club.id);
            return (
              <li
                key={club.id}
                onClick={canManage() ? selectOnRowClick(() => selection.toggle(club.id)) : undefined}
                className={`relative flex flex-col rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] p-4 shadow-sm ${canManage() ? selectableRow(isSel) : ''}`}
              >
                {canManage() && <RowCheckbox checked={isSel} onChange={() => selection.toggle(club.id)} label={club.name} className="absolute top-4 left-4" />}
                <div className="text-center">
                  <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[var(--md-outline-variant)]">
                    <Image src={assetUrl(club.logo)} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
                  </span>
                  <h3 className="font-semibold text-[var(--md-on-surface)]">{club.name}</h3>
                  <p className="mt-1 text-xs text-[var(--md-on-surface-variant)]">
                    {club.leagues.length} league{club.leagues.length === 1 ? '' : 's'} · Est. {club.founded}
                  </p>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(club.status)}`}>
                    {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                  </span>
                </div>
                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex gap-1"><dt className="text-[var(--md-on-surface-variant)]">Ground:</dt><dd className="font-medium truncate">{club.stadium}</dd></div>
                  <div className="flex gap-1"><dt className="text-[var(--md-on-surface-variant)]">Formation:</dt><dd className="font-medium">{club.formation || 'Not set'}</dd></div>
                </dl>
                {canManage() && (
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => setEditing(club)} className={buttonStyles({ variant: 'outline', size: 'sm', className: 'flex-1' })}>
                      <Pencil className="w-4 h-4" aria-hidden />
                      Edit
                    </button>
                    {mayDelete && (
                      <button type="button" onClick={() => askDelete([club])} className={buttonStyles({ variant: 'danger-ghost', size: 'icon-sm' })} aria-label={`Delete ${club.name}`} title="Delete">
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm divide-y divide-[var(--md-outline-variant)]">
          {filteredClubs.map((club) => {
            const isSel = selection.isSelected(club.id);
            return (
              <li
                key={club.id}
                onClick={canManage() ? selectOnRowClick(() => selection.toggle(club.id)) : undefined}
                className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3 first:rounded-t-2xl last:rounded-b-2xl ${canManage() ? selectableRow(isSel) : ''}`}
              >
                {canManage() && <RowCheckbox checked={isSel} onChange={() => selection.toggle(club.id)} label={club.name} />}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[var(--md-outline-variant)]">
                  <Image src={assetUrl(club.logo)} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                </span>
                <div className="min-w-0 flex-1 basis-48">
                  <p className="font-semibold text-[var(--md-on-surface)] truncate">{club.name}</p>
                  <p className="text-xs text-[var(--md-on-surface-variant)] truncate">
                    {club.leagues.length} league{club.leagues.length === 1 ? '' : 's'} · Est. {club.founded}
                  </p>
                </div>
                <div className="hidden md:block w-56 text-sm">
                  <p className="truncate text-[var(--md-on-surface)]">{club.stadium}</p>
                  <p className="truncate text-xs text-[var(--md-on-surface-variant)]">Formation: {club.formation || 'Not set'}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(club.status)}`}>
                  {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                </span>
                {canManage() && (
                  <div className="ml-auto flex items-center gap-1">
                    <button type="button" onClick={() => setEditing(club)} className={buttonStyles({ variant: 'outline', size: 'sm' })}>
                      <Pencil className="w-4 h-4" aria-hidden />
                      Edit
                      <span className="sr-only"> {club.name}</span>
                    </button>
                    {mayDelete && (
                      <button type="button" onClick={() => askDelete([club])} className={buttonStyles({ variant: 'danger-ghost', size: 'icon-sm' })} aria-label={`Delete ${club.name}`} title="Delete">
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog pending={pending} onClose={() => setPending(null)} />

      {editing !== undefined && (
        <ClubForm
          key={editing?.id ?? 'new'}
          initial={editing ?? undefined}
          onClose={() => setEditing(undefined)}
          onSave={saveClub}
        />
      )}
    </div>
  );
}
