// Auto-generated TypeScript types for Paymenttype
// Generated from table: paymenttype

import type { Gym } from './gym';


export interface Paymenttype {
  id: number;
  gym: number;
  name: string;
  date: string;
  extra?: {
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreatePaymenttypeRequest = Omit<Paymenttype, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePaymenttypeRequest = Partial<Omit<Paymenttype, 'id'>>;

// Search params type
export interface PaymenttypeSearchParams {
  id?: number;
  gym?: number;
  name?: string;
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
