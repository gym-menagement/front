// Auto-generated TypeScript types for Term
// Generated from table: term

import type { Gym } from './gym';
import type { Daytype } from './daytype';


export interface Term {
  id: number;
  gym: number;
  daytype: number;
  name: string;
  term: number;
  date: string;
  extra?: {
    gym?: Gym;
    daytype?: Daytype;
  };
}

// Create request type (omit auto-generated fields)
export type CreateTermRequest = Omit<Term, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTermRequest = Partial<Omit<Term, 'id'>>;

// Search params type
export interface TermSearchParams {
  id?: number;
  gym?: number;
  daytype?: number;
  name?: string;
  term?: number;
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
