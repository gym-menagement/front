// Auto-generated TypeScript types for Ptreservation
// Generated from table: ptreservation

import type { User } from './user';
import type { Gym } from './gym';


export interface Ptreservation {
  id: number;
  trainer: number;
  member: number;
  gym: number;
  reservationdate: string;
  starttime: string;
  endtime: string;
  duration: number;
  status: number;
  note: string;
  cancelreason: string;
  createddate: string;
  updateddate: string;
  date: string;
  extra?: {
    traineruser?: User;
    memberuser?: User;
    gym?: Gym;
  };
}

// Create request type (omit auto-generated fields)
export type CreatePtreservationRequest = Omit<Ptreservation, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePtreservationRequest = Partial<Omit<Ptreservation, 'id'>>;

// Search params type
export interface PtreservationSearchParams {
  id?: number;
  trainer?: number;
  member?: number;
  gym?: number;
  startreservationdate?: string;
  endreservationdate?: string;
  starttime?: string;
  endtime?: string;
  duration?: number;
  status?: number;
  note?: string;
  cancelreason?: string;
  startcreateddate?: string;
  endcreateddate?: string;
  startupdateddate?: string;
  endupdateddate?: string;
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
