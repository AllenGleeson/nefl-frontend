// src/components/Fixture/index.tsx
"use client";

import FixtureHeader from './FixtureHeader';

export interface FixtureData {
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

interface FixtureProps {
  fixtureData: FixtureData;
}

export default function Fixture({ fixtureData }: FixtureProps) {
  return (
    <div className="p-6">
      <FixtureHeader
        homeTeam={fixtureData.homeTeam}
        awayTeam={fixtureData.awayTeam}
        status={fixtureData.status}
        date={fixtureData.date}
        league={fixtureData.league}
      />
    </div>
  );
}

export { default as FixtureHeader } from './FixtureHeader';
