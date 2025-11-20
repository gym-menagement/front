// Auto-generated TypeScript types for Token
// Generated from table: token

export interface Token {
  id: number;
  user: number;
  token: string;
  status: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateTokenRequest = Omit<Token, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTokenRequest = Partial<Omit<Token, 'id'>>;

// Search params type
export interface TokenSearchParams {
  id?: number;
  user?: number;
  token?: string;
  status?: number;
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
