// Auto-generated TypeScript types for Attendance
// Generated from table: attendance

export interface Attendance {
  id: number;
  user: number;
  membership: number;
  gym: number;
  type: number;
  method: number;
  checkintime: string;
  checkouttime: string;
  duration: number;
  status: number;
  note: string;
  ip: string;
  device: string;
  createdby: number;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateAttendanceRequest = Omit<Attendance, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAttendanceRequest = Partial<Omit<Attendance, 'id'>>;

// Search params type
export interface AttendanceSearchParams {
  id?: number;
  user?: number;
  membership?: number;
  gym?: number;
  type?: number;
  method?: number;
  checkintime?: string;
  checkouttime?: string;
  duration?: number;
  status?: number;
  note?: string;
  ip?: string;
  device?: string;
  createdby?: number;
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
