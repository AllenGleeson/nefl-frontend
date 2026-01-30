"use client";

// src/components/Statistics/EnhancedStatisticsTable.tsx
import { useState, useMemo } from 'react';
import Image from "next/image";
import { StatRow } from '@/data/statistics';
import { assetUrl } from '@/utils/assetUrl';

interface Props {
  data: StatRow[];
  statType: 'goals' | 'assists';
  season: string;
  league: string;
}

type SortField = 'team' | 'goals' | 'assists' | 'goalsPerGame' | 'assistsPerGame';
type SortDirection = 'asc' | 'desc';

type ExtendedStatRow = StatRow & {
  goalsPerGame: string;
  assistsPerGame: string;
};

export default function EnhancedStatisticsTable({ data, statType, season, league }: Props) {
  const [sortField, setSortField] = useState<SortField>('goals');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const processedData = useMemo(() => {
    const filteredData = data.filter(d => {
      if (season !== 'all' && d.season !== season) return false;
      if (league !== 'all' && d.league !== league) return false;
      if (searchTerm && !d.team.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });

    // Add calculated fields
    const extendedData: ExtendedStatRow[] = filteredData.map(team => ({
      ...team,
      goalsPerGame: (team.goals / 10).toFixed(1), // Assuming 10 games per season
      assistsPerGame: (team.assists / 10).toFixed(1)
    }));

    // Sort data
    extendedData.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      if (sortField === 'goalsPerGame' || sortField === 'assistsPerGame') {
        aValue = parseFloat(a[sortField] as string);
        bValue = parseFloat(b[sortField] as string);
      } else if (sortField === 'team') {
        aValue = a.team;
        bValue = b.team;
      } else {
        aValue = a[sortField] as number;
        bValue = b[sortField] as number;
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return extendedData;
  }, [data, season, league, searchTerm, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getFormIndicator = (goals: number, assists: number) => {
    const total = goals + assists;
    if (total >= 15) return { text: 'Excellent', color: 'text-green-600 bg-green-100' };
    if (total >= 10) return { text: 'Good', color: 'text-blue-600 bg-blue-100' };
    if (total >= 5) return { text: 'Average', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'Poor', color: 'text-red-600 bg-red-100' };
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {statType === 'goals' ? 'Top Scorers' : 'Top Assisters'} - {season} {league === 'all' ? 'All Leagues' : league}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
              <tr>
                <th 
                  scope="col" 
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('team')}
                >
                  <div className="flex items-center gap-2">
                    Team {getSortIcon('team')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('goals')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Goals {getSortIcon('goals')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('assists')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Assists {getSortIcon('assists')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('goalsPerGame')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Goals/Game {getSortIcon('goalsPerGame')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-right cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('assistsPerGame')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Assists/Game {getSortIcon('assistsPerGame')}
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Form
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => {
                const form = getFormIndicator(row.goals, row.assists);
                return (
                  <tr
                    key={row.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center gap-3">
                        <Image
                          src={assetUrl(row.badge)}
                          alt={row.team}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{row.team}</div>
                          <div className="text-xs text-gray-500">{row.league}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-blue-600">
                      {row.goals}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                      {row.assists}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {row.goalsPerGame}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {row.assistsPerGame}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.color}`}>
                        {form.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, processedData.length)} of {processedData.length} teams
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === currentPage
                      ? 'text-indigo-600 bg-indigo-50 border border-indigo-300'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {processedData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No teams found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
