// Auto-generated TypeScript types for Membership
// Generated from table: membership

// Sex type
export type Sex = 1 | 2;

// Main entity interface
export interface Membership {
  id: string;
  gym: string;
  user: string;
  name: string;
  sex: string;
  birth: string;
  phonenum: string;
  address: string;
  image: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateMembershipRequest = Omit<Membership, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMembershipRequest = Partial<Omit<Membership, 'id'>>;

// Search params type
export interface MembershipSearchParams {
  id?: string;
  gym?: string;
  user?: string;
  name?: string;
  sex?: string;
  birth?: string;
  phonenum?: string;
  address?: string;
  image?: string;
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
