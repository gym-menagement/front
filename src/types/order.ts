// Auto-generated TypeScript types for Order
// Generated from table: order

export interface Order {
  id: number;
  user: number;
  gym: number;
  health: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateOrderRequest = Omit<Order, 'id'>;

// Update request type (all fields optional except id)
export type UpdateOrderRequest = Partial<Omit<Order, 'id'>>;

// Search params type
export interface OrderSearchParams {
  id?: number;
  user?: number;
  gym?: number;
  health?: number;
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
