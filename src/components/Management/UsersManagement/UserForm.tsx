"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail } from "lucide-react";
import Modal from "@/components/Modal";
import { buttonStyles } from "@/components/ui/Button";
import { clubs } from "@/data/club";
import { roleDetails, roleLabels, type AdminUser, type UserRole } from "@/data/adminUsers";

export type UserFormValues = Pick<AdminUser, "name" | "email" | "role" | "club">;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
  /** Editing an existing person; omit to invite someone new */
  user?: AdminUser | null;
  /** Roles that can't be chosen (e.g. demoting the last admin), with the reason */
  lockedRole?: string;
  existingEmails: string[];
};

const fieldCls =
  "w-full h-11 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] px-4 text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)]/70 hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]";

const roles: UserRole[] = ["editor", "admin"];

export default function UserForm({ isOpen, onClose, onSubmit, user, lockedRole, existingEmails }: Props) {
  const editing = Boolean(user);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "editor");
  const [club, setClub] = useState(user?.club ?? "");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (existingEmails.includes(cleanEmail) && cleanEmail !== user?.email.toLowerCase()) {
      setError("Someone with this email already has an account.");
      return;
    }
    onSubmit({ name: name.trim(), email: cleanEmail, role, club: club || undefined });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? `Edit ${user!.name}` : "Invite someone"} size="lg">
      <form onSubmit={submit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]">Full name</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" className={fieldCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "user-email-error" : undefined}
              className={fieldCls}
            />
            {error && (
              <span id="user-email-error" className="mt-1 block text-sm text-[var(--md-error)]">
                {error}
              </span>
            )}
          </label>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-[var(--md-on-surface)]">Role</legend>
          {lockedRole && <p className="mb-2 text-sm text-[var(--md-on-surface-variant)]">{lockedRole}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((r) => {
              const selected = role === r;
              const disabled = Boolean(lockedRole) && r !== user?.role;
              return (
                <label
                  key={r}
                  className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition-colors ${
                    selected
                      ? "border-[var(--md-primary)] bg-[var(--md-primary-container)]/30"
                      : "border-[var(--md-outline-variant)] hover:border-[var(--md-outline)]"
                  } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={selected}
                    disabled={disabled}
                    onChange={() => setRole(r)}
                    className="sr-only"
                  />
                  <span className="flex items-center justify-between">
                    <span className="font-bold text-[var(--md-on-surface)]">{roleLabels[r]}</span>
                    {selected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--md-primary)] text-[var(--md-on-primary)]">
                        <Check className="w-3.5 h-3.5" aria-hidden />
                      </span>
                    )}
                  </span>
                  <span className="mt-1 text-xs text-[var(--md-on-surface-variant)]">{roleDetails[r].summary}</span>
                  <ul className="mt-2 space-y-0.5 text-xs text-[var(--md-on-surface)]">
                    {roleDetails[r].can.map((c) => (
                      <li key={c} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]">
            Club <span className="font-normal text-[var(--md-on-surface-variant)]">(optional, for club secretaries)</span>
          </span>
          <select value={club} onChange={(e) => setClub(e.target.value)} className={fieldCls}>
            <option value="">No club: league official</option>
            {[...clubs]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
          </select>
        </label>

        {!editing && (
          <p className="flex gap-2 rounded-xl bg-[var(--md-surface-container-low)] p-3 text-sm text-[var(--md-on-surface-variant)]">
            <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
            They&apos;ll get an email invite to set their own password. Their account shows as &quot;Invite pending&quot; until they
            accept.
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className={buttonStyles({ variant: "outline" })}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles()}>
            {editing ? "Save changes" : "Send invite"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
