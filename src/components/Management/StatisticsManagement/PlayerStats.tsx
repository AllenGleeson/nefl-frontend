"use client";

// src/components/Management/StatisticsManagement/PlayerStats.tsx
import { useState } from 'react';

interface Player {
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  matches: number;
  rating: number;
}

export default function PlayerStats() {
  const [players] = useState<Player[]>([
    { name: 'Erling Haaland', team: 'Manchester City', position: 'ST', goals: 28, assists: 5, matches: 25, rating: 8.2 },
    { name: 'Mohamed Salah', team: 'Liverpool', position: 'RW', goals: 22, assists: 12, matches: 24, rating: 8.0 },
    { name: 'Harry Kane', team: 'Tottenham', position: 'ST', goals: 20, assists: 8, matches: 23, rating: 7.8 },
    { name: 'Kevin De Bruyne', team: 'Manchester City', position: 'CAM', goals: 8, assists: 18, matches: 22, rating: 8.1 },
    { name: 'Bukayo Saka', team: 'Arsenal', position: 'RW', goals: 16, assists: 10, matches: 24, rating: 7.9 }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Top Players</h2>
        <div className="space-y-4">
          {players.map((player, index) => (
            <div key={index} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden">
              {/* Mobile Layout */}
              <div className="block sm:hidden p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{player.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{player.team} • {player.position}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Goals</p>
                    <p className="font-bold text-orange-600">{player.goals}</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Assists</p>
                    <p className="font-bold text-orange-600">{player.assists}</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Matches</p>
                    <p className="font-bold text-orange-600">{player.matches}</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded p-2">
                    <p className="text-gray-500">Rating</p>
                    <p className="font-bold text-orange-600">{player.rating}</p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-sm text-gray-600">{player.team} • {player.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500">Goals</p>
                    <p className="font-bold text-orange-600">{player.goals}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Assists</p>
                    <p className="font-bold text-orange-600">{player.assists}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Matches</p>
                    <p className="font-bold text-orange-600">{player.matches}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Rating</p>
                    <p className="font-bold text-orange-600">{player.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
