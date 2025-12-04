// Auto-generated TypeScript types for Memberqr
// Generated from table: memberqr

export interface Memberqr {
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
export type CreateMemberqrRequest = Omit<Memberqr, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMemberqrRequest = Partial<Omit<Memberqr, 'id'>>;

// Search params type
export interface MemberqrSearchParams {
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
  pageSize?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  total: number;
  page: number;
  pageSize: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
