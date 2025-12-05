// Auto-generated TypeScript types for Membership
// Generated from table: membership

import type { Gym } from './gym';
import type { User } from './user';


export interface Membership {
  id: number;
  user: number;
  gym: number;
  date: string;
  extra?: {
    gym?: Gym;
    user?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateMembershipRequest = Omit<Membership, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMembershipRequest = Partial<Omit<Membership, 'id'>>;

// Search params type
export interface MembershipSearchParams {
  id?: number;
  user?: number;
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
