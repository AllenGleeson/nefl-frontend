"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Lock, Send, ShieldCheck, Trash2, UserCog } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { roleLabels, type UserRole } from "@/data/adminUsers";

export type BulkAction = { kind: "role"; role: UserRole } | { kind: "resend" } | { kind: "reactivate" } | { kind: "suspend" } | { kind: "remove" };

type Props = {
  selectedCount: number;
  /** How many selected people each action would apply to */
  countFor: (action: BulkAction) => number;
  onAction: (action: BulkAction) => void;
};

const roleOrder: UserRole[] = ["admin", "editor"];

// "Actions" dropdown for the selected users. Items show how many people they'd affect.
export default function BulkActionsMenu({ selectedCount, countFor, onAction }: Props) {
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

  const item = (action: BulkAction, label: string, icon: React.ReactNode, danger = false) => {
    const n = countFor(action);
    return (
      <button
        role="menuitem"
        type="button"
        disabled={n === 0}
        onClick={() => {
          setOpen(false);
          onAction(action);
        }}
        className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[var(--md-surface-container-low)] disabled:cursor-not-allowed disabled:opacity-40 ${
          danger ? "text-[var(--md-error)]" : "text-[var(--md-on-surface)]"
        }`}
      >
        {icon}
        <span className="flex-1">{label}</span>
        <span className="rounded-full bg-[var(--md-surface-container-high)] px-1.5 text-xs tabular-nums text-[var(--md-on-surface-variant)]">{n}</span>
      </button>
    );
  };

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
          <p className="px-4 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--md-on-surface-variant)]">Change role to</p>
          {roleOrder.map((r) => (
            <div key={r}>{item({ kind: "role", role: r }, roleLabels[r], <UserCog className="w-4 h-4" aria-hidden />)}</div>
          ))}
          <div className="my-1 border-t border-[var(--md-outline-variant)]" />
          {item({ kind: "resend" }, "Resend invites", <Send className="w-4 h-4" aria-hidden />)}
          {item({ kind: "reactivate" }, "Reactivate", <ShieldCheck className="w-4 h-4" aria-hidden />)}
          {item({ kind: "suspend" }, "Suspend access", <Lock className="w-4 h-4" aria-hidden />)}
          <div className="my-1 border-t border-[var(--md-outline-variant)]" />
          {item({ kind: "remove" }, "Remove", <Trash2 className="w-4 h-4" aria-hidden />, true)}
        </div>
      )}
    </div>
  );
}
