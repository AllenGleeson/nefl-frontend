// src/api/ClubsService.ts
import { API_ENDPOINTS, apiRequest } from './config';

export interface Club {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  ground: string; // Changed from "stadium" to "ground" for local football
  manager: string;
  email?: string;
  phone?: string;
  address: string;
  logo?: string;
  colors: {
    primary: string;
    secondary: string;
  };
  leagues: string[];
  status: 'active' | 'inactive' | 'suspended';
  formation?: Formation; // Added formation data
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  id: string;
  clubId: string;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  joinedDate: string;
  status: 'active' | 'injured' | 'suspended' | 'retired';
  stats?: PlayerStats;
}

export interface PlayerStats {
  playerId: string;
  season: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating: number;
}

export interface Formation {
  id: string;
  name: string; // e.g., "4-4-2", "3-5-2", "4-3-3"
  description?: string;
  positions: FormationPosition[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormationPosition {
  id: string;
  position: string; // e.g., "GK", "CB", "LB", "RB", "CM", "LW", "RW", "ST"
  x: number; // Position on pitch (0-100, left to right)
  y: number; // Position on pitch (0-100, top to bottom)
  playerId?: string; // Optional: assigned player
  playerName?: string; // Optional: player name for display
  isSubstitute?: boolean;
}

export interface CreateFormationRequest {
  name: string;
  description?: string;
  positions: Omit<FormationPosition, 'id'>[];
  isDefault?: boolean;
}

export interface UpdateFormationRequest {
  name?: string;
  description?: string;
  positions?: FormationPosition[];
  isDefault?: boolean;
}

export interface CreateClubRequest {
  name: string;
  shortName: string;
  founded: number;
  ground: string;
  manager: string;
  email?: string;
  phone?: string;
  address: string;
  colors: {
    primary: string;
    secondary: string;
  };
  leagues: string[];
}

export interface UpdateClubRequest {
  name?: string;
  shortName?: string;
  ground?: string;
  manager?: string;
  email?: string;
  phone?: string;
  address?: string;
  colors?: {
    primary: string;
    secondary: string;
  };
  leagues?: string[];
  status?: Club['status'];
}

export class ClubsService {
  // Get all clubs
  static async getClubs(): Promise<Club[]> {
    return apiRequest<Club[]>(API_ENDPOINTS.CLUBS.BASE, { method: 'GET' });
  }

  // Get club by ID
  static async getClub(id: string): Promise<Club> {
    return apiRequest<Club>(`${API_ENDPOINTS.CLUBS.BASE}/${id}`, { method: 'GET' });
  }

  // Create new club
  static async createClub(data: CreateClubRequest): Promise<Club> {
    return apiRequest<Club>(API_ENDPOINTS.CLUBS.BASE, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update club
  static async updateClub(id: string, data: UpdateClubRequest): Promise<Club> {
    return apiRequest<Club>(`${API_ENDPOINTS.CLUBS.BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete club
  static async deleteClub(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.CLUBS.BASE}/${id}`, {
      method: 'DELETE',
    });
  }

  // Get club squad
  static async getClubSquad(clubId: string): Promise<Player[]> {
    return apiRequest<Player[]>(`${API_ENDPOINTS.CLUBS.SQUAD}/${clubId}`, { method: 'GET' });
  }

  // Add player to squad
  static async addPlayer(clubId: string, playerData: Omit<Player, 'id' | 'clubId'>): Promise<Player> {
    return apiRequest<Player>(`${API_ENDPOINTS.CLUBS.SQUAD}/${clubId}`, {
      method: 'POST',
      body: JSON.stringify(playerData),
    });
  }

  // Update player
  static async updatePlayer(playerId: string, data: Partial<Player>): Promise<Player> {
    return apiRequest<Player>(`${API_ENDPOINTS.CLUBS.SQUAD}/player/${playerId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Remove player from squad
  static async removePlayer(playerId: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.CLUBS.SQUAD}/player/${playerId}`, {
      method: 'DELETE',
    });
  }

  // Get club statistics
  static async getClubStats(clubId: string, season?: string): Promise<any> {
    const url = season 
      ? `${API_ENDPOINTS.CLUBS.STATS}/${clubId}?season=${season}`
      : `${API_ENDPOINTS.CLUBS.STATS}/${clubId}`;
      
    return apiRequest<any>(url, { method: 'GET' });
  }

  // Search clubs
  static async searchClubs(query: string): Promise<Club[]> {
    return apiRequest<Club[]>(`${API_ENDPOINTS.CLUBS.BASE}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
    });
  }

  // Formation management
  static async getClubFormations(clubId: string): Promise<Formation[]> {
    return apiRequest<Formation[]>(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/formations`, {
      method: 'GET',
    });
  }

  static async getClubFormation(clubId: string, formationId: string): Promise<Formation> {
    return apiRequest<Formation>(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/formations/${formationId}`, {
      method: 'GET',
    });
  }

  static async createFormation(clubId: string, data: CreateFormationRequest): Promise<Formation> {
    return apiRequest<Formation>(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/formations`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async updateFormation(clubId: string, formationId: string, data: UpdateFormationRequest): Promise<Formation> {
    return apiRequest<Formation>(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/formations/${formationId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async deleteFormation(clubId: string, formationId: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/formations/${formationId}`, {
      method: 'DELETE',
    });
  }

  static async setDefaultFormation(clubId: string, formationId: string): Promise<Formation> {
    return apiRequest<Formation>(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/formations/${formationId}/set-default`, {
      method: 'POST',
    });
  }

  static async assignPlayerToPosition(clubId: string, formationId: string, positionId: string, playerId: string): Promise<Formation> {
    return apiRequest<Formation>(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/formations/${formationId}/positions/${positionId}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ playerId }),
    });
  }
}
