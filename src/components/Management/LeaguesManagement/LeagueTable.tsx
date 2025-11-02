"use client";

// src/components/Management/LeaguesManagement/LeagueTable.tsx
import { useState } from 'react';

interface Team {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export default function LeagueTable() {
  const [teams] = useState<Team[]>([
    { position: 1, name: 'Manchester City', played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 45, goalsAgainst: 15, goalDifference: 30, points: 48 },
    { position: 2, name: 'Arsenal', played: 20, won: 14, drawn: 4, lost: 2, goalsFor: 42, goalsAgainst: 18, goalDifference: 24, points: 46 },
    { position: 3, name: 'Liverpool', played: 20, won: 13, drawn: 5, lost: 2, goalsFor: 38, goalsAgainst: 20, goalDifference: 18, points: 44 },
    { position: 4, name: 'Chelsea', played: 20, won: 12, drawn: 6, lost: 2, goalsFor: 35, goalsAgainst: 22, goalDifference: 13, points: 42 },
    { position: 5, name: 'Tottenham', played: 20, won: 11, drawn: 7, lost: 2, goalsFor: 33, goalsAgainst: 25, goalDifference: 8, points: 40 }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Current League Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-600">Pos</th>
                <th className="text-left py-2 font-medium text-gray-600">Team</th>
                <th className="text-center py-2 font-medium text-gray-600">P</th>
                <th className="text-center py-2 font-medium text-gray-600">W</th>
                <th className="text-center py-2 font-medium text-gray-600">D</th>
                <th className="text-center py-2 font-medium text-gray-600">L</th>
                <th className="text-center py-2 font-medium text-gray-600">GF</th>
                <th className="text-center py-2 font-medium text-gray-600">GA</th>
                <th className="text-center py-2 font-medium text-gray-600">GD</th>
                <th className="text-center py-2 font-medium text-gray-600">Pts</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.position} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-medium">{team.position}</td>
                  <td className="py-3 font-medium">{team.name}</td>
                  <td className="py-3 text-center">{team.played}</td>
                  <td className="py-3 text-center">{team.won}</td>
                  <td className="py-3 text-center">{team.drawn}</td>
                  <td className="py-3 text-center">{team.lost}</td>
                  <td className="py-3 text-center">{team.goalsFor}</td>
                  <td className="py-3 text-center">{team.goalsAgainst}</td>
                  <td className="py-3 text-center">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                  <td className="py-3 text-center font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
