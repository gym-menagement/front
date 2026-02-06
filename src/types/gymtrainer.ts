// Auto-generated TypeScript types for Gymtrainer
// Generated from table: gymtrainer

import type { Gym } from './gym';
import type { User } from './user';


export interface Gymtrainer {
  id: number;
  gym: number;
  trainer: number;
  startdate: string;
  enddate: string;
  status: number;
  position: string;
  note: string;
  date: string;
  extra?: {
    gym?: Gym;
    traineruser?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateGymtrainerRequest = Omit<Gymtrainer, 'id'>;

// Update request type (all fields optional except id)
export type UpdateGymtrainerRequest = Partial<Omit<Gymtrainer, 'id'>>;

// Search params type
export interface GymtrainerSearchParams {
  id?: number;
  gym?: number;
  trainer?: number;
  startstartdate?: string;
  endstartdate?: string;
  startenddate?: string;
  endenddate?: string;
  status?: number;
  position?: string;
  note?: string;
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
