// Auto-generated TypeScript types for Workoutlog
// Generated from table: workoutlog

import type { Gym } from './gym';
import type { User } from './user';
import type { Attendance } from './attendance';
import type { Health } from './health';


export interface Workoutlog {
  id: number;
  gym: number;
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
  extra?: {
    gym?: Gym;
    user?: User;
    attendance?: Attendance;
    health?: Health;
  };
}

// Create request type (omit auto-generated fields)
export type CreateWorkoutlogRequest = Omit<Workoutlog, 'id'>;

// Update request type (all fields optional except id)
export type UpdateWorkoutlogRequest = Partial<Omit<Workoutlog, 'id'>>;

// Search params type
export interface WorkoutlogSearchParams {
  id?: number;
  gym?: number;
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
  startdate?: string;
  enddate?: string;
  page?: number;
  pageSize?: number;
}

// API response types
export interface ApiResponse<T> {
  content: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ApiSingleResponse<T> {
  item: T;
}
