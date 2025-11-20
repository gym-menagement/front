// Auto-generated TypeScript types for Memberbody
// Generated from table: memberbody

// Main entity interface
export interface Memberbody {
  id: string;
  user: string;
  height: string;
  weight: string;
  bodyfat: string;
  musclemass: string;
  bmi: string;
  skeletalmuscle: string;
  bodywater: string;
  chest: string;
  waist: string;
  hip: string;
  arm: string;
  thigh: string;
  note: string;
  measureddate: string;
  measuredby: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateMemberbodyRequest = Omit<Memberbody, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMemberbodyRequest = Partial<Omit<Memberbody, 'id'>>;

// Search params type
export interface MemberbodySearchParams {
  id?: string;
  user?: string;
  height?: string;
  weight?: string;
  bodyfat?: string;
  musclemass?: string;
  bmi?: string;
  skeletalmuscle?: string;
  bodywater?: string;
  chest?: string;
  waist?: string;
  hip?: string;
  arm?: string;
  thigh?: string;
  note?: string;
  measureddate?: string;
  measuredby?: string;
  date?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// API response types
export interface ApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
