"use client";

// src/components/Statistics/StatisticsLineChart.tsx
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatRow } from '@/data/statistics';

interface Props {
  data: StatRow[];
  league: string;
}

export default function StatisticsLineChart({ data, league }: Props) {
  const chartData = useMemo(() => {
    const filteredData = data.filter(d => {
      if (league !== 'all' && d.league !== league) return false;
      return true;
    });

    // Group by season and calculate totals
    const seasonStats = filteredData.reduce((acc, team) => {
      const season = team.season;
      if (!acc[season]) {
        acc[season] = { season, totalGoals: 0, totalAssists: 0, teams: 0 };
      }
      acc[season].totalGoals += team.goals;
      acc[season].totalAssists += team.assists;
      acc[season].teams += 1;
      return acc;
    }, {} as Record<string, { season: string; totalGoals: number; totalAssists: number; teams: number }>);

    return Object.values(seasonStats)
      .sort((a, b) => a.season.localeCompare(b.season))
      .map(season => ({
        season: season.season,
        goals: season.totalGoals,
        assists: season.totalAssists,
        avgGoals: (season.totalGoals / season.teams).toFixed(1),
        avgAssists: (season.totalAssists / season.teams).toFixed(1),
        teams: season.teams
      }));
  }, [data, league]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            Total Goals: <span className="font-medium text-blue-600">{payload[0].value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total Assists: <span className="font-medium text-green-600">{payload[1].value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Avg Goals/Team: <span className="font-medium">{payload[0].payload.avgGoals}</span>
          </p>
          <p className="text-sm text-gray-600">
            Avg Assists/Team: <span className="font-medium">{payload[1].payload.avgAssists}</span>
          </p>
          <p className="text-sm text-gray-600">
            Teams: <span className="font-medium">{payload[0].payload.teams}</span>
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
          Season Trends
        </h3>
        <p className="text-sm text-gray-600">
          Goals and Assists over time - {league === 'all' ? 'All Leagues' : league}
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="season" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="goals" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Goals"
            />
            <Line 
              type="monotone" 
              dataKey="assists" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Assists"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Track performance trends across different seasons</p>
      </div>
    </div>
  );
}
