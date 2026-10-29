"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { adminSections } from "./adminSections";
import { canSeeSection } from "@/data/adminUsers";

const visibleSections = adminSections.filter((s) => canSeeSection(s));

// Layout for every admin page: sidebar on desktop, scrollable tab bar on mobile.
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/management" ? pathname === "/management" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen bg-[var(--md-surface)]">
      <div className="max-w-[1400px] mx-auto lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)]">
          <nav aria-label="Admin" className="sticky top-20 p-4">
            <p className="px-3 pt-2 pb-3 text-xs font-bold uppercase tracking-[0.15em] text-[var(--md-on-surface-variant)]">
              League admin
            </p>
            <ul className="space-y-1">
              {visibleSections.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md"
                          : "text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-high)] hover:text-[var(--md-on-surface)]"
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" aria-hidden />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/"
              className="mt-6 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[var(--md-primary)] hover:bg-[var(--md-surface-container-high)]"
            >
              <ExternalLink className="w-4 h-4" aria-hidden />
              View public site
            </Link>
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Mobile tab bar */}
          <nav
            aria-label="Admin"
            className="lg:hidden sticky top-20 z-30 flex gap-1 overflow-x-auto scrollbar-hide border-b border-[var(--md-outline-variant)] bg-[var(--md-surface-container-low)]/95 backdrop-blur-sm px-3 py-2"
          >
            {visibleSections.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
                    active
                      ? "bg-[var(--md-primary)] text-[var(--md-on-primary)]"
                      : "text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-high)]"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </nav>

          {children}
        </div>
      </div>
    </div>
  );
}
