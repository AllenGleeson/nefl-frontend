"use client";

// src/components/Fixture/FixtureHeader.tsx
import Image from "next/image";

interface FixtureHeaderProps {
  homeTeam: {
    name: string;
    logo: string;
    score: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score: number;
  };
  status: string;
  date: string;
  league?: string;
}

export default function FixtureHeader({ homeTeam, awayTeam, status, date, league }: FixtureHeaderProps) {
  return (
    <div className="rounded-lg p-6 mt-16 mb-6">
      <div className="flex items-center justify-between mb-4">
        {/* Home Team */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="text-right flex-1">
            <h2 className="text-xl font-bold">{homeTeam.name}</h2>
          </div>
          <div className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={homeTeam.logo}
              alt={`${homeTeam.name} logo`}
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Score */}
        <div className="mx-8 text-center">
          <div className="text-4xl font-bold text-gray-900">
            {homeTeam.score} - {awayTeam.score}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={awayTeam.logo}
              alt={`${awayTeam.name} logo`}
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-bold">{awayTeam.name}</h2>
          </div>
        </div>
      </div>

      {/* League and Date centered under score */}
      <div className="text-center">
        {league && (
          <div className="text-sm font-semibold text-gray-800 mb-1">{league}</div>
        )}
        <div className="text-sm text-gray-600">{date}</div>
      </div>
    </div>
  );
}
