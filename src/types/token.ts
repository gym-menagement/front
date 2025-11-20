// Auto-generated TypeScript types for Token
// Generated from table: token

// Status type
export type Status = 1 | 2 | 3;

// Main entity interface
export interface Token {
  id: string;
  user: string;
  token: string;
  status: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateTokenRequest = Omit<Token, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTokenRequest = Partial<Omit<Token, 'id'>>;

// Search params type
export interface TokenSearchParams {
  id?: string;
  user?: string;
  token?: string;
  status?: string;
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
