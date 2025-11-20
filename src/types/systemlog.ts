// Auto-generated TypeScript types for Systemlog
// Generated from table: systemlog

// Type type
export type Type = 1 | 2;

// Result type
export type Result = 1 | 2;

// Main entity interface
export interface Systemlog {
  id: string;
  type: string;
  content: string;
  result: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateSystemlogRequest = Omit<Systemlog, 'id'>;

// Update request type (all fields optional except id)
export type UpdateSystemlogRequest = Partial<Omit<Systemlog, 'id'>>;

// Search params type
export interface SystemlogSearchParams {
  id?: string;
  type?: string;
  content?: string;
  result?: string;
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
