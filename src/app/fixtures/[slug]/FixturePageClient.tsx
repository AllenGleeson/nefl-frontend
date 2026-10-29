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
