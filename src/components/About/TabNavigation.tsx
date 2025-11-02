// src/components/About/TabNavigation.tsx
"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function TabNavigation({ 
  tabs, 
  defaultTab, 
  className = "" 
}: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="flex flex-row border-b-2 border-[var(--md-outline-variant)] mb-0 sm:mb-6 lg:mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] border-b-2 border-[var(--md-primary)]"
                : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container)] border-b-2 border-transparent"
            }`}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] py-3 sm:py-4 md:py-6">
        {activeTabContent}
      </div>
    </div>
  );
}
