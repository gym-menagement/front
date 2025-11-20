// Auto-generated TypeScript types for Rocker
// Generated from table: rocker

// Available type
export type Available = 1 | 2;

// Main entity interface
export interface Rocker {
  id: string;
  group: string;
  name: string;
  available: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateRockerRequest = Omit<Rocker, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRockerRequest = Partial<Omit<Rocker, 'id'>>;

// Search params type
export interface RockerSearchParams {
  id?: string;
  group?: string;
  name?: string;
  available?: string;
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
