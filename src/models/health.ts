import { get, post, put, patch, del } from '../services/api';
import type {
  Health,
  ApiResponse,
  ApiSingleResponse,
  HealthSearchParams,
} from '../types/health';

export default class HealthModel {
  // CRUD operations
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

  static async patch(id: number, item: Partial<Health>) {
    const res = await patch<Health>(`/health/${id}`, item);
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

  static async find(params?: HealthSearchParams) {
    const res = await get<ApiResponse<Health>>('/health', { params });
    return res.data.content || [];
  }

  static async count(params?: HealthSearchParams) {
    const res = await get<{ count: number }>('/health/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Health>>(`/health/${id}`);
    return res.data;
  }
}
