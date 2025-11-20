// Auto-generated TypeScript types for Pushtoken
// Generated from table: pushtoken

// Isactive type
export type Isactive = 1 | 2;

// Main entity interface
export interface Pushtoken {
  id: string;
  user: string;
  token: string;
  devicetype: string;
  deviceid: string;
  appversion: string;
  isactive: string;
  createddate: string;
  updateddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreatePushtokenRequest = Omit<Pushtoken, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePushtokenRequest = Partial<Omit<Pushtoken, 'id'>>;

// Search params type
export interface PushtokenSearchParams {
  id?: string;
  user?: string;
  token?: string;
  devicetype?: string;
  deviceid?: string;
  appversion?: string;
  isactive?: string;
  createddate?: string;
  updateddate?: string;
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
