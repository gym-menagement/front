// Auto-generated TypeScript types for Rockergroup
// Generated from table: rockergroup

import type { Gym } from './gym';


export interface Rockergroup {
  id: number;
  gym: number;
  name: string;
  date: string;
  extra?: {
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateRockergroupRequest = Omit<Rockergroup, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRockergroupRequest = Partial<Omit<Rockergroup, 'id'>>;

// Search params type
export interface RockergroupSearchParams {
  id?: number;
  gym?: number;
  name?: string;
  date?: string;
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
