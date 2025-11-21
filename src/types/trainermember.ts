// Auto-generated TypeScript types for Trainermember
// Generated from table: trainermember

export interface Trainermember {
  id: number;
  trainer: number;
  member: number;
  gym: number;
  startdate: string;
  enddate: string;
  status: number;
  note: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateTrainermemberRequest = Omit<Trainermember, 'id'>;

// Update request type (all fields optional except id)
export type UpdateTrainermemberRequest = Partial<Omit<Trainermember, 'id'>>;

// Search params type
export interface TrainermemberSearchParams {
  id?: number;
  trainer?: number;
  member?: number;
  gym?: number;
  startdate?: string;
  enddate?: string;
  status?: number;
  note?: string;
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
