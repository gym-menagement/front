// Auto-generated TypeScript types for Rockerusage
// Generated from table: rockerusage

// Status type
export type Status = 1 | 2 | 3;

// Main entity interface
export interface Rockerusage {
  id: string;
  rocker: string;
  user: string;
  membership: string;
  startdate: string;
  enddate: string;
  status: string;
  deposit: string;
  monthlyfee: string;
  note: string;
  assignedby: string;
  assigneddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateRockerusageRequest = Omit<Rockerusage, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRockerusageRequest = Partial<Omit<Rockerusage, 'id'>>;

// Search params type
export interface RockerusageSearchParams {
  id?: string;
  rocker?: string;
  user?: string;
  membership?: string;
  startdate?: string;
  enddate?: string;
  status?: string;
  deposit?: string;
  monthlyfee?: string;
  note?: string;
  assignedby?: string;
  assigneddate?: string;
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
