// Auto-generated TypeScript types for User
// Generated from table: user

// Level type
export type Level = 1 | 2 | 3 | 4 | 5;

// Use type
export type Use = 1 | 2;

// Type type
export type Type = 1 | 2 | 3 | 4 | 5;

// Role type
export type Role = 1 | 2 | 3 | 4 | 5;

// Sex type
export type Sex = 1 | 2;

// Main entity interface
export interface User {
  id: string;
  loginid: string;
  passwd: string;
  email: string;
  name: string;
  tel: string;
  address: string;
  image: string;
  sex: string;
  birth: string;
  type: string;
  connectid: string;
  level: string;
  role: string;
  use: string;
  logindate: string;
  lastchangepasswddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateUserRequest = Omit<User, 'id'>;

// Update request type (all fields optional except id)
export type UpdateUserRequest = Partial<Omit<User, 'id'>>;

// Search params type
export interface UserSearchParams {
  id?: string;
  loginid?: string;
  passwd?: string;
  email?: string;
  name?: string;
  tel?: string;
  address?: string;
  image?: string;
  sex?: string;
  birth?: string;
  type?: string;
  connectid?: string;
  level?: string;
  role?: string;
  use?: string;
  logindate?: string;
  lastchangepasswddate?: string;
  date?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// API response types
export interface ApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
