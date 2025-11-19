import { get, post, put, del } from '../services/api';
import type { Gym, ApiResponse, ApiSingleResponse, Status } from '../types';

export default class GymModel {
  static readonly status = {
    ACTIVE: 'ACTIVE' as const,
    INACTIVE: 'INACTIVE' as const,
  };

  static readonly statuses: Record<Status, string> = {
    ACTIVE: '운영중',
    INACTIVE: '휴업',
    PENDING: '대기',
    COMPLETED: '완료',
    CANCELLED: '취소',
    EXPIRED: '만료',
  };

  static getStatus(value: Status): string {
    return this.statuses[value] || value;
  }

  static async insert(item: Partial<Gym>) {
    const res = await post<Gym>('/gym', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Gym>[]) {
    const res = await post<Gym[]>('/gym/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Gym>) {
    const res = await put<Gym>(`/gym/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/gym/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/gym/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Gym>>('/gym', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/gym/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Gym>>(`/gym/${id}`);
    return res.data.item;
  }

  static async searchByName(name: string, params?: any) {
    const res = await get<ApiResponse<Gym>>(
      `/gym/search/name?name=${encodeURIComponent(name)}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<Gym>>(
      `/gym/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}
