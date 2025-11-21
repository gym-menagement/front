import { get, post, put, del } from '../services/api';
import type {
  Memberbody,
  ApiResponse,
  ApiSingleResponse,
  MemberbodySearchParams,
} from '../types/memberbody';

export default class MemberbodyModel {
  // CRUD operations
  static async insert(item: Partial<Memberbody>) {
    const res = await post<Memberbody>('/memberbody', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Memberbody>[]) {
    const res = await post<Memberbody[]>('/memberbody/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Memberbody>) {
    const res = await put<Memberbody>(`/memberbody/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/memberbody/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/memberbody/batch', { data: ids });
    return res.data;
  }

  static async find(params?: MemberbodySearchParams) {
    const res = await get<ApiResponse<Memberbody>>('/memberbody', { params });
    return res.data.content || [];
  }

  static async count(params?: MemberbodySearchParams) {
    const res = await get<{ count: number }>('/memberbody/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Memberbody>>(`/memberbody/${id}`);
    return res.data;
  }
}
