// Auto-generated TypeScript types for Payment
// Generated from table: payment

import type { Gym } from './gym';
import type { Order } from './order';
import type { User } from './user';


export interface Payment {
  id: number;
  gym: number;
  order: number;
  user: number;
  cost: number;
  date: string;
  extra?: {
    gym?: Gym;
    order?: Order;
    user?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreatePaymentRequest = Omit<Payment, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePaymentRequest = Partial<Omit<Payment, 'id'>>;

// Search params type
export interface PaymentSearchParams {
  id?: number;
  gym?: number;
  order?: number;
  user?: number;
  cost?: number;
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
