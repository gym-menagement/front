// Auto-generated TypeScript types for Daytype
// Generated from table: daytype

import type { Gym } from './gym';


export interface Daytype {
  id: number;
  gym: number;
  name: string;
  date: string;
  extra?: {
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateDaytypeRequest = Omit<Daytype, 'id'>;

// Update request type (all fields optional except id)
export type UpdateDaytypeRequest = Partial<Omit<Daytype, 'id'>>;

// Search params type
export interface DaytypeSearchParams {
  id?: number;
  gym?: number;
  name?: string;
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
