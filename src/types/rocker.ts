// Auto-generated TypeScript types for Rocker
// Generated from table: rocker

import type { Gym } from './gym';
import type { Rockergroup } from './rockergroup';


export interface Rocker {
  id: number;
  gym: number;
  group: number;
  name: string;
  available: number;
  date: string;
  extra?: {
    gym?: Gym;
    rockergroup?: Rockergroup;
  };
}

// Create request type (omit auto-generated fields)
export type CreateRockerRequest = Omit<Rocker, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRockerRequest = Partial<Omit<Rocker, 'id'>>;

// Search params type
export interface RockerSearchParams {
  id?: number;
  gym?: number;
  group?: number;
  name?: string;
  available?: number;
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
