// Auto-generated TypeScript types for Role
// Generated from table: role

export interface Role {
  id: number;
  gym: number;
  roleid: number;
  name: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateRoleRequest = Omit<Role, 'id'>;

// Update request type (all fields optional except id)
export type UpdateRoleRequest = Partial<Omit<Role, 'id'>>;

// Search params type
export interface RoleSearchParams {
  id?: number;
  gym?: number;
  roleid?: number;
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
