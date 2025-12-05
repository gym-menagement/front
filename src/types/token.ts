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
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ApiSingleResponse<T> {
  item: T;
}
