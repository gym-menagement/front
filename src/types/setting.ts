// Auto-generated TypeScript types for Setting
// Generated from table: setting

export interface Setting {
  id: number;
  category: string;
  name: string;
  key: string;
  value: string;
  remark: string;
  type: number;
  data: string;
  order: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateSettingRequest = Omit<Setting, 'id'>;

// Update request type (all fields optional except id)
export type UpdateSettingRequest = Partial<Omit<Setting, 'id'>>;

// Search params type
export interface SettingSearchParams {
  id?: number;
  category?: string;
  name?: string;
  key?: string;
  value?: string;
  remark?: string;
  type?: number;
  data?: string;
  order?: number;
  startdate?: string;
  enddate?: string;
  page?: number;
  pageSize?: number;
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ApiSingleResponse<T> {
  item: T;
}
