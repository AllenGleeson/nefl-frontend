// src/api/AuthService.ts
import { API_ENDPOINTS, apiRequest } from './config';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'manager' | 'editor' | 'viewer';
    avatar?: string;
  };
  expiresIn: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'viewer' | 'editor' | 'manager';
  agreeToTerms: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiRequest<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }, false);
  }

  // Register new user
  static async register(userData: RegisterRequest): Promise<{ message: string; userId: string }> {
    return apiRequest<{ message: string; userId: string }>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    }, false);
  }

  // Logout user
  static async logout(): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
  }

  // Refresh token
  static async refreshToken(): Promise<{ token: string; expiresIn: number }> {
    return apiRequest<{ token: string; expiresIn: number }>(API_ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
    });
  }

  // Forgot password
  static async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data),
    }, false);
  }

  // Reset password
  static async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data),
    }, false);
  }

  // Get current user profile
  static async getCurrentUser(): Promise<LoginResponse['user']> {
    return apiRequest<LoginResponse['user']>(API_ENDPOINTS.USERS.PROFILE, {
      method: 'GET',
    });
  }

  // Update user profile
  static async updateProfile(data: Partial<LoginResponse['user']>): Promise<LoginResponse['user']> {
    return apiRequest<LoginResponse['user']>(API_ENDPOINTS.USERS.PROFILE, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}
