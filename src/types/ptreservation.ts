// Auto-generated TypeScript types for Ptreservation
// Generated from table: ptreservation

// Status type
export type Status = 1 | 2 | 3 | 4;

// Main entity interface
export interface Ptreservation {
  id: string;
  trainer: string;
  member: string;
  gym: string;
  reservationdate: string;
  starttime: string;
  endtime: string;
  duration: string;
  status: string;
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
  id?: string;
  trainer?: string;
  member?: string;
  gym?: string;
  reservationdate?: string;
  starttime?: string;
  endtime?: string;
  duration?: string;
  status?: string;
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
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiSingleResponse<T> {
  item: T;
}
