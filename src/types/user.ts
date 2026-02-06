// Auto-generated TypeScript types for User
// Generated from table: user

export interface User {
  id: number;
  loginid: string;
  passwd: string;
  email: string;
  name: string;
  tel: string;
  address: string;
  image: string;
  sex: number;
  birth: string;
  type: number;
  connectid: string;
  level: number;
  role: number;
  use: number;
  logindate: string;
  lastchangepasswddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateUserRequest = Omit<User, 'id'>;

// Update request type (all fields optional except id)
export type UpdateUserRequest = Partial<Omit<User, 'id'>>;

// Search params type
export interface UserSearchParams {
  id?: number;
  loginid?: string;
  passwd?: string;
  email?: string;
  name?: string;
  tel?: string;
  address?: string;
  image?: string;
  sex?: number;
  startbirth?: string;
  endbirth?: string;
  type?: number;
  connectid?: string;
  level?: number;
  role?: number;
  use?: number;
  startlogindate?: string;
  endlogindate?: string;
  startlastchangepasswddate?: string;
  endlastchangepasswddate?: string;
  startdate?: string;
  enddate?: string;
  page?: number;
  pagesize?: number;
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
