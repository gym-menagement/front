// Auto-generated TypeScript types for Attendance
// Generated from table: attendance

import type { User } from './user';
import type { Usehealth } from './usehealth';
import type { Gym } from './gym';


export interface Attendance {
  id: number;
  user: number;
  usehealth: number;
  gym: number;
  type: number;
  method: number;
  checkintime: string;
  checkouttime: string;
  duration: number;
  status: number;
  note: string;
  ip: string;
  device: string;
  createdby: number;
  date: string;
  extra?: {
    user?: User;
    usehealth?: Usehealth;
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateAttendanceRequest = Omit<Attendance, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAttendanceRequest = Partial<Omit<Attendance, 'id'>>;

// Search params type
export interface AttendanceSearchParams {
  id?: number;
  user?: number;
  usehealth?: number;
  gym?: number;
  type?: number;
  method?: number;
  checkintime?: string;
  checkouttime?: string;
  duration?: number;
  status?: number;
  note?: string;
  ip?: string;
  device?: string;
  createdby?: number;
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
