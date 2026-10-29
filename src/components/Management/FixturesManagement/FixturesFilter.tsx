"use client";

// src/components/Management/FixturesManagement/FixturesFilter.tsx
import { useState, useEffect } from 'react';
import { buttonStyles } from "@/components/ui/Button";

interface FixturesFilterProps {
  onFilterChange: (filters: {
    status: string;
    league: string;
    team: string;
    dateRange: string;
  }) => void;
}

export default function FixturesFilter({ onFilterChange }: FixturesFilterProps) {
  const [filters, setFilters] = useState({
    status: 'all',
    league: 'all',
    team: 'all',
    dateRange: 'all'
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
  };

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleClearFilters = () => {
    const clearedFilters = {
      status: 'all',
      league: 'all',
      team: 'all',
      dateRange: 'all'
    };
    setFilters(clearedFilters);
  };

  return (
    <div className="bg-[var(--md-surface-container-lowest)] rounded-2xl shadow-sm p-4 mb-6 border border-[var(--md-outline-variant)]">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
            League
          </label>
          <select
            name="league"
            value={filters.league}
            onChange={handleFilterChange}
            className="border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]"
          >
            <option value="all">All Leagues</option>
            <option value="Premier League">Premier League</option>
            <option value="Division 1">Division 1</option>
            <option value="Division 2">Division 2</option>
            <option value="Championship">Championship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
            Team
          </label>
          <select
            name="team"
            value={filters.team}
            onChange={handleFilterChange}
            className="border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]"
          >
            <option value="all">All Teams</option>
            <option value="Shamrock Rovers">Shamrock Rovers</option>
            <option value="Bohemians">Bohemians</option>
            <option value="St. Patrick's Athletic">St. Patrick&apos;s Athletic</option>
            <option value="Walshestown FC">Walshestown FC</option>
            <option value="Athboy Celtic">Athboy Celtic</option>
            <option value="Dublin United">Dublin United</option>
            <option value="Cork City">Cork City</option>
            <option value="Galway United">Galway United</option>
            <option value="Limerick FC">Limerick FC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--md-on-surface-variant)] mb-1">
            Date Range
          </label>
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="border border-[var(--md-outline-variant)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="flex items-end">
          <button 
            onClick={handleClearFilters}
            className={buttonStyles({ variant: "outline", size: "sm" })}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
