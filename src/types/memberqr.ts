// Auto-generated TypeScript types for Memberqr
// Generated from table: memberqr

// Isactive type
export type Isactive = 1 | 2;

// Main entity interface
export interface Memberqr {
  id: string;
  user: string;
  code: string;
  imageurl: string;
  isactive: string;
  expiredate: string;
  generateddate: string;
  lastuseddate: string;
  usecount: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateMemberqrRequest = Omit<Memberqr, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMemberqrRequest = Partial<Omit<Memberqr, 'id'>>;

// Search params type
export interface MemberqrSearchParams {
  id?: string;
  user?: string;
  code?: string;
  imageurl?: string;
  isactive?: string;
  expiredate?: string;
  generateddate?: string;
  lastuseddate?: string;
  usecount?: string;
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
