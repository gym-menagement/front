import { get, post, put, patch, del } from '../services/api';
import type {
  Stop,
  ApiResponse,
  ApiSingleResponse,
  StopSearchParams,
} from '../types/stop';

export default class StopModel {
  // CRUD operations
  static async insert(item: Partial<Stop>) {
    const res = await post<Stop>('/stop', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Stop>[]) {
    const res = await post<Stop[]>('/stop/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Stop>) {
    const res = await put<Stop>(`/stop/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Stop>) {
    const res = await patch<Stop>(`/stop/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/stop/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/stop/batch', { data: ids });
    return res.data;
  }

  static async find(params?: StopSearchParams) {
    const res = await get<ApiResponse<Stop>>('/stop', { params });
    return res.data.content || [];
  }

  static async findall(params?: StopSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Stop>>('/stop', { params });
    return res.data.content || [];
  }

  static async count(params?: StopSearchParams) {
    const res = await get<{ count: number }>('/stop/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Stop>>(`/stop/${id}`);
    return res.data;
  }
}
