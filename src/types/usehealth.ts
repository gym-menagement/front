// Auto-generated TypeScript types for Usehealth
// Generated from table: usehealth

// Main entity interface
export interface Usehealth {
  id: string;
  order: string;
  health: string;
  user: string;
  rocker: string;
  term: string;
  discount: string;
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
  id?: string;
  order?: string;
  health?: string;
  user?: string;
  rocker?: string;
  term?: string;
  discount?: string;
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
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
