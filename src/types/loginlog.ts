// Auto-generated TypeScript types for Loginlog
// Generated from table: loginlog

// Main entity interface
export interface Loginlog {
  id: string;
  ip: string;
  ipvalue: string;
  user: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateLoginlogRequest = Omit<Loginlog, 'id'>;

// Update request type (all fields optional except id)
export type UpdateLoginlogRequest = Partial<Omit<Loginlog, 'id'>>;

// Search params type
export interface LoginlogSearchParams {
  id?: string;
  ip?: string;
  ipvalue?: string;
  user?: string;
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
