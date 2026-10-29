"use client";

// src/components/Management/UsersManagement/index.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, History, Lock, MoreHorizontal, Pencil, Search, SearchX, Send, ShieldCheck, Trash2, UserPlus, X } from "lucide-react";
import Modal from "@/components/Modal";
import Pagination from "@/components/ui/Pagination";
import { buttonStyles } from "@/components/ui/Button";
import { AdminPageHeader, AdminSection, StatCard } from "../AdminUI";
import UserForm, { type UserFormValues } from "./UserForm";
import BulkActionsMenu, { type BulkAction } from "./BulkActionsMenu";
import { selectableRow, selectOnRowClick } from "../Selection";
import {
  adminUsers,
  allPermissions,
  currentUserId,
  roleBadge,
  roleDetails,
  roleLabels,
  statusBadge,
  statusLabels,
  type AdminUser,
  type UserRole,
  type UserStatus,
  canManageUsers,
} from "@/data/adminUsers";

const PAGE_SIZE = 8;

const selectCls =
  "h-10 w-full appearance-none rounded-full border pl-4 pr-9 text-sm font-medium hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]";
const selectState = (active: boolean) =>
  active
    ? "border-[var(--md-primary)] bg-[var(--md-primary-container)]/40 text-[var(--md-on-primary-container)]"
    : "border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] text-[var(--md-on-surface)]";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function lastActiveText(u: AdminUser) {
  if (!u.lastActive) return u.status === "invited" ? `Invited ${formatDate(u.addedAt)}` : "Never signed in";
  return `Active ${formatDate(u.lastActive)}`;
}
const formatDate = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

type Action = "edit" | "resend" | "suspend" | "reactivate" | "remove";

