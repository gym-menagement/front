// Auto-generated TypeScript types for Healthcategory
// Generated from table: healthcategory

import type { Gym } from './gym';


export interface Healthcategory {
  id: number;
  gym: number;
  name: string;
  date: string;
  extra?: {
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateHealthcategoryRequest = Omit<Healthcategory, 'id'>;

// Update request type (all fields optional except id)
export type UpdateHealthcategoryRequest = Partial<Omit<Healthcategory, 'id'>>;

// Search params type
export interface HealthcategorySearchParams {
  id?: number;
  gym?: number;
  name?: string;
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
