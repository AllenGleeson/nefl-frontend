"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getLeagueLogo } from "@/utils/leagueLogos";
import { getClubLogo } from "@/utils/clubLogos";

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
};

// Helper function to get team abbreviation
function getTeamAbbr(teamName: string): string {
  const words = teamName.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return teamName.substring(0, 3).toUpperCase();
}

// Latest results data using real teams from league tables
const leaguesData = {
  mens: {
    "UHY Farrelly Dawe White Premier Division": {
      matches: [
        { 
          id: 1,
          date: "Aug 15, 2025",
          datetime: "2025-08-15T19:30:00Z",
          home: "Parkvilla FC", 
          away: "Duleek AFC", 
          home_score: 2,
          away_score: 1,
          home_logo: getClubLogo("Parkvilla FC"),
          away_logo: getClubLogo("Duleek AFC"),
          home_abbr: "PV",
          away_abbr: "DU",
          competition: "UHY Farrelly Dawe White Premier Division",
          stage: "Matchweek 1",
          venue: "United Park",
          status: "FT" as const
        },
        { 
          id: 2,
          date: "Aug 15, 2025",
          datetime: "2025-08-15T19:30:00Z",
          home: "Kentstown Rovers FC", 
          away: "Rock Celtic FC", 
          home_score: 0,
          away_score: 3,
          home_logo: getClubLogo("Kentstown Rovers FC"),
          away_logo: getClubLogo("Rock Celtic FC"),
          home_abbr: "KR",
          away_abbr: "RC",
          competition: "UHY Farrelly Dawe White Premier Division",
          stage: "Matchweek 1",
          venue: "Kentstown Park",
          status: "FT" as const
        },
        { 
          id: 3,
          date: "Aug 16, 2025",
          datetime: "2025-08-16T17:00:00Z",
          home: "Quay Celtic FC", 
          away: "Bellurgan United", 
          home_score: 2,
          away_score: 0,
          home_logo: getClubLogo("Quay Celtic FC"),
          away_logo: getClubLogo("Bellurgan United"),
          home_abbr: "QC",
          away_abbr: "BU",
          competition: "UHY Farrelly Dawe White Premier Division",
          stage: "Matchweek 1",
          venue: "Parkvilla Stadium",
          status: "FT" as const
        },
      ],
      logo: getLeagueLogo("UHY Farrelly Dawe White Premier Division"),
      color: "from-red-500 to-blue-500"
    },
    "O Neills Sportswear Division 1": {
      matches: [
        { 
          id: 4,
          date: "Aug 16, 2025",
          datetime: "2025-08-16T15:00:00Z",
          home: "Walshestown FC", 
          away: "Athboy Celtic FC", 
          home_score: 4,
          away_score: 2,
          home_logo: getClubLogo("Walshestown FC"),
          away_logo: getClubLogo("Athboy Celtic FC"),
          home_abbr: "WA",
          away_abbr: "AC",
          competition: "O Neills Sportswear Division 1",
          stage: "Matchweek 1",
          venue: "Walshestown Ground",
          status: "FT" as const
        },
        { 
          id: 5,
          date: "Aug 16, 2025",
          datetime: "2025-08-16T15:00:00Z",
          home: "Trim Celtic AFC", 
          away: "Johnstown FC", 
          home_score: 1,
          away_score: 1,
          home_logo: getClubLogo("Trim Celtic AFC"),
          away_logo: getClubLogo("Johnstown FC"),
          home_abbr: "TC",
          away_abbr: "JF",
          competition: "O Neills Sportswear Division 1",
          stage: "Matchweek 1",
          venue: "Trim Sports Centre",
          status: "FT" as const
        },
      ],
      logo: getLeagueLogo("O Neills Sportswear Division 1"),
      color: "from-yellow-500 to-red-500"
    },
    "PM Blinds & Shutters Division 2": {
      matches: [{ 
        id: 6,
        date: "Aug 17, 2025",
        datetime: "2025-08-17T15:00:00Z",
        home: "BJD Celtic", 
        away: "Enfield Celtic FC", 
        home_score: 3,
        away_score: 1,
        home_logo: getClubLogo("BJD Celtic"),
        away_logo: getClubLogo("Enfield Celtic FC"),
        home_abbr: "BJ",
        away_abbr: "EC",
        competition: "PM Blinds & Shutters Division 2",
        stage: "Matchweek 1",
        venue: "Bellurgan Park",
        status: "FT" as const
      }],
      logo: getLeagueLogo("PM Blinds & Shutters Division 2"),
      color: "from-green-500 to-white"
    },
    "Superior Racking & Shelving Division 3": {
      matches: [{ 
        id: 7,
        date: "Aug 17, 2025",
        datetime: "2025-08-17T15:00:00Z",
        home: "Monaghan United FC", 
        away: "Monaghan Town FC", 
        home_score: 2,
        away_score: 1,
        home_logo: getClubLogo("Monaghan United FC"),
        away_logo: getClubLogo("Monaghan Town FC"),
        home_abbr: "MU",
        away_abbr: "MT",
        competition: "Superior Racking & Shelving Division 3",
        stage: "Matchweek 1",
        venue: "Gortakeegan",
        status: "FT" as const
      }],
      logo: getLeagueLogo("Superior Racking & Shelving Division 3"),
      color: "from-yellow-500 to-black"
    },
    "Superior Racking & Shelving Division 3A": {
      matches: [{ 
        id: 8,
        date: "Aug 18, 2025",
        datetime: "2025-08-18T15:00:00Z",
        home: "Aston Celtic FC", 
        away: "Electro Celtic FC", 
        home_score: 3,
        away_score: 2,
        home_logo: getClubLogo("Aston Celtic FC"),
        away_logo: getClubLogo("Electro Celtic FC"),
        home_abbr: "AS",
        away_abbr: "EL",
        competition: "Superior Racking & Shelving Division 3A",
        stage: "Matchweek 1",
        venue: "Aston Park",
        status: "FT" as const
      }],
      logo: getLeagueLogo("Superior Racking & Shelving Division 3A"),
      color: "from-blue-500 to-red-500"
    },
    "Superior Racking & Shelving Division 4": {
      matches: [{ 
        id: 9,
        date: "Aug 18, 2025",
        datetime: "2025-08-18T15:00:00Z",
        home: "Sporting BJD FC", 
        away: "Cootehill Harps", 
        home_score: 2,
        away_score: 1,
        home_logo: getClubLogo("Sporting BJD FC"),
        away_logo: getClubLogo("Cootehill Harps"),
        home_abbr: "SB",
        away_abbr: "CH",
        competition: "Superior Racking & Shelving Division 4",
        stage: "Matchweek 1",
        venue: "BJD Ground",
        status: "FT" as const
      }],
      logo: getLeagueLogo("Superior Racking & Shelving Division 4"),
      color: "from-orange-500 to-red-500"
    },
  },
  womens: {
    "UHY Farrelly Dawe White Womens Premier Division": {
      matches: [
        { 
          id: 10,
          date: "Aug 19, 2025",
          datetime: "2025-08-19T19:00:00Z",
          home: "Bellurgan United", 
          away: "Kingscourt Harps AFC", 
          home_score: 3,
          away_score: 1,
          home_logo: getClubLogo("Bellurgan United"),
          away_logo: getClubLogo("Kingscourt Harps AFC"),
          home_abbr: "BU",
          away_abbr: "KH",
          competition: "UHY Farrelly Dawe White Womens Premier Division",
          stage: "Matchweek 1",
          venue: "Bellurgan Park",
          status: "FT" as const
        },
        { 
          id: 11,
          date: "Aug 19, 2025",
          datetime: "2025-08-19T19:00:00Z",
          home: "Parkvilla FC", 
          away: "Athboy Celtic FC", 
          home_score: 2,
          away_score: 1,
          home_logo: getClubLogo("Parkvilla FC"),
          away_logo: getClubLogo("Athboy Celtic FC"),
          home_abbr: "PV",
          away_abbr: "AC",
          competition: "UHY Farrelly Dawe White Womens Premier Division",
          stage: "Matchweek 1",
          venue: "Parkvilla Stadium",
          status: "FT" as const
        },
      ],
      logo: getLeagueLogo("UHY Farrelly Dawe White Womens Premier Division"),
      color: "from-blue-600 to-red-600"
    },
    "UHY Farrelly Dawe White Womens Division 1": {
      matches: [{ 
        id: 12,
        date: "Aug 20, 2025",
        datetime: "2025-08-20T20:00:00Z",
        home: "Balbriggan FC", 
        away: "Balrath FC", 
        home_score: 2,
        away_score: 0,
        home_logo: getClubLogo("Balbriggan FC"),
        away_logo: getClubLogo("Balrath FC"),
        home_abbr: "BA",
        away_abbr: "BR",
        competition: "UHY Farrelly Dawe White Womens Division 1",
        stage: "Matchweek 1",
        venue: "Balbriggan Ground",
        status: "FT" as const
      }],
      logo: getLeagueLogo("UHY Farrelly Dawe White Womens Division 1"),
      color: "from-blue-700 to-white"
    },
    "UHY Farrelly Dawe White Division 2": {
      matches: [{ 
        id: 13,
        date: "Aug 21, 2025",
        datetime: "2025-08-21T15:00:00Z",
        home: "Rossin Rovers", 
        away: "Termonfeckin Celtic FC", 
        home_score: 1,
        away_score: 1,
        home_logo: getClubLogo("Rossin Rovers"),
        away_logo: getClubLogo("Termonfeckin Celtic FC"),
        home_abbr: "RR",
        away_abbr: "TC",
        competition: "UHY Farrelly Dawe White Division 2",
        stage: "Matchweek 1",
        venue: "Rossin Ground",
        status: "FT" as const
      }],
      logo: getLeagueLogo("UHY Farrelly Dawe White Division 2"),
      color: "from-green-600 to-red-600"
    },
  },
} as const;

