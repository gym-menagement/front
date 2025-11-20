// Auto-generated TypeScript types for Stop
// Generated from table: stop

// Main entity interface
export interface Stop {
  id: string;
  usehelth: string;
  startday: string;
  endday: string;
  count: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateStopRequest = Omit<Stop, 'id'>;

// Update request type (all fields optional except id)
export type UpdateStopRequest = Partial<Omit<Stop, 'id'>>;

// Search params type
export interface StopSearchParams {
  id?: string;
  usehelth?: string;
  startday?: string;
  endday?: string;
  count?: string;
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
