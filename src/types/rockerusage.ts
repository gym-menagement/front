// Auto-generated TypeScript types for Rockerusage
// Generated from table: rockerusage

export interface Rockerusage {
  id: number;
  gym: number;
  rocker: number;
  user: number;
  membership: number;
  startdate: string;
  enddate: string;
  status: number;
  deposit: number;
  monthlyfee: number;
  note: string;
  assignedby: number;
  assigneddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateRockerusageRequest = Omit<Rockerusage, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRockerusageRequest = Partial<Omit<Rockerusage, 'id'>>;

// Search params type
export interface RockerusageSearchParams {
  id?: number;
  gym?: number;
  rocker?: number;
  user?: number;
  membership?: number;
  startdate?: string;
  enddate?: string;
  status?: number;
  deposit?: number;
  monthlyfee?: number;
  note?: string;
  assignedby?: number;
  assigneddate?: string;
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
