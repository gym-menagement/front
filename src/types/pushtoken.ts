// Auto-generated TypeScript types for Pushtoken
// Generated from table: pushtoken

import type { User } from './user';


export interface Pushtoken {
  id: number;
  user: number;
  token: string;
  devicetype: string;
  deviceid: string;
  appversion: string;
  isactive: number;
  createddate: string;
  updateddate: string;
  date: string;
  extra?: {
    user?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreatePushtokenRequest = Omit<Pushtoken, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePushtokenRequest = Partial<Omit<Pushtoken, 'id'>>;

// Search params type
export interface PushtokenSearchParams {
  id?: number;
  user?: number;
  token?: string;
  devicetype?: string;
  deviceid?: string;
  appversion?: string;
  isactive?: number;
  startcreateddate?: string;
  endcreateddate?: string;
  startupdateddate?: string;
  endupdateddate?: string;
  startdate?: string;
  enddate?: string;
  page?: number;
  pageSize?: number;
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
