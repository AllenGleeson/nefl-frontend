// src/components/About/TabNavigation.tsx
"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

// Pill tabs. The active tab is kept in the URL hash (e.g. /about#grounds) so it can be linked to.
export default function TabNavigation({ tabs, defaultTab, className = "" }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const baseId = useId();

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (tabs.some((t) => t.id === id)) setActiveTab(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  const select = (id: string) => {
    setActiveTab(id);
    history.replaceState(null, "", `#${id}`);
  };

  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={`w-full ${className}`}>
      <div
        role="tablist"
        aria-label="About sections"
        className="inline-flex max-w-full overflow-x-auto scrollbar-hide gap-1 p-1 rounded-full bg-[var(--md-surface-container)] shadow-sm"
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => select(tab.id)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 sm:px-5 h-10 sm:h-11 text-sm sm:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] ${
                selected
                  ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-md"
                  : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-high)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeTab}`}
        className="pt-6 sm:pt-8"
      >
        {active?.content}
      </div>
    </div>
  );
}
