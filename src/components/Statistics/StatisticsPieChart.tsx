"use client";

// src/components/Statistics/StatisticsPieChart.tsx
import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StatRow } from '@/data/statistics';

interface Props {
  data: StatRow[];
  statType: 'goals' | 'assists';
  season: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function StatisticsPieChart({ data, statType, season }: Props) {
  const chartData = useMemo(() => {
    const filteredData = data.filter(d => {
      if (season !== 'all' && d.season !== season) return false;
      return true;
    });

    const leagueStats = filteredData.reduce((acc, team) => {
      const league = team.league;
      if (!acc[league]) {
        acc[league] = { league, total: 0, teams: 0 };
      }
      acc[league].total += team[statType];
      acc[league].teams += 1;
      return acc;
    }, {} as Record<string, { league: string; total: number; teams: number }>);

    return Object.values(leagueStats)
      .map((league, index) => ({
        name: league.league,
        value: league.total,
        teams: league.teams,
        average: (league.total / league.teams).toFixed(1),
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value);
  }, [data, statType, season]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            Total {statType}: <span className="font-medium">{data.value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Teams: <span className="font-medium">{data.teams}</span>
          </p>
          <p className="text-sm text-gray-600">
            Average per team: <span className="font-medium">{data.average}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {statType === 'goals' ? 'Goals' : 'Assists'} by League
        </h3>
        <p className="text-sm text-gray-600">
          {season} Season Distribution
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Click on segments to see detailed breakdown</p>
      </div>
    </div>
  );
}
