import { get, post } from '../services/api';
import type { LoginRequest, LoginResponse, JwtResponse } from '../types/auth';
import type { User, UserProfile } from '../types/user';

const AUTH_TOKEN_KEY = 'gym_token';
const AUTH_USER_KEY = 'gym_user';
const AUTH_PROFILE_KEY = 'gym_current_profile';

export default class AuthModel {
  // Login with JWT (GET method)
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const res = await get<JwtResponse>(
      `/jwt?loginid=${credentials.loginid}&passwd=${credentials.passwd}`
    );

    const token = res.data.token;
    const user = res.data.user;

    // Store token and user info
    this.saveSession(token, user);

    return { token, user };
  }

  // Login with POST method
  static async loginPost(credentials: LoginRequest): Promise<LoginResponse> {
    const res = await post<{ token: string; user: User }>(
      '/auth/login',
      credentials
    );

    const token = res.data.token;
    const user = res.data.user;

    // Store token and user info
    this.saveSession(token, user);

    return { token, user };
  }

  // Helper to save session and initialize profile
  private static saveSession(token: string, user: User): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    // Set initial profile
    if (user.profiles && user.profiles.length > 0) {
      // Try to find profile matching current role
      const currentProfile = user.profiles.find(p => p.role === user.role) || user.profiles[0];
      localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(currentProfile));
    } else {
        localStorage.removeItem(AUTH_PROFILE_KEY);
    }
    
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }

  // Logout
  static logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_PROFILE_KEY);
  }

  // Get current user
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Get token
  static getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Check user role
  static hasRole(role: number): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Refresh token (if backend supports it)
  static async refreshToken(): Promise<string> {
    const res = await post<{ token: string }>('/auth/refresh');
    const token = res.data.token;

    localStorage.setItem(AUTH_TOKEN_KEY, token);

    return token;
  }

  // Verify token
  static async verifyToken(): Promise<boolean> {
    try {
      await get<{ valid: boolean }>('/auth/verify');
      return true;
    } catch {
      return false;
    }
  }
  
  // Get current profile
  static getCurrentProfile(): UserProfile | null {
    const profileStr = localStorage.getItem(AUTH_PROFILE_KEY);
    if (profileStr) {
        try {
            return JSON.parse(profileStr);
        } catch {
            return null;
        }
    }
    
    // Fallback if not explicitly set but user exists
    const user = this.getCurrentUser();
    if (user && user.profiles && user.profiles.length > 0) {
        return user.profiles.find(p => p.role === user.role) || user.profiles[0];
    }
    
    return null;
  }
  
  // Switch profile
  static switchProfile(profile: UserProfile): void {
      const user = this.getCurrentUser();
      if (!user) return;
      
      // Update current profile
      localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(profile));
      
      // Update user role to match profile for compatibility
      const updatedUser = { ...user, role: profile.role };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
  }
}

