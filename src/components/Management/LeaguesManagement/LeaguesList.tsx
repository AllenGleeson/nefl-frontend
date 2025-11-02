"use client";

// src/components/Management/LeaguesManagement/LeaguesList.tsx
import { useState } from 'react';

interface League {
  id: string;
  name: string;
  season: string;
  teams: number;
  matches: number;
  status: 'active' | 'inactive' | 'completed';
  startDate: string;
  endDate: string;
}

type Props = {
  onAddLeague?: () => void;
}

export default function LeaguesList({ onAddLeague }: Props) {
  const [leagues] = useState<League[]>([
    {
      id: '1',
      name: 'Premier League',
      season: '2023-24',
      teams: 20,
      matches: 380,
      status: 'active',
      startDate: '2023-08-12',
      endDate: '2024-05-19'
    },
    {
      id: '2',
      name: 'Championship',
      season: '2023-24',
      teams: 24,
      matches: 552,
      status: 'active',
      startDate: '2023-08-05',
      endDate: '2024-05-04'
    },
    {
      id: '3',
      name: 'League One',
      season: '2023-24',
      teams: 24,
      matches: 552,
      status: 'active',
      startDate: '2023-08-05',
      endDate: '2024-05-04'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">League Competitions</h2>
          <button 
            onClick={onAddLeague}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Create New League
          </button>
        </div>
        
        <div className="space-y-4">
          {leagues.map((league) => (
            <div key={league.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <h3 className="text-lg font-semibold">{league.name}</h3>
                      <p className="text-sm text-gray-600">Season {league.season}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Teams</p>
                        <p className="font-medium">{league.teams}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Matches</p>
                        <p className="font-medium">{league.matches}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium text-xs sm:text-sm break-words">{league.startDate} - {league.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(league.status)}`}>
                    {league.status.charAt(0).toUpperCase() + league.status.slice(1)}
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-1">
                    <button className="text-purple-600 hover:text-purple-800 text-sm text-left sm:text-center">
                      Edit
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm text-left sm:text-center">
                      View Table
                    </button>
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
