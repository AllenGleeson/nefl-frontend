"use client";

// src/components/Management/ClubsManagement/ClubsList.tsx
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ClubsManagementControls from './ClubsManagementControls';

interface Club {
  id: string;
  name: string;
  logo: string;
  leagues: string[];
  founded: number;
  stadium: string;
  manager: string;
  players: number;
  status: 'active' | 'inactive';
}

interface User {
  id: string;
  role: 'admin' | 'manager' | 'editor';
}

type Props = {
  onAddClub?: () => void
  currentUser?: User
}

export default function ClubsList({ onAddClub, currentUser }: Props) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [clubs] = useState<Club[]>([
    {
      id: '1',
      name: 'Walshestown FC',
      logo: '/images/Ardee-Celtic.webp',
      leagues: ['Division 1', 'Youth League'],
      founded: 1985,
      stadium: 'Walshestown Park',
      manager: 'John Smith',
      players: 11,
      status: 'active'
    },
    {
      id: '2',
      name: 'Athboy Celtic',
      logo: '/images/Ardee-Celtic.webp',
      leagues: ['Division 1'],
      founded: 1992,
      stadium: 'Athboy Sports Complex',
      manager: 'Mike O\'Brien',
      players: 11,
      status: 'active'
    },
    {
      id: '3',
      name: 'Dublin United',
      logo: '/images/Ardee-Celtic.webp',
      leagues: ['Division 1', 'Premier League', 'Championship'],
      founded: 1990,
      stadium: 'Dublin Sports Ground',
      manager: 'Pat Murphy',
      players: 12,
      status: 'active'
    },
    {
      id: '4',
      name: 'Cork City FC',
      logo: '/images/Ardee-Celtic.webp',
      leagues: ['Premier League', 'Championship'],
      founded: 1984,
      stadium: 'Turner\'s Cross',
      manager: 'Sarah O\'Connor',
      players: 15,
      status: 'active'
    },
    {
      id: '5',
      name: 'Galway United',
      logo: '/images/Ardee-Celtic.webp',
      leagues: ['Division 1', 'Youth League'],
      founded: 1977,
      stadium: 'Eamonn Deacy Park',
      manager: 'David Walsh',
      players: 13,
      status: 'active'
    },
    {
      id: '6',
      name: 'Limerick FC',
      logo: '/images/Ardee-Celtic.webp',
      leagues: ['Championship', 'League One'],
      founded: 1983,
      stadium: 'Markets Field',
      manager: '',
      players: 10,
      status: 'inactive'
    },
    {
      id: '7',
      name: 'Waterford FC',
      logo: '/images/Ardee-Celtic.webp',
      leagues: ['Premier League', 'Division 1'],
      founded: 1930,
      stadium: 'Waterford Regional Sports Centre',
      manager: 'Emma Kelly',
      players: 14,
      status: 'active'
    }
  ]);

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const canEdit = () => {
    return currentUser?.role === 'admin';
  };

  const canManage = () => {
    return currentUser?.role === 'admin' || currentUser?.role === 'manager';
  };

  // Filter clubs based on search query and status
  const filteredClubs = useMemo(() => {
    return clubs.filter(club => {
      // Search filter - only search club names
      const matchesSearch = !searchQuery.trim() || 
        club.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || club.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [clubs, searchQuery, statusFilter]);

  // Determine if controls should be shown (more than 3 clubs)
  const showControls = clubs.length > 3;
  const effectiveViewMode = clubs.length <= 3 ? 'grid' : viewMode;

  return (
    <div>
      {/* Search and View Controls */}
      <ClubsManagementControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        showControls={showControls}
      />

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Registered Clubs</h2>
          <div className="flex flex-row gap-2 flex-wrap">
            {onAddClub && (
              <button 
                onClick={onAddClub}
                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base flex items-center"
              >
                Add Club
              </button>
            )}
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Export Data
            </button>
            <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
              Import Clubs
            </button>
          </div>
        </div>
        
        <div className={effectiveViewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3 sm:space-y-4'}>
          {filteredClubs.map((club) => {
            if (effectiveViewMode === 'grid') {
              return (
                <div key={club.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden">
                      <Image
                        src={club.logo}
                        alt={`${club.name} logo`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{club.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {club.leagues.length} league{club.leagues.length === 1 ? '' : 's'}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(club.status)}`}>
                      {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Ground: </span>
                      <span className="font-medium">{club.stadium}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Manager: </span>
                      <span className="font-medium">{club.manager || 'No Manager'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Players: </span>
                      <span className="font-medium">{club.players}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {canManage() && (
                      <Link 
                        href={`/management/clubs/${club.id}`}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                      >
                        Manage
                      </Link>
                    )}
                    {canEdit() && (
                      <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors">
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            // List view (default)
            return (
              <div key={club.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={club.logo}
                          alt={`${club.name} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold truncate">{club.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {club.leagues.length} league{club.leagues.length === 1 ? '' : 's'} • Founded {club.founded}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium self-start sm:self-auto ${getStatusColor(club.status)}`}>
                          {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm flex-1">
                    <div>
                      <p className="text-gray-500">Ground</p>
                      <p className="font-medium truncate">{club.stadium}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Manager</p>
                      <p className="font-medium truncate">{club.manager || 'No Manager'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Players</p>
                      <p className="font-medium">{club.players}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center justify-end lg:justify-start">
                    {canManage() && (
                      <Link 
                        href={`/management/clubs/${club.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        Manage
                      </Link>
                    )}
                    {canEdit() && (
                      <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center">
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
