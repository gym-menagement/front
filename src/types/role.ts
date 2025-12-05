// Auto-generated TypeScript types for Role
// Generated from table: role

import type { Gym } from './gym';


export interface Role {
  id: number;
  gym: number;
  roleid: number;
  name: string;
  date: string;
  extra?: {
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreateRoleRequest = Omit<Role, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRoleRequest = Partial<Omit<Role, 'id'>>;

// Search params type
export interface RoleSearchParams {
  id?: number;
  gym?: number;
  roleid?: number;
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
