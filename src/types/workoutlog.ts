// Auto-generated TypeScript types for Workoutlog
// Generated from table: workoutlog

export interface Workoutlog {
  id: number;
  user: number;
  attendance: number;
  health: number;
  exercisename: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
  calories: number;
  note: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateWorkoutlogRequest = Omit<Workoutlog, 'id'>;

// Update request type (all fields optional except id)
export type UpdateWorkoutlogRequest = Partial<Omit<Workoutlog, 'id'>>;

// Search params type
export interface WorkoutlogSearchParams {
  id?: number;
  user?: number;
  attendance?: number;
  health?: number;
  exercisename?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  calories?: number;
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
