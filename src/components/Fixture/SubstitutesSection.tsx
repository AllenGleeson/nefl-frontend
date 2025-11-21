"use client";

// src/components/Fixture/SubstitutesSection.tsx
import { useMemo } from 'react';
interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  team: 'home' | 'away';
}

interface TimelineEvent {
  id: string;
  minute: number;
  type: 'goal' | 'substitution' | 'card' | 'penalty';
  player: string;
  team: 'home' | 'away';
  description: string;
  additionalInfo?: string;
}

interface SubstitutionInfo {
  minute: number;
  substitutedIn: string;
  wasSubstitutedOut: boolean; // true if this player was substituted OUT, false if substituted IN
}

interface PlayerStats {
  goals: number;
  goalMinutes: number[];
  yellowCards: number;
  yellowCardMinutes: number[];
  redCards: number;
  redCardMinutes: number[];
  substitution?: SubstitutionInfo;
}

interface Manager {
  name: string;
  photo: string;
  team: string;
}

interface SubstitutesSectionProps {
  homePlayers: Player[];
  awayPlayers: Player[];
  substitutes: Player[];
  timelineEvents: TimelineEvent[];
  homeManager: Manager;
  awayManager: Manager;
}

// Format name as "Initial. LastName"
function formatName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  return `${firstName.charAt(0).toUpperCase()}. ${lastName}`;
}

// Extract substituted out player name from additionalInfo
function extractSubstitutedOut(additionalInfo?: string): string | null {
  if (!additionalInfo) return null;
  // Format is typically "Replaced [Player Name]" - this is the player going OUT
  const replacedMatch = additionalInfo.match(/replaced\s+(.+)/i);
  if (replacedMatch) {
    return replacedMatch[1].trim();
  }
  return null;
}

// Calculate player stats from timeline events
function calculatePlayerStats(playerName: string, team: 'home' | 'away', events: TimelineEvent[]): PlayerStats {
  const playerEvents = events.filter(
    event => event.player === playerName && event.team === team
  );

  const cardEvents = playerEvents.filter(e => e.type === 'card');
  const descriptionLower = (desc: string) => desc?.toLowerCase() || '';

  // Check if this player was substituted IN (event.player is the one coming IN)
  const substitutedInEvent = playerEvents.find(e => e.type === 'substitution');
  
  // Check if this player was substituted OUT (their name appears in additionalInfo)
  const substitutedOutEvent = events.find(e => 
    e.type === 'substitution' && 
    e.team === team &&
    extractSubstitutedOut(e.additionalInfo) === playerName
  );

  // Priority: if player was substituted OUT, show that; otherwise if substituted IN, show that
  const substitutionEvent = substitutedOutEvent || substitutedInEvent;
  const substitution: SubstitutionInfo | undefined = substitutionEvent
    ? {
        minute: substitutionEvent.minute,
        substitutedIn: substitutedOutEvent 
          ? substitutionEvent.player  // If substituted OUT, event.player is who came IN
          : extractSubstitutedOut(substitutionEvent.additionalInfo) || 'Unknown',  // If substituted IN, show who they replaced
        wasSubstitutedOut: !!substitutedOutEvent
      }
    : undefined;

  const goalEvents = playerEvents.filter(e => e.type === 'goal' || e.type === 'penalty');
  const yellowCardEvents = cardEvents.filter(e => {
    const desc = descriptionLower(e.description);
    return desc.includes('yellow');
  });
  const redCardEvents = cardEvents.filter(e => {
    const desc = descriptionLower(e.description);
    return desc.includes('red');
  });

  return {
    goals: goalEvents.length,
    goalMinutes: goalEvents.map(e => e.minute),
    yellowCards: yellowCardEvents.length,
    yellowCardMinutes: yellowCardEvents.map(e => e.minute),
    redCards: redCardEvents.length,
    redCardMinutes: redCardEvents.map(e => e.minute),
    substitution,
  };
}

