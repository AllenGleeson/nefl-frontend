// src/api/StatisticsService.ts
import { API_ENDPOINTS, apiRequest } from './config';

export interface PlayerStatistics {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  position: string;
  season: string;
  matchesPlayed: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  rating: number;
  cleanSheets?: number; // For goalkeepers
  saves?: number; // For goalkeepers
  goalsConceded?: number; // For goalkeepers
}

export interface TeamStatistics {
  teamId: string;
  teamName: string;
  season: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  averagePossession: number;
  averageShots: number;
  averageShotsOnTarget: number;
  averagePasses: number;
  averagePassAccuracy: number;
  averageTackles: number;
  averageInterceptions: number;
  cleanSheets: number;
  goalsConceded: number;
  yellowCards: number;
  redCards: number;
}

export interface MatchStatistics {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeScore: number;
  awayScore: number;
  possession: {
    home: number;
    away: number;
  };
  shots: {
    home: number;
    away: number;
  };
  shotsOnTarget: {
    home: number;
    away: number;
  };
  passes: {
    home: number;
    away: number;
  };
  passAccuracy: {
    home: number;
    away: number;
  };
  tackles: {
    home: number;
    away: number;
  };
  interceptions: {
    home: number;
    away: number;
  };
  fouls: {
    home: number;
    away: number;
  };
  yellowCards: {
    home: number;
    away: number;
  };
  redCards: {
    home: number;
    away: number;
  };
}

export interface StatisticsFilters {
  season?: string;
  league?: string;
  team?: string;
  player?: string;
  position?: string;
  dateFrom?: string;
  dateTo?: string;
}

export class StatisticsService {
  // Get player statistics
  static async getPlayerStats(filters?: StatisticsFilters): Promise<PlayerStatistics[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const url = params.toString() 
      ? `${API_ENDPOINTS.STATISTICS.PLAYERS}?${params.toString()}`
      : API_ENDPOINTS.STATISTICS.PLAYERS;
      
    return apiRequest<PlayerStatistics[]>(url, { method: 'GET' });
  }

  // Get top players by category
  static async getTopPlayers(
    category: 'goals' | 'assists' | 'rating' | 'cleanSheets',
    limit = 10,
    season?: string
  ): Promise<PlayerStatistics[]> {
    const url = season 
      ? `${API_ENDPOINTS.STATISTICS.PLAYERS}/top/${category}?limit=${limit}&season=${season}`
      : `${API_ENDPOINTS.STATISTICS.PLAYERS}/top/${category}?limit=${limit}`;
      
    return apiRequest<PlayerStatistics[]>(url, { method: 'GET' });
  }

  // Get team statistics
  static async getTeamStats(filters?: StatisticsFilters): Promise<TeamStatistics[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const url = params.toString() 
      ? `${API_ENDPOINTS.STATISTICS.TEAMS}?${params.toString()}`
      : API_ENDPOINTS.STATISTICS.TEAMS;
      
    return apiRequest<TeamStatistics[]>(url, { method: 'GET' });
  }

  // Get match statistics
  static async getMatchStats(matchId: string): Promise<MatchStatistics> {
    return apiRequest<MatchStatistics>(`${API_ENDPOINTS.STATISTICS.MATCHES}/${matchId}`, {
      method: 'GET',
    });
  }

  // Get all match statistics with filters
  static async getAllMatchStats(filters?: StatisticsFilters): Promise<MatchStatistics[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const url = params.toString() 
      ? `${API_ENDPOINTS.STATISTICS.MATCHES}?${params.toString()}`
      : API_ENDPOINTS.STATISTICS.MATCHES;
      
    return apiRequest<MatchStatistics[]>(url, { method: 'GET' });
  }

  // Get league statistics summary
  static async getLeagueStatsSummary(leagueId: string, season?: string): Promise<any> {
    const url = season 
      ? `${API_ENDPOINTS.STATISTICS.BASE}/league/${leagueId}?season=${season}`
      : `${API_ENDPOINTS.STATISTICS.BASE}/league/${leagueId}`;
      
    return apiRequest<any>(url, { method: 'GET' });
  }

  // Get season statistics summary
  static async getSeasonStatsSummary(season: string): Promise<any> {
    return apiRequest<any>(`${API_ENDPOINTS.STATISTICS.BASE}/season/${season}`, {
      method: 'GET',
    });
  }

  // Export statistics
  static async exportStats(
    type: 'players' | 'teams' | 'matches',
    format: 'csv' | 'excel' | 'pdf',
    filters?: StatisticsFilters
  ): Promise<Blob> {
    const params = new URLSearchParams();
    params.append('format', format);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const url = `${API_ENDPOINTS.STATISTICS.BASE}/export/${type}?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Export failed');
    }
    
    return response.blob();
  }
}

// Helper function to get headers (imported from config)
const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('nefl_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return headers;
};
