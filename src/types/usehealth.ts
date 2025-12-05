// Auto-generated TypeScript types for Usehealth
// Generated from table: usehealth

import type { Order } from './order';
import type { Health } from './health';
import type { Membership } from './membership';
import type { User } from './user';
import type { Term } from './term';
import type { Discount } from './discount';
import type { Gym } from './gym';


export interface Usehealth {
  id: number;
  order: number;
  health: number;
  membership: number;
  user: number;
  term: number;
  discount: number;
  startday: string;
  endday: string;
  gym: number;
  status: number;
  totalcount: number;
  usedcount: number;
  remainingcount: number;
  qrcode: string;
  lastuseddate: string;
  date: string;
  extra?: {
    order?: Order;
    health?: Health;
    membership?: Membership;
    user?: User;
    term?: Term;
    discount?: Discount;
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateUsehealthRequest = Omit<Usehealth, 'id'>;

// Update request type (all fields optional except id)
export type UpdateUsehealthRequest = Partial<Omit<Usehealth, 'id'>>;

// Search params type
export interface UsehealthSearchParams {
  id?: number;
  order?: number;
  health?: number;
  membership?: number;
  user?: number;
  term?: number;
  discount?: number;
  startstartday?: string;
  endstartday?: string;
  startendday?: string;
  endendday?: string;
  gym?: number;
  status?: number;
  totalcount?: number;
  usedcount?: number;
  remainingcount?: number;
  qrcode?: string;
  startlastuseddate?: string;
  endlastuseddate?: string;
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
