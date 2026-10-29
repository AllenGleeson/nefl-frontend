// src/components/Management/ManagementActions.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { adminSections } from "./adminSections";
import { canSeeSection } from "@/data/adminUsers";
import { AdminSection } from "./AdminUI";

export default function ManagementActions() {
  return (
    <AdminSection title="Quick actions">
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {adminSections
          .filter((s) => s.href !== "/management" && canSeeSection(s))
          .map(({ href, label, description, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative isolate flex h-full items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--md-primary-hover)] to-[var(--md-primary)] p-5 text-[var(--md-on-primary)] shadow-md ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-[var(--md-primary-container)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--md-primary-container)]"
              >
                <Icon aria-hidden className="absolute -right-4 -bottom-4 -z-10 h-24 w-24 opacity-[0.08] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                  <Icon className="w-6 h-6" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold">{label}</span>
                  <span className="block text-sm text-white/75">{description}</span>
                </span>
                <ArrowRight className="w-5 h-5 shrink-0 opacity-60 transition-transform group-hover:translate-x-1 group-hover:opacity-100" aria-hidden />
              </Link>
            </li>
          ))}
      </ul>
    </AdminSection>
  );
}
