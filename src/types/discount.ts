// Auto-generated TypeScript types for Discount
// Generated from table: discount

export interface Discount {
  id: number;
  gym: number;
  name: string;
  discount: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateDiscountRequest = Omit<Discount, 'id'>;

// Update request type (all fields optional except id)
export type UpdateDiscountRequest = Partial<Omit<Discount, 'id'>>;

// Search params type
export interface DiscountSearchParams {
  id?: number;
  gym?: number;
  name?: string;
  discount?: number;
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
