// src/components/About/RollOfHonourTab.tsx
"use client";

import { useState } from "react";

interface Winner {
  year: string;
  winner: string;
  runnerUp?: string;
}

interface Award {
  year: string;
  winner: string;
  club?: string;
}

// Sample data - replace with actual data from your API
const leagueWinners: Winner[] = [
  { year: "2023", winner: "FC Barcelona", runnerUp: "Real Madrid" },
  { year: "2022", winner: "Manchester United", runnerUp: "Liverpool" },
  { year: "2021", winner: "Chelsea FC", runnerUp: "Arsenal" },
  { year: "2020", winner: "Manchester City", runnerUp: "Tottenham" },
];

const reserveLeagueWinners: Winner[] = [
  { year: "2023", winner: "Barcelona B", runnerUp: "Real Madrid B" },
  { year: "2022", winner: "United Reserves", runnerUp: "Liverpool Reserves" },
  { year: "2021", winner: "Chelsea Reserves", runnerUp: "Arsenal Reserves" },
  { year: "2020", winner: "City Reserves", runnerUp: "Spurs Reserves" },
];

const cupWinners: Winner[] = [
  { year: "2023", winner: "Manchester United", runnerUp: "Chelsea FC" },
  { year: "2022", winner: "Liverpool", runnerUp: "Arsenal" },
  { year: "2021", winner: "Manchester City", runnerUp: "Tottenham" },
  { year: "2020", winner: "Arsenal", runnerUp: "Chelsea FC" },
];

const shieldWinners: Winner[] = [
  { year: "2023", winner: "Real Madrid", runnerUp: "Barcelona" },
  { year: "2022", winner: "Liverpool", runnerUp: "Manchester City" },
  { year: "2021", winner: "Chelsea FC", runnerUp: "Arsenal" },
  { year: "2020", winner: "Tottenham", runnerUp: "Manchester United" },
];

const individualAwards: Award[] = [
  { year: "2023", winner: "Lionel Messi", club: "Barcelona" },
  { year: "2022", winner: "Cristiano Ronaldo", club: "Manchester United" },
  { year: "2021", winner: "Kylian Mbappe", club: "PSG" },
  { year: "2020", winner: "Robert Lewandowski", club: "Bayern Munich" },
];

const playerOfTheYear: Award[] = [
  { year: "2023", winner: "Erling Haaland", club: "Manchester City" },
  { year: "2022", winner: "Kevin De Bruyne", club: "Manchester City" },
  { year: "2021", winner: "Mohamed Salah", club: "Liverpool" },
  { year: "2020", winner: "Virgil van Dijk", club: "Liverpool" },
];

interface CategoryProps {
  title: string;
  data: Winner[] | Award[];
  showRunnerUp?: boolean;
}

function Category({ title: _title, data, showRunnerUp = false }: CategoryProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="max-w-6xl bg-[var(--md-surface-container-lowest)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-0 sm:min-w-[600px]">
            <thead className="bg-[var(--md-primary)]">
              <tr>
                <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider w-10 sm:w-auto">
                  Year
                </th>
                <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider min-w-[100px] sm:min-w-0">
                  Winner
                </th>
                {showRunnerUp && (
                  <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider min-w-[100px] sm:min-w-0">
                    Runner-up
                  </th>
                )}
                {!showRunnerUp && (
                  <th className="px-1.5 sm:px-6 py-2 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[var(--md-on-primary)] uppercase tracking-wider min-w-[100px] sm:min-w-0">
                    Club
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-[var(--md-surface-container-lowest)] divide-y divide-[var(--md-outline-variant)]">
              {data.map((item, index) => (
                <tr 
                  key={index} 
                  className={`transition-all duration-200 ${
                    index % 2 === 0 
                      ? 'bg-[var(--md-surface-container-lowest)] hover:bg-[var(--md-surface-container-low)]' 
                      : 'bg-[var(--md-surface-container-low)] hover:bg-[var(--md-surface-container)]'
                  }`}
                >
                  <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm font-semibold text-[var(--md-primary)]">
                    {item.year}
                  </td>
                  <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm font-medium text-[var(--md-on-surface)] truncate max-w-[120px] sm:max-w-none">
                    {item.winner}
                  </td>
                  {showRunnerUp && (
                    <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm text-[var(--md-on-surface-variant)]">
                      {(item as Winner).runnerUp || "-"}
                    </td>
                  )}
                  {!showRunnerUp && (
                    <td className="px-1.5 sm:px-6 py-2 sm:py-5 text-xs sm:text-sm text-[var(--md-on-surface-variant)]">
                      {(item as Award).club || "-"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function RollOfHonourTab() {
  const [activeCategory, setActiveCategory] = useState("league");

  const categories = [
    { id: "league", label: "League Winners", data: leagueWinners, showRunnerUp: true },
    { id: "reserve", label: "Reserve League Winners", data: reserveLeagueWinners, showRunnerUp: true },
    { id: "cup", label: "Cup Winners", data: cupWinners, showRunnerUp: true },
    { id: "shield", label: "Shield Winners", data: shieldWinners, showRunnerUp: true },
    { id: "individual", label: "Individual Awards", data: individualAwards, showRunnerUp: false },
    { id: "poty", label: "Player of the Year", data: playerOfTheYear, showRunnerUp: false },
  ];

  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="roll-of-honour-tab">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--md-on-surface)] mb-2">Roll of Honour</h2>
        <p className="text-sm sm:text-base text-[var(--md-on-surface-variant)]">
          Celebrating the achievements and successes of our league throughout the years
        </p>
      </div>

      {/* Category Navigation */}
      <div className="mb-4 sm:mb-6 relative inline-block w-full sm:w-auto">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 text-xs sm:text-sm font-medium bg-[var(--md-primary)] text-[var(--md-on-primary)] border border-[var(--md-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] shadow-sm hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 appearance-none cursor-pointer relative"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 50 }}>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Active Category Content */}
      {activeCategoryData && (
        <Category
          title={activeCategoryData.label}
          data={activeCategoryData.data}
          showRunnerUp={activeCategoryData.showRunnerUp}
        />
      )}
    </div>
  );
}
