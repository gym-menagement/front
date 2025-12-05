import { get, post, put, patch, del } from '../services/api';
import type {
  Gym,
  ApiResponse,
  ApiSingleResponse,
  GymSearchParams,
} from '../types/gym';

export default class GymModel {
  // CRUD operations
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

  static async patch(id: number, item: Partial<Gym>) {
    const res = await patch<Gym>(`/gym/${id}`, item);
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

  static async find(params?: GymSearchParams) {
    const res = await get<ApiResponse<Gym>>('/gym', { params });
    return res.data.content || [];
  }

  static async findall(params?: GymSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Gym>>('/gym', { params });
    return res.data.content || [];
  }

  static async findpage(params?: GymSearchParams) {
    const res = await get<ApiResponse<Gym>>('/gym', { params });
    return res.data
  }

  static async count(params?: GymSearchParams) {
    const res = await get<{ count: number }>('/gym/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Gym>>(`/gym/${id}`);
    return res.data;
  }
}
