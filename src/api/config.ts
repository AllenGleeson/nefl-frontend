// src/api/config.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  
  // User Management
  USERS: {
    BASE: `${API_BASE_URL}/users`,
    PROFILE: `${API_BASE_URL}/users/profile`,
    ROLES: `${API_BASE_URL}/users/roles`,
  },
  
  // Fixtures
  FIXTURES: {
    BASE: `${API_BASE_URL}/fixtures`,
    BY_DATE: `${API_BASE_URL}/fixtures/date`,
    BY_TEAM: `${API_BASE_URL}/fixtures/team`,
    BY_LEAGUE: `${API_BASE_URL}/fixtures/league`,
  },
  
  // Clubs
  CLUBS: {
    BASE: `${API_BASE_URL}/clubs`,
    SQUAD: `${API_BASE_URL}/clubs/squad`,
    STATS: `${API_BASE_URL}/clubs/stats`,
  },
  
  // Leagues
  LEAGUES: {
    BASE: `${API_BASE_URL}/leagues`,
    TABLES: `${API_BASE_URL}/leagues/tables`,
    STANDINGS: `${API_BASE_URL}/leagues/standings`,
  },
  
  // Statistics
  STATISTICS: {
    BASE: `${API_BASE_URL}/statistics`,
    PLAYERS: `${API_BASE_URL}/statistics/players`,
    TEAMS: `${API_BASE_URL}/statistics/teams`,
    MATCHES: `${API_BASE_URL}/statistics/matches`,
  },
  
  // News
  NEWS: {
    BASE: `${API_BASE_URL}/news`,
    FEATURED: `${API_BASE_URL}/news/featured`,
    BY_CATEGORY: `${API_BASE_URL}/news/category`,
  },
  
  // Store
  STORE: {
    BASE: `${API_BASE_URL}/store`,
    PRODUCTS: `${API_BASE_URL}/store/products`,
    CATEGORIES: `${API_BASE_URL}/store/categories`,
    ORDERS: `${API_BASE_URL}/store/orders`,
  },
} as const;

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Common headers for API requests
export const getHeaders = (includeAuth = true) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('nefl_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API error handler
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request handler
export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {},
  includeAuth = true
): Promise<T> => {
  const config: RequestInit = {
    ...options,
    headers: {
      ...getHeaders(includeAuth),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `HTTP error! status: ${response.status}`,
        errorData.code
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error occurred');
  }
};
