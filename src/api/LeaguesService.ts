// src/api/LeaguesService.ts
import { API_ENDPOINTS, apiRequest } from './config';

export interface League {
  id: string;
  name: string;
  season: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  teams: string[];
  totalMatches: number;
  completedMatches: number;
  description?: string;
  rules?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeagueTable {
  leagueId: string;
  season: string;
  standings: TeamStanding[];
  lastUpdated: string;
}

export interface TeamStanding {
  position: number;
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string; // Last 5 matches: W, D, L, etc.
  homeRecord: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
  };
  awayRecord: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
  };
}

export interface CreateLeagueRequest {
  name: string;
  season: string;
  startDate: string;
  endDate: string;
  teams: string[];
  description?: string;
  rules?: string;
}

export interface UpdateLeagueRequest {
  name?: string;
  startDate?: string;
  endDate?: string;
  status?: League['status'];
  teams?: string[];
  description?: string;
  rules?: string;
}

export class LeaguesService {
  // Get all leagues
  static async getLeagues(): Promise<League[]> {
    return apiRequest<League[]>(API_ENDPOINTS.LEAGUES.BASE, { method: 'GET' });
  }

  // Get league by ID
  static async getLeague(id: string): Promise<League> {
    return apiRequest<League>(`${API_ENDPOINTS.LEAGUES.BASE}/${id}`, { method: 'GET' });
  }

  // Create new league
  static async createLeague(data: CreateLeagueRequest): Promise<League> {
    return apiRequest<League>(API_ENDPOINTS.LEAGUES.BASE, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update league
  static async updateLeague(id: string, data: UpdateLeagueRequest): Promise<League> {
    return apiRequest<League>(`${API_ENDPOINTS.LEAGUES.BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete league
  static async deleteLeague(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.LEAGUES.BASE}/${id}`, {
      method: 'DELETE',
    });
  }

  // Get league table
  static async getLeagueTable(leagueId: string): Promise<LeagueTable> {
    return apiRequest<LeagueTable>(`${API_ENDPOINTS.LEAGUES.TABLES}/${leagueId}`, {
      method: 'GET',
    });
  }

  // Get all league tables
  static async getAllLeagueTables(): Promise<LeagueTable[]> {
    return apiRequest<LeagueTable[]>(API_ENDPOINTS.LEAGUES.TABLES, { method: 'GET' });
  }

  // Get standings for specific season
  static async getStandings(leagueId: string, season?: string): Promise<TeamStanding[]> {
    const url = season 
      ? `${API_ENDPOINTS.LEAGUES.STANDINGS}/${leagueId}?season=${season}`
      : `${API_ENDPOINTS.LEAGUES.STANDINGS}/${leagueId}`;
      
    return apiRequest<TeamStanding[]>(url, { method: 'GET' });
  }

  // Add team to league
  static async addTeamToLeague(leagueId: string, teamId: string): Promise<League> {
    return apiRequest<League>(`${API_ENDPOINTS.LEAGUES.BASE}/${leagueId}/teams`, {
      method: 'POST',
      body: JSON.stringify({ teamId }),
    });
  }

  // Remove team from league
  static async removeTeamFromLeague(leagueId: string, teamId: string): Promise<League> {
    return apiRequest<League>(`${API_ENDPOINTS.LEAGUES.BASE}/${leagueId}/teams/${teamId}`, {
      method: 'DELETE',
    });
  }

  // Generate fixtures for league
  static async generateFixtures(leagueId: string): Promise<{ message: string; fixtureCount: number }> {
    return apiRequest<{ message: string; fixtureCount: number }>(`${API_ENDPOINTS.LEAGUES.BASE}/${leagueId}/fixtures`, {
      method: 'POST',
    });
  }

  // Get league statistics
  static async getLeagueStats(leagueId: string): Promise<Record<string, unknown>> {
    return apiRequest<Record<string, unknown>>(`${API_ENDPOINTS.LEAGUES.BASE}/${leagueId}/stats`, { method: 'GET' });
  }
}
