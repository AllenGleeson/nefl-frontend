"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { Check, ChevronDown, Undo2 } from "lucide-react";
import Modal from "@/components/Modal";
import { buttonStyles } from "@/components/ui/Button";

/* -------------------------------------------------------------------------- */
/* Selection state                                                            */
/* -------------------------------------------------------------------------- */

/** Tracks which items are selected. `ids` is everything currently listed (after filters). */
export function useSelection(ids: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = ids.length > 0 && ids.every((id) => selected.has(id));
  const someSelected = !allSelected && ids.some((id) => selected.has(id));

  return {
    selected,
    isSelected: (id: string) => selected.has(id),
    count: selected.size,
    allSelected,
    someSelected,
    toggle: (id: string) =>
      setSelected((s) => {
        const next = new Set(s);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      }),
    toggleAll: () =>
      setSelected((s) => {
        const next = new Set(s);
        ids.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
        return next;
      }),
    clear: () => setSelected(new Set()),
    /** Drop ids that no longer exist (e.g. after deleting) */
    remove: (gone: string[]) => setSelected((s) => new Set([...s].filter((id) => !gone.includes(id)))),
  };
}

/** Row click handler that toggles selection, ignoring clicks on buttons, links and form fields */
export function selectOnRowClick(toggle: () => void) {
  return (e: ReactMouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, input, select, textarea, label, [role="menu"]')) return;
    if (window.getSelection()?.toString()) return; // don't toggle while selecting text
    toggle();
  };
}

/** Classes for a selectable row */
export const selectableRow = (selected: boolean) =>
  `cursor-pointer transition-colors ${selected ? "bg-[var(--md-primary-container)]/25 ring-1 ring-inset ring-[var(--md-primary-container)]" : "hover:bg-[var(--md-surface-container-low)]"}`;

