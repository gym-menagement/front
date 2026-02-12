
export interface Gymadmin {
  id: number;
  gymId: number;
  userId: number;
  level: number;
  status: number;
  date: string; // LocalDateTime string
}

export interface GymadminSearchParams {
  page?: number;
  pagesize?: number;
  gym?: number;
  user?: number;
  level?: number;
  status?: number;
  startdate?: string;
  enddate?: string;
}

export interface GymadminCreateRequest {
  gymId: number;
  userId: number;
  level: number;
  status: number;
}

export interface GymadminUpdateRequest {
  id: number;
  level: number;
  status: number;
}

export interface GymadminPatchRequest {
  id: number;
  level?: number;
  status?: number;
}

export interface GymadminResponse {
  id: number;
  gymId: number;
  userId: number;
  level: number;
  status: number;
  date: string;
}
