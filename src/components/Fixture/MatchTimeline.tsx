"use client";

// src/components/Fixture/MatchTimeline.tsx
import { useMemo, useCallback } from 'react';
import Image from 'next/image';

interface TimelineEvent {
  id: string;
  minute: number;
  type: 'goal' | 'substitution' | 'card' | 'penalty';
  player: string;
  team: 'home' | 'away';
  description: string;
  additionalInfo?: string;
}

interface Player {
  id: string;
  name: string;
  number: number;
  team: 'home' | 'away';
}

interface MatchTimelineProps {
  events: TimelineEvent[];
  homeTeamLogo: string;
  awayTeamLogo: string;
  homePlayers: Player[];
  awayPlayers: Player[];
  substitutes?: Player[];
}

// Constants
const REGULAR_TIME_MINUTES = 90;
const OVERTIME_MAX_MINUTES = 120;
const OVERTIME_EXTRA_PERCENT = 10;

// Helper functions moved outside component for better performance
const getEventIcon = (type: string) => {
  switch (type) {
    case 'goal': return '⚽';
    case 'substitution': return '🔄';
    case 'card': return '🟨';
    case 'penalty': return '⚽';
    default: return '📝';
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'goal': return 'bg-green-500';
    case 'substitution': return 'bg-blue-500';
    case 'card': return 'bg-yellow-500';
    case 'penalty': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

// Calculate position on timeline (0-90 minutes = 0-100%, overtime extends beyond)
const getPosition = (minute: number) => {
  if (minute <= REGULAR_TIME_MINUTES) {
    return (minute / REGULAR_TIME_MINUTES) * 100;
  } else {
    // Overtime extends beyond 100%
    const overtimePercent = ((minute - REGULAR_TIME_MINUTES) / 30) * OVERTIME_EXTRA_PERCENT;
    return 100 + overtimePercent;
  }
};

export default function MatchTimeline({ events, homeTeamLogo, awayTeamLogo, homePlayers, awayPlayers, substitutes = [] }: MatchTimelineProps) {
  // Get player data by name and team
  const getPlayer = useCallback((playerName: string, team: 'home' | 'away') => {
    const players = team === 'home' ? homePlayers : awayPlayers;
    let player = players.find(p => p.name === playerName);
    
    // If not found in main players, check substitutes
    if (!player && substitutes) {
      player = substitutes.find(p => p.name === playerName && p.team === team);
    }
    
    return player;
  }, [homePlayers, awayPlayers, substitutes]);

  // Format player name as "A. Green" (first initial + last name)
  const formatPlayerName = useCallback((playerName: string): string => {
    const nameParts = playerName.trim().split(' ');
    if (nameParts.length === 0) return playerName;
    
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    
    if (lastName) {
      const firstInitial = firstName.charAt(0).toUpperCase();
      return `${firstInitial}. ${lastName}`;
    } else {
      return playerName;
    }
  }, []);

  // Find max minute (for overtime calculation) - memoized
  const maxMinute = useMemo(() => Math.max(...events.map(e => e.minute), REGULAR_TIME_MINUTES), [events]);
  const hasOvertime = useMemo(() => maxMinute > REGULAR_TIME_MINUTES, [maxMinute]);
  const overtimeMinutes = useMemo(() => hasOvertime ? maxMinute - REGULAR_TIME_MINUTES : 0, [hasOvertime, maxMinute]);

  return (
    <div className="rounded-lg py-0">
      <div className="relative px-4">
        {/* Main Timeline Container */}
        <div className="relative w-full" style={{ height: '200px' }}>
          {/* Main Timeline Line (0-90 minutes) */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-gray-300"></div>
          
          {/* Overtime Extension Line (red) */}
          {hasOvertime && (
            <div 
              className="absolute top-20 h-1 bg-red-500"
              style={{
                left: '100%',
                width: `${(overtimeMinutes / 30) * 10}%`,
                maxWidth: '10%'
              }}
            ></div>
          )}
          
          {/* Time Markers at Ends - positioned to the left and right of the line */}
          <div className="absolute top-8 left-0 text-sm font-bold text-gray-200 transform -translate-x-full pr-2">00&apos;</div>
          <div className="absolute top-8 right-0 text-sm font-bold text-gray-200 transform translate-x-full pl-2">90&apos;</div>
          {hasOvertime && (
            <div 
              className="absolute top-10 text-sm font-bold text-red-300"
              style={{
                left: `${100 + (overtimeMinutes / 30) * 10}%`,
                transform: 'translateX(-50%)'
              }}
            >
              {maxMinute}&apos;
            </div>
          )}
          
          {/* Events */}
          {events.map((event) => {
            const position = getPosition(event.minute);
            const isOvertime = event.minute > REGULAR_TIME_MINUTES;
            const player = getPlayer(event.player, event.team);
            
            return (
              <div
                key={event.id}
                className="absolute"
                style={{
                  left: `${position}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {/* Vertical Line from Timeline to Event */}
                <div 
                  className={`absolute top-10 w-0.5 ${isOvertime ? 'bg-red-500' : 'bg-gray-400'}`}
                  style={{ height: '40px' }}
                ></div>
                
                {/* Event Icon */}
                <div className="absolute top-16 -left-5 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getEventColor(event.type)} shadow-lg`}>
                    <span className="text-lg">{getEventIcon(event.type)}</span>
                  </div>
                  {/* Club Logo at bottom right of event icon */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md bg-white">
                    <Image
                      src={event.team === 'home' ? homeTeamLogo : awayTeamLogo}
                      alt={event.team === 'home' ? 'Home team logo' : 'Away team logo'}
                      width={20}
                      height={20}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Event Info */}
                {/* Time - centered under icon */}
                <div className="absolute top-28 -left-2 text-center whitespace-nowrap">
                  <div className="text-xs font-bold text-gray-200">{event.minute}&apos;</div>
                </div>
                {/* Player name - left aligned */}
                <div className="absolute top-32 -left-8 text-left whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className={`text-xs font-semibold ${event.team === 'home' ? 'text-blue-300' : 'text-red-300'}`}>
                      {formatPlayerName(event.player)}
                    </div>
                    {player?.number && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white border-1 border-white shadow-md ${event.team === 'home' ? 'bg-blue-500' : 'bg-red-500'}`}>
                        {player.number}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
