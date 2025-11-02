"use client";

import { useState } from "react";

interface Achievement {
  id: string;
  title: string;
  year: number;
  type: 'league' | 'cup' | 'trophy' | 'award';
  competition: string;
  position?: 'winner' | 'runner-up' | 'semi-finalist' | 'quarter-finalist';
  description?: string;
}

interface ClubAchievementsProps {
  achievements: Achievement[];
}

export default function ClubAchievements({ achievements }: ClubAchievementsProps) {
  const [expandedCompetition, setExpandedCompetition] = useState<string | null>(null);

  if (achievements.length === 0) {
    return (
      <div className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Club Achievements</h2>
        <div className="text-center py-8">
          <div className="text-white/40 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No Achievements Recorded</h3>
          <p className="text-white/70">This club's achievements haven't been documented yet.</p>
        </div>
      </div>
    );
  }

  // Group achievements by competition
  const achievementsByCompetition = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.competition]) {
      acc[achievement.competition] = [];
    }
    acc[achievement.competition].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  // Sort achievements within each competition by year (newest first)
  Object.keys(achievementsByCompetition).forEach(competition => {
    achievementsByCompetition[competition].sort((a, b) => b.year - a.year);
  });

  // Get competition type for icon
  const getCompetitionIcon = (competition: string) => {
    if (competition.toLowerCase().includes('league')) return '🏆';
    if (competition.toLowerCase().includes('cup')) return '🥇';
    if (competition.toLowerCase().includes('trophy')) return '🏅';
    if (competition.toLowerCase().includes('award')) return '⭐';
    return '🏆';
  };

  const getCompetitionType = (competition: string) => {
    if (competition.toLowerCase().includes('league')) return 'League';
    if (competition.toLowerCase().includes('cup')) return 'Cup';
    if (competition.toLowerCase().includes('trophy')) return 'Trophy';
    if (competition.toLowerCase().includes('award')) return 'Award';
    return 'Competition';
  };

  const getPositionBadge = (position?: string) => {
    if (!position) return null;
    
    const positionStyles = {
      'winner': 'bg-yellow-500 text-white',
      'runner-up': 'bg-gray-400 text-white',
      'semi-finalist': 'bg-amber-600 text-white',
      'quarter-finalist': 'bg-blue-500 text-white'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-bold ${positionStyles[position as keyof typeof positionStyles] || 'bg-gray-500 text-white'}`}>
        {position.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Club Achievements</h2>
      
      <div className="space-y-4">
        {Object.entries(achievementsByCompetition).map(([competition, competitionAchievements]) => {
          const isExpanded = expandedCompetition === competition;
          const winCount = competitionAchievements.filter(a => a.position === 'winner').length;
          const totalCount = competitionAchievements.length;
          
          return (
            <div key={competition} className="border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedCompetition(isExpanded ? null : competition)}
                className="w-full p-4 text-left hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCompetitionIcon(competition)}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{competition}</h3>
                      <p className="text-sm text-white/70">{getCompetitionType(competition)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{winCount}</div>
                      <div className="text-xs text-white/60">
                        {winCount === 1 ? 'Win' : 'Wins'}
                        {totalCount > winCount && ` (${totalCount} total)`}
                      </div>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-white/50 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              {isExpanded && (
                <div className="border-t border-white/10 bg-white/5">
                  <div className="p-4 space-y-3">
                    <h4 className="text-sm font-semibold mb-3">Achievement History</h4>
                    {competitionAchievements.map((achievement) => (
                      <div key={achievement.id} className="rounded-lg p-3 border border-white/10 bg-white/5">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h5 className="font-semibold">{achievement.title}</h5>
                              <span className="text-lg font-bold text-blue-600">{achievement.year}</span>
                            </div>
                            {achievement.description && (
                              <p className="text-sm text-white/70">{achievement.description}</p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {getPositionBadge(achievement.position)}
                            <div className="text-xs text-white/60">
                              {achievement.type.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h4 className="text-lg font-semibold mb-4">Achievement Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {achievements.filter(a => a.type === 'league').length}
            </div>
            <div className="text-sm text-white/70">League Titles</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {achievements.filter(a => a.type === 'cup').length}
            </div>
            <div className="text-sm text-white/70">Cup Wins</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {achievements.filter(a => a.position === 'winner').length}
            </div>
            <div className="text-sm text-white/70">Total Wins</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Object.keys(achievementsByCompetition).length}
            </div>
            <div className="text-sm text-white/70">Competitions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
