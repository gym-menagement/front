// Auto-generated TypeScript types for Memberbody
// Generated from table: memberbody

import type { Gym } from './gym';
import type { User } from './user';


export interface Memberbody {
  id: number;
  gym: number;
  user: number;
  height: number;
  weight: number;
  bodyfat: number;
  musclemass: number;
  bmi: number;
  skeletalmuscle: number;
  bodywater: number;
  chest: number;
  waist: number;
  hip: number;
  arm: number;
  thigh: number;
  note: string;
  measureddate: string;
  measuredby: number;
  date: string;
  extra?: {
    gym?: Gym;
    memberuser?: User;
    measuredbyuser?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateMemberbodyRequest = Omit<Memberbody, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMemberbodyRequest = Partial<Omit<Memberbody, 'id'>>;

// Search params type
export interface MemberbodySearchParams {
  id?: number;
  gym?: number;
  user?: number;
  height?: number;
  weight?: number;
  bodyfat?: number;
  musclemass?: number;
  bmi?: number;
  skeletalmuscle?: number;
  bodywater?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  arm?: number;
  thigh?: number;
  note?: string;
  measureddate?: string;
  measuredby?: number;
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
