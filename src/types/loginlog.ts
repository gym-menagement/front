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
  startdate?: string;
  enddate?: string;
  page?: number;
  pagesize?: number;
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
