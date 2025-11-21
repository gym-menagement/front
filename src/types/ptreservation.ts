// Auto-generated TypeScript types for Ptreservation
// Generated from table: ptreservation

export interface Ptreservation {
  id: number;
  trainer: number;
  member: number;
  gym: number;
  reservationdate: string;
  starttime: string;
  endtime: string;
  duration: number;
  status: number;
  note: string;
  cancelreason: string;
  createddate: string;
  updateddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreatePtreservationRequest = Omit<Ptreservation, 'id'>;

// Update request type (all fields optional except id)
export type UpdatePtreservationRequest = Partial<Omit<Ptreservation, 'id'>>;

// Search params type
export interface PtreservationSearchParams {
  id?: number;
  trainer?: number;
  member?: number;
  gym?: number;
  reservationdate?: string;
  starttime?: string;
  endtime?: string;
  duration?: number;
  status?: number;
  note?: string;
  cancelreason?: string;
  createddate?: string;
  updateddate?: string;
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
