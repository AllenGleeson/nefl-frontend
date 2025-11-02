"use client";

// src/app/fixtures/[slug]/page.tsx
import { useState } from 'react';
import { 
  FixtureHeader, 
  ManagersSection, 
  SubstitutesSection, 
  FormationsSection, 
  MatchTimeline, 
  MatchStatistics 
} from '@/components/Fixture';

interface FixturePageProps {
  params: {
    slug: string;
  };
}

export default function FixturePage(_props: FixturePageProps) {
  // Mock data - in real app, this would come from API based on params.slug
  const [fixtureData] = useState({
    homeTeam: {
      name: 'Dublin United',
      logo: '/logos/dublin-united.png',
      score: 2
    },
    awayTeam: {
      name: 'Cork City FC',
      logo: '/logos/cork-city.png',
      score: 1
    },
    status: 'FT',
    date: 'Saturday, January 15, 2024',
    venue: 'Aviva Stadium, Dublin',
    
    homeManager: {
      name: 'John O\'Brien',
      photo: '/managers/john-obrien.jpg',
      team: 'Dublin United'
    },
    awayManager: {
      name: 'Michael Murphy',
      photo: '/managers/michael-murphy.jpg',
      team: 'Cork City FC'
    },
    
    homeFormation: '4-4-2',
    awayFormation: '3-5-2',
    
    homePlayers: [
      { id: '1', name: 'David Murphy', position: 'GK', number: 1, team: 'home' },
      { id: '2', name: 'Sean Kelly', position: 'DEF', number: 2, team: 'home' },
      { id: '3', name: 'Paul Ryan', position: 'DEF', number: 4, team: 'home' },
      { id: '4', name: 'Mark O\'Connor', position: 'DEF', number: 5, team: 'home' },
      { id: '5', name: 'James Wilson', position: 'DEF', number: 3, team: 'home' },
      { id: '6', name: 'Kevin Doyle', position: 'MID', number: 7, team: 'home' },
      { id: '7', name: 'Brian O\'Neill', position: 'MID', number: 8, team: 'home' },
      { id: '8', name: 'Stephen Ward', position: 'MID', number: 11, team: 'home' },
      { id: '9', name: 'Robbie Keane', position: 'MID', number: 10, team: 'home' },
      { id: '10', name: 'Shane Long', position: 'FWD', number: 9, team: 'home' },
      { id: '11', name: 'Daryl Murphy', position: 'FWD', number: 14, team: 'home' }
    ],
    
    awayPlayers: [
      { id: '12', name: 'Mark McNulty', position: 'GK', number: 1, team: 'away' },
      { id: '13', name: 'Alan Bennett', position: 'DEF', number: 4, team: 'away' },
      { id: '14', name: 'John O\'Flynn', position: 'DEF', number: 5, team: 'away' },
      { id: '15', name: 'Garry Buckley', position: 'DEF', number: 6, team: 'away' },
      { id: '16', name: 'Karl Sheppard', position: 'MID', number: 7, team: 'away' },
      { id: '17', name: 'Gearoid Morrissey', position: 'MID', number: 8, team: 'away' },
      { id: '18', name: 'Jimmy Keohane', position: 'MID', number: 10, team: 'away' },
      { id: '19', name: 'Sean Maguire', position: 'MID', number: 11, team: 'away' },
      { id: '20', name: 'Achille Campion', position: 'MID', number: 14, team: 'away' },
      { id: '21', name: 'Mark O\'Sullivan', position: 'FWD', number: 9, team: 'away' },
      { id: '22', name: 'Billy Dennehy', position: 'FWD', number: 12, team: 'away' }
    ],
    
    substitutes: [
      { id: '1', name: 'Gary Rogers', position: 'GK', number: 16, team: 'home' },
      { id: '2', name: 'Derek Pender', position: 'DEF', number: 15, team: 'home' },
      { id: '3', name: 'Conor McCormack', position: 'MID', number: 18, team: 'home' },
      { id: '4', name: 'Graham Burke', position: 'FWD', number: 19, team: 'home' },
      { id: '5', name: 'Peter Cherrie', position: 'GK', number: 20, team: 'away' },
      { id: '6', name: 'Colin Healy', position: 'MID', number: 17, team: 'away' },
      { id: '7', name: 'Danny Morrissey', position: 'FWD', number: 21, team: 'away' }
    ],
    
    timelineEvents: [
      {
        id: '1',
        minute: 15,
        type: 'goal',
        player: 'Shane Long',
        team: 'home',
        description: 'Goal scored',
        additionalInfo: 'Assist by Kevin Doyle'
      },
      {
        id: '2',
        minute: 23,
        type: 'card',
        player: 'Alan Bennett',
        team: 'away',
        description: 'Yellow card',
        additionalInfo: 'Foul on Shane Long'
      },
      {
        id: '3',
        minute: 45,
        type: 'substitution',
        player: 'Graham Burke',
        team: 'home',
        description: 'Substitution',
        additionalInfo: 'Replaced Daryl Murphy'
      },
      {
        id: '4',
        minute: 67,
        type: 'goal',
        player: 'Sean Maguire',
        team: 'away',
        description: 'Goal scored',
        additionalInfo: 'Penalty kick'
      },
      {
        id: '5',
        minute: 89,
        type: 'goal',
        player: 'Robbie Keane',
        team: 'home',
        description: 'Goal scored',
        additionalInfo: 'Free kick'
      }
    ],
    
    matchStats: {
      homeTeam: {
        name: 'Dublin United',
        stats: {
          yellowCards: 2,
          redCards: 0,
          corners: 8,
          freeKicks: 12,
          penalties: 0,
          offsides: 3,
          shots: 15,
          shotsOnTarget: 7,
          possession: 58
        }
      },
      awayTeam: {
        name: 'Cork City FC',
        stats: {
          yellowCards: 3,
          redCards: 0,
          corners: 5,
          freeKicks: 15,
          penalties: 1,
          offsides: 2,
          shots: 12,
          shotsOnTarget: 4,
          possession: 42
        }
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Fixture Header */}
        <FixtureHeader
          homeTeam={fixtureData.homeTeam}
          awayTeam={fixtureData.awayTeam}
          status={fixtureData.status}
          date={fixtureData.date}
          venue={fixtureData.venue}
        />
        
        {/* Managers Section */}
        <ManagersSection
          homeManager={fixtureData.homeManager}
          awayManager={fixtureData.awayManager}
        />
        
        {/* Formations and Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-6">
            <FormationsSection
              homeFormation={fixtureData.homeFormation}
              awayFormation={fixtureData.awayFormation}
              homePlayers={fixtureData.homePlayers}
              awayPlayers={fixtureData.awayPlayers}
            />
            <SubstitutesSection
              substitutes={fixtureData.substitutes}
            />
          </div>
          
          <div>
            <MatchTimeline
              events={fixtureData.timelineEvents}
            />
          </div>
        </div>
        
        {/* Match Statistics */}
        <MatchStatistics
          stats={fixtureData.matchStats}
        />
      </div>
    </div>
  );
}
