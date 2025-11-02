"use client";

import { useState } from "react";
import { Player } from "@/data/club";
import { Formation } from "@/types/clubManagement";
import { FormationViewer } from "@/components/Management/ClubsManagement/Formation";

interface SquadFormationTabsProps {
  squad: Player[];
  formation?: Formation;
}

export default function SquadFormationTabs({ squad, formation }: SquadFormationTabsProps) {
  const [activeTab, setActiveTab] = useState<'squad' | 'formation'>('squad');

  // Group players by position for squad view
  const playersByPosition = squad.reduce((acc, player) => {
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    acc[player.position].push(player);
    return acc;
  }, {} as Record<string, Player[]>);

  // Sort players within each position by number
  Object.keys(playersByPosition).forEach(position => {
    playersByPosition[position].sort((a, b) => a.number - b.number);
  });

  const positionOrder = ['GK', 'DF', 'MF', 'FW'];

  const renderSquadView = () => (
    <div>
      {positionOrder.map(position => {
        const players = playersByPosition[position];
        if (!players || players.length === 0) return null;

        return (
          <div key={position} className="mb-6">
            <h3 className="text-lg font-medium mb-3 border-b border-white/10 pb-2">
              {position === 'GK' ? 'Goalkeepers' : 
               position === 'DF' ? 'Defenders' :
               position === 'MF' ? 'Midfielders' : 'Forwards'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {players.map((player) => (
                <div key={player.number} className="flex items-center p-3 rounded-lg transition border border-white/10 hover:bg-white/10">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {player.number}
                  </div>
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-white/70">{player.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderFormationView = () => {
    if (!formation) {
      return (
        <div className="text-center py-12">
          <div className="text-white/40 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No Formation Available</h3>
          <p className="text-white/70">This club hasn&apos;t set up a formation yet.</p>
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <FormationViewer 
          formation={formation}
          players={squad.map(player => ({
            id: player.name.toLowerCase().replace(/\s+/g, '-'),
            clubId: '',
            name: player.name,
            position: player.position,
            jerseyNumber: player.number,
            age: 25,
            joinedDate: '',
            status: 'active' as const
          }))}
          editable={false}
          className="w-full max-w-md"
        />
      </div>
    );
  };

  return (
    <div className="p-6 mb-8">
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('squad')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors border ${
            activeTab === 'squad'
              ? 'bg-blue-300 text-blue-900 border-blue-300'
              : 'bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200'
          }`}
        >
          Squad
        </button>
        <button
          onClick={() => setActiveTab('formation')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors border ${
            activeTab === 'formation'
              ? 'bg-blue-300 text-blue-900 border-blue-300'
              : 'bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200'
          }`}
        >
          Formation
        </button>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'squad' ? renderSquadView() : renderFormationView()}
      </div>
    </div>
  );
}
