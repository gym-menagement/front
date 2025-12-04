// Auto-generated TypeScript types for Systemlog
// Generated from table: systemlog

export interface Systemlog {
  id: number;
  type: number;
  content: string;
  result: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateSystemlogRequest = Omit<Systemlog, 'id'>;

// Update request type (all fields optional except id)
export type UpdateSystemlogRequest = Partial<Omit<Systemlog, 'id'>>;

// Search params type
export interface SystemlogSearchParams {
  id?: number;
  type?: number;
  content?: string;
  result?: number;
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
