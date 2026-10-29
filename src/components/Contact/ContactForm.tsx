"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Send } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";

export const CONTACT_EMAIL = "info@nefl.ie";

const topics = [
  "General enquiry",
  "Club affiliation / joining the league",
  "Fixtures and results",
  "Pitch bookings at the MDL",
  "Referees",
  "Sponsorship and partnerships",
  "Website feedback",
];

const fieldCls =
  "w-full rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-lowest)] px-4 py-3 text-[var(--md-on-surface)] placeholder:text-[var(--md-on-surface-variant)]/70 hover:border-[var(--md-outline)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]";

// There is no server to send mail from (static site), so this opens the visitor's
// email app with the message filled in, addressed to the league.
export default function ContactForm() {
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = [message.trim(), "", "—", `Name: ${name.trim()}`, club.trim() && `Club: ${club.trim()}`]
      .filter((line) => line !== "")
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]">Your name</span>
        <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={fieldCls} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]">
          Club <span className="font-normal text-[var(--md-on-surface-variant)]">(optional)</span>
        </span>
        <input value={club} onChange={(e) => setClub(e.target.value)} className={fieldCls} />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]">What&apos;s it about?</span>
        <span className="relative block">
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className={`${fieldCls} appearance-none pr-10`}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--md-on-surface-variant)]" aria-hidden />
        </span>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold text-[var(--md-on-surface)]">Message</span>
        <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={`${fieldCls} resize-y`} />
      </label>
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
        <button type="submit" className={buttonStyles({ size: "lg" })}>
          <Send className="w-4 h-4" aria-hidden />
          Send message
        </button>
        <p className="text-xs text-[var(--md-on-surface-variant)]">
          This opens your email app with the message ready to send to {CONTACT_EMAIL}.
        </p>
      </div>
    </form>
  );
}