export default function SubstitutesSection({ homePlayers, awayPlayers, substitutes, timelineEvents, homeManager, awayManager }: SubstitutesSectionProps) {
  // Memoize filtered substitutes
  const { homeSubs, awaySubs } = useMemo(() => ({
    homeSubs: substitutes.filter(sub => sub.team === 'home'),
    awaySubs: substitutes.filter(sub => sub.team === 'away')
  }), [substitutes]);

  return (
    <div className="rounded-lg p-6 mb-6 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Home Team */}
        <div>
          <h4 className="font-bold text-base text-gray-800 mb-4 pb-2 border-b border-gray-200">Home Team</h4>
          
          {/* Home Manager */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="text-xl">👨‍💼</span>
            </div>
            <div>
              <p className="font-bold text-sm">{homeManager.name}</p>
            </div>
          </div>
          
          {/* Starting Players */}
          <div className="mb-6">
            <h5 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Starting XI</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {homePlayers.map((player) => {
                const stats = calculatePlayerStats(player.name, 'home', timelineEvents);
                return (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg border border-blue-200/60 cursor-default min-h-[64px] shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0">
                        {player.number}
                      </span>
                      <div className="relative group flex-1">
                        <p className="font-semibold text-sm text-gray-800 cursor-default">{formatName(player.name)}</p>
                        <p className="text-xs text-gray-600 font-medium">{player.position}</p>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                          {player.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="flex items-center gap-2.5 ml-2 flex-shrink-0">
                      {stats.goals > 0 && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">⚽</span>
                          {stats.goals === 1 ? (
                            <span className="text-xs font-bold text-gray-700">{stats.goalMinutes[0]}&apos;</span>
                          ) : (
                            <>
                              <span className="text-xs font-bold text-gray-700">{stats.goals}</span>
                              {/* Goals Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                                {stats.goalMinutes.map(m => `${m}&apos;`).join(', ')}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {stats.yellowCards > 0 && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">🟨</span>
                          {stats.yellowCards === 1 ? (
                            <span className="text-xs font-bold text-gray-700">{stats.yellowCardMinutes[0]}&apos;</span>
                          ) : (
                            <>
                              <span className="text-xs font-bold text-gray-700">{stats.yellowCards}</span>
                              {/* Yellow Cards Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                                {stats.yellowCardMinutes.map(m => `${m}&apos;`).join(', ')}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {stats.redCards > 0 && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">🟥</span>
                          {stats.redCards === 1 ? (
                            <span className="text-xs font-bold text-gray-700">{stats.redCardMinutes[0]}&apos;</span>
                          ) : (
                            <>
                              <span className="text-xs font-bold text-gray-700">{stats.redCards}</span>
                              {/* Red Cards Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                                {stats.redCardMinutes.map(m => `${m}&apos;`).join(', ')}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {stats.substitution && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">🔄</span>
                          <span className="text-xs font-bold text-gray-700">{stats.substitution.minute}&apos;</span>
                          {/* Substitution Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                            {stats.substitution.wasSubstitutedOut 
                              ? `Replaced by ${stats.substitution.substitutedIn}`
                              : `Came on for ${stats.substitution.substitutedIn}`
                            }
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Substitutes */}
          {homeSubs.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Substitutes</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {homeSubs.map((sub) => {
                  const stats = calculatePlayerStats(sub.name, 'home', timelineEvents);
                  return (
                    <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-300/60 cursor-default min-h-[64px] shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200">
                      <div className="flex items-center space-x-3 flex-1">
                  <span className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shadow-md flex-shrink-0">
                    {sub.number}
                  </span>
                        <div className="relative group flex-1">
                          <p className="font-semibold text-sm text-gray-800 cursor-default">{formatName(sub.name)}</p>
                    <p className="text-xs text-gray-600 font-medium">{sub.position}</p>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                            {sub.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex items-center gap-2 ml-2">
                        {stats.goals > 0 && (
                          <div className="flex flex-col items-center" title={`${stats.goals} goal${stats.goals > 1 ? 's' : ''}`}>
                            <span className="text-lg">⚽</span>
                            <span className="text-xs font-bold text-gray-700">{stats.goals}</span>
                          </div>
                        )}
                        {stats.yellowCards > 0 && (
                          <div className="flex flex-col items-center" title={`${stats.yellowCards} yellow card${stats.yellowCards > 1 ? 's' : ''}`}>
                            <span className="text-lg">🟨</span>
                            <span className="text-xs font-bold text-gray-700">{stats.yellowCards}</span>
                          </div>
                        )}
                        {stats.redCards > 0 && (
                          <div className="flex flex-col items-center" title={`${stats.redCards} red card${stats.redCards > 1 ? 's' : ''}`}>
                            <span className="text-lg">🟥</span>
                            <span className="text-xs font-bold text-gray-700">{stats.redCards}</span>
                          </div>
                        )}
                        {stats.substitution && (
                          <div className="relative group flex flex-col items-center">
                            <span className="text-lg">🔄</span>
                            <span className="text-xs font-bold text-gray-700">{stats.substitution.minute}&apos;</span>
                            {/* Substitution Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                              {stats.substitution.wasSubstitutedOut 
                                ? `Replaced by ${stats.substitution.substitutedIn}`
                                : `Came on for ${stats.substitution.substitutedIn}`
                              }
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        )}
                  </div>
                </div>
                  );
                })}
              </div>
          </div>
          )}
        </div>
        
        {/* Away Team */}
        <div>
          <h4 className="font-bold text-base text-gray-800 mb-4 pb-2 border-b border-gray-200 text-right">Away Team</h4>
          
          {/* Away Manager */}
          <div className="flex items-center justify-end space-x-3 mb-4">
            <div>
              <p className="font-bold text-sm">{awayManager.name}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="text-xl">👨‍💼</span>
            </div>
          </div>
          
          {/* Starting Players */}
          <div className="mb-6">
            <h5 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider text-right">Starting XI</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {awayPlayers.map((player) => {
                const stats = calculatePlayerStats(player.name, 'away', timelineEvents);
                return (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100/50 rounded-lg border border-red-200/60 cursor-default min-h-[64px] shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-200">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0">
                        {player.number}
                      </span>
                      <div className="relative group flex-1">
                        <p className="font-semibold text-sm text-gray-800 cursor-default">{formatName(player.name)}</p>
                        <p className="text-xs text-gray-600 font-medium">{player.position}</p>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                          {player.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="flex items-center gap-2.5 ml-2 flex-shrink-0">
                      {stats.goals > 0 && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">⚽</span>
                          {stats.goals === 1 ? (
                            <span className="text-xs font-bold text-gray-700">{stats.goalMinutes[0]}&apos;</span>
                          ) : (
                            <>
                              <span className="text-xs font-bold text-gray-700">{stats.goals}</span>
                              {/* Goals Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                                {stats.goalMinutes.map(m => `${m}&apos;`).join(', ')}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {stats.yellowCards > 0 && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">🟨</span>
                          {stats.yellowCards === 1 ? (
                            <span className="text-xs font-bold text-gray-700">{stats.yellowCardMinutes[0]}&apos;</span>
                          ) : (
                            <>
                              <span className="text-xs font-bold text-gray-700">{stats.yellowCards}</span>
                              {/* Yellow Cards Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                                {stats.yellowCardMinutes.map(m => `${m}&apos;`).join(', ')}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {stats.redCards > 0 && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">🟥</span>
                          {stats.redCards === 1 ? (
                            <span className="text-xs font-bold text-gray-700">{stats.redCardMinutes[0]}&apos;</span>
                          ) : (
                            <>
                              <span className="text-xs font-bold text-gray-700">{stats.redCards}</span>
                              {/* Red Cards Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                                {stats.redCardMinutes.map(m => `${m}&apos;`).join(', ')}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {stats.substitution && (
                        <div className="relative group flex flex-col items-center">
                          <span className="text-lg">🔄</span>
                          <span className="text-xs font-bold text-gray-700">{stats.substitution.minute}&apos;</span>
                          {/* Substitution Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                            {stats.substitution.wasSubstitutedOut 
                              ? `Replaced by ${stats.substitution.substitutedIn}`
                              : `Came on for ${stats.substitution.substitutedIn}`
                            }
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Substitutes */}
          {awaySubs.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider text-right">Substitutes</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {awaySubs.map((sub) => {
                  const stats = calculatePlayerStats(sub.name, 'away', timelineEvents);
                  return (
                    <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-300/60 cursor-default min-h-[64px] shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200">
                      <div className="flex items-center space-x-3 flex-1">
                  <span className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shadow-md flex-shrink-0">
                    {sub.number}
                  </span>
                        <div className="relative group flex-1">
                          <p className="font-semibold text-sm text-gray-800 cursor-default">{formatName(sub.name)}</p>
                    <p className="text-xs text-gray-600 font-medium">{sub.position}</p>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                            {sub.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex items-center gap-2 ml-2">
                        {stats.goals > 0 && (
                          <div className="flex flex-col items-center" title={`${stats.goals} goal${stats.goals > 1 ? 's' : ''}`}>
                            <span className="text-lg">⚽</span>
                            <span className="text-xs font-bold text-gray-700">{stats.goals}</span>
                          </div>
                        )}
                        {stats.yellowCards > 0 && (
                          <div className="flex flex-col items-center" title={`${stats.yellowCards} yellow card${stats.yellowCards > 1 ? 's' : ''}`}>
                            <span className="text-lg">🟨</span>
                            <span className="text-xs font-bold text-gray-700">{stats.yellowCards}</span>
                          </div>
                        )}
                        {stats.redCards > 0 && (
                          <div className="flex flex-col items-center" title={`${stats.redCards} red card${stats.redCards > 1 ? 's' : ''}`}>
                            <span className="text-lg">🟥</span>
                            <span className="text-xs font-bold text-gray-700">{stats.redCards}</span>
                          </div>
                        )}
                        {stats.substitution && (
                          <div className="relative group flex flex-col items-center">
                            <span className="text-lg">🔄</span>
                            <span className="text-xs font-bold text-gray-700">{stats.substitution.minute}&apos;</span>
                            {/* Substitution Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-20">
                              {stats.substitution.wasSubstitutedOut 
                                ? `Replaced by ${stats.substitution.substitutedIn}`
                                : `Came on for ${stats.substitution.substitutedIn}`
                              }
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        )}
                  </div>
                </div>
                  );
                })}
              </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
