// Auto-generated TypeScript types for Workoutlog
// Generated from table: workoutlog

// Main entity interface
export interface Workoutlog {
  id: string;
  user: string;
  attendance: string;
  health: string;
  exercisename: string;
  sets: string;
  reps: string;
  weight: string;
  duration: string;
  calories: string;
  note: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateWorkoutlogRequest = Omit<Workoutlog, 'id'>;

// Update request type (all fields optional except id)
export type UpdateWorkoutlogRequest = Partial<Omit<Workoutlog, 'id'>>;

// Search params type
export interface WorkoutlogSearchParams {
  id?: string;
  user?: string;
  attendance?: string;
  health?: string;
  exercisename?: string;
  sets?: string;
  reps?: string;
  weight?: string;
  duration?: string;
  calories?: string;
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