export function RowCheckbox({ checked, onChange, label, className = "" }: { checked: boolean; onChange: () => void; label: string; className?: string }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={`Select ${label}`}
      className={`h-4 w-4 shrink-0 cursor-pointer accent-[var(--md-primary)] ${className}`}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Select-all bar with Actions menu                                           */
/* -------------------------------------------------------------------------- */

export type BulkItem = {
  label: string;
  icon?: ReactNode;
  /** How many selected items this applies to; 0 disables it */
  count: number;
  danger?: boolean;
  /** Optional heading shown above this item */
  group?: string;
  /** Draw a separator line above this item */
  divider?: boolean;
  onSelect: () => void;
};

function ActionsMenu({ selectedCount, items }: { selectedCount: number; items: BulkItem[] }) {
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
        disabled={selectedCount === 0}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={buttonStyles({ variant: selectedCount ? "primary" : "outline", size: "sm" })}
      >
        Actions{selectedCount > 0 && ` (${selectedCount})`}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div role="menu" className="absolute left-0 z-30 mt-2 w-64 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] py-1 shadow-xl">
          {items.map((it, i) => (
            <div key={it.label}>
              {it.divider && !it.group && <div className="my-1 border-t border-[var(--md-outline-variant)]" />}
              {it.group && (
                <p className={`px-4 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--md-on-surface-variant)] ${i > 0 ? "mt-1 border-t border-[var(--md-outline-variant)]" : ""}`}>
                  {it.group}
                </p>
              )}
              <button
                role="menuitem"
                type="button"
                disabled={it.count === 0}
                onClick={() => {
                  setOpen(false);
                  it.onSelect();
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[var(--md-surface-container-low)] disabled:cursor-not-allowed disabled:opacity-40 ${
                  it.danger ? "text-[var(--md-error)]" : "text-[var(--md-on-surface)]"
                }`}
              >
                {it.icon}
                <span className="flex-1">{it.label}</span>
                <span className="rounded-full bg-[var(--md-surface-container-high)] px-1.5 text-xs tabular-nums text-[var(--md-on-surface-variant)]">{it.count}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SelectionBar({
  total,
  noun,
  selection,
  items,
}: {
  /** Number of items currently listed */
  total: number;
  /** Plural noun, e.g. "articles" */
  noun: string;
  selection: ReturnType<typeof useSelection>;
  items: BulkItem[];
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = selection.someSelected;
  }, [selection.someSelected]);

  return (
    <div className="mb-3 flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)] px-4 sm:px-5 py-2.5">
      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[var(--md-on-surface)]">
        <input ref={ref} type="checkbox" checked={selection.allSelected} onChange={selection.toggleAll} className="h-4 w-4 cursor-pointer accent-[var(--md-primary)]" />
        {selection.allSelected ? `All ${total} selected` : selection.count ? `${selection.count} selected` : `Select all ${total} ${noun}`}
      </label>
      <ActionsMenu selectedCount={selection.count} items={items} />
      {selection.count > 0 && (
        <button type="button" onClick={selection.clear} className="text-sm font-semibold text-[var(--md-primary)] hover:underline underline-offset-4">
          Clear selection
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Confirmation and feedback                                                  */
/* -------------------------------------------------------------------------- */

export type PendingConfirm = {
  title: string;
  message: string;
  names: string[];
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
};

export function ConfirmDialog({ pending, onClose }: { pending: PendingConfirm | null; onClose: () => void }) {
  return (
    <Modal isOpen={Boolean(pending)} onClose={onClose} title={pending?.title ?? ""} size="md">
      {pending && (
        <div className="space-y-4">
          <p className="text-[var(--md-on-surface-variant)]">{pending.message}</p>
          <ul className="flex flex-wrap gap-1.5">
            {pending.names.slice(0, 8).map((n) => (
              <li key={n} className="rounded-full bg-[var(--md-surface-container)] px-2.5 py-1 text-xs font-medium text-[var(--md-on-surface)]">
                {n}
              </li>
            ))}
            {pending.names.length > 8 && <li className="px-1 py-1 text-xs text-[var(--md-on-surface-variant)]">and {pending.names.length - 8} more</li>}
          </ul>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className={buttonStyles({ variant: "outline" })}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                pending.onConfirm();
                onClose();
              }}
              className={buttonStyles({ variant: pending.danger ? "danger" : "primary" })}
            >
              {pending.confirmLabel}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

/** Success message that hides itself after a few seconds */
export function useNotice() {
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(t);
  }, [notice]);
  return [notice, setNotice] as const;
}

export function Notice({ text, onUndo }: { text: string; onUndo?: () => void }) {
  return (
    <div aria-live="polite">
      {text && (
        <p className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <Check className="w-4 h-4 shrink-0" aria-hidden />
          <span className="flex-1">{text}</span>
          {onUndo && (
            <button type="button" onClick={onUndo} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold hover:bg-emerald-100 underline-offset-4 hover:underline">
              <Undo2 className="w-4 h-4" aria-hidden />
              Undo
            </button>
          )}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Undo history                                                               */
/* -------------------------------------------------------------------------- */

const MAX_HISTORY = 20;

/**
 * State with an undo history. `change(updater, label)` records the previous value so
 * `undo()` can restore it; `lastLabel` describes the change that would be undone.
 */
export function useUndoable<T>(initial: T) {
  const [state, setState] = useState<{ value: T; past: { value: T; label: string }[] }>({ value: initial, past: [] });

  const change = (updater: (prev: T) => T, label: string) =>
    setState((s) => ({ value: updater(s.value), past: [...s.past, { value: s.value, label }].slice(-MAX_HISTORY) }));

  /** Restores the previous value and returns the label of the change that was undone */
  const undo = () => {
    const last = state.past[state.past.length - 1];
    if (!last) return "";
    setState((s) => (s.past.length ? { value: s.past[s.past.length - 1].value, past: s.past.slice(0, -1) } : s));
    return last.label;
  };

  return {
    value: state.value,
    change,
    undo,
    canUndo: state.past.length > 0,
    lastLabel: state.past[state.past.length - 1]?.label ?? "",
  };
}

/** "Revert last change" button for a list with an undo history */
export function RevertButton({ canUndo, lastLabel, onRevert }: { canUndo: boolean; lastLabel: string; onRevert: () => void }) {
  return (
    <button
      type="button"
      onClick={onRevert}
      disabled={!canUndo}
      title={canUndo ? `Revert: ${lastLabel}` : "Nothing to revert"}
      className={buttonStyles({ variant: "outline", size: "sm" })}
    >
      <Undo2 className="w-4 h-4" aria-hidden />
      Revert last change
    </button>
  );
}
