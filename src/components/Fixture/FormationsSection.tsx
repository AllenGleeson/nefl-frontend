"use client";

// src/components/Fixture/FormationsSection.tsx
import { useState } from 'react';

interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  team: 'home' | 'away';
}

interface FormationsSectionProps {
  homeFormation: string;
  awayFormation: string;
  homePlayers: Player[];
  awayPlayers: Player[];
}

export default function FormationsSection({ homeFormation, awayFormation, homePlayers, awayPlayers }: FormationsSectionProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const renderFormation = (players: Player[], team: 'home' | 'away') => {
    const positions = {
      'GK': { x: 50, y: 95 },
      'DEF': { x: 50, y: 80 },
      'MID': { x: 50, y: 50 },
      'FWD': { x: 50, y: 20 }
    };

    return (
      <div className="relative w-full h-64 bg-green-100 rounded-lg border-2 border-green-300">
        <div className="absolute inset-0 p-4">
          <div className="text-center text-xs font-bold text-gray-600 mb-2">
            {team === 'home' ? homeFormation : awayFormation}
          </div>
          
          {/* Goal */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 border-2 border-gray-400 rounded-t"></div>
          
          {/* Players */}
          {players.map((player) => (
            <div
              key={player.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                selectedPlayer?.id === player.id ? 'scale-110 z-10' : 'hover:scale-105'
              }`}
              style={{
                left: `${positions[player.position as keyof typeof positions]?.x || 50}%`,
                top: `${positions[player.position as keyof typeof positions]?.y || 50}%`
              }}
              onClick={() => setSelectedPlayer(player)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                team === 'home' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {player.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Formations</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Home Formation */}
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-3">Home Team</h4>
          {renderFormation(homePlayers, 'home')}
        </div>
        
        {/* Away Formation */}
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-3">Away Team</h4>
          {renderFormation(awayPlayers, 'away')}
        </div>
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
