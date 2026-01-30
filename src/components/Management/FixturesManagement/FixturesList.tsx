"use client";

// src/components/Management/FixturesManagement/FixturesList.tsx
import { useState, useMemo } from 'react';
import Image from 'next/image';
import ScoreEntry from './ScoreEntry';
import EditFixtureForm from './EditFixtureForm';
import { assetUrl } from '@/utils/assetUrl';

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed';
  homeScore?: number;
  awayScore?: number;
  logo: string;
}

interface FixturesListProps {
  filters?: {
    status: string;
    league: string;
    team: string;
    dateRange: string;
  };
  onAddFixture?: () => void;
  onEditFixture?: (fixture: Fixture) => void;
  onScoreEntry?: (fixture: Fixture) => void;
}

export default function FixturesList({ filters, onAddFixture, onEditFixture, onScoreEntry }: FixturesListProps) {
  const [fixtures, setFixtures] = useState<Fixture[]>([
    // Division 1 Fixtures
    {
      id: '1',
      homeTeam: 'Walshestown FC',
      awayTeam: 'Athboy Celtic',
      date: '2024-01-15',
      time: '15:00',
      venue: 'Walshestown Park',
      league: 'Division 1',
      status: 'scheduled',
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '2',
      homeTeam: 'Dublin United',
      awayTeam: 'Cork City',
      date: '2024-01-14',
      time: '17:30',
      venue: 'Dublin Sports Ground',
      league: 'Division 1',
      status: 'completed',
      homeScore: 2,
      awayScore: 1,
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '3',
      homeTeam: 'Athboy Celtic',
      awayTeam: 'Walshestown FC',
      date: '2024-01-12',
      time: '14:00',
      venue: 'Athboy Sports Complex',
      league: 'Division 1',
      status: 'completed',
      homeScore: 0,
      awayScore: 3,
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '4',
      homeTeam: 'Cork City',
      awayTeam: 'Dublin United',
      date: '2024-01-20',
      time: '16:00',
      venue: 'Turner\'s Cross',
      league: 'Division 1',
      status: 'scheduled',
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    
    // Division 2 Fixtures
    {
      id: '5',
      homeTeam: 'Galway United',
      awayTeam: 'Limerick FC',
      date: '2024-01-13',
      time: '12:30',
      venue: 'Eamonn Deacy Park',
      league: 'Division 2',
      status: 'live',
      homeScore: 1,
      awayScore: 0,
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '6',
      homeTeam: 'Limerick FC',
      awayTeam: 'Galway United',
      date: '2024-01-10',
      time: '15:30',
      venue: 'Markets Field',
      league: 'Division 2',
      status: 'completed',
      homeScore: 2,
      awayScore: 2,
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '7',
      homeTeam: 'Waterford FC',
      awayTeam: 'Sligo Rovers',
      date: '2024-01-18',
      time: '19:45',
      venue: 'Waterford Regional Sports Centre',
      league: 'Division 2',
      status: 'scheduled',
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    
    // Premier League Fixtures
    {
      id: '8',
      homeTeam: 'Shamrock Rovers',
      awayTeam: 'Bohemians',
      date: '2024-01-16',
      time: '19:45',
      venue: 'Tallaght Stadium',
      league: 'Premier League',
      status: 'scheduled',
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '9',
      homeTeam: 'St. Patrick\'s Athletic',
      awayTeam: 'Shamrock Rovers',
      date: '2024-01-11',
      time: '19:45',
      venue: 'Richmond Park',
      league: 'Premier League',
      status: 'completed',
      homeScore: 1,
      awayScore: 2,
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '10',
      homeTeam: 'Bohemians',
      awayTeam: 'St. Patrick\'s Athletic',
      date: '2024-01-09',
      time: '19:45',
      venue: 'Dalymount Park',
      league: 'Premier League',
      status: 'postponed',
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    
    // More Division 1
    {
      id: '11',
      homeTeam: 'Walshestown FC',
      awayTeam: 'Cork City',
      date: '2024-01-22',
      time: '15:00',
      venue: 'Walshestown Park',
      league: 'Division 1',
      status: 'scheduled',
      logo: assetUrl('/images/Ardee-Celtic.webp')
    },
    {
      id: '12',
      homeTeam: 'Dublin United',
      awayTeam: 'Athboy Celtic',
      date: '2024-01-21',
      time: '14:30',
      venue: 'Dublin Sports Ground',
      league: 'Division 1',
      status: 'live',
      homeScore: 1,
      awayScore: 1,
      logo: assetUrl('/images/Ardee-Celtic.webp')
    }
  ]);

  const [showScoreEntry, setShowScoreEntry] = useState<string | null>(null);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [showEditFixture, setShowEditFixture] = useState(false);
  const [editingFixture, setEditingFixture] = useState<Fixture | null>(null);

  // Filter fixtures based on applied filters
  const filteredFixtures = useMemo(() => {
    if (!filters) return fixtures;

    return fixtures.filter(fixture => {
      // Status filter
      if (filters.status !== 'all' && fixture.status !== filters.status) {
        return false;
      }

      // League filter
      if (filters.league !== 'all' && fixture.league !== filters.league) {
        return false;
      }

      // Team filter
      if (filters.team !== 'all' && 
          fixture.homeTeam !== filters.team && 
          fixture.awayTeam !== filters.team) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const fixtureDate = new Date(fixture.date);
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        switch (filters.dateRange) {
          case 'today':
            const todayEnd = new Date(todayStart);
            todayEnd.setDate(todayEnd.getDate() + 1);
            if (fixtureDate < todayStart || fixtureDate >= todayEnd) return false;
            break;
          case 'week':
            const weekStart = new Date(todayStart);
            weekStart.setDate(weekStart.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);
            if (fixtureDate < weekStart || fixtureDate >= weekEnd) return false;
            break;
          case 'month':
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            if (fixtureDate < monthStart || fixtureDate >= monthEnd) return false;
            break;
        }
      }

      return true;
    });
  }, [fixtures, filters]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'postponed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleScoreUpdate = (fixtureId: string, homeScore: number, awayScore: number) => {
    setFixtures(prev => prev.map(fixture => 
      fixture.id === fixtureId 
        ? { ...fixture, homeScore, awayScore, status: 'completed' as const }
        : fixture
    ));
    setShowScoreEntry(null);
    setSelectedFixture(null);
  };

  const handleScoreEntry = (fixture: Fixture) => {
    if (onScoreEntry) {
      onScoreEntry(fixture);
    } else {
      setSelectedFixture(fixture);
      setShowScoreEntry(fixture.id);
    }
  };

  const handleEditFixture = (fixture: Fixture) => {
    if (onEditFixture) {
      onEditFixture(fixture);
    } else {
      setEditingFixture(fixture);
      setShowEditFixture(true);
    }
  };

  const handleCancelScoreEntry = () => {
    setShowScoreEntry(null);
    setSelectedFixture(null);
  };

  const handleCloseEditFixture = () => {
    setShowEditFixture(false);
    setEditingFixture(null);
  };

  const handleFixtureUpdated = () => {
    setShowEditFixture(false);
    setEditingFixture(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-bold">Upcoming & Recent Fixtures</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-gray-500">
              Showing {filteredFixtures.length} of {fixtures.length} fixtures
            </span>
            {onAddFixture && (
              <button 
                onClick={onAddFixture}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Fixture
              </button>
            )}
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {filteredFixtures.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <p className="text-base sm:text-lg font-medium">No fixtures found</p>
              <p className="text-xs sm:text-sm">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            filteredFixtures.map((fixture) => (
            <div key={fixture.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center justify-between sm:justify-center space-x-2 sm:space-x-4">
                    <div className="text-center min-w-0 flex-1 flex flex-col items-center">
                      <Image 
                        src={assetUrl(fixture.logo)} 
                        alt={`${fixture.homeTeam} logo`}
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-1"
                      />
                      <p className="text-sm sm:text-base font-semibold truncate">{fixture.homeTeam}</p>
                      {fixture.homeScore !== undefined && (
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{fixture.homeScore}</p>
                      )}
                    </div>
                    <div className="text-center flex-shrink-0">
                      <p className="text-xs sm:text-sm text-gray-500">vs</p>
                      <p className="text-xs text-gray-600 hidden sm:block">{fixture.date} {fixture.time}</p>
                    </div>
                    <div className="text-center min-w-0 flex-1 flex flex-col items-center">
                      <Image 
                        src={assetUrl(fixture.logo)} 
                        alt={`${fixture.awayTeam} logo`}
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-1"
                      />
                      <p className="text-sm sm:text-base font-semibold truncate">{fixture.awayTeam}</p>
                      {fixture.awayScore !== undefined && (
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{fixture.awayScore}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-2">
                    <p className="truncate">📍 {fixture.venue}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">{fixture.league}</p>
                      <p className="text-xs text-gray-500 sm:hidden">{fixture.date} {fixture.time}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fixture.status)}`}>
                      {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                    </span>
                    {(fixture.status === 'scheduled' || fixture.status === 'live') && (
                      <button 
                        onClick={() => handleScoreEntry(fixture)}
                        className="text-green-600 hover:text-green-800 text-xs sm:text-sm font-medium"
                      >
                        Enter Score
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => handleEditFixture(fixture)}
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm self-start sm:self-auto"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      {/* Score Entry Modal */}
      {showScoreEntry && selectedFixture && (
        <ScoreEntry
          isOpen={true}
          onClose={handleCancelScoreEntry}
          onSuccess={handleCancelScoreEntry}
          fixtureId={selectedFixture.id}
          homeTeam={selectedFixture.homeTeam}
          awayTeam={selectedFixture.awayTeam}
          currentHomeScore={selectedFixture.homeScore}
          currentAwayScore={selectedFixture.awayScore}
          onScoreUpdate={handleScoreUpdate}
        />
      )}

      {/* Edit Fixture Modal */}
      {showEditFixture && editingFixture && (
        <EditFixtureForm
          isOpen={true}
          onClose={handleCloseEditFixture}
          onSuccess={handleFixtureUpdated}
          fixture={editingFixture}
        />
      )}
    </div>
  );
}
