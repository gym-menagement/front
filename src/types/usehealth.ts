// Auto-generated TypeScript types for Usehealth
// Generated from table: usehealth

import type { Order } from './order';
import type { Health } from './health';
import type { Membership } from './membership';
import type { User } from './user';
import type { Rocker } from './rocker';
import type { Term } from './term';
import type { Discount } from './discount';
import type { Gym } from './gym';


export interface Usehealth {
  id: number;
  order: number;
  health: number;
  membership: number;
  user: number;
  rocker: number;
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
    rocker?: Rocker;
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
  rocker?: number;
  term?: number;
  discount?: number;
  startday?: string;
  endday?: string;
  gym?: number;
  status?: number;
  totalcount?: number;
  usedcount?: number;
  remainingcount?: number;
  qrcode?: string;
  lastuseddate?: string;
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
