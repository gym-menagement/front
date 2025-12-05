// Auto-generated TypeScript types for Stop
// Generated from table: stop

import type { Usehealth } from './usehealth';


export interface Stop {
  id: number;
  usehealth: number;
  startday: string;
  endday: string;
  count: number;
  date: string;
  extra?: {
    usehealth?: Usehealth;
  };
}

// Create request type (omit auto-generated fields)
export type CreateStopRequest = Omit<Stop, 'id'>;

// Update request type (all fields optional except id)
export type UpdateStopRequest = Partial<Omit<Stop, 'id'>>;

// Search params type
export interface StopSearchParams {
  id?: number;
  usehealth?: number;
  startstartday?: string;
  endstartday?: string;
  startendday?: string;
  endendday?: string;
  count?: number;
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
