// Auto-generated TypeScript types for Notice
// Generated from table: notice

export interface Notice {
  id: number;
  gym: number;
  title: string;
  content: string;
  type: number;
  ispopup: number;
  ispush: number;
  target: number;
  viewcount: number;
  startdate: string;
  enddate: string;
  status: number;
  createdby: number;
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
  id?: number;
  gym?: number;
  title?: string;
  content?: string;
  type?: number;
  ispopup?: number;
  ispush?: number;
  target?: number;
  viewcount?: number;
  startdate?: string;
  enddate?: string;
  status?: number;
  createdby?: number;
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
