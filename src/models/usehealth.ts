import { get, post, put, del } from '../services/api';
import type {
  Usehealth,
  ApiResponse,
  ApiSingleResponse,
  UsehealthSearchParams,
} from '../types/usehealth';

export default class UsehealthModel {
  // CRUD operations
  static async insert(item: Partial<Usehealth>) {
    const res = await post<Usehealth>('/usehealth', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Usehealth>[]) {
    const res = await post<Usehealth[]>('/usehealth/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Usehealth>) {
    const res = await put<Usehealth>(`/usehealth/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/usehealth/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/usehealth/batch', { data: ids });
    return res.data;
  }

  static async find(params?: UsehealthSearchParams) {
    const res = await get<ApiResponse<Usehealth>>('/usehealth', { params });
    return res.data.items || [];
  }

  static async count(params?: UsehealthSearchParams) {
    const res = await get<{ count: number }>('/usehealth/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Usehealth>>(`/usehealth/${id}`);
    return res.data.item;
  }
}
