// Auto-generated TypeScript types for Payment
// Generated from table: payment

export interface Payment {
  id: number;
  gym: number;
  order: number;
  membership: number;
  cost: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreatePaymentRequest = Omit<Payment, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePaymentRequest = Partial<Omit<Payment, 'id'>>;

// Search params type
export interface PaymentSearchParams {
  id?: number;
  gym?: number;
  order?: number;
  membership?: number;
  cost?: number;
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
