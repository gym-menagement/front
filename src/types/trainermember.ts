// Auto-generated TypeScript types for Trainermember
// Generated from table: trainermember

import type { User } from './user';
import type { Gym } from './gym';


export interface Trainermember {
  id: number;
  trainer: number;
  member: number;
  gym: number;
  startdate: string;
  enddate: string;
  status: number;
  note: string;
  date: string;
  extra?: {
    traineruser?: User;
    memberuser?: User;
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateTrainermemberRequest = Omit<Trainermember, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTrainermemberRequest = Partial<Omit<Trainermember, 'id'>>;

// Search params type
export interface TrainermemberSearchParams {
  id?: number;
  trainer?: number;
  member?: number;
  gym?: number;
  startstartdate?: string;
  endstartdate?: string;
  startenddate?: string;
  endenddate?: string;
  status?: number;
  note?: string;
  startdate?: string;
  enddate?: string;
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
