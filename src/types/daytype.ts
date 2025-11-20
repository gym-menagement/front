// Auto-generated TypeScript types for Daytype
// Generated from table: daytype

// Main entity interface
export interface Daytype {
  id: string;
  gym: string;
  name: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateDaytypeRequest = Omit<Daytype, 'id'>;

// Update request type (all fields optional except id)
export type UpdateDaytypeRequest = Partial<Omit<Daytype, 'id'>>;

// Search params type
export interface DaytypeSearchParams {
  id?: string;
  gym?: string;
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