/** "More" menu for a user row */
function RowMenu({ user, items, onAction }: { user: AdminUser; items: { action: Action; label: string; danger?: boolean; disabled?: string }[]; onAction: (a: Action) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`More actions for ${user.name}`}
        className={buttonStyles({ variant: "ghost", size: "icon-sm" })}
      >
        <MoreHorizontal className="w-5 h-5" aria-hidden />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 z-30 mt-1 w-56 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] py-1 shadow-xl">
          <Link
            role="menuitem"
            href={`/management/activity#user=${user.username}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-low)]"
          >
            <History className="w-4 h-4" aria-hidden />
            View their activity
          </Link>
          {items.map((it) => (
            <button
              key={it.action}
              role="menuitem"
              type="button"
              disabled={Boolean(it.disabled)}
              title={it.disabled}
              onClick={() => {
                setOpen(false);
                onAction(it.action);
              }}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[var(--md-surface-container-low)] disabled:cursor-not-allowed disabled:opacity-40 ${
                it.danger ? "text-[var(--md-error)]" : "text-[var(--md-on-surface)]"
              }`}
            >
              {it.action === "resend" && <Send className="w-4 h-4" aria-hidden />}
              {it.action === "suspend" && <Lock className="w-4 h-4" aria-hidden />}
              {it.action === "reactivate" && <ShieldCheck className="w-4 h-4" aria-hidden />}
              {it.action === "remove" && <Trash2 className="w-4 h-4" aria-hidden />}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UsersManagement() {
  const [users, setUsers] = useState<AdminUser[]>(adminUsers);
  const me = users.find((u) => u.id === currentUserId)!;
  const canManage = canManageUsers(me.role);

  // Filters
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<UserRole | "all">("all");
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const hasFilters = query.trim() !== "" || role !== "all" || status !== "all";

  // Dialogs and feedback
  const [formUser, setFormUser] = useState<AdminUser | null | undefined>(undefined); // undefined = closed, null = invite
  const [confirm, setConfirm] = useState<{ action: BulkAction; apply: AdminUser[]; skipped: { user: AdminUser; reason: string }[] } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const activeAdmins = users.filter((u) => u.role === "admin" && u.status === "active").length;
  const isLastAdmin = (u: AdminUser) => u.role === "admin" && u.status === "active" && activeAdmins <= 1;

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const order: Record<UserStatus, number> = { invited: 0, active: 1, suspended: 2 };
    return users
      .filter((u) => role === "all" || u.role === role)
      .filter((u) => status === "all" || u.status === status)
      .filter((u) => !q || `${u.name} ${u.username} ${u.email} ${u.club ?? ""}`.toLowerCase().includes(q))
      .sort((a, b) => order[a.status] - order[b.status] || a.name.localeCompare(b.name));
  }, [users, query, role, status]);

  // Pagination (back to page 1 when filters change)
  const filterKey = JSON.stringify([query, role, status]);
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 });
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const page = pageState.key === filterKey ? Math.min(pageState.page, totalPages) : 1;
  const firstIndex = (page - 1) * PAGE_SIZE;
  const pageUsers = matches.slice(firstIndex, firstIndex + PAGE_SIZE);

  const update = (id: string, patch: Partial<AdminUser>) => setUsers((list) => list.map((u) => (u.id === id ? { ...u, ...patch } : u)));

  const saveForm = (values: UserFormValues) => {
    if (formUser) {
      update(formUser.id, values);
      setNotice(`Saved changes to ${values.name}.`);
    } else {
      const username = values.email.split("@")[0];
      setUsers((list) => [
        ...list,
        { id: `u${Date.now()}`, ...values, username, status: "invited", lastActive: "", addedAt: new Date().toISOString().slice(0, 10) },
      ]);
      setNotice(`Invite sent to ${values.email}.`);
    }
    setFormUser(undefined);
  };

  /** Who an action would apply to, and who is skipped (and why) */
  const plan = (action: BulkAction, people: AdminUser[]) => {
    const skipped: { user: AdminUser; reason: string }[] = [];
    let apply = people.filter((u) => {
      if (action.kind === "role") return u.role !== action.role;
      if (action.kind === "resend") return u.status === "invited";
      if (action.kind === "reactivate") return u.status === "suspended";
      if (action.kind === "suspend") return u.status === "active";
      return true;
    });
    const touchesAccess = action.kind === "suspend" || action.kind === "remove" || (action.kind === "role" && action.role !== "admin");
    if (touchesAccess) {
      // Never your own account
      apply = apply.filter((u) => (u.id === me.id ? (skipped.push({ user: u, reason: "your own account" }), false) : true));
      // Always keep at least one active admin
      const admins = apply.filter((u) => u.role === "admin" && u.status === "active");
      if (admins.length && activeAdmins - admins.length < 1) {
        const keep = admins[0];
        skipped.push({ user: keep, reason: "the league needs at least one active admin" });
        apply = apply.filter((u) => u.id !== keep.id);
      }
    }
    return { apply, skipped };
  };

  const applyAction = (action: BulkAction, apply: AdminUser[]) => {
    const ids = new Set(apply.map((u) => u.id));
    const who = apply.length === 1 ? apply[0].name : `${apply.length} people`;
    if (action.kind === "role") {
      setUsers((list) => list.map((u) => (ids.has(u.id) ? { ...u, role: action.role } : u)));
      setNotice(`${who} ${apply.length === 1 ? "is" : "are"} now ${roleLabels[action.role]}${apply.length === 1 ? "" : "s"}.`);
    } else if (action.kind === "resend") {
      setNotice(`Invite${apply.length === 1 ? "" : "s"} re-sent to ${who}.`);
    } else if (action.kind === "reactivate") {
      setUsers((list) => list.map((u) => (ids.has(u.id) ? { ...u, status: "active" } : u)));
      setNotice(`${who} can sign in again.`);
    } else if (action.kind === "suspend") {
      setUsers((list) => list.map((u) => (ids.has(u.id) ? { ...u, status: "suspended" } : u)));
      setNotice(`${who} ${apply.length === 1 ? "has" : "have"} been suspended.`);
    } else {
      setUsers((list) => list.filter((u) => !ids.has(u.id)));
      setNotice(`${who} ${apply.length === 1 ? "has" : "have"} been removed.`);
    }
    setSelected((sel) => new Set([...sel].filter((id) => !(action.kind === "remove" && ids.has(id)))));
  };

  /** Run an action on some people: quick ones happen straight away, the rest ask first */
  const requestAction = (action: BulkAction, people: AdminUser[]) => {
    const { apply, skipped } = plan(action, people);
    if (!apply.length) return;
    if ((action.kind === "resend" || action.kind === "reactivate") && !skipped.length) applyAction(action, apply);
    else setConfirm({ action, apply, skipped });
  };

  // Selection (covers everyone matching the filters, across pages)
  const selectedUsers = users.filter((u) => selected.has(u.id));
  const matchIds = matches.map((u) => u.id);
  const allSelected = matchIds.length > 0 && matchIds.every((id) => selected.has(id));
  const someSelected = !allSelected && matchIds.some((id) => selected.has(id));
  const selectAllRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
  }, [someSelected]);
  const toggleAll = () =>
    setSelected((sel) => {
      const next = new Set(sel);
      matchIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  const toggleOne = (id: string) =>
    setSelected((sel) => {
      const next = new Set(sel);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const runAction = (u: AdminUser, action: Action) => {
    if (action === "edit") setFormUser(u);
    if (action === "resend") setNotice(`Invite re-sent to ${u.email}.`);
    if (action === "reactivate") {
      update(u.id, { status: "active" });
      setNotice(`${u.name} can sign in again.`);
    }
    if (action === "suspend") requestAction({ kind: "suspend" }, [u]);
    if (action === "remove") requestAction({ kind: "remove" }, [u]);
  };

  const menuItems = (u: AdminUser) => {
    const self = u.id === me.id;
    const protectedReason = self ? "You can't do this to your own account" : isLastAdmin(u) ? "The league needs at least one active admin" : undefined;
    return [
      ...(u.status === "invited" ? [{ action: "resend" as const, label: "Resend invite" }] : []),
      u.status === "suspended"
        ? { action: "reactivate" as const, label: "Reactivate" }
        : u.status === "active"
          ? { action: "suspend" as const, label: "Suspend access", disabled: protectedReason }
          : null,
      { action: "remove" as const, label: u.status === "invited" ? "Cancel invite" : "Remove user", danger: true, disabled: protectedReason },
    ].filter(Boolean) as { action: Action; label: string; danger?: boolean; disabled?: string }[];
  };

  const counts = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    invited: users.filter((u) => u.status === "invited").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  };

  // Only admins can see this page
  if (!canManage) {
    return (
      <div className="users-management pb-8">
        <AdminPageHeader title="Users" description="Who can sign in to the admin, and what they're allowed to do." />
        <AdminSection>
          <div className="mx-auto max-w-md rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] p-8 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--md-surface-container)] text-[var(--md-on-surface-variant)]">
              <Lock className="w-6 h-6" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-bold text-[var(--md-on-surface)]">Admins only</h2>
            <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">
              Only admins can view or manage users. Ask an admin if you need someone added or their access changed.
            </p>
            <Link href="/management" className={buttonStyles({ variant: "outline", size: "sm", className: "mt-5" })}>
              Back to dashboard
            </Link>
          </div>
        </AdminSection>
      </div>
    );
  }

  return (
    <div className="users-management pb-8">
      <AdminPageHeader
        title="Users"
        description="Who can sign in to the admin, and what they're allowed to do."
        actions={
          canManage && (
            <button type="button" onClick={() => setFormUser(null)} className={buttonStyles({ variant: "inverse" })}>
              <UserPlus className="w-4 h-4" aria-hidden />
              Invite someone
            </button>
          )
        }
      />

      {/* Feedback after an action */}
      <div aria-live="polite" className="px-4 sm:px-6 lg:px-8">
        {notice && (
          <p className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <Check className="w-4 h-4 shrink-0" aria-hidden />
            {notice}
          </p>
        )}
      </div>


      <AdminSection>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="People with access" value={counts.total} />
          <StatCard title="Admins" value={counts.admins} />
          <StatCard title="Invites pending" value={counts.invited} />
          <StatCard title="Suspended" value={counts.suspended} />
        </div>
      </AdminSection>

      <AdminSection title="People">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <label className="relative flex-1 min-w-[220px]">
            <span className="sr-only">Search users</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email or club"
              className="w-full h-10 rounded-full border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] pl-9 pr-4 text-sm text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)] hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]"
            />
          </label>
          <label className="relative w-full sm:w-44">
            <span className="sr-only">Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value as UserRole | "all")} className={`${selectCls} ${selectState(role !== "all")}`}>
              <option value="all">All roles</option>
              {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                <option key={r} value={r}>
                  {roleLabels[r]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden />
          </label>
          <label className="relative w-full sm:w-48">
            <span className="sr-only">Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as UserStatus | "all")} className={`${selectCls} ${selectState(status !== "all")}`}>
              <option value="all">Any status</option>
              {(Object.keys(statusLabels) as UserStatus[]).map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden />
          </label>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setRole("all");
                setStatus("all");
              }}
              className={buttonStyles({ variant: "outline", size: "sm", className: "h-10" })}
            >
              <X className="w-4 h-4" aria-hidden />
              Reset Filters
            </button>
          )}
        </div>

        {hasFilters && matches.length > 0 && (
          <p className="mb-4 text-sm text-[var(--md-on-surface-variant)]" aria-live="polite">
            <span className="font-semibold text-[var(--md-on-surface)]">{matches.length}</span> of {users.length} people match your filters
          </p>
        )}

        {matches.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--md-outline-variant)]">
            <SearchX className="mx-auto w-12 h-12 text-[var(--md-on-surface-variant)]/60" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-[var(--md-on-surface)]">No one found</h3>
            <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">Try a different name, role or status.</p>
          </div>
        ) : (
          <>
            {canManage && (
              <div className="mb-3 flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)] px-4 sm:px-5 py-2.5">
                <label className="flex items-center gap-3 text-sm font-medium text-[var(--md-on-surface)]">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 accent-[var(--md-primary)] cursor-pointer"
                  />
                  {allSelected ? `All ${matches.length} selected` : selected.size ? `${selectedUsers.length} selected` : `Select all ${matches.length}`}
                </label>
                <BulkActionsMenu
                  selectedCount={selectedUsers.length}
                  countFor={(a) => plan(a, selectedUsers).apply.length}
                  onAction={(a) => requestAction(a, selectedUsers)}
                />
                {selected.size > 0 && (
                  <button type="button" onClick={() => setSelected(new Set())} className="text-sm font-semibold text-[var(--md-primary)] hover:underline underline-offset-4">
                    Clear selection
                  </button>
                )}
              </div>
            )}

            <ul className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm divide-y divide-[var(--md-outline-variant)]">
              {pageUsers.map((u) => {
                const self = u.id === me.id;
                return (
                  <li
                    key={u.id}
                    onClick={canManage ? selectOnRowClick(() => toggleOne(u.id)) : undefined}
                    className={`flex flex-wrap items-center gap-x-4 gap-y-3 px-4 sm:px-5 py-4 first:rounded-t-2xl last:rounded-b-2xl ${
                      canManage ? selectableRow(selected.has(u.id)) : ""
                    } ${u.status === "suspended" ? "opacity-70" : ""}`}
                  >
                    {canManage && (
                      <input
                        type="checkbox"
                        checked={selected.has(u.id)}
                        onChange={() => toggleOne(u.id)}
                        aria-label={`Select ${u.name}`}
                        className="h-4 w-4 shrink-0 accent-[var(--md-primary)] cursor-pointer"
                      />
                    )}
                    {/* Who */}
                    <div className="flex min-w-0 flex-1 basis-64 items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--md-primary-hover)] to-[var(--md-primary)] text-sm font-bold text-[var(--md-on-primary)]"
                      >
                        {initials(u.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-x-2 font-semibold text-[var(--md-on-surface)]">
                          {u.name}
                          {self && <span className="rounded-full bg-[var(--md-surface-container-high)] px-2 py-0.5 text-[11px] font-semibold text-[var(--md-on-surface-variant)]">You</span>}
                        </p>
                        <p className="truncate text-sm text-[var(--md-on-surface-variant)]">
                          {u.email}
                          {u.club && <span className="text-[var(--md-primary)]"> · {u.club}</span>}
                        </p>
                      </div>
                    </div>

                    {/* Role, status, last active */}
                    <div className="flex flex-wrap items-center gap-2 sm:w-64">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleBadge[u.role]}`}>{roleLabels[u.role]}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge[u.status]}`}>{statusLabels[u.status]}</span>
                      <span className="w-full text-xs text-[var(--md-on-surface-variant)]">{lastActiveText(u)}</span>
                    </div>

                    {/* Actions */}
                    {canManage && (
                      <div className="ml-auto flex items-center gap-1">
                        <button type="button" onClick={() => runAction(u, "edit")} className={buttonStyles({ variant: "outline", size: "sm" })}>
                          <Pencil className="w-4 h-4" aria-hidden />
                          Edit
                          <span className="sr-only"> {u.name}</span>
                        </button>
                        <RowMenu user={u} items={menuItems(u)} onAction={(a) => runAction(u, a)} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex flex-col items-center gap-2">
              <Pagination page={page} totalPages={totalPages} onPageChange={(p) => setPageState({ key: filterKey, page: p })} label="User pages" />
              {totalPages > 1 && (
                <p className="text-xs text-[var(--md-on-surface-variant)]">
                  Showing {firstIndex + 1}–{firstIndex + pageUsers.length} of {matches.length}
                </p>
              )}
            </div>
          </>
        )}
      </AdminSection>

      {/* What each role can do */}
      <AdminSection title="What each role can do">
        <div className="overflow-x-auto rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-[var(--md-surface-container)]">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-[var(--md-on-surface-variant)]">Can manage…</th>
                {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                  <th key={r} scope="col" className="px-4 py-3 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleBadge[r]}`}>{roleLabels[r]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--md-outline-variant)]">
              {allPermissions.map((p) => (
                <tr key={p}>
                  <th scope="row" className="px-4 py-3 text-left font-medium text-[var(--md-on-surface)]">{p}</th>
                  {(Object.keys(roleLabels) as UserRole[]).map((r) => {
                    const yes = roleDetails[r].can.includes(p);
                    return (
                      <td key={r} className="px-4 py-3 text-center">
                        {yes ? (
                          <Check className="mx-auto w-5 h-5 text-emerald-600" aria-label="Yes" />
                        ) : (
                          <span className="text-[var(--md-on-surface-variant)]/50" aria-label="No">–</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminSection>

      {/* Invite / edit */}
      {formUser !== undefined && (
        <UserForm
          key={formUser?.id ?? "new"}
          isOpen
          onClose={() => setFormUser(undefined)}
          onSubmit={saveForm}
          user={formUser}
          existingEmails={users.map((u) => u.email.toLowerCase())}
          lockedRole={
            formUser && formUser.id === me.id
              ? "You can't change your own role. Ask another admin."
              : formUser && isLastAdmin(formUser)
                ? "This is the only active admin, so their role can't be changed."
                : undefined
          }
        />
      )}

      {/* Confirm role changes, suspensions and removals */}
      <Modal
        isOpen={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        title={
          !confirm
            ? ""
            : confirm.action.kind === "remove"
              ? `Remove ${confirm.apply.length === 1 ? "user" : `${confirm.apply.length} users`}?`
              : confirm.action.kind === "suspend"
                ? `Suspend ${confirm.apply.length === 1 ? "access" : `${confirm.apply.length} users`}?`
                : confirm.action.kind === "role"
                  ? `Make ${confirm.apply.length === 1 ? confirm.apply[0].name : `${confirm.apply.length} people`} ${roleLabels[confirm.action.role]}?`
                  : "Confirm"
        }
        size="md"
      >
        {confirm && (
          <div className="space-y-4">
            <p className="text-[var(--md-on-surface-variant)]">
              {confirm.action.kind === "remove" && "They'll lose access straight away and be removed from this list. Their past activity stays in the log."}
              {confirm.action.kind === "suspend" && "They won't be able to sign in until an admin reactivates them."}
              {confirm.action.kind === "role" && `They'll be able to manage: ${roleDetails[confirm.action.role].can.join(", ").toLowerCase()}.`}
              {(confirm.action.kind === "resend" || confirm.action.kind === "reactivate") && "This will apply to:"}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {confirm.apply.slice(0, 8).map((u) => (
                <li key={u.id} className="rounded-full bg-[var(--md-surface-container)] px-2.5 py-1 text-xs font-medium text-[var(--md-on-surface)]">
                  {u.name}
                </li>
              ))}
              {confirm.apply.length > 8 && (
                <li className="px-1 py-1 text-xs text-[var(--md-on-surface-variant)]">and {confirm.apply.length - 8} more</li>
              )}
            </ul>
            {confirm.skipped.length > 0 && (
              <p className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-900">
                Skipped: {confirm.skipped.map((s) => `${s.user.name} (${s.reason})`).join("; ")}.
              </p>
            )}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
              <button type="button" onClick={() => setConfirm(null)} className={buttonStyles({ variant: "outline" })}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  applyAction(confirm.action, confirm.apply);
                  setConfirm(null);
                }}
                className={buttonStyles({ variant: confirm.action.kind === "remove" || confirm.action.kind === "suspend" ? "danger" : "primary" })}
              >
                {confirm.action.kind === "remove"
                  ? "Remove"
                  : confirm.action.kind === "suspend"
                    ? "Suspend"
                    : confirm.action.kind === "role"
                      ? "Change role"
                      : "Continue"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
