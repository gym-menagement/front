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
  startanswereddate?: string;
  endanswereddate?: string;
  startcreateddate?: string;
  endcreateddate?: string;
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
