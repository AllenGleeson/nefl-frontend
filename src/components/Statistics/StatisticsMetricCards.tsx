"use client";

// src/components/Statistics/StatisticsMetricCards.tsx
import { useMemo } from 'react';
import { StatRow } from '@/data/statistics';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  description?: string;
}

function MetricCard({ title, value, change, changeType = 'neutral', icon, description }: MetricCardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm ${changeColor[changeType]} mt-1`}>
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="text-3xl text-indigo-600 flex-shrink-0 ml-4">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: StatRow[];
  statType: 'goals' | 'assists';
  season: string;
  league: string;
}

export default function StatisticsMetricCards({ data, statType, season, league }: Props) {
  const metrics = useMemo<{
    totalStats: number;
    topPerformer: StatRow;
    averageStats: string | number;
    activeTeams: number;
    changePercent: string;
    changeType: 'positive' | 'negative' | 'neutral';
  }>(() => {
    const filteredData = data.filter(d => {
      if (season !== 'all' && d.season !== season) return false;
      if (league !== 'all' && d.league !== league) return false;
      return true;
    });

    const totalStats = filteredData.reduce((sum, team) => sum + team[statType], 0);
    const topPerformer = filteredData.reduce((top, team) => 
      team[statType] > top[statType] ? team : top, filteredData[0] || { team: 'N/A', [statType]: 0 }
    );
    const averageStats = filteredData.length > 0 ? (totalStats / filteredData.length).toFixed(1) : 0;
    const activeTeams = new Set(filteredData.map(d => d.team)).size;
    
    // Calculate change from previous period (simplified)
    const previousPeriodData = data.filter(d => {
      if (season === '2025-26') return d.season === '2024-25';
      if (season === '2024-25') return d.season === '2023-24';
      return false;
    });
    const previousTotal = previousPeriodData.reduce((sum, team) => sum + team[statType], 0);
    const changePercentNum = previousTotal > 0 ? 
      (((totalStats - previousTotal) / previousTotal) * 100) : 0;
    const changePercent = typeof changePercentNum === 'number' ? changePercentNum.toFixed(1) : '0.0';
    const changeType = changePercentNum > 0 ? 'positive' : changePercentNum < 0 ? 'negative' : 'neutral';

    return {
      totalStats,
      topPerformer,
      averageStats,
      activeTeams,
      changePercent: changePercent !== '0.0' ? `${changePercentNum > 0 ? '+' : ''}${changePercent}%` : 'No change',
      changeType
    };
  }, [data, statType, season, league]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        title={`Total ${statType.charAt(0).toUpperCase() + statType.slice(1)}`}
        value={metrics.totalStats}
        change={metrics.changePercent}
        changeType={metrics.changeType}
        icon={statType === 'goals' ? '⚽' : '🎯'}
        description={`${season} ${league === 'all' ? 'All Leagues' : league}`}
      />
      
      <MetricCard
        title={`Top ${statType === 'goals' ? 'Scorer' : 'Assister'}`}
        value={metrics.topPerformer.team}
        change={`${metrics.topPerformer[statType]} ${statType}`}
        changeType="positive"
        icon="👑"
        description="Leading performer"
      />
      
      <MetricCard
        title={`Average per Team`}
        value={metrics.averageStats}
        change={`${statType} per team`}
        changeType="neutral"
        icon="📊"
        description="Team average"
      />
      
      <MetricCard
        title="Active Teams"
        value={metrics.activeTeams}
        change="teams"
        changeType="neutral"
        icon="🏆"
        description="Participating teams"
      />
    </div>
  );
}
