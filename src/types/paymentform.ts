// Auto-generated TypeScript types for Paymentform
// Generated from table: paymentform

import type { Gym } from './gym';
import type { Payment } from './payment';
import type { Paymenttype } from './paymenttype';


export interface Paymentform {
  id: number;
  gym: number;
  payment: number;
  type: number;
  cost: number;
  date: string;
  extra?: {
    gym?: Gym;
    payment?: Payment;
    paymenttype?: Paymenttype;
  };
}

// Create request type (omit auto-generated fields)
export type CreatePaymentformRequest = Omit<Paymentform, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePaymentformRequest = Partial<Omit<Paymentform, 'id'>>;

// Search params type
export interface PaymentformSearchParams {
  id?: number;
  gym?: number;
  payment?: number;
  type?: number;
  cost?: number;
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
