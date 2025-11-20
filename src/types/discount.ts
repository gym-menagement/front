// Auto-generated TypeScript types for Discount
// Generated from table: discount

// Main entity interface
export interface Discount {
  id: string;
  name: string;
  discount: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateDiscountRequest = Omit<Discount, 'id'>;

// Update request type (all fields optional except id)
export type UpdateDiscountRequest = Partial<Omit<Discount, 'id'>>;

// Search params type
export interface DiscountSearchParams {
  id?: string;
  name?: string;
  discount?: string;
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