type Category = "mens" | "womens";

export default function LatestResults() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("mens");
  const leagues = leaguesData[selectedCategory];
  const leagueNames = Object.keys(leagues) as string[];
  const [selectedLeague, setSelectedLeague] = useState<string>(() => {
    const initialLeagues = leaguesData["mens"];
    const initialLeagueNames = Object.keys(initialLeagues);
    return initialLeagueNames[0] || "";
  });

  // Reset selected league when category changes
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    const newLeagues = leaguesData[category];
    const newLeagueNames = Object.keys(newLeagues);
    setSelectedLeague(newLeagueNames[0] || "");
  };

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

          {/* Category Slider */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center">
              <div className="relative bg-[var(--md-surface-container)] rounded-full p-1 w-56 sm:w-64 lg:w-72 h-10 sm:h-12 shadow-sm">
                {/* Slider Background */}
                <div 
                  className={`absolute top-1 bottom-1 bg-[var(--md-primary)] rounded-full transition-all duration-300 shadow-md ${
                    selectedCategory === "mens" 
                      ? "left-1 w-[108px] sm:w-[124px] lg:w-[140px]" 
                      : "left-[116px] sm:left-[132px] lg:left-[148px] w-[108px] sm:w-[124px] lg:w-[140px]"
                  }`}
                />
                <button
                  onClick={() => handleCategoryChange("mens")}
                  className={`absolute top-1 bottom-1 left-1 rounded-full font-semibold flex items-center justify-center transition-all duration-300 z-10 cursor-pointer px-3 sm:px-4 w-[108px] sm:w-[124px] lg:w-[140px] ${
                    selectedCategory === "mens"
                      ? "text-[var(--md-on-primary)]"
                      : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                  }`}
                >
                  <span className="text-xs sm:text-sm lg:text-base whitespace-nowrap">Men</span>
                </button>
                <button
                  onClick={() => handleCategoryChange("womens")}
                  className={`absolute top-1 bottom-1 left-[116px] sm:left-[132px] lg:left-[148px] right-1 rounded-full font-semibold flex items-center justify-center transition-all duration-300 z-10 cursor-pointer px-3 sm:px-4 ${
                    selectedCategory === "womens"
                      ? "text-[var(--md-on-primary)]"
                      : "text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]"
                  }`}
                >
                  <span className="text-xs sm:text-sm lg:text-base whitespace-nowrap">Women</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile: Dropdown Selector */}
          <div className="sm:hidden mb-6 sm:mb-0 relative">
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-base font-medium bg-[var(--md-primary)] border border-[var(--md-primary)] rounded-xl shadow-sm text-[var(--md-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary-container)] focus:border-[var(--md-primary-container)] hover:bg-[var(--md-primary-fixed-dim)] transition-all duration-200 appearance-none cursor-pointer"
            >
              {leagueNames.map((leagueName) => (
                <option 
                  key={leagueName} 
                  value={leagueName}
                  className="bg-[var(--md-primary)] text-[var(--md-on-primary)]"
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
                className="text-[var(--md-on-primary)]"
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
            {leagueNames.map((leagueName) => {
              const leagueData = (leagues as unknown as Record<string, { logo: string; matches: Match[] }>)[leagueName];
              if (!leagueData) return null;
              return (
                <button
                  key={leagueName}
                  onClick={() => setSelectedLeague(leagueName)}
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
              );
            })}
          </div>
        </div>

        {/* Mobile: Swipeable Cards */}
        <div className="sm:hidden">
          <div 
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {selectedLeague && (leagues as unknown as Record<string, { matches: Match[] }>)[selectedLeague]?.matches.map((match: Match) => (
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
          selectedLeague && (leagues as unknown as Record<string, { matches: Match[] }>)[selectedLeague]?.matches.length === 1 
            ? 'grid-cols-1 justify-center max-w-sm mx-auto' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {selectedLeague && (leagues as unknown as Record<string, { matches: Match[] }>)[selectedLeague]?.matches.map((match: Match) => (
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