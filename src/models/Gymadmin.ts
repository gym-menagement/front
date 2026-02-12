import { get, post, put, patch, del } from '../services/api';
import type {
  Gymadmin,
  GymadminSearchParams,
  GymadminCreateRequest,
  GymadminUpdateRequest,
  GymadminPatchRequest,
  GymadminResponse,
} from '../types/gymadmin';
import type { ApiResponse } from '../types/user'; // Reusing generic response types

export default class GymadminModel {
  // Level constants (from backend: enums/GymAdminLevel)
  static readonly level = {
    OWNER: 0,
    MANAGER: 1,
  };
  static readonly levels = [
    '운영자',
    '관리자',
  ];

  static getLevel(value: number): string {
    return this.levels[value] || String(value);
  }

  // Status constants
  static readonly status = {
    ACTIVE: 0,
    INACTIVE: 1,
  };
  static readonly statuses = [
    '활성',
    '비활성',
  ];

  static getStatus(value: number): string {
    return this.statuses[value] || String(value);
  }

  // CRUD operations
  static async insert(item: GymadminCreateRequest) {
    const res = await post<GymadminResponse>('/gymadmin', item);
    return res.data;
  }

  static async insertBatch(items: GymadminCreateRequest[]) {
    const res = await post<GymadminResponse[]>('/gymadmin/batch', items);
    return res.data;
  }

  static async update(id: number, item: Omit<GymadminUpdateRequest, 'id'>) {
    const res = await put<GymadminResponse>(`/gymadmin/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Omit<GymadminPatchRequest, 'id'>) {
    const res = await patch<GymadminResponse>(`/gymadmin/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<{ success: boolean }>(`/gymadmin/${id}`);
    return res.data;
  }

  static async removeBatch(items: Gymadmin[]) {
    const res = await del<{ success: boolean }>('/gymadmin/batch', { data: items });
    return res.data;
  }

  static async find(params?: GymadminSearchParams) {
    const res = await get<ApiResponse<GymadminResponse>>('/gymadmin', { params });
    return res.data.content || [];
  }

  static async findall(params?: GymadminSearchParams) {
    const allParams = { ...params, page: 0, pagesize: 9999 };
    const res = await get<ApiResponse<GymadminResponse>>('/gymadmin', { params: allParams });
    return res.data.content || [];
  }

  static async get(id: number) {
    const res = await get<GymadminResponse>(`/gymadmin/${id}`);
    return res.data;
  }

  static async findByGym(gymId: number) {
    const res = await get<GymadminResponse[]>(`/gymadmin/search/gym?gym=${gymId}`);
    return res.data;
  }

  static async findByUser(userId: number) {
    const res = await get<GymadminResponse[]>(`/gymadmin/search/user?user=${userId}`);
    return res.data;
  }
}
