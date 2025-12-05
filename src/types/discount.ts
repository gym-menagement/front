// Auto-generated TypeScript types for Discount
// Generated from table: discount

import type { Gym } from './gym';


export interface Discount {
  id: number;
  gym: number;
  name: string;
  discount: number;
  date: string;
  extra?: {
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateDiscountRequest = Omit<Discount, 'id'>;

// Update request type (all fields optional except id)
export type UpdateDiscountRequest = Partial<Omit<Discount, 'id'>>;

// Search params type
export interface DiscountSearchParams {
  id?: number;
  gym?: number;
  name?: string;
  discount?: number;
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
