// Auto-generated TypeScript types for Health
// Generated from table: health

import type { Healthcategory } from './healthcategory';
import type { Term } from './term';
import type { Discount } from './discount';
import type { Gym } from './gym';


export interface Health {
  id: number;
  category: number;
  term: number;
  name: string;
  count: number;
  cost: number;
  discount: number;
  costdiscount: number;
  content: string;
  gym: number;
  date: string;
  extra?: {
    healthcategory?: Healthcategory;
    term?: Term;
    discount?: Discount;
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateHealthRequest = Omit<Health, 'id'>;

// Update request type (all fields optional except id)
export type UpdateHealthRequest = Partial<Omit<Health, 'id'>>;

// Search params type
export interface HealthSearchParams {
  id?: number;
  category?: number;
  term?: number;
  name?: string;
  count?: number;
  cost?: number;
  discount?: number;
  costdiscount?: number;
  content?: string;
  gym?: number;
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
