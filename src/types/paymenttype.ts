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
