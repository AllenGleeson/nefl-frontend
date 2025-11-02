// src/components/Leagues/LeaguesHeader.tsx
"use client";

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
    <div className="py-0 sm:py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center pt-4 sm:pt-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--md-primary)] mb-2 sm:mb-3">
            Leagues
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--md-on-surface-variant)] max-w-2xl mx-auto px-4">
            Explore league standings and track team performance across different competitions
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-7xl mx-auto">
          {/* Sliders Row */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Gender Selection Slider */}
            <div className="relative bg-[var(--md-surface-container)] rounded-full p-1 w-36 sm:w-44 lg:w-48 h-10 sm:h-12 shadow-sm">
              {/* Slider Background */}
              <div 
                className={`absolute top-1 bottom-1 bg-[var(--md-primary)] rounded-full transition-all duration-300 shadow-md ${
                  selectedGender === "Men" ? "left-1 w-16 sm:w-20 lg:w-22" : "left-18 sm:left-22 lg:left-24 w-16 sm:w-20 lg:w-22"
                }`}
              />
              {(["Men", "Women"] as Gender[]).map((gender, index) => (
                <button
                  key={gender}
                  onClick={() => onGenderChange(gender)}
                  className={`absolute top-1 bottom-1 w-16 sm:w-20 lg:w-22 rounded-full font-semibold flex items-center justify-center gap-1 transition-all duration-300 z-10 cursor-pointer ${
                    selectedGender === gender
                      ? "text-[var(--md-on-primary)]"
                      : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                  }`}
                  style={{ left: `${index * (index === 0 ? 70 : 72) + 4}px` }}
                >
                  <span className="text-xs sm:text-sm lg:text-base">{gender}</span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle Slider */}
            <div className="relative bg-[var(--md-surface-container)] rounded-full p-1 w-36 sm:w-44 lg:w-48 h-10 sm:h-12 shadow-sm">
              {/* Slider Background */}
              <div 
                className={`absolute top-1 bottom-1 bg-[var(--md-primary)] rounded-full transition-all duration-300 shadow-md ${
                  viewMode === 'table' ? "left-1 w-16 sm:w-20 lg:w-22" : "left-18 sm:left-22 lg:left-24 w-16 sm:w-20 lg:w-22"
                }`}
              />
              <button
                onClick={() => onViewModeChange('table')}
                className={`absolute top-1 bottom-1 w-16 sm:w-20 lg:w-22 rounded-full font-semibold flex items-center justify-center gap-1 transition-all duration-300 z-10 cursor-pointer ${
                  viewMode === 'table'
                    ? "text-[var(--md-on-primary)]"
                    : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                }`}
                style={{ left: '4px' }}
              >
                <span className="text-xs sm:text-sm lg:text-base">Table</span>
              </button>
              <button
                onClick={() => onViewModeChange('fixtures')}
                className={`absolute top-1 bottom-1 w-16 sm:w-20 lg:w-22 rounded-full font-semibold flex items-center justify-center gap-1 transition-all duration-300 z-10 cursor-pointer ${
                  viewMode === 'fixtures'
                    ? "text-[var(--md-on-primary)]"
                    : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                }`}
                style={{ left: '74px' }}
              >
                <span className="text-xs sm:text-sm lg:text-base">Matrix</span>
              </button>
            </div>
          </div>

          {/* Mobile: Dropdown Selector */}
          <div className="sm:hidden mb-6 sm:mb-0 relative">
            <select
              value={selectedLeague}
              onChange={(e) => onLeagueChange(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-base font-medium bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-xl shadow-sm text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 appearance-none cursor-pointer"
            >
              {availableLeagues.map((league) => (
                <option 
                  key={league} 
                  value={league}
                  className="bg-[var(--md-primary)] text-[var(--md-on-primary)]"
                >
                  {league}
                </option>
              ))}
            </select>
            {/* Dropdown Arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--md-on-primary)]"
              >
                <path 
                  d="M8 11L3 6h10z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          {/* Desktop: League Selection Buttons */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3">
            {availableLeagues.map((league) => (
              <button
                key={league}
                onClick={() => onLeagueChange(league)}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer ${
                  selectedLeague === league
                    ? "bg-[var(--md-primary)] text-[var(--md-on-primary)] shadow-lg"
                    : "bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)]"
                }`}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--md-primary-container)] rounded-full flex items-center justify-center">
                  <img 
                    src="/images/logos/UHY_Logo.webp" 
                    alt="UHY Logo" 
                    className="w-3 h-3 sm:w-5 sm:h-5 object-contain"
                  />
                </div>
                <span className="font-medium text-xs sm:text-sm lg:text-base">{league}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
