// Auto-generated TypeScript types for Qrcode
// Generated from table: qrcode

export interface Qrcode {
  id: number;
  user: number;
  code: string;
  imageurl: string;
  isactive: number;
  expiredate: string;
  generateddate: string;
  lastuseddate: string;
  usecount: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateQrcodeRequest = Omit<Qrcode, 'id'>;

// Update request type (all fields optional except id)
export type UpdateQrcodeRequest = Partial<Omit<Qrcode, 'id'>>;

// Search params type
export interface QrcodeSearchParams {
  id?: number;
  user?: number;
  code?: string;
  imageurl?: string;
  isactive?: number;
  expiredate?: string;
  generateddate?: string;
  lastuseddate?: string;
  usecount?: number;
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
