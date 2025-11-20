// Auto-generated TypeScript types for Alarm
// Generated from table: alarm

// Type type
export type Type = 1 | 2 | 3 | 4;

// Status type
export type Status = 1 | 2 | 3;

// Main entity interface
export interface Alarm {
  id: string;
  title: string;
  content: string;
  type: string;
  status: string;
  user: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateAlarmRequest = Omit<Alarm, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAlarmRequest = Partial<Omit<Alarm, 'id'>>;

// Search params type
export interface AlarmSearchParams {
  id?: string;
  title?: string;
  content?: string;
  type?: string;
  status?: string;
  user?: string;
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
