// Auto-generated TypeScript types for Daytype
// Generated from table: daytype

export interface Daytype {
  id: number;
  gym: number;
  name: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateDaytypeRequest = Omit<Daytype, 'id'>;

// Update request type (all fields optional except id)
export type UpdateDaytypeRequest = Partial<Omit<Daytype, 'id'>>;

// Search params type
export interface DaytypeSearchParams {
  id?: number;
  gym?: number;
  name?: string;
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
