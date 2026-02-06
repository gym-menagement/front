// Auto-generated TypeScript types for Gym
// Generated from table: gym

export interface Gym {
  id: number;
  name: string;
  address: string;
  tel: string;
  user: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateGymRequest = Omit<Gym, 'id'>;

// Update request type (all fields optional except id)
export type UpdateGymRequest = Partial<Omit<Gym, 'id'>>;

// Search params type
export interface GymSearchParams {
  id?: number;
  name?: string;
  address?: string;
  tel?: string;
  user?: number;
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
