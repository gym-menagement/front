// Auto-generated TypeScript types for Term
// Generated from table: term

export interface Term {
  id: number;
  gym: number;
  daytype: number;
  name: string;
  term: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateTermRequest = Omit<Term, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTermRequest = Partial<Omit<Term, 'id'>>;

// Search params type
export interface TermSearchParams {
  id?: number;
  gym?: number;
  daytype?: number;
  name?: string;
  term?: number;
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
