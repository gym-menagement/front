// Auto-generated TypeScript types for Order
// Generated from table: order

import type { User } from './user';
import type { Gym } from './gym';
import type { Health } from './health';


export interface Order {
  id: number;
  user: number;
  gym: number;
  health: number;
  date: string;
  extra?: {
    user?: User;
    gym?: Gym;
    health?: Health;
  };
}

// Create request type (omit auto-generated fields)
export type CreateOrderRequest = Omit<Order, 'id'>;

// Update request type (all fields optional except id)
export type UpdateOrderRequest = Partial<Omit<Order, 'id'>>;

// Search params type
export interface OrderSearchParams {
  id?: number;
  user?: number;
  gym?: number;
  health?: number;
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
