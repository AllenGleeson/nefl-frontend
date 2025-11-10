// src/components/Fixture/index.tsx
"use client";

import FixtureHeader from './FixtureHeader';
import SubstitutesSection from './SubstitutesSection';
import FormationsSection from './FormationsSection';
import MatchTimeline from './MatchTimeline';

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
  homeManager: {
    name: string;
    photo: string;
    team: string;
  };
  awayManager: {
    name: string;
    photo: string;
    team: string;
  };
  homeFormation: string;
  awayFormation: string;
  homePlayers: Array<{
    id: string;
    name: string;
    position: string;
    number: number;
    team: 'home' | 'away';
  }>;
  awayPlayers: Array<{
    id: string;
    name: string;
    position: string;
    number: number;
    team: 'home' | 'away';
  }>;
  substitutes: Array<{
    id: string;
    name: string;
    position: string;
    number: number;
    team: 'home' | 'away';
  }>;
  timelineEvents: Array<{
    id: string;
    minute: number;
    type: 'goal' | 'substitution' | 'card' | 'penalty';
    player: string;
    team: 'home' | 'away';
    description: string;
    additionalInfo?: string;
  }>;
  matchStats: {
    homeTeam: {
      name: string;
      stats: {
        yellowCards: number;
        redCards: number;
        corners: number;
        freeKicks: number;
        penalties: number;
        offsides: number;
        shots: number;
        shotsOnTarget: number;
        possession: number;
      };
    };
    awayTeam: {
      name: string;
      stats: {
        yellowCards: number;
        redCards: number;
        corners: number;
        freeKicks: number;
        penalties: number;
        offsides: number;
        shots: number;
        shotsOnTarget: number;
        possession: number;
      };
    };
  };
}

interface FixtureProps {
  fixtureData: FixtureData;
}

export default function Fixture({ fixtureData }: FixtureProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Fixture Header */}
      <FixtureHeader
        homeTeam={fixtureData.homeTeam}
        awayTeam={fixtureData.awayTeam}
        status={fixtureData.status}
        date={fixtureData.date}
        league={fixtureData.league}
      />
      
      {/* Formations Section */}
      <div className="mb-6">
        <FormationsSection
          homeFormation={fixtureData.homeFormation}
          awayFormation={fixtureData.awayFormation}
          homePlayers={fixtureData.homePlayers}
          awayPlayers={fixtureData.awayPlayers}
          homeManager={fixtureData.homeManager}
          awayManager={fixtureData.awayManager}
        />
        
        {/* Match Timeline */}
        <MatchTimeline
          events={fixtureData.timelineEvents}
        />
        
        <SubstitutesSection
          homePlayers={fixtureData.homePlayers}
          awayPlayers={fixtureData.awayPlayers}
          substitutes={fixtureData.substitutes}
          timelineEvents={fixtureData.timelineEvents}
          homeManager={fixtureData.homeManager}
          awayManager={fixtureData.awayManager}
        />
      </div>
    </div>
  );
}

// Export individual components for direct use if needed
export { default as FixtureHeader } from './FixtureHeader';
export { default as SubstitutesSection } from './SubstitutesSection';
export { default as FormationsSection } from './FormationsSection';
export { default as MatchTimeline } from './MatchTimeline';