"use client";

// src/components/Statistics/StatisticsBarChart.tsx
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatRow } from '@/data/statistics';

interface Props {
  data: StatRow[];
  statType: 'goals' | 'assists';
  season: string;
  league: string;
  maxItems?: number;
}

export default function StatisticsBarChart({ data, statType, season, league, maxItems = 10 }: Props) {
  const chartData = useMemo(() => {
    const filteredData = data.filter(d => {
      if (season !== 'all' && d.season !== season) return false;
      if (league !== 'all' && d.league !== league) return false;
      return true;
    });

    return filteredData
      .sort((a, b) => b[statType] - a[statType])
      .slice(0, maxItems)
      .map((team, index) => ({
        id: team.id,
        team: team.team.length > 8 ? team.team.substring(0, 8) + '...' : team.team,
        fullTeam: team.team,
        goals: team.goals,
        assists: team.assists,
        [statType]: team[statType],
        rank: index + 1
      }));
  }, [data, statType, season, league, maxItems]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].payload.fullTeam}</p>
          <p className="text-sm text-gray-600">
            Goals: <span className="font-medium text-blue-600">{payload[0].payload.goals}</span>
          </p>
          <p className="text-sm text-gray-600">
            Assists: <span className="font-medium text-green-600">{payload[0].payload.assists}</span>
          </p>
          <p className="text-sm text-gray-600">
            Rank: <span className="font-medium text-gray-900">#{payload[0].payload.rank}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Top {maxItems} {statType === 'goals' ? 'Scorers' : 'Assisters'}
        </h3>
        <p className="text-sm text-gray-600">
          {season} {league === 'all' ? 'All Leagues' : league}
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="team" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
              stroke="#666"
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="goals" 
              fill="#3B82F6" 
              name="Goals"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="assists" 
              fill="#10B981" 
              name="Assists"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Hover over bars to see detailed information</p>
      </div>
    </div>
  );
}
