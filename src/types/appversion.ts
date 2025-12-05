// Auto-generated TypeScript types for Appversion
// Generated from table: appversion

export interface Appversion {
  id: number;
  platform: string;
  version: string;
  minversion: string;
  forceupdate: number;
  updatemessage: string;
  downloadurl: string;
  status: number;
  releasedate: string;
  createddate: string;
  date: string;
}

// Create request type (omit auto-generated fields)
export type CreateAppversionRequest = Omit<Appversion, 'id'>;

// Update request type (all fields optional except id)
export type UpdateAppversionRequest = Partial<Omit<Appversion, 'id'>>;

// Search params type
export interface AppversionSearchParams {
  id?: number;
  platform?: string;
  version?: string;
  minversion?: string;
  forceupdate?: number;
  updatemessage?: string;
  downloadurl?: string;
  status?: number;
  startreleasedate?: string;
  endreleasedate?: string;
  startcreateddate?: string;
  endcreateddate?: string;
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
