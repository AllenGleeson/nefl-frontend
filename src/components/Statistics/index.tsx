// src/components/Statistics/index.tsx
"use client"

import { useState } from 'react'
import StatisticsHeader from "./StatisticsHeader"
import StatisticsFilter from "./StatisticsFilter"
import StatisticsMetricCards from "./StatisticsMetricCards"
import StatisticsBarChart from "./StatisticsBarChart"
import StatisticsPieChart from "./StatisticsPieChart"
import StatisticsLineChart from "./StatisticsLineChart"
import EnhancedStatisticsTable from "./EnhancedStatisticsTable"
import TeamComparison from "./TeamComparison"
import { useStatisticsFilter } from "@/hooks/useStatisticsFilter"
import { statisticsData } from "@/data/statistics"

export default function StatisticsIndex() {
  const { filters, filteredStats, handleFilterChange, handleReset } = useStatisticsFilter()
  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'comparison'>('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'charts', name: 'Charts', icon: '📈' },
    { id: 'comparison', name: 'Compare Teams', icon: '⚖️' }
  ]

  return (
    <div className="statistics-page container mx-auto p-6">
      {/* Header */}
      <StatisticsHeader />

      {/* Filters */}
      <StatisticsFilter
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        currentFilters={filters}
      />

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metric Cards */}
          <StatisticsMetricCards
            data={statisticsData}
            statType={filters.statType}
            season={filters.season}
            league={filters.league}
          />

          {/* Enhanced Table */}
          <EnhancedStatisticsTable
            data={statisticsData}
            statType={filters.statType}
            season={filters.season}
            league={filters.league}
          />
        </div>
      )}

      {activeTab === 'charts' && (
        <div className="space-y-8">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <StatisticsBarChart
              data={statisticsData}
              statType={filters.statType}
              season={filters.season}
              league={filters.league}
              maxItems={8}
            />

            {/* Pie Chart */}
            <StatisticsPieChart
              data={statisticsData}
              statType={filters.statType}
              season={filters.season}
            />
          </div>

          {/* Line Chart - Full Width */}
          <StatisticsLineChart
            data={statisticsData}
            league={filters.league}
          />
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="space-y-8">
          {/* Team Comparison */}
          <TeamComparison
            data={statisticsData}
            season={filters.season}
            league={filters.league}
          />
        </div>
      )}
    </div>
  )
}