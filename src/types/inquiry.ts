// Auto-generated TypeScript types for Inquiry
// Generated from table: inquiry

import type { User } from './user';
import type { Gym } from './gym';


export interface Inquiry {
  id: number;
  user: number;
  gym: number;
  type: number;
  title: string;
  content: string;
  status: number;
  answer: string;
  answeredby: number;
  answereddate: string;
  createddate: string;
  date: string;
  extra?: {
    inquireruser?: User;
    gym?: Gym;
    answeredbyuser?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateInquiryRequest = Omit<Inquiry, 'id'>;

// Update request type (all fields optional except id)
export type UpdateInquiryRequest = Partial<Omit<Inquiry, 'id'>>;

// Search params type
export interface InquirySearchParams {
  id?: number;
  user?: number;
  gym?: number;
  type?: number;
  title?: string;
  content?: string;
  status?: number;
  answer?: string;
  answeredby?: number;
  answereddate?: string;
  createddate?: string;
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
