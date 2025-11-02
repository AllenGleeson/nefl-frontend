"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Club, Player, Formation } from '@/api/ClubsService';
import { FormationViewer, FormationManager } from '@/components/Management/ClubsManagement/Formation';

export default function ClubManagementPage() {
  const params = useParams();
  const clubSlug = params.slug as string;
  
  const [club, setClub] = useState<Club | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'formation' | 'players' | 'stats'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch club data by slug
    // For now, we'll use mock data
    const fetchClubData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app, fetch by slug
        const mockClub: Club = {
          id: '1',
          name: 'Walshestown FC',
          shortName: 'Walshestown',
          founded: 1985,
          ground: 'Walshestown Park',
          manager: 'John Smith',
          email: 'info@walshestownfc.com',
          phone: '+353 1 234 5678',
          address: 'Walshestown Park, Dublin, Ireland',
          logo: '/images/Ardee-Celtic.webp',
          colors: {
            primary: '#1E40AF',
            secondary: '#F59E0B'
          },
          leagues: ['Division 1'],
          status: 'active',
          formation: {
            id: '1',
            name: '4-4-2',
            description: 'Classic 4-4-2 formation',
            positions: [
              { id: '1', position: 'GK', x: 50, y: 5, playerId: '1', playerName: 'Tom Murphy' },
              { id: '2', position: 'LB', x: 20, y: 25, playerId: '2', playerName: 'Sean Walsh' },
              { id: '3', position: 'CB', x: 35, y: 25, playerId: '3', playerName: 'David Kelly' },
              { id: '4', position: 'CB', x: 65, y: 25, playerId: '4', playerName: 'Mark O\'Connor' },
              { id: '5', position: 'RB', x: 80, y: 25, playerId: '5', playerName: 'James Ryan' },
              { id: '6', position: 'LM', x: 20, y: 45, playerId: '6', playerName: 'Paul Murphy' },
              { id: '7', position: 'CM', x: 40, y: 45, playerId: '7', playerName: 'Kevin Byrne' },
              { id: '8', position: 'CM', x: 60, y: 45, playerId: '8', playerName: 'Brian O\'Neill' },
              { id: '9', position: 'RM', x: 80, y: 45, playerId: '9', playerName: 'Alan Smith' },
              { id: '10', position: 'ST', x: 40, y: 75, playerId: '10', playerName: 'John O\'Brien' },
              { id: '11', position: 'ST', x: 60, y: 75, playerId: '11', playerName: 'Michael Doyle' }
            ],
            isDefault: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        };

        const mockPlayers: Player[] = [
          { id: '1', clubId: '1', name: 'Tom Murphy', position: 'GK', jerseyNumber: 1, age: 28, joinedDate: '2020-01-01', status: 'active' },
          { id: '2', clubId: '1', name: 'Sean Walsh', position: 'LB', jerseyNumber: 3, age: 25, joinedDate: '2021-01-01', status: 'active' },
          { id: '3', clubId: '1', name: 'David Kelly', position: 'CB', jerseyNumber: 5, age: 30, joinedDate: '2019-01-01', status: 'active' },
          { id: '4', clubId: '1', name: 'Mark O\'Connor', position: 'CB', jerseyNumber: 6, age: 27, joinedDate: '2020-01-01', status: 'active' },
          { id: '5', clubId: '1', name: 'James Ryan', position: 'RB', jerseyNumber: 2, age: 26, joinedDate: '2021-01-01', status: 'active' },
          { id: '6', clubId: '1', name: 'Paul Murphy', position: 'LM', jerseyNumber: 11, age: 24, joinedDate: '2022-01-01', status: 'active' },
          { id: '7', clubId: '1', name: 'Kevin Byrne', position: 'CM', jerseyNumber: 8, age: 29, joinedDate: '2018-01-01', status: 'active' },
          { id: '8', clubId: '1', name: 'Brian O\'Neill', position: 'CM', jerseyNumber: 10, age: 31, joinedDate: '2017-01-01', status: 'active' },
          { id: '9', clubId: '1', name: 'Alan Smith', position: 'RM', jerseyNumber: 7, age: 23, joinedDate: '2022-01-01', status: 'active' },
          { id: '10', clubId: '1', name: 'John O\'Brien', position: 'ST', jerseyNumber: 9, age: 26, joinedDate: '2020-01-01', status: 'active' },
          { id: '11', clubId: '1', name: 'Michael Doyle', position: 'ST', jerseyNumber: 14, age: 28, joinedDate: '2019-01-01', status: 'active' }
        ];

        setClub(mockClub);
        setPlayers(mockPlayers);
        setFormations(mockClub.formation ? [mockClub.formation] : []);
        setSelectedFormation(mockClub.formation || null);
      } catch (error) {
        console.error('Error fetching club data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubData();
  }, [clubSlug]);

  const handleFormationCreate = async (data: any) => {
    // In real app, call API to create formation
    console.log('Creating formation:', data);
  };

  const handleFormationUpdate = async (formationId: string, data: Partial<Formation>) => {
    // In real app, call API to update formation
    console.log('Updating formation:', formationId, data);
  };

  const handleFormationDelete = async (formationId: string) => {
    // In real app, call API to delete formation
    console.log('Deleting formation:', formationId);
  };

  const handleFormationSelect = (formation: Formation) => {
    setSelectedFormation(formation);
  };

  const handlePlayerAssign = async (positionId: string, playerId: string) => {
    // In real app, call API to assign player to position
    console.log('Assigning player:', playerId, 'to position:', positionId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading club data...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Club Not Found</h1>
          <p className="text-gray-600">The club you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                ← Back
              </button>
              <div className="flex items-center">
                {club.logo && (
                  <img src={club.logo} alt={club.name} className="h-10 w-10 rounded-full mr-3" />
                )}
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{club.name}</h1>
                  <p className="text-sm text-gray-500">{club.manager} • {club.ground}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                club.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {club.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'formation', name: 'Formation' },
              { id: 'players', name: 'Players' },
              { id: 'stats', name: 'Statistics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Club Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Basic Details</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Founded</dt>
                      <dd className="text-sm text-gray-900">{club.founded}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Ground</dt>
                      <dd className="text-sm text-gray-900">{club.ground}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Manager</dt>
                      <dd className="text-sm text-gray-900">{club.manager}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Leagues</dt>
                      <dd className="text-sm text-gray-900">{club.leagues.join(', ')}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                  <dl className="space-y-2">
                    {club.email && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="text-sm text-gray-900">{club.email}</dd>
                      </div>
                    )}
                    {club.phone && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="text-sm text-gray-900">{club.phone}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="text-sm text-gray-900">{club.address}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formation' && (
          <div className="space-y-6">
            {selectedFormation ? (
              <div className="bg-white rounded-lg shadow p-6">
                <FormationViewer
                  formation={selectedFormation}
                  players={players}
                  onPlayerAssign={handlePlayerAssign}
                  editable={true}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Formation Selected</h3>
                  <p className="text-gray-500">Select a formation from the manager below or create a new one.</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
              <FormationManager
                clubId={club.id}
                formations={formations}
                players={players}
                onFormationCreate={handleFormationCreate}
                onFormationUpdate={handleFormationUpdate}
                onFormationDelete={handleFormationDelete}
                onFormationSelect={handleFormationSelect}
                selectedFormation={selectedFormation}
              />
            </div>
          </div>
        )}

        {activeTab === 'players' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Squad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player) => (
                <div key={player.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{player.name}</h3>
                    <span className="text-sm text-gray-500">#{player.jerseyNumber}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{player.position} • Age {player.age}</p>
                    <p className="text-xs text-gray-500">Joined: {new Date(player.joinedDate).getFullYear()}</p>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                    player.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {player.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Club Statistics</h2>
            <div className="text-center py-12">
              <p className="text-gray-500">Statistics will be displayed here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
