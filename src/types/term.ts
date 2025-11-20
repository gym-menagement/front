// Auto-generated TypeScript types for Term
// Generated from table: term

// Main entity interface
export interface Term {
  id: string;
  gym: string;
  daytype: string;
  name: string;
  term: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateTermRequest = Omit<Term, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTermRequest = Partial<Omit<Term, 'id'>>;

// Search params type
export interface TermSearchParams {
  id?: string;
  gym?: string;
  daytype?: string;
  name?: string;
  term?: string;
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
