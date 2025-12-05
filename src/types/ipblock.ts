// Auto-generated TypeScript types for Ipblock
// Generated from table: ipblock

export interface Ipblock {
  id: number;
  address: string;
  type: number;
  policy: number;
  use: number;
  order: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateIpblockRequest = Omit<Ipblock, 'id'>;

// Update request type (all fields optional except id)
export type UpdateIpblockRequest = Partial<Omit<Ipblock, 'id'>>;

// Search params type
export interface IpblockSearchParams {
  id?: number;
  address?: string;
  type?: number;
  policy?: number;
  use?: number;
  order?: number;
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
