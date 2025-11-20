// Auto-generated TypeScript types for Gym
// Generated from table: gym

// Main entity interface
export interface Gym {
  id: string;
  name: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateGymRequest = Omit<Gym, 'id'>;

// Update request type (all fields optional except id)
export type UpdateGymRequest = Partial<Omit<Gym, 'id'>>;

// Search params type
export interface GymSearchParams {
  id?: string;
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
