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
  startdate?: string;
  enddate?: string;
  status?: number;
  position?: string;
  note?: string;
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
