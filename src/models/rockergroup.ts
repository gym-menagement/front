import { get, post, put, del } from '../services/api';
import type {
  Rockergroup,
  ApiResponse,
  ApiSingleResponse,
  RockergroupSearchParams,
} from '../types/rockergroup';

export default class RockergroupModel {
  // CRUD operations
  static async insert(item: Partial<Rockergroup>) {
    const res = await post<Rockergroup>('/rockergroup', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Rockergroup>[]) {
    const res = await post<Rockergroup[]>('/rockergroup/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Rockergroup>) {
    const res = await put<Rockergroup>(`/rockergroup/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/rockergroup/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/rockergroup/batch', { data: ids });
    return res.data;
  }

  static async find(params?: RockergroupSearchParams) {
    const res = await get<ApiResponse<Rockergroup>>('/rockergroup', { params });
    return res.data.content || [];
  }

  static async count(params?: RockergroupSearchParams) {
    const res = await get<{ count: number }>('/rockergroup/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Rockergroup>>(`/rockergroup/${id}`);
    return res.data;
  }
}
