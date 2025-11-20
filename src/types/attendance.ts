// Auto-generated TypeScript types for Attendance
// Generated from table: attendance

// Type type
export type Type = 1 | 2;

// Method type
export type Method = 1 | 2 | 3;

// Status type
export type Status = 1 | 2 | 3;

// Main entity interface
export interface Attendance {
  id: string;
  user: string;
  membership: string;
  gym: string;
  type: string;
  method: string;
  checkintime: string;
  checkouttime: string;
  duration: string;
  status: string;
  note: string;
  ip: string;
  device: string;
  createdby: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateAttendanceRequest = Omit<Attendance, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAttendanceRequest = Partial<Omit<Attendance, 'id'>>;

// Search params type
export interface AttendanceSearchParams {
  id?: string;
  user?: string;
  membership?: string;
  gym?: string;
  type?: string;
  method?: string;
  checkintime?: string;
  checkouttime?: string;
  duration?: string;
  status?: string;
  note?: string;
  ip?: string;
  device?: string;
  createdby?: string;
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
