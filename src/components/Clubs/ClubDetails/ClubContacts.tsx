import { FaEnvelope, FaPhone } from "react-icons/fa6";
import ClubSection from "./ClubSection";

export type ClubContact = {
  name: string;
  role: string;
  phone?: string;
  email?: string;
};

interface ClubContactsProps {
  contacts: ClubContact[];
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const linkClass =
  "inline-flex items-center gap-2 text-sm text-[var(--md-primary)] hover:underline break-all";

export default function ClubContacts({ contacts }: ClubContactsProps) {
  if (!contacts?.length) return null;

  return (
    <ClubSection title="Club contacts">
      <ul className="divide-y divide-[var(--md-outline-variant)]/60">
        {contacts.map((c) => (
          <li key={`${c.role}-${c.name}`} className="flex items-start gap-3 py-3">
            <span
              aria-hidden
              className="w-10 h-10 shrink-0 rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] flex items-center justify-center text-sm font-bold"
            >
              {initials(c.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-snug">{c.name}</p>
              <p className="text-xs uppercase tracking-wider text-[var(--md-on-surface-variant)]">{c.role}</p>
              <div className="mt-1.5 flex flex-col gap-1">
                {c.phone && (
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className={linkClass}>
                    <FaPhone className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    {c.phone}
                  </a>
                )}
                {c.email && (
                  <a href={`mailto:${c.email}`} className={linkClass}>
                    <FaEnvelope className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    {c.email}
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ClubSection>
  );
}
