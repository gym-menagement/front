// Auto-generated TypeScript types for Inquiry
// Generated from table: inquiry

// Type type
export type Type = 1 | 2 | 3 | 4 | 5;

// Status type
export type Status = 1 | 2;

// Main entity interface
export interface Inquiry {
  id: string;
  user: string;
  gym: string;
  type: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  answeredby: string;
  answereddate: string;
  createddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateInquiryRequest = Omit<Inquiry, 'id'>;

// Update request type (all fields optional except id)
export type UpdateInquiryRequest = Partial<Omit<Inquiry, 'id'>>;

// Search params type
export interface InquirySearchParams {
  id?: string;
  user?: string;
  gym?: string;
  type?: string;
  title?: string;
  content?: string;
  status?: string;
  answer?: string;
  answeredby?: string;
  answereddate?: string;
  createddate?: string;
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
