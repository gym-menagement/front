// Auto-generated TypeScript types for Usehealthusage
// Generated from table: usehealthusage

import type { Gym } from './gym';
import type { Usehealth } from './usehealth';
import type { Membership } from './membership';
import type { User } from './user';
import type { Attendance } from './attendance';


export interface Usehealthusage {
  id: number;
  gym: number;
  usehealth: number;
  membership: number;
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
    membership?: Membership;
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
  membership?: number;
  user?: number;
  attendance?: number;
  type?: number;
  usedcount?: number;
  remainingcount?: number;
  startcheckintime?: string;
  endcheckintime?: string;
  startcheckouttime?: string;
  endcheckouttime?: string;
  duration?: number;
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
