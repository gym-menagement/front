// Auto-generated TypeScript types for User
// Generated from table: user

export interface User {
  id: number;
  loginid: string;
  passwd: string;
  email: string;
  name: string;
  tel: string;
  address: string;
  image: string;
  sex: number;
  birth: string;
  type: number;
  connectid: string;
  level: number;
  role: number;
  use: number;
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
  id?: number;
  loginid?: string;
  passwd?: string;
  email?: string;
  name?: string;
  tel?: string;
  address?: string;
  image?: string;
  sex?: number;
  birth?: string;
  type?: number;
  connectid?: string;
  level?: number;
  role?: number;
  use?: number;
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
