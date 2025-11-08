"use client";

// src/components/Fixture/MatchStatistics.tsx
interface MatchStats {
  homeTeam: {
    name: string;
    stats: {
      yellowCards: number;
      redCards: number;
      corners: number;
      freeKicks: number;
      penalties: number;
      offsides: number;
      shots: number;
      shotsOnTarget: number;
      possession: number;
    };
  };
  awayTeam: {
    name: string;
    stats: {
      yellowCards: number;
      redCards: number;
      corners: number;
      freeKicks: number;
      penalties: number;
      offsides: number;
      shots: number;
      shotsOnTarget: number;
      possession: number;
    };
  };
}

interface MatchStatisticsProps {
  stats: MatchStats;
}

export default function MatchStatistics({ stats }: MatchStatisticsProps) {
  const statItems = [
    { key: 'yellowCards', label: 'Yellow Cards', icon: '🟨' },
    { key: 'redCards', label: 'Red Cards', icon: '🟥' },
    { key: 'corners', label: 'Corners', icon: '📐' },
    { key: 'freeKicks', label: 'Free Kicks', icon: '⚽' },
    { key: 'penalties', label: 'Penalties', icon: '🎯' },
    { key: 'offsides', label: 'Offsides', icon: '🚫' },
    { key: 'shots', label: 'Shots', icon: '🎯' },
    { key: 'shotsOnTarget', label: 'Shots on Target', icon: '✅' },
    { key: 'possession', label: 'Possession (%)', icon: '⚽' }
  ];

  return (
    <div className="rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Match Statistics</h3>
      
      <div className="space-y-4">
        {statItems.map((item) => {
          const homeValue = stats.homeTeam.stats[item.key as keyof typeof stats.homeTeam.stats];
          const awayValue = stats.awayTeam.stats[item.key as keyof typeof stats.awayTeam.stats];
          const isPossession = item.key === 'possession';
          
          return (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              
              <div className="flex items-center space-x-4 flex-1">
                {/* Home Value */}
                <div className="text-right flex-1">
                  <span className="font-bold text-lg">{homeValue}</span>
                  {isPossession && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${homeValue}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                
                {/* VS */}
                <div className="text-gray-400 font-bold">VS</div>
                
                {/* Away Value */}
                <div className="text-left flex-1">
                  <span className="font-bold text-lg">{awayValue}</span>
                  {isPossession && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${awayValue}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
