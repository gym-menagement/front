import { get, post } from './api';
import type {
  LoginRequest,
  LoginResponse,
  User,
  ApiSingleResponse,
} from '../types';

const AUTH_TOKEN_KEY = 'gym_token';
const AUTH_USER_KEY = 'gym_user';

export const authService = {
  // Login with JWT
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Use the GET endpoint from backend: GET /api/jwt?loginid=X&passwd=Y
      const response = await get<{ token: string }>(
        `/jwt?loginid=${credentials.loginid}&passwd=${credentials.passwd}`
      );

      const token = response.data.token;

      // Store token
      localStorage.setItem(AUTH_TOKEN_KEY, token);

      // Fetch user info
      const userResponse = await get<ApiSingleResponse<User>>(
        `/user/search/loginid?loginid=${credentials.loginid}`
      );
      const user = userResponse.data.item;

      // Store user info
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw new Error(
        '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
      );
    }
  },

  // Alternative login using POST /api/auth/login
  async loginPost(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await post<{ token: string }>(
        '/auth/login',
        credentials
      );
      const token = response.data.token;

      localStorage.setItem(AUTH_TOKEN_KEY, token);

      const userResponse = await get<ApiSingleResponse<User>>(
        `/user/search/loginid?loginid=${credentials.loginid}`
      );
      const user = userResponse.data.item;

      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw new Error(
        '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
      );
    }
  },

  // Logout
  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = '/login';
  },

  // Get current user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Get token
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Check user role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  },
};
