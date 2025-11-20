// Auto-generated TypeScript types for Paymentform
// Generated from table: paymentform

// Main entity interface
export interface Paymentform {
  id: string;
  gym: string;
  payment: string;
  type: string;
  cost: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreatePaymentformRequest = Omit<Paymentform, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePaymentformRequest = Partial<Omit<Paymentform, 'id'>>;

// Search params type
export interface PaymentformSearchParams {
  id?: string;
  gym?: string;
  payment?: string;
  type?: string;
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
