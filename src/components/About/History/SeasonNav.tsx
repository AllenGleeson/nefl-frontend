"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

// Offset from the top of the viewport (below the sticky site nav) used to decide
// which section is "current".
const ACTIVE_OFFSET = 140;

// Season jump list that highlights the section currently being read.
export default function SeasonNav({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) current = item.id;
      }
      // At the very bottom of the page, the last section is current even if it's short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1]?.id ?? current;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="Seasons" className="lg:sticky lg:top-28">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--md-on-surface-variant)] mb-3">Seasons</p>
      <ul className="flex lg:flex-col flex-wrap gap-2 lg:gap-1 lg:border-l-2 lg:border-[var(--md-outline-variant)]">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`relative block rounded-full lg:rounded-none lg:rounded-r-lg px-3 py-1.5 text-sm font-medium transition-colors lg:-ml-0.5 lg:border-l-2 ${
                  active
                    ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] lg:bg-[var(--md-primary-container)]/40 lg:text-[var(--md-primary)] lg:font-bold lg:border-[var(--md-primary)]"
                    : "bg-[var(--md-surface-container)] lg:bg-transparent text-[var(--md-on-surface-variant)] lg:border-transparent hover:bg-[var(--md-surface-container-high)] hover:text-[var(--md-on-surface)]"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
