// Auto-generated TypeScript types for Notificationsetting
// Generated from table: notificationsetting

import type { User } from './user';

export interface Notificationsetting {
  id: number;
  user: number;
  enabled: number;
  membershipexpiry: number;
  membershipnear: number;
  attendanceenc: number;
  gymannounce: number;
  systemnotice: number;
  paymentconfirm: number;
  pauseexpiry: number;
  weeklygoal: number;
  personalrecord: number;
  quietenabled: number;
  quietstart: string;
  quietend: string;
  date: string;
  extra?: {
    user?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateNotificationsettingRequest = Omit<Notificationsetting, 'id'>;

// Update request type (all fields optional except id)
export type UpdateNotificationsettingRequest = Partial<Omit<Notificationsetting, 'id'>>;

// Search params type
export interface NotificationsettingSearchParams {
  id?: number;
  user?: number;
  enabled?: number;
  membershipexpiry?: number;
  membershipnear?: number;
  attendanceenc?: number;
  gymannounce?: number;
  systemnotice?: number;
  paymentconfirm?: number;
  pauseexpiry?: number;
  weeklygoal?: number;
  personalrecord?: number;
  quietenabled?: number;
  quietstart?: string;
  quietend?: string;
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
