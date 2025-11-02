"use client";

// src/components/Management/StatisticsManagement/TeamStats.tsx
import { useState } from 'react';

interface Team {
  name: string;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  cleanSheets: number;
  possession: number;
  shotsPerGame: number;
}

export default function TeamStats() {
  const [teams] = useState<Team[]>([
    { name: 'Manchester City', goalsFor: 45, goalsAgainst: 15, goalDifference: 30, cleanSheets: 8, possession: 68, shotsPerGame: 18.2 },
    { name: 'Arsenal', goalsFor: 42, goalsAgainst: 18, goalDifference: 24, cleanSheets: 7, possession: 62, shotsPerGame: 16.8 },
    { name: 'Liverpool', goalsFor: 38, goalsAgainst: 20, goalDifference: 18, cleanSheets: 6, possession: 58, shotsPerGame: 17.5 },
    { name: 'Chelsea', goalsFor: 35, goalsAgainst: 22, goalDifference: 13, cleanSheets: 5, possession: 55, shotsPerGame: 15.3 },
    { name: 'Tottenham', goalsFor: 33, goalsAgainst: 25, goalDifference: 8, cleanSheets: 4, possession: 52, shotsPerGame: 14.7 }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Team Statistics</h2>
        <div className="space-y-4">
          {teams.map((team, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{team.name}</h3>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Goals For</p>
                  <p className="font-bold text-green-600">{team.goalsFor}</p>
                </div>
                <div>
                  <p className="text-gray-500">Goals Against</p>
                  <p className="font-bold text-red-600">{team.goalsAgainst}</p>
                </div>
                <div>
                  <p className="text-gray-500">Goal Difference</p>
                  <p className="font-bold text-orange-600">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</p>
                </div>
                <div>
                  <p className="text-gray-500">Clean Sheets</p>
                  <p className="font-bold text-blue-600">{team.cleanSheets}</p>
                </div>
                <div>
                  <p className="text-gray-500">Possession %</p>
                  <p className="font-bold text-purple-600">{team.possession}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Shots/Game</p>
                  <p className="font-bold text-indigo-600">{team.shotsPerGame}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
