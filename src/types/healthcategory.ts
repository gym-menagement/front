// Auto-generated TypeScript types for Healthcategory
// Generated from table: healthcategory

// Main entity interface
export interface Healthcategory {
  id: string;
  gym: string;
  name: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateHealthcategoryRequest = Omit<Healthcategory, 'id'>;

// Update request type (all fields optional except id)
export type UpdateHealthcategoryRequest = Partial<Omit<Healthcategory, 'id'>>;

// Search params type
export interface HealthcategorySearchParams {
  id?: string;
  gym?: string;
  name?: string;
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
