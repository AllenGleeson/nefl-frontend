"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

// Match type definition
type Match = {
  id: number;
  date: string;
  datetime: string;
  home: string;
  away: string;
  home_score: number;
  away_score: number;
  home_logo: string;
  away_logo: string;
  home_abbr: string;
  away_abbr: string;
  competition: string;
  stage?: string;
  venue: string;
  status: "live" | "FT" | "Scheduled";
  live_minute?: string;
};

//  Mock data for leagues and their latest results
const leagues = {
  "Premier League": {
    matches: [
      { 
        id: 1,
        date: "Mar 1, 2024",
        datetime: "2024-03-01T15:00:00Z",
        home: "Team A", 
        away: "Team B", 
        home_score: 2,
        away_score: 1,
        home_logo: "/images/Ardee-Celtic.webp",
        away_logo: "/images/Ardee-Celtic.webp",
        home_abbr: "TEA",
        away_abbr: "TEB",
        competition: "NEFL Premier League",
        stage: "Matchweek 1",
        venue: "United Park",
        status: "FT" as const
      },
      { 
        id: 2,
        date: "Mar 1, 2024",
        datetime: "2024-03-01T19:30:00Z",
        home: "Team C", 
        away: "Team D", 
        home_score: 0,
        away_score: 0,
        home_logo: "/images/Ardee-Celtic.webp",
        away_logo: "/images/Ardee-Celtic.webp",
        home_abbr: "TEC",
        away_abbr: "TED",
        competition: "NEFL Premier League",
        stage: "Matchweek 1",
        venue: "Kentstown Park",
        status: "live" as const,
        live_minute: "23'"
      },
    ],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-red-500 to-blue-500"
  },
  "La Liga": {
    matches: [
      { 
        id: 3,
        date: "Mar 2, 2024",
        datetime: "2024-03-02T16:00:00Z",
        home: "Team E", 
        away: "Team F", 
        home_score: 1,
        away_score: 3,
        home_logo: "/images/Ardee-Celtic.webp",
        away_logo: "/images/Ardee-Celtic.webp",
        home_abbr: "TEE",
        away_abbr: "TEF",
        competition: "NEFL La Liga",
        stage: "Matchweek 2",
        venue: "Stadium One",
        status: "FT" as const
      },
      { 
        id: 4,
        date: "Mar 2, 2024",
        datetime: "2024-03-02T18:00:00Z",
        home: "Team G", 
        away: "Team H", 
        home_score: 2,
        away_score: 2,
        home_logo: "/images/Ardee-Celtic.webp",
        away_logo: "/images/Ardee-Celtic.webp",
        home_abbr: "TEG",
        away_abbr: "TEH",
        competition: "NEFL La Liga",
        stage: "Matchweek 2",
        venue: "Stadium Two",
        status: "FT" as const
      },
    ],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-yellow-500 to-red-500"
  },
  "Serie A": {
    matches: [{ 
      id: 5,
      date: "Mar 3, 2024",
      datetime: "2024-03-03T15:00:00Z",
      home: "Team I", 
      away: "Team J", 
      home_score: 4,
      away_score: 0,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TEI",
      away_abbr: "TEJ",
      competition: "NEFL Serie A",
      stage: "Matchweek 3",
      venue: "Stadium Three",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-green-500 to-white"
  },
  "Bundesliga": {
    matches: [{ 
      id: 6,
      date: "Mar 3, 2024",
      datetime: "2024-03-03T17:00:00Z",
      home: "Team K", 
      away: "Team L", 
      home_score: 3,
      away_score: 2,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TEK",
      away_abbr: "TEL",
      competition: "NEFL Bundesliga",
      stage: "Matchweek 3",
      venue: "Stadium Four",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-yellow-500 to-black"
  },
  "Ligue 1": {
    matches: [{ 
      id: 7,
      date: "Mar 4, 2024",
      datetime: "2024-03-04T15:30:00Z",
      home: "Team M", 
      away: "Team N", 
      home_score: 1,
      away_score: 1,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TEM",
      away_abbr: "TEN",
      competition: "NEFL Ligue 1",
      stage: "Matchweek 4",
      venue: "Stadium Five",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-blue-500 to-red-500"
  },
  "Eredivisie": {
    matches: [{ 
      id: 8,
      date: "Mar 4, 2024",
      datetime: "2024-03-04T19:00:00Z",
      home: "Team O", 
      away: "Team P", 
      home_score: 2,
      away_score: 3,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TEO",
      away_abbr: "TEP",
      competition: "NEFL Eredivisie",
      stage: "Matchweek 4",
      venue: "Stadium Six",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-orange-500 to-red-500"
  },
  "MLS": {
    matches: [{ 
      id: 9,
      date: "Mar 5, 2024",
      datetime: "2024-03-05T20:00:00Z",
      home: "Team Q", 
      away: "Team R", 
      home_score: 0,
      away_score: 1,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TEQ",
      away_abbr: "TER",
      competition: "NEFL MLS",
      stage: "Matchweek 5",
      venue: "Stadium Seven",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-blue-600 to-red-600"
  },
  "Championship": {
    matches: [{ 
      id: 10,
      date: "Mar 6, 2024",
      datetime: "2024-03-06T15:00:00Z",
      home: "Team S", 
      away: "Team T", 
      home_score: 3,
      away_score: 3,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TES",
      away_abbr: "TET",
      competition: "NEFL Championship",
      stage: "Matchweek 6",
      venue: "Stadium Eight",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-blue-700 to-white"
  },
  "Liga MX": {
    matches: [{ 
      id: 11,
      date: "Mar 7, 2024",
      datetime: "2024-03-07T18:00:00Z",
      home: "Team U", 
      away: "Team V", 
      home_score: 2,
      away_score: 1,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TEU",
      away_abbr: "TEV",
      competition: "NEFL Liga MX",
      stage: "Matchweek 7",
      venue: "Stadium Nine",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-green-600 to-red-600"
  },
  "A-League": {
    matches: [{ 
      id: 12,
      date: "Mar 8, 2024",
      datetime: "2024-03-08T16:30:00Z",
      home: "Team W", 
      away: "Team X", 
      home_score: 1,
      away_score: 0,
      home_logo: "/images/Ardee-Celtic.webp",
      away_logo: "/images/Ardee-Celtic.webp",
      home_abbr: "TEW",
      away_abbr: "TEX",
      competition: "NEFL A-League",
      stage: "Matchweek 8",
      venue: "Stadium Ten",
      status: "FT" as const
    }],
    logo: "/images/logos/UHY_Logo.webp",
    color: "from-yellow-500 to-green-600"
  },
} as const;

type LeagueName = keyof typeof leagues;

export default function LatestResults() {
  const [selectedLeague, setSelectedLeague] = useState<LeagueName>("Premier League");

  return (
    <section className="latest-results py-8 sm:py-12 md:py-16 ">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          {/* Header with Title and Link */}
          <div className="flex flex-row justify-between items-center gap-2 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">
              Latest Results
            </h2>
            <Link 
              href="/fixtures"
              className="text-[var(--md-primary)] hover:text-[var(--md-primary)]/80 transition-colors duration-200 flex items-center gap-1 text-sm sm:text-base"
            >
              VIEW ALL RESULTS
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <p className="text-base sm:text-lg text-[var(--md-on-surface-variant)] mb-6 sm:mb-8 max-w-2xl">
            Stay updated with the latest match results from your favorite leagues
          </p>
          
          {/* Mobile: Dropdown Selector */}
          <div className="sm:hidden mb-6 sm:mb-0 relative">
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value as LeagueName)}
              className="w-full px-4 py-3 pr-12 text-base font-medium bg-[var(--md-surface-container)] border border-[var(--md-outline-variant)] rounded-xl shadow-sm text-[var(--md-on-surface-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] focus:border-[var(--md-primary)] hover:bg-[var(--md-surface-container-high)] hover:text-[var(--md-on-surface)] transition-all duration-200 appearance-none cursor-pointer"
            >
              {Object.entries(leagues).map(([leagueName]) => (
                <option 
                  key={leagueName} 
                  value={leagueName}
                  className="bg-[var(--md-surface-container)] text-[var(--md-on-surface-variant)]"
                >
                  {leagueName}
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
                className="text-[var(--md-on-surface-variant)]"
              >
                <path 
                  d="M8 11L3 6h10z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          {/* Desktop: League Selector Buttons */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3">
            {Object.entries(leagues).map(([leagueName, leagueData]) => (
              <button
                key={leagueName}
                onClick={() => setSelectedLeague(leagueName as LeagueName)}
                className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-xl shadow-sm ${
                  selectedLeague === leagueName
                    ? 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] shadow-md'
                    : 'bg-[var(--md-surface-variant)] border border-[var(--md-outline-variant)] text-[var(--md-on-surface-variant)] hover:border-[var(--md-primary)] hover:bg-[var(--md-primary-container)] hover:text-[var(--md-on-primary-container)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] focus:border-[var(--md-primary)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/50 rounded-full flex items-center justify-center">
                    <img 
                      src={leagueData.logo} 
                      alt={`${leagueName} Logo`} 
                      className="w-3 h-3 sm:w-5 sm:h-5 object-contain"
                    />
                  </div>
                  <span>{leagueName}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Swipeable Cards */}
        <div className="sm:hidden">
          <div 
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {leagues[selectedLeague].matches.map((match: Match) => (
              <div 
                key={`mobile-${match.id}`}
                className="flex-shrink-0 w-[90%] snap-center px-2"
              >
                <Link
                  href={`/fixtures/${match.id}`}
                  className="bg-[var(--md-surface-container-lowest)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[var(--md-outline-variant)] overflow-hidden block cursor-pointer rounded-lg"
                >
              {/* Match Header - Competition Info */}
              <div className="px-4 sm:px-6 py-3 border-b border-[var(--md-outline-variant)]">
                <p className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface)] mb-1">
                  {match.competition}
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--md-on-surface-variant)]">
                  {match.stage && (
                    <>
                      <span>{match.stage}</span>
                      <span>·</span>
                    </>
                  )}
                  <span>{match.venue}</span>
                </div>
              </div>
              
              {/* Match Body - Teams and Score */}
              <div className="p-4 sm:p-6">
                {/* Teams Display */}
                <div className="flex items-center justify-between mb-4">
                  {/* Home Team */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-2">
                      <Image
                        src={match.home_logo}
                        alt={match.home}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <abbr className="text-xs sm:text-sm font-medium text-[var(--md-on-surface)]" title={match.home}>
                      {match.home_abbr}
                    </abbr>
                  </div>
                  
                  {/* Score Display */}
                  <div className="flex flex-col items-center mx-4 sm:mx-6">
                    {/* Score Display - Side by Side */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">
                        {match.home_score}
                      </div>
                      <span className="text-xl sm:text-2xl font-bold text-gray-500">-</span>
                      <div className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">
                        {match.away_score}
                      </div>
                    </div>
                  </div>
                  
                  {/* Away Team */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-2">
                      <Image
                        src={match.away_logo}
                        alt={match.away}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <abbr className="text-xs sm:text-sm font-medium text-[var(--md-on-surface)]" title={match.away}>
                      {match.away_abbr}
                    </abbr>
                  </div>
                </div>
              </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Results Grid */}
        <div className={`hidden sm:grid gap-4 sm:gap-6 ${
          leagues[selectedLeague].matches.length === 1 
            ? 'grid-cols-1 justify-center max-w-sm mx-auto' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {leagues[selectedLeague].matches.map((match: Match) => (
            <Link
              key={`desktop-${match.id}`}
              href={`/fixtures/${match.id}`}
              className="bg-[var(--md-surface-container-lowest)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[var(--md-outline-variant)] overflow-hidden block cursor-pointer rounded-lg"
            >
              {/* Match Header - Competition Info */}
              <div className="px-4 sm:px-6 py-3 border-b border-[var(--md-outline-variant)]">
                <p className="text-xs sm:text-sm font-semibold text-[var(--md-on-surface)] mb-1">
                  {match.competition}
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--md-on-surface-variant)]">
                  {match.stage && (
                    <>
                      <span>{match.stage}</span>
                      <span>·</span>
                    </>
                  )}
                  <span>{match.venue}</span>
                </div>
              </div>
              
              {/* Match Body - Teams and Score */}
              <div className="p-4 sm:p-6">
                {/* Teams Display */}
                <div className="flex items-center justify-between mb-4">
                  {/* Home Team */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-2">
                      <Image
                        src={match.home_logo}
                        alt={match.home}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <abbr className="text-xs sm:text-sm font-medium text-[var(--md-on-surface)]" title={match.home}>
                      {match.home_abbr}
                    </abbr>
                  </div>
                  
                  {/* Score Display */}
                  <div className="flex flex-col items-center mx-4 sm:mx-6">
                    {/* Score Display - Side by Side */}
                    <div className="flex flex-row items-center gap-2">
                      <div className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">
                        {match.home_score}
                      </div>
                      <span className="text-xl sm:text-2xl font-bold text-gray-500">-</span>
                      <div className="text-2xl sm:text-3xl font-bold text-[var(--md-on-surface)]">
                        {match.away_score}
                      </div>
                    </div>
                  </div>
                  
                  {/* Away Team */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 relative mb-2">
                      <Image
                        src={match.away_logo}
                        alt={match.away}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <abbr className="text-xs sm:text-sm font-medium text-[var(--md-on-surface)]" title={match.away}>
                      {match.away_abbr}
                    </abbr>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}