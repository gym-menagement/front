// Auto-generated TypeScript types for Appversion
// Generated from table: appversion

// Forceupdate type
export type Forceupdate = 1 | 2;

// Status type
export type Status = 1 | 2;

// Main entity interface
export interface Appversion {
  id: string;
  platform: string;
  version: string;
  minversion: string;
  forceupdate: string;
  updatemessage: string;
  downloadurl: string;
  status: string;
  releasedate: string;
  createddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateAppversionRequest = Omit<Appversion, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAppversionRequest = Partial<Omit<Appversion, 'id'>>;

// Search params type
export interface AppversionSearchParams {
  id?: string;
  platform?: string;
  version?: string;
  minversion?: string;
  forceupdate?: string;
  updatemessage?: string;
  downloadurl?: string;
  status?: string;
  releasedate?: string;
  createddate?: string;
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
