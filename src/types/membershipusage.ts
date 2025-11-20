// Auto-generated TypeScript types for Membershipusage
// Generated from table: membershipusage

// Type type
export type Type = 1 | 2;

// Status type
export type Status = 1 | 2 | 3 | 4;

// Main entity interface
export interface Membershipusage {
  id: string;
  membership: string;
  user: string;
  type: string;
  totaldays: string;
  useddays: string;
  remainingdays: string;
  totalcount: string;
  usedcount: string;
  remainingcount: string;
  startdate: string;
  enddate: string;
  status: string;
  pausedays: string;
  lastuseddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateMembershipusageRequest = Omit<Membershipusage, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMembershipusageRequest = Partial<Omit<Membershipusage, 'id'>>;

// Search params type
export interface MembershipusageSearchParams {
  id?: string;
  membership?: string;
  user?: string;
  type?: string;
  totaldays?: string;
  useddays?: string;
  remainingdays?: string;
  totalcount?: string;
  usedcount?: string;
  remainingcount?: string;
  startdate?: string;
  enddate?: string;
  status?: string;
  pausedays?: string;
  lastuseddate?: string;
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
