// Auto-generated TypeScript types for Usehealthusage
// Generated from table: usehealthusage

import type { Gym } from './gym';
import type { Usehealth } from './usehealth';
import type { User } from './user';
import type { Attendance } from './attendance';


export interface Usehealthusage {
  id: number;
  gym: number;
  usehealth: number;
  user: number;
  attendance: number;
  type: number;
  usedcount: number;
  remainingcount: number;
  checkintime: string;
  checkouttime: string;
  duration: number;
  note: string;
  date: string;
  extra?: {
    gym?: Gym;
    usehealth?: Usehealth;
    user?: User;
    attendance?: Attendance;
  };
}

// Create request type (omit auto-generated fields)
export type CreateUsehealthusageRequest = Omit<Usehealthusage, 'id'>;

// Update request type (all fields optional except id)
export type UpdateUsehealthusageRequest = Partial<Omit<Usehealthusage, 'id'>>;

// Search params type
export interface UsehealthusageSearchParams {
  id?: number;
  gym?: number;
  usehealth?: number;
  user?: number;
  attendance?: number;
  type?: number;
  usedcount?: number;
  remainingcount?: number;
  checkintime?: string;
  checkouttime?: string;
  duration?: number;
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
