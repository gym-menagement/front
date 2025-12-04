// Auto-generated TypeScript types for Rockerusage
// Generated from table: rockerusage

import type { Gym } from './gym';
import type { Rocker } from './rocker';
import type { User } from './user';
import type { Usehealth } from './usehealth';


export interface Rockerusage {
  id: number;
  gym: number;
  rocker: number;
  user: number;
  usehealth: number;
  startdate: string;
  enddate: string;
  status: number;
  deposit: number;
  monthlyfee: number;
  note: string;
  assignedby: number;
  assigneddate: string;
  date: string;
  extra?: {
    gym?: Gym;
    rocker?: Rocker;
    memberuser?: User;
    usehealth?: Usehealth;
    assignedbyuser?: User;
  };
}

// Create request type (omit auto-generated fields)
export type CreateRockerusageRequest = Omit<Rockerusage, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRockerusageRequest = Partial<Omit<Rockerusage, 'id'>>;

// Search params type
export interface RockerusageSearchParams {
  id?: number;
  gym?: number;
  rocker?: number;
  user?: number;
  usehealth?: number;
  startstartdate?: string;
  endstartdate?: string;
  startenddate?: string;
  endenddate?: string;
  status?: number;
  deposit?: number;
  monthlyfee?: number;
  note?: string;
  assignedby?: number;
  startassigneddate?: string;
  endassigneddate?: string;
  startdate?: string;
  enddate?: string;
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
