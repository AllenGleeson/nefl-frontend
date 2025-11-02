// src/api/FixturesService.ts
import { API_ENDPOINTS, apiRequest } from './config';

export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  season: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'cancelled';
  homeScore?: number;
  awayScore?: number;
  referee?: string;
  attendance?: number;
  weather?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFixtureRequest {
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  season: string;
  referee?: string;
  notes?: string;
}

export interface UpdateFixtureRequest {
  date?: string;
  time?: string;
  venue?: string;
  status?: Fixture['status'];
  homeScore?: number;
  awayScore?: number;
  referee?: string;
  attendance?: number;
  weather?: string;
  notes?: string;
}

export interface FixtureFilters {
  league?: string;
  team?: string;
  status?: Fixture['status'];
  dateFrom?: string;
  dateTo?: string;
  season?: string;
}

export class FixturesService {
  // Get all fixtures with optional filters
  static async getFixtures(filters?: FixtureFilters): Promise<Fixture[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const url = params.toString() 
      ? `${API_ENDPOINTS.FIXTURES.BASE}?${params.toString()}`
      : API_ENDPOINTS.FIXTURES.BASE;
      
    return apiRequest<Fixture[]>(url, { method: 'GET' });
  }

  // Get fixture by ID
  static async getFixture(id: string): Promise<Fixture> {
    return apiRequest<Fixture>(`${API_ENDPOINTS.FIXTURES.BASE}/${id}`, {
      method: 'GET',
    });
  }

  // Create new fixture
  static async createFixture(data: CreateFixtureRequest): Promise<Fixture> {
    return apiRequest<Fixture>(API_ENDPOINTS.FIXTURES.BASE, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update fixture
  static async updateFixture(id: string, data: UpdateFixtureRequest): Promise<Fixture> {
    return apiRequest<Fixture>(`${API_ENDPOINTS.FIXTURES.BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete fixture
  static async deleteFixture(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_ENDPOINTS.FIXTURES.BASE}/${id}`, {
      method: 'DELETE',
    });
  }

  // Get fixtures by date range
  static async getFixturesByDate(dateFrom: string, dateTo: string): Promise<Fixture[]> {
    return apiRequest<Fixture[]>(`${API_ENDPOINTS.FIXTURES.BY_DATE}?from=${dateFrom}&to=${dateTo}`, {
      method: 'GET',
    });
  }

  // Get fixtures by team
  static async getFixturesByTeam(teamId: string): Promise<Fixture[]> {
    return apiRequest<Fixture[]>(`${API_ENDPOINTS.FIXTURES.BY_TEAM}/${teamId}`, {
      method: 'GET',
    });
  }

  // Get fixtures by league
  static async getFixturesByLeague(leagueId: string): Promise<Fixture[]> {
    return apiRequest<Fixture[]>(`${API_ENDPOINTS.FIXTURES.BY_LEAGUE}/${leagueId}`, {
      method: 'GET',
    });
  }

  // Bulk update fixtures (for admin)
  static async bulkUpdateFixtures(updates: Array<{ id: string; data: UpdateFixtureRequest }>): Promise<Fixture[]> {
    return apiRequest<Fixture[]>(`${API_ENDPOINTS.FIXTURES.BASE}/bulk`, {
      method: 'PUT',
      body: JSON.stringify({ updates }),
    });
  }
}
