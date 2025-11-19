import { get, post, put, del } from '../services/api';
import type { Health, ApiResponse, ApiSingleResponse, Status } from '../types';

export default class HealthModel {
  static readonly status = {
    ACTIVE: 'ACTIVE' as const,
    INACTIVE: 'INACTIVE' as const,
  };

  static readonly statuses: Record<Status, string> = {
    ACTIVE: '판매중',
    INACTIVE: '판매중지',
    PENDING: '대기',
    COMPLETED: '완료',
    CANCELLED: '취소',
    EXPIRED: '만료',
  };

  static getStatus(value: Status): string {
    return this.statuses[value] || value;
  }

  static async insert(item: Partial<Health>) {
    const res = await post<Health>('/health', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Health>[]) {
    const res = await post<Health[]>('/health/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Health>) {
    const res = await put<Health>(`/health/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/health/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/health/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Health>>('/health', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/health/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Health>>(`/health/${id}`);
    return res.data.item;
  }

  static async searchByGymId(gymId: number, params?: any) {
    const res = await get<ApiResponse<Health>>(
      `/health/search/gymId?gymId=${gymId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByCategoryId(categoryId: number, params?: any) {
    const res = await get<ApiResponse<Health>>(
      `/health/search/categoryId?categoryId=${categoryId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<Health>>(
      `/health/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}
