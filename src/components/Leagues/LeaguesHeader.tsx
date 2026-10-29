// src/components/Leagues/LeaguesHeader.tsx
"use client";

import { MdMan, MdWoman } from "react-icons/md";
import { CalendarDays, ListOrdered } from "lucide-react";
import IconToggle from "@/components/ui/IconToggle";
import LeagueSelect from "./LeagueSelect";

type Gender = 'Men' | 'Women';
type ViewMode = 'table' | 'fixtures';

type Props = {
  selectedGender: Gender;
  selectedLeague: string;
  viewMode: ViewMode;
  availableLeagues: string[];
  onGenderChange: (gender: Gender) => void;
  onLeagueChange: (league: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export default function LeaguesHeader({
  selectedGender,
  selectedLeague,
  viewMode,
  availableLeagues,
  onGenderChange,
  onLeagueChange,
  onViewModeChange,
}: Props) {
  return (
    <div className="pt-0 sm:pt-6">
      <div className="px-2 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center pt-4 sm:pt-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--md-primary)] mb-2 sm:mb-3">
            Leagues
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--md-on-surface-variant)] max-w-4xl mx-auto px-4">
            Explore league standings and track team performance across different competitions
          </p>
        </div>

        {/* Controls: league dropdown, then gender and view toggles */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3 sm:gap-4 mb-4">
          <LeagueSelect
            leagues={availableLeagues}
            value={selectedLeague}
            onChange={onLeagueChange}
          />

          <div className="flex items-center gap-3 sm:gap-4">
            <IconToggle<Gender>
              ariaLabel="Men's or women's leagues"
              value={selectedGender}
              onChange={onGenderChange}
              options={[
                { value: 'Men', label: "Men's leagues", icon: <MdMan className="w-6 h-6 sm:w-7 sm:h-7" /> },
                { value: 'Women', label: "Women's leagues", icon: <MdWoman className="w-6 h-6 sm:w-7 sm:h-7" /> },
              ]}
            />

            <IconToggle<ViewMode>
              ariaLabel="Table or fixtures view"
              value={viewMode}
              onChange={onViewModeChange}
              options={[
                { value: 'table', label: 'League table', icon: <ListOrdered className="w-5 h-5" /> },
                { value: 'fixtures', label: 'Fixtures', icon: <CalendarDays className="w-5 h-5" /> },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
