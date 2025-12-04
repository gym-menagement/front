// Auto-generated TypeScript types for Alarm
// Generated from table: alarm

import type { User } from './user';


export interface Alarm {
  id: number;
  title: string;
  content: string;
  type: number;
  status: number;
  user: number;
  date: string;
  extra?: {
    user?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateAlarmRequest = Omit<Alarm, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAlarmRequest = Partial<Omit<Alarm, 'id'>>;

// Search params type
export interface AlarmSearchParams {
  id?: number;
  title?: string;
  content?: string;
  type?: number;
  status?: number;
  user?: number;
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
