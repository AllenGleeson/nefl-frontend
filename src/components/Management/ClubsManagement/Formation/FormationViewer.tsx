"use client";

import React, { useState } from 'react';
import { Formation, FormationPosition, Player } from '@/api/ClubsService';

interface FormationViewerProps {
  formation: Formation;
  players?: Player[];
  onPositionClick?: (position: FormationPosition) => void;
  onPlayerAssign?: (positionId: string, playerId: string) => void;
  editable?: boolean;
  className?: string;
}

export default function FormationViewer({
  formation,
  players = [],
  onPositionClick,
  onPlayerAssign,
  editable = false,
  className = ""
}: FormationViewerProps) {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const getPositionColor = (position: string) => {
    const positionColors: Record<string, string> = {
      'GK': 'bg-red-500',
      'CB': 'bg-blue-500',
      'LB': 'bg-green-500',
      'RB': 'bg-green-500',
      'CM': 'bg-yellow-500',
      'CDM': 'bg-orange-500',
      'CAM': 'bg-purple-500',
      'LW': 'bg-pink-500',
      'RW': 'bg-pink-500',
      'ST': 'bg-indigo-500',
      'CF': 'bg-indigo-500',
    };
    return positionColors[position] || 'bg-gray-500';
  };

  const getPositionAbbreviation = (position: string) => {
    return position.length > 2 ? position.substring(0, 2) : position;
  };

  const handlePositionClick = (position: FormationPosition) => {
    if (editable) {
      setSelectedPosition(selectedPosition === position.id ? null : position.id);
    }
    onPositionClick?.(position);
  };

  const handlePlayerSelect = (playerId: string) => {
    if (selectedPosition && onPlayerAssign) {
      onPlayerAssign(selectedPosition, playerId);
      setSelectedPosition(null);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Formation Title */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{formation.name}</h3>
        {formation.description && (
          <p className="text-sm text-gray-600 mt-1">{formation.description}</p>
        )}
      </div>

      {/* Football Pitch */}
      <div className="relative bg-green-600 rounded-lg p-4 mx-auto" style={{ width: '400px', height: '600px' }}>
        {/* Pitch Lines */}
        <div className="absolute inset-4 border-2 border-white rounded-lg">
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full"></div>
          
          {/* Center Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
          
          {/* Goal Areas */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-16 border-2 border-white border-b-0 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-16 border-2 border-white border-b-0 rounded-b-lg"></div>
          
          {/* Penalty Areas */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-24 border-2 border-white border-b-0 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-24 border-2 border-white border-t-0 rounded-b-lg"></div>
        </div>

        {/* Formation Positions */}
        {formation.positions.map((position) => (
          <div
            key={position.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
              selectedPosition === position.id ? 'ring-4 ring-yellow-400' : ''
            }`}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onClick={() => handlePositionClick(position)}
          >
            {/* Position Circle */}
            <div className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-lg ${getPositionColor(position.position)}`}>
              {getPositionAbbreviation(position.position)}
            </div>
            
            {/* Player Name */}
            {position.playerName && (
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {position.playerName}
              </div>
            )}
            
            {/* Jersey Number */}
            {position.playerId && (
              <div className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {players.find(p => p.id === position.playerId)?.jerseyNumber || '?'}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Player Selection Modal */}
      {editable && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Assign Player to Position</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {players.map((player) => (
                <button
                  key={player.id}
                  onClick={() => handlePlayerSelect(player.id)}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-gray-500">
                        #{player.jerseyNumber} • {player.position}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {player.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedPosition(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
