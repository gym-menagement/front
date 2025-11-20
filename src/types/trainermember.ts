// Auto-generated TypeScript types for Trainermember
// Generated from table: trainermember

// Status type
export type Status = 1 | 2;

// Main entity interface
export interface Trainermember {
  id: string;
  trainer: string;
  member: string;
  gym: string;
  startdate: string;
  enddate: string;
  status: string;
  note: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateTrainermemberRequest = Omit<Trainermember, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTrainermemberRequest = Partial<Omit<Trainermember, 'id'>>;

// Search params type
export interface TrainermemberSearchParams {
  id?: string;
  trainer?: string;
  member?: string;
  gym?: string;
  startdate?: string;
  enddate?: string;
  status?: string;
  note?: string;
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
