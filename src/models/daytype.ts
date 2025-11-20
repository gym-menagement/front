import { get, post, put, del } from '../services/api';
import type {
  Daytype,
  ApiResponse,
  ApiSingleResponse,
  DaytypeSearchParams,
} from '../types/daytype';

export default class DaytypeModel {
  // CRUD operations
  static async insert(item: Partial<Daytype>) {
    const res = await post<Daytype>('/daytype', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Daytype>[]) {
    const res = await post<Daytype[]>('/daytype/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Daytype>) {
    const res = await put<Daytype>(`/daytype/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/daytype/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/daytype/batch', { data: ids });
    return res.data;
  }

  static async find(params?: DaytypeSearchParams) {
    const res = await get<ApiResponse<Daytype>>('/daytype', { params });
    return res.data.items || [];
  }

  static async count(params?: DaytypeSearchParams) {
    const res = await get<{ count: number }>('/daytype/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Daytype>>(`/daytype/${id}`);
    return res.data.item;
  }
}
