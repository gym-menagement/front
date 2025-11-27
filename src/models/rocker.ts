import { get, post, put, patch, del } from '../services/api';
import type {
  Rocker,
  ApiResponse,
  ApiSingleResponse,
  RockerSearchParams,
} from '../types/rocker';

export default class RockerModel {
  // Available constants (from backend: enums/available/Enums.kt)
  static readonly available = {
    IN_USE: 1,
    AVAILABLE: 2,
  };
  static readonly availables = [
    '',
    '사용중',
    '사용가능',
  ];

  static getAvailable(value: number): string {
    return this.availables[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Rocker>) {
    const res = await post<Rocker>('/rocker', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Rocker>[]) {
    const res = await post<Rocker[]>('/rocker/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Rocker>) {
    const res = await put<Rocker>(`/rocker/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Rocker>) {
    const res = await patch<Rocker>(`/rocker/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/rocker/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/rocker/batch', { data: ids });
    return res.data;
  }

  static async find(params?: RockerSearchParams) {
    const res = await get<ApiResponse<Rocker>>('/rocker', { params });
    return res.data.content || [];
  }

  static async count(params?: RockerSearchParams) {
    const res = await get<{ count: number }>('/rocker/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Rocker>>(`/rocker/${id}`);
    return res.data;
  }
}
