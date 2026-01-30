"use client";

// src/components/Fixture/FormationsSection.tsx
import { useState, useMemo, useCallback } from 'react';
import Pitch from './Pitch';

interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  team: 'home' | 'away';
}

interface Manager {
  name: string;
  photo: string;
  team: string;
}

interface FormationsSectionProps {
  homeFormation: string;
  awayFormation: string;
  homePlayers: Player[];
  awayPlayers: Player[];
  homeManager: Manager;
  awayManager: Manager;
}

export default function FormationsSection({ homeFormation, awayFormation, homePlayers, awayPlayers }: FormationsSectionProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Parse formation string (e.g., "4-4-2") and return array [defenders, midfielders, forwards]
  const parseFormation = useCallback((formation: string): number[] => {
    return formation.split('-').map(Number); // [4, 4, 2] for "4-4-2"
  }, []);

  // Get player positions based on formation
  const getPlayerPositions = useCallback((players: Player[], formation: string, team: 'home' | 'away') => {
    const [defCount, midCount, fwdCount] = parseFormation(formation);
    const positions: Array<{ player: Player; x: number; y: number }> = [];

    // Filter players by position
    const gk = players.filter(p => p.position === 'GK');
    const def = players.filter(p => p.position === 'DEF');
    const mid = players.filter(p => p.position === 'MID');
    const fwd = players.filter(p => p.position === 'FWD');

    // Home team plays on left side (0-50%), Away team on right side (50-100%)
    const isHome = team === 'home';

    // Goalkeeper - at the back near their goal
    if (gk.length > 0) {
      const xPos = isHome ? 8 : 92; // Near their goal
      positions.push({ player: gk[0], x: xPos, y: 50 });
    }

    // Defenders - in front of goalkeeper
    const defToUse = def.slice(0, Math.min(def.length, defCount));
    if (defToUse.length > 0) {
      const spacing = 100 / (defToUse.length + 1);
      defToUse.forEach((player, index) => {
        const xPos = isHome ? 18 : 82; // In front of goal
        const yPos = spacing * (index + 1);
        positions.push({ player, x: xPos, y: yPos });
      });
    }

    // Midfielders - in the middle of their half
    const midToUse = mid.slice(0, Math.min(mid.length, midCount));
    if (midToUse.length > 0) {
      const spacing = 100 / (midToUse.length + 1);
      midToUse.forEach((player, index) => {
        const xPos = isHome ? 28 : 72; // Middle of their half
        const yPos = spacing * (index + 1);
        positions.push({ player, x: xPos, y: yPos });
      });
    }

    // Forwards - near the center line
    const fwdToUse = fwd.slice(0, Math.min(fwd.length, fwdCount));
    if (fwdToUse.length > 0) {
      const spacing = 100 / (fwdToUse.length + 1);
      fwdToUse.forEach((player, index) => {
        const xPos = isHome ? 38 : 62; // Near center line
        const yPos = spacing * (index + 1);
        positions.push({ player, x: xPos, y: yPos });
      });
    }

    return positions;
  }, [parseFormation]);

  // Memoize position calculations
  const homePositions = useMemo(
    () => getPlayerPositions(homePlayers, homeFormation, 'home'),
    [homePlayers, homeFormation, getPlayerPositions]
  );
  
  const awayPositions = useMemo(
    () => getPlayerPositions(awayPlayers, awayFormation, 'away'),
    [awayPlayers, awayFormation, getPlayerPositions]
  );

  const handlePlayerClick = useCallback((player: Player) => {
    setSelectedPlayer(player);
  }, []);

  return (
    <div className="rounded-lg px-6 py-4">
      {/* Single Pitch */}
      <Pitch>
        {/* Home Team Players */}
        {homePositions.map(({ player, x, y }) => (
          <div
            key={player.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${selectedPlayer?.id === player.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
            style={{
              left: `${x}%`,
              top: `${y}%`
            }}
            onClick={() => handlePlayerClick(player)}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-blue-500 text-white border-2 border-white shadow-lg">
              {player.number}
            </div>
          </div>
        ))}

        {/* Away Team Players */}
        {awayPositions.map(({ player, x, y }) => (
          <div
            key={player.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${selectedPlayer?.id === player.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
            style={{
              left: `${x}%`,
              top: `${y}%`
            }}
            onClick={() => handlePlayerClick(player)}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-red-500 text-white border-2 border-white shadow-lg">
              {player.number}
            </div>
          </div>
        ))}
      </Pitch>

      {/* Formations under pitch */}
      <div className="flex items-center justify-center gap-80">
        <span className="font-semibold text-lg">{homeFormation}</span>
        <span className="font-semibold text-lg">{awayFormation}</span>
      </div>

      {/* Selected Player Info */}
      {selectedPlayer && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Player Information</h4>
          <p><strong>Name:</strong> {selectedPlayer.name}</p>
          <p><strong>Position:</strong> {selectedPlayer.position}</p>
          <p><strong>Number:</strong> {selectedPlayer.number}</p>
          <p><strong>Team:</strong> {selectedPlayer.team === 'home' ? 'Home' : 'Away'}</p>
        </div>
      )}
    </div>
  );
}