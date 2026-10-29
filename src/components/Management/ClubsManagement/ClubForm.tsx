"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import Modal from "@/components/Modal";
import { buttonStyles } from "@/components/ui/Button";
import { FORMATION_TEMPLATES } from "@/data/formations";

export type ClubFormValues = {
  name: string;
  founded: number;
  stadium: string;
  website?: string;
  email?: string;
  /** Formation template id, e.g. "4-4-2" */
  formation?: string;
};

type Props = {
  /** Existing values when editing; omit to add a new club */
  initial?: ClubFormValues;
  onClose: () => void;
  onSave: (values: ClubFormValues) => void;
};

const fieldCls =
  "w-full h-11 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] px-4 text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)]/70 hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]";
const labelCls = "mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]";

/** Small vertical pitch with position markers (own goal at the bottom) */
function MiniPitch({ formationId }: { formationId?: string }) {
  const template = FORMATION_TEMPLATES.find((t) => t.id === formationId);
  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[180px] overflow-hidden rounded-xl bg-emerald-600 ring-1 ring-emerald-700">
      {/* Markings */}
      <span aria-hidden className="absolute inset-2 rounded-md border-2 border-white/60" />
      <span aria-hidden className="absolute left-2 right-2 top-1/2 h-0.5 bg-white/60" />
      <span aria-hidden className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60" />
      <span aria-hidden className="absolute bottom-2 left-1/2 h-8 w-20 -translate-x-1/2 border-2 border-b-0 border-white/60" />
      <span aria-hidden className="absolute top-2 left-1/2 h-8 w-20 -translate-x-1/2 border-2 border-t-0 border-white/60" />
      {template ? (
        template.positions.map((p, i) => (
          <span
            key={i}
            title={p.position}
            className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-[var(--md-primary)] text-[8px] font-bold text-white shadow"
            style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}
          >
            {p.position}
          </span>
        ))
      ) : (
        <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs font-medium text-white/90">No formation set</span>
      )}
    </div>
  );
}

export default function ClubForm({ initial, onClose, onSave }: Props) {
  const editing = Boolean(initial);
  const [name, setName] = useState(initial?.name ?? "");
  const [founded, setFounded] = useState(initial?.founded ? String(initial.founded) : "");
  const [stadium, setStadium] = useState(initial?.stadium ?? "");
  const [website, setWebsite] = useState(initial?.website ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [formation, setFormation] = useState(initial?.formation ?? "");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim(),
      founded: Number(founded),
      stadium: stadium.trim(),
      website: website.trim() || undefined,
      email: email.trim() || undefined,
      formation: formation || undefined,
    });
  };

  const selectedTemplate = FORMATION_TEMPLATES.find((t) => t.id === formation);
  const categories = ["balanced", "defensive", "attacking", "unconventional"] as const;

  return (
    <Modal isOpen onClose={onClose} title={editing ? `Edit ${initial!.name}` : "Add a club"} size="xl">
      <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block sm:col-span-2">
            <span className={labelCls}>Club name</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Founded</span>
            <input required type="number" min={1850} max={new Date().getFullYear()} value={founded} onChange={(e) => setFounded(e.target.value)} className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Home ground</span>
            <input required value={stadium} onChange={(e) => setStadium(e.target.value)} className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>
              Website <span className="font-normal text-[var(--md-on-surface-variant)]">(optional)</span>
            </span>
            <input type="url" placeholder="https://" value={website} onChange={(e) => setWebsite(e.target.value)} className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>
              Contact email <span className="font-normal text-[var(--md-on-surface-variant)]">(optional)</span>
            </span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldCls} />
          </label>
        </div>


        {/* Formation */}
        <fieldset className="rounded-2xl border border-[var(--md-outline-variant)] p-4 sm:p-5">
          <legend className="px-1 text-sm font-semibold text-[var(--md-on-surface)]">Formation</legend>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-5 items-start">
            <div>
              <label className="block w-full sm:w-56">
                <span className="sr-only">Formation</span>
                <span className="relative block">
                  <select value={formation} onChange={(e) => setFormation(e.target.value)} className={`${fieldCls} appearance-none pr-10`}>
                    <option value="">No formation</option>
                    {categories.map((cat) => (
                      <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)}>
                        {FORMATION_TEMPLATES.filter((t) => t.category === cat).map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
                </span>
              </label>
              <p className="mt-3 text-sm text-[var(--md-on-surface-variant)]">
                {selectedTemplate ? selectedTemplate.description : "Pick the club's usual formation. It's shown on the club's public page."}
              </p>
              {selectedTemplate && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--md-primary)]">
                  {selectedTemplate.category} · {selectedTemplate.difficulty}
                </p>
              )}
            </div>
            <MiniPitch formationId={formation} />
          </div>
        </fieldset>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button type="button" onClick={onClose} className={buttonStyles({ variant: "outline" })}>
            Cancel
          </button>
          <button type="submit" className={buttonStyles()}>
            {editing ? "Save changes" : "Add club"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
