"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ClubSectionProps {
  title: string;
  /** Optional link or label shown on the right of the heading */
  action?: ReactNode;
  /** Start expanded on mobile (sections are always expanded on desktop) */
  defaultOpen?: boolean;
  children: ReactNode;
}

const DESKTOP = "(min-width: 1024px)"; // Tailwind's lg breakpoint

/**
 * A page section with a divider line and a heading, used for every section of the club page.
 * On mobile the heading toggles the section open and closed; on desktop it is always open.
 */
export default function ClubSection({ title, action, defaultOpen = false, children }: ClubSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [isDesktop, setIsDesktop] = useState(false);
  const contentId = useId();

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const collapsible = !isDesktop;

  return (
    <section
      aria-label={title}
      className="md-dark border-t border-white/15 text-[var(--md-on-surface)]"
    >
      <div className={`flex items-center justify-between gap-3 pt-5 ${open ? "pb-3" : "pb-0 lg:pb-3"}`}>
        <h2 className="text-lg sm:text-xl font-bold min-w-0 flex-1">
          {collapsible ? (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={contentId}
              className="flex w-full items-center gap-2 text-left rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] lg:pointer-events-none"
            >
              <ChevronDown
                aria-hidden
                className={`w-5 h-5 shrink-0 text-[var(--md-on-surface-variant)] transition-transform lg:hidden ${open ? "" : "-rotate-90"}`}
              />
              {title}
            </button>
          ) : (
            title
          )}
        </h2>
        {action}
      </div>
      {/* Closed sections are hidden on mobile only, so desktop never flashes closed before the page loads */}
      <div id={contentId} className={`pb-2 ${open ? "" : "hidden lg:block"}`}>
        {children}
      </div>
    </section>
  );
}
