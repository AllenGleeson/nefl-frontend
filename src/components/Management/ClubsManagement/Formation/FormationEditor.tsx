"use client";

import React, { useState, useRef } from 'react';
import { Formation, Player } from '@/api/ClubsService';

interface FormationEditorProps {
  formation: Formation;
  players: Player[];
  onPositionUpdate: (positionId: string, x: number, y: number) => void;
  onPlayerAssign: (positionId: string, playerId: string) => void;
  onPlayerUnassign: (positionId: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function FormationEditor({
  formation,
  players,
  onPositionUpdate,
  onPlayerAssign,
  onPlayerUnassign,
  onSave,
  onCancel
}: FormationEditorProps) {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const pitchRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = (e: React.MouseEvent, positionId: string) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedPosition(positionId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedPosition || !pitchRef.current) return;

    const rect = pitchRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain to pitch bounds
    const constrainedX = Math.max(5, Math.min(95, x));
    const constrainedY = Math.max(5, Math.min(95, y));

    onPositionUpdate(selectedPosition, constrainedX, constrainedY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedPosition(null);
  };

  const handlePitchClick = () => {
    // Disabled for predefined formations - positions cannot be added/removed
    return;
  };

  const handlePlayerSelect = (playerId: string) => {
    if (selectedPosition) {
      onPlayerAssign(selectedPosition, playerId);
      setSelectedPosition(null);
    }
  };

  const handlePlayerUnassign = (positionId: string) => {
    onPlayerUnassign(positionId);
  };


  return (
    <div className="space-y-6">
      {/* Editor Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Edit Formation: {formation.name}</h3>
        <div className="space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formation Editor */}
        <div className="lg:col-span-2">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Click and drag to move players • Click on positions to assign players
            </h4>
            
            {/* Football Pitch */}
            <div
              ref={pitchRef}
              className="relative bg-green-600 rounded-lg p-4 mx-auto cursor-crosshair"
              style={{ width: '400px', height: '600px' }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={handlePitchClick}
            >
              {/* Pitch Lines */}
              <div className="absolute inset-4 border-2 border-white rounded-lg">
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full"></div>
                
                {/* Center Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
                
                {/* Goal Areas */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-16 border-2 border-white border-b-0 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-16 border-2 border-white border-t-0 rounded-b-lg"></div>
                
                {/* Penalty Areas */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-24 border-2 border-white border-b-0 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-24 border-2 border-white border-t-0 rounded-b-lg"></div>
              </div>

              {/* Formation Positions */}
              {formation.positions.map((position) => (
                <div
                  key={position.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move select-none ${
                    selectedPosition === position.id ? 'ring-4 ring-yellow-400' : ''
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, position.id)}
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

                  {/* Position Info */}
                  <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    i
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Player Assignment Controls */}
        <div className="space-y-4">
          {/* Player Assignment */}
          {selectedPosition && (
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Assign Player</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <button
                  onClick={() => handlePlayerUnassign(selectedPosition)}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm text-red-600"
                >
                  Remove Player
                </button>
                {players.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => handlePlayerSelect(player.id)}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm"
                  >
                    #{player.jerseyNumber} {player.name} ({player.position})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formation Info */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2">Formation Info</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {formation.name}</p>
              <p><strong>Positions:</strong> {formation.positions.length}</p>
              <p><strong>Description:</strong> {formation.description || 'No description'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
