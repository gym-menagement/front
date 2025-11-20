// Auto-generated TypeScript types for Payment
// Generated from table: payment

// Main entity interface
export interface Payment {
  id: string;
  gym: string;
  order: string;
  membership: string;
  cost: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreatePaymentRequest = Omit<Payment, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePaymentRequest = Partial<Omit<Payment, 'id'>>;

// Search params type
export interface PaymentSearchParams {
  id?: string;
  gym?: string;
  order?: string;
  membership?: string;
  cost?: string;
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
