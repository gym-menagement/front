// Auto-generated TypeScript types for Notificationhistory
// Generated from table: notificationhistory

import type { User } from './user';
import type { Gym } from './gym';

export interface Notificationhistory {
  id: number;
  user: number;
  gym: number;
  type: number;
  title: string;
  content: string;
  status: number;
  sentdate: string;
  readdate: string;
  date: string;
  extra?: {
    user?: User;
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateNotificationhistoryRequest = Omit<Notificationhistory, 'id'>;

// Update request type (all fields optional except id)
export type UpdateNotificationhistoryRequest = Partial<Omit<Notificationhistory, 'id'>>;

// Search params type
export interface NotificationhistorySearchParams {
  id?: number;
  user?: number;
  gym?: number;
  type?: number;
  title?: string;
  content?: string;
  status?: number;
  startsentdate?: string;
  endsentdate?: string;
  startreaddate?: string;
  endreaddate?: string;
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
