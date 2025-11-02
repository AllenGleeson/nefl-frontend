"use client";

// src/components/Statistics/TeamComparison.tsx
import { useState, useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import Image from "next/image";
import { StatRow } from '@/data/statistics';

interface Props {
  data: StatRow[];
  season: string;
  league: string;
}

interface TeamData {
  team: string;
  badge: string;
  goals: number;
  assists: number;
  goalsPerGame: number;
  assistsPerGame: number;
  totalPoints: number;
  form: string;
}

export default function TeamComparison({ data, season, league }: Props) {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const availableTeams = useMemo(() => {
    const filteredData = data.filter(d => {
      if (season !== 'all' && d.season !== season) return false;
      if (league !== 'all' && d.league !== league) return false;
      return true;
    });

    return filteredData.map(team => ({
      id: team.id,
      team: team.team,
      badge: team.badge,
      goals: team.goals,
      assists: team.assists,
      goalsPerGame: (team.goals / 10).toFixed(1),
      assistsPerGame: (team.assists / 10).toFixed(1),
      totalPoints: team.goals + team.assists,
      form: team.goals + team.assists >= 15 ? 'Excellent' : 
            team.goals + team.assists >= 10 ? 'Good' : 
            team.goals + team.assists >= 5 ? 'Average' : 'Poor'
    }));
  }, [data, season, league]);

  const radarData = useMemo(() => {
    if (selectedTeams.length === 0) return [];

    const selectedTeamData = availableTeams.filter(team => 
      selectedTeams.includes(team.team)
    );

    const maxGoals = Math.max(...availableTeams.map(t => t.goals));
    const maxAssists = Math.max(...availableTeams.map(t => t.assists));
    const maxGoalsPerGame = Math.max(...availableTeams.map(t => parseFloat(t.goalsPerGame)));
    const maxAssistsPerGame = Math.max(...availableTeams.map(t => parseFloat(t.assistsPerGame)));

    return selectedTeamData.map(team => ({
      team: team.team,
      Goals: (team.goals / maxGoals) * 100,
      Assists: (team.assists / maxAssists) * 100,
      'Goals/Game': (parseFloat(team.goalsPerGame) / maxGoalsPerGame) * 100,
      'Assists/Game': (parseFloat(team.assistsPerGame) / maxAssistsPerGame) * 100,
      'Total Points': (team.totalPoints / Math.max(...availableTeams.map(t => t.totalPoints))) * 100
    }));
  }, [selectedTeams, availableTeams]);

  const handleTeamToggle = (teamName: string) => {
    setSelectedTeams(prev => {
      if (prev.includes(teamName)) {
        return prev.filter(t => t !== teamName);
      } else if (prev.length < 3) {
        return [...prev, teamName];
      }
      return prev;
    });
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Comparison</h3>
        <p className="text-sm text-gray-600">
          Select up to 3 teams to compare their performance metrics
        </p>
      </div>

      {/* Team Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Select Teams to Compare:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {availableTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => handleTeamToggle(team.team)}
              disabled={!selectedTeams.includes(team.team) && selectedTeams.length >= 3}
              className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-colors ${
                selectedTeams.includes(team.team)
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                  : selectedTeams.length >= 3
                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Image
                src={team.badge}
                alt={team.team}
                width={16}
                height={16}
                className="rounded-full"
              />
              <span className="truncate">{team.team}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedTeams.length > 0 && (
        <>
          {/* Radar Chart */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Radar Chart</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="team" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  {radarData.map((_, index) => (
                    <Radar
                      key={index}
                      name={radarData[index].team}
                      dataKey={radarData[index].team}
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  ))}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Detailed Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Team</th>
                    <th className="px-3 py-2 text-right">Goals</th>
                    <th className="px-3 py-2 text-right">Assists</th>
                    <th className="px-3 py-2 text-right">Goals/Game</th>
                    <th className="px-3 py-2 text-right">Assists/Game</th>
                    <th className="px-3 py-2 text-right">Total Points</th>
                    <th className="px-3 py-2 text-center">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {availableTeams
                    .filter(team => selectedTeams.includes(team.team))
                    .map((team) => (
                      <tr key={team.id} className="border-t">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <Image
                              src={team.badge}
                              alt={team.team}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span className="font-medium">{team.team}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-blue-600">
                          {team.goals}
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-green-600">
                          {team.assists}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-600">
                          {team.goalsPerGame}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-600">
                          {team.assistsPerGame}
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-gray-900">
                          {team.totalPoints}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            team.form === 'Excellent' ? 'text-green-600 bg-green-100' :
                            team.form === 'Good' ? 'text-blue-600 bg-blue-100' :
                            team.form === 'Average' ? 'text-yellow-600 bg-yellow-100' :
                            'text-red-600 bg-red-100'
                          }`}>
                            {team.form}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedTeams.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Select teams above to see comparison data</p>
        </div>
      )}
    </div>
  );
}
