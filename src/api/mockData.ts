// src/api/mockData.ts
// Mock data for development when backend is not available

export const mockUsers = [
  {
    id: '1',
    email: 'admin@nefl.com',
    name: 'Admin User',
    role: 'admin',
    avatar: '/images/avatars/admin.jpg'
  },
  {
    id: '2',
    email: 'manager@nefl.com',
    name: 'Manager User',
    role: 'manager',
    avatar: '/images/avatars/manager.jpg'
  },
  {
    id: '3',
    email: 'editor@nefl.com',
    name: 'Editor User',
    role: 'editor',
    avatar: '/images/avatars/editor.jpg'
  }
];

export const mockFixtures = [
  {
    id: '1',
    homeTeam: 'Walshestown FC',
    awayTeam: 'Athboy Celtic',
    homeTeamId: '1',
    awayTeamId: '2',
    date: '2024-01-15',
    time: '15:00',
    venue: 'Walshestown Park',
    league: 'Division 1',
    season: '2023-24',
    status: 'scheduled' as const,
    referee: 'John Smith',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    homeTeam: 'Athboy Celtic',
    awayTeam: 'Walshestown FC',
    homeTeamId: '2',
    awayTeamId: '1',
    date: '2024-01-14',
    time: '17:30',
    venue: 'Athboy Sports Complex',
    league: 'Division 1',
    season: '2023-24',
    status: 'completed' as const,
    homeScore: 2,
    awayScore: 1,
    referee: 'Mike Wilson',
    attendance: 150,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockClubs = [
  {
    id: '1',
    name: 'Walshestown FC',
    shortName: 'Walshestown',
    founded: 1985,
    ground: 'Walshestown Park',
    manager: 'John Smith',
    email: 'info@walshestownfc.com',
    phone: '+353 1 234 5678',
    address: 'Walshestown Park, Dublin, Ireland',
    logo: '/images/logos/walshestown.png',
    colors: {
      primary: '#1E40AF',
      secondary: '#F59E0B'
    },
    leagues: ['Division 1'],
    status: 'active' as const,
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
  },
  {
    id: '2',
    name: 'Athboy Celtic',
    shortName: 'Athboy',
    founded: 1992,
    ground: 'Athboy Sports Complex',
    manager: 'Mike O\'Brien',
    email: 'contact@athboyceltic.ie',
    phone: '+353 1 234 5679',
    address: 'Athboy Sports Complex, Meath, Ireland',
    logo: '/images/logos/athboy.png',
    colors: {
      primary: '#059669',
      secondary: '#FFFFFF'
    },
    leagues: ['Division 1'],
    status: 'active' as const,
    formation: {
      id: '2',
      name: '4-3-3',
      description: 'Attacking 4-3-3 formation',
      positions: [
        { id: '12', position: 'GK', x: 50, y: 5, playerId: '12', playerName: 'Pat Kelly' },
        { id: '13', position: 'LB', x: 20, y: 25, playerId: '13', playerName: 'Liam Murphy' },
        { id: '14', position: 'CB', x: 35, y: 25, playerId: '14', playerName: 'Conor Walsh' },
        { id: '15', position: 'CB', x: 65, y: 25, playerId: '15', playerName: 'Eoin O\'Connor' },
        { id: '16', position: 'RB', x: 80, y: 25, playerId: '16', playerName: 'Niall Ryan' },
        { id: '17', position: 'CDM', x: 50, y: 40, playerId: '17', playerName: 'Danny Byrne' },
        { id: '18', position: 'CM', x: 35, y: 55, playerId: '18', playerName: 'Rob O\'Neill' },
        { id: '19', position: 'CM', x: 65, y: 55, playerId: '19', playerName: 'Gary Smith' },
        { id: '20', position: 'LW', x: 20, y: 75, playerId: '20', playerName: 'Steve O\'Brien' },
        { id: '21', position: 'ST', x: 50, y: 75, playerId: '21', playerName: 'Tony Doyle' },
        { id: '22', position: 'RW', x: 80, y: 75, playerId: '22', playerName: 'Chris Murphy' }
      ],
      isDefault: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockProducts = [
  {
    id: '1',
    name: 'NEFL Official Jersey',
    description: 'Official NEFL team jersey with league logo',
    price: 49.99,
    originalPrice: 59.99,
    category: 'Jerseys',
    subcategory: 'Home Kit',
    sku: 'NEFL-JERSEY-001',
    stock: 25,
    images: ['/images/products/jersey-1.jpg', '/images/products/jersey-2.jpg'],
    tags: ['jersey', 'official', 'home'],
    status: 'active' as const,
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'League Scarf',
    description: 'Warm wool scarf with team colors',
    price: 19.99,
    category: 'Accessories',
    subcategory: 'Scarves',
    sku: 'NEFL-SCARF-001',
    stock: 0,
    images: ['/images/products/scarf-1.jpg'],
    tags: ['scarf', 'accessories', 'wool'],
    status: 'out_of_stock' as const,
    featured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];
