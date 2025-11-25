// Auto-generated TypeScript types for Membershipusage
// Generated from table: membershipusage

export interface Membershipusage {
  id: number;
  gym: number;
  membership: number;
  user: number;
  type: number;
  totaldays: number;
  useddays: number;
  remainingdays: number;
  totalcount: number;
  usedcount: number;
  remainingcount: number;
  startdate: string;
  enddate: string;
  status: number;
  pausedays: number;
  lastuseddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateMembershipusageRequest = Omit<Membershipusage, 'id'>;

// Update request type (all fields optional except id)
export type UpdateMembershipusageRequest = Partial<Omit<Membershipusage, 'id'>>;

// Search params type
export interface MembershipusageSearchParams {
  id?: number;
  gym?: number;
  membership?: number;
  user?: number;
  type?: number;
  totaldays?: number;
  useddays?: number;
  remainingdays?: number;
  totalcount?: number;
  usedcount?: number;
  remainingcount?: number;
  startdate?: string;
  enddate?: string;
  status?: number;
  pausedays?: number;
  lastuseddate?: string;
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
