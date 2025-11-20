// Auto-generated TypeScript types for Notice
// Generated from table: notice

// Type type
export type Type = 1 | 2 | 3;

// Ispopup type
export type Ispopup = 1 | 2;

// Ispush type
export type Ispush = 1 | 2;

// Target type
export type Target = 1 | 2 | 3;

// Status type
export type Status = 1 | 2;

// Main entity interface
export interface Notice {
  id: string;
  gym: string;
  title: string;
  content: string;
  type: string;
  ispopup: string;
  ispush: string;
  target: string;
  viewcount: string;
  startdate: string;
  enddate: string;
  status: string;
  createdby: string;
  createddate: string;
  updateddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateNoticeRequest = Omit<Notice, 'id'>;

// Update request type (all fields optional except id)
export type UpdateNoticeRequest = Partial<Omit<Notice, 'id'>>;

// Search params type
export interface NoticeSearchParams {
  id?: string;
  gym?: string;
  title?: string;
  content?: string;
  type?: string;
  ispopup?: string;
  ispush?: string;
  target?: string;
  viewcount?: string;
  startdate?: string;
  enddate?: string;
  status?: string;
  createdby?: string;
  createddate?: string;
  updateddate?: string;
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
