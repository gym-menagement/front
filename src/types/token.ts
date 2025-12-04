// Auto-generated TypeScript types for Token
// Generated from table: token

import type { User } from './user';


export interface Token {
  id: number;
  user: number;
  token: string;
  status: number;
  date: string;
  extra?: {
    user?: User;
  };
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
  startdate?: string;
  enddate?: string;
  page?: number;
  pageSize?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  total: number;
  page: number;
  pageSize: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
