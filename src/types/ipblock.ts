// Auto-generated TypeScript types for Ipblock
// Generated from table: ipblock

// Type type
export type Type = 1 | 2;

// Policy type
export type Policy = 1 | 2;

// Use type
export type Use = 1 | 2;

// Main entity interface
export interface Ipblock {
  id: string;
  address: string;
  type: string;
  policy: string;
  use: string;
  order: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateIpblockRequest = Omit<Ipblock, 'id'>;

// Update request type (all fields optional except id)
export type UpdateIpblockRequest = Partial<Omit<Ipblock, 'id'>>;

// Search params type
export interface IpblockSearchParams {
  id?: string;
  address?: string;
  type?: string;
  policy?: string;
  use?: string;
  order?: string;
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
