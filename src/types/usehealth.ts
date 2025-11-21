// Auto-generated TypeScript types for Usehealth
// Generated from table: usehealth

export interface Usehealth {
  id: number;
  order: number;
  health: number;
  user: number;
  rocker: number;
  term: number;
  discount: number;
  startday: string;
  endday: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateUsehealthRequest = Omit<Usehealth, 'id'>;

// Update request type (all fields optional except id)
export type UpdateUsehealthRequest = Partial<Omit<Usehealth, 'id'>>;

// Search params type
export interface UsehealthSearchParams {
  id?: number;
  order?: number;
  health?: number;
  user?: number;
  rocker?: number;
  term?: number;
  discount?: number;
  startday?: string;
  endday?: string;
  date?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
