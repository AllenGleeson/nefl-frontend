"use client"

// src/components/Fixtures/index.tsx
import FixturesList from "./FixturesList";
import FixturesFilter from "./FixturesFilter";
import { useFixturesFilter } from "@/hooks/useFixturesFilter";

export default function Fixtures() {
  const {
    filteredMatchweeks,
    handleFilterChange,
    handleReset,
    getFilterStats
  } = useFixturesFilter();

  const stats = getFilterStats();

  return (
    <div className="min-h-screen bg-[var(--md-surface)]">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--md-on-surface)] mb-2 sm:mb-4">
            Fixtures & Results
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--md-on-surface-variant)] mb-4 sm:mb-6 px-4">
            Stay updated with all the latest match fixtures and results from the North East Football League
          </p>
          
          {/* Stats Cards */}
          <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto px-4">
            <div className="bg-[var(--md-surface-container)] rounded-xl shadow-sm p-3 sm:p-4 md:p-6 border border-[var(--md-outline-variant)] flex-1 min-w-[100px]">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--md-primary)] mb-2">{stats.filtered}</div>
              <div className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">Matches Found</div>
            </div>
            <div className="bg-[var(--md-surface-container)] rounded-xl shadow-sm p-3 sm:p-4 md:p-6 border border-[var(--md-outline-variant)] flex-1 min-w-[100px]">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--md-secondary)] mb-2">{stats.weeks}</div>
              <div className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">Matchweeks</div>
            </div>
            <div className="bg-[var(--md-surface-container)] rounded-xl shadow-sm p-3 sm:p-4 md:p-6 border border-[var(--md-outline-variant)] flex-1 min-w-[100px]">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--md-tertiary)] mb-2">{stats.total}</div>
              <div className="text-xs sm:text-sm text-[var(--md-on-surface-variant)]">Total Matches</div>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="mb-4 sm:mb-8">
          <FixturesFilter 
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>
        
        {/* Fixtures List */}
        <div className="bg-[var(--md-surface-container)] rounded-xl sm:rounded-2xl shadow-sm border border-[var(--md-outline-variant)] overflow-hidden">
          <FixturesList matchweeks={filteredMatchweeks}/>
        </div>
      </div>
    </div>
  );
}