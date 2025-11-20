// Auto-generated TypeScript types for Setting
// Generated from table: setting

// Type type
export type Type = 1 | 2 | 3;

// Main entity interface
export interface Setting {
  id: string;
  category: string;
  name: string;
  key: string;
  value: string;
  remark: string;
  type: string;
  data: string;
  order: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateSettingRequest = Omit<Setting, 'id'>;

// Update request type (all fields optional except id)
export type UpdateSettingRequest = Partial<Omit<Setting, 'id'>>;

// Search params type
export interface SettingSearchParams {
  id?: string;
  category?: string;
  name?: string;
  key?: string;
  value?: string;
  remark?: string;
  type?: string;
  data?: string;
  order?: string;
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
