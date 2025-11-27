// Auto-generated TypeScript types for Loginlog
// Generated from table: loginlog

import type { User } from './user';


export interface Loginlog {
  id: number;
  ip: string;
  ipvalue: number;
  user: number;
  date: string;
  extra?: {
    user?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateLoginlogRequest = Omit<Loginlog, 'id'>;

// Update request type (all fields optional except id)
export type UpdateLoginlogRequest = Partial<Omit<Loginlog, 'id'>>;

// Search params type
export interface LoginlogSearchParams {
  id?: number;
  ip?: string;
  ipvalue?: number;
  user?: number;
  date?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
