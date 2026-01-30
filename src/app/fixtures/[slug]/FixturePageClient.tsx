"use client";

// src/app/fixtures/[slug]/FixturePageClient.tsx
import { useState } from 'react';
import Fixture, { type FixtureData } from '@/components/Fixture';
import { clubs } from '@/data/club';
import { assetUrl } from '@/utils/assetUrl';

export default function FixturePageClient() {
  // Use real teams from clubs data - selecting Parkvilla FC vs Duleek AFC as example
  const homeClub = clubs.find(c => c.name === 'Parkvilla FC') || clubs[0];
  const awayClub = clubs.find(c => c.name === 'Duleek AFC') || clubs[1];
  
  // Get the league (assuming both teams are in the same league for this fixture)
  const league = homeClub.leagues?.[0] || awayClub.leagues?.[0] || '';
  
  // Mock data - in real app, this would come from API based on params.slug
  const [fixtureData] = useState<FixtureData>({
    homeTeam: {
      name: homeClub.name,
      logo: homeClub.logo,
      score: 2
    },
    awayTeam: {
      name: awayClub.name,
      logo: awayClub.logo,
      score: 1
    },
    status: 'FT',
    date: 'Saturday, January 15, 2024',
    league: league,
    
    homeManager: {
      name: 'John O\'Brien',
      photo: '/managers/john-obrien.jpg',
      team: homeClub.name
    },
    awayManager: {
      name: 'Michael Murphy',
      photo: '/managers/michael-murphy.jpg',
      team: awayClub.name
    },
    
    homeFormation: '4-4-2',
    awayFormation: '3-5-2',
    
    homePlayers: [
      { id: '1', name: 'David Murphy', position: 'GK', number: 1, team: 'home' as const },
      { id: '2', name: 'Sean Kelly', position: 'DEF', number: 2, team: 'home' as const },
      { id: '3', name: 'Paul Ryan', position: 'DEF', number: 4, team: 'home' as const },
      { id: '4', name: 'Mark O\'Connor', position: 'DEF', number: 5, team: 'home' as const },
      { id: '5', name: 'James Wilson', position: 'DEF', number: 3, team: 'home' as const },
      { id: '6', name: 'Kevin Doyle', position: 'MID', number: 7, team: 'home' as const },
      { id: '7', name: 'Brian O\'Neill', position: 'MID', number: 8, team: 'home' as const },
      { id: '8', name: 'Stephen Ward', position: 'MID', number: 11, team: 'home' as const },
      { id: '9', name: 'Robbie Keane', position: 'MID', number: 10, team: 'home' as const },
      { id: '10', name: 'Shane Long', position: 'FWD', number: 9, team: 'home' as const },
      { id: '11', name: 'Daryl Murphy', position: 'FWD', number: 14, team: 'home' as const }
    ],
    
    awayPlayers: [
      { id: '12', name: 'Mark McNulty', position: 'GK', number: 1, team: 'away' as const },
      { id: '13', name: 'Alan Bennett', position: 'DEF', number: 4, team: 'away' as const },
      { id: '14', name: 'John O\'Flynn', position: 'DEF', number: 5, team: 'away' as const },
      { id: '15', name: 'Garry Buckley', position: 'DEF', number: 6, team: 'away' as const },
      { id: '16', name: 'Karl Sheppard', position: 'MID', number: 7, team: 'away' as const },
      { id: '17', name: 'Gearoid Morrissey', position: 'MID', number: 8, team: 'away' as const },
      { id: '18', name: 'Jimmy Keohane', position: 'MID', number: 10, team: 'away' as const },
      { id: '19', name: 'Sean Maguire', position: 'MID', number: 11, team: 'away' as const },
      { id: '20', name: 'Achille Campion', position: 'MID', number: 14, team: 'away' as const },
      { id: '21', name: 'Mark O\'Sullivan', position: 'FWD', number: 9, team: 'away' as const },
      { id: '22', name: 'Billy Dennehy', position: 'FWD', number: 12, team: 'away' as const }
    ],
    
    substitutes: [
      { id: '1', name: 'Gary Rogers', position: 'GK', number: 16, team: 'home' as const },
      { id: '2', name: 'Derek Pender', position: 'DEF', number: 15, team: 'home' as const },
      { id: '3', name: 'Conor McCormack', position: 'MID', number: 18, team: 'home' as const },
      { id: '4', name: 'Graham Burke', position: 'FWD', number: 19, team: 'home' as const },
      { id: '5', name: 'Peter Cherrie', position: 'GK', number: 20, team: 'away' as const },
      { id: '6', name: 'Colin Healy', position: 'MID', number: 17, team: 'away' as const },
      { id: '7', name: 'Danny Morrissey', position: 'FWD', number: 21, team: 'away' as const }
    ],
    
    timelineEvents: [
      {
        id: '1',
        minute: 15,
        type: 'goal' as const,
        player: 'Shane Long',
        team: 'home' as const,
        description: 'Goal scored',
        additionalInfo: 'Assist by Kevin Doyle'
      },
      {
        id: '2',
        minute: 23,
        type: 'card' as const,
        player: 'Alan Bennett',
        team: 'away' as const,
        description: 'Yellow card',
        additionalInfo: 'Foul on Shane Long'
      },
      {
        id: '3',
        minute: 45,
        type: 'substitution' as const,
        player: 'Graham Burke',
        team: 'home' as const,
        description: 'Substitution',
        additionalInfo: 'Replaced Daryl Murphy'
      },
      {
        id: '4',
        minute: 67,
        type: 'goal' as const,
        player: 'Sean Maguire',
        team: 'away' as const,
        description: 'Goal scored',
        additionalInfo: 'Penalty kick'
      },
      {
        id: '5',
        minute: 89,
        type: 'goal' as const,
        player: 'Robbie Keane',
        team: 'home' as const,
        description: 'Goal scored',
        additionalInfo: 'Free kick'
      }
    ],
    
    matchStats: {
      homeTeam: {
        name: homeClub.name,
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
        name: awayClub.name,
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
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${assetUrl("/images/fixturepage.jpg")})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0,0,0,0.35)',
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Decorative home team logo on left */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 opacity-20"
        style={{
          top: '30%',
          left: '5%',
          transform: 'translateY(-50%)',
          backgroundImage: `url(${assetUrl(homeClub.logo)})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          width: '30vw',
          height: '30vw',
          maxWidth: '500px',
          maxHeight: '500px',
          filter: 'grayscale(20%)',
        }}
      />

      {/* Decorative away team logo on right */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 opacity-20"
        style={{
          top: '30%',
          right: '5%',
          transform: 'translateY(-50%)',
          backgroundImage: `url(${assetUrl(awayClub.logo)})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          width: '30vw',
          height: '30vw',
          maxWidth: '500px',
          maxHeight: '500px',
          filter: 'grayscale(20%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <Fixture fixtureData={fixtureData} />
      </div>
    </div>
  );
}
