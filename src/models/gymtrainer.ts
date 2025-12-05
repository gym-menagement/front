import { get, post, put, patch, del } from '../services/api';
import type {
  Gymtrainer,
  ApiResponse,
  ApiSingleResponse,
  GymtrainerSearchParams,
} from '../types/gymtrainer';

export default class GymtrainerModel {
  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    TERMINATED: 1,
    IN_PROGRESS: 2,
  };
  static readonly statuss = [
    '',
    '종료',
    '진행중',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Gymtrainer>) {
    const res = await post<Gymtrainer>('/gymtrainer', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Gymtrainer>[]) {
    const res = await post<Gymtrainer[]>('/gymtrainer/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Gymtrainer>) {
    const res = await put<Gymtrainer>(`/gymtrainer/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Gymtrainer>) {
    const res = await patch<Gymtrainer>(`/gymtrainer/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/gymtrainer/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/gymtrainer/batch', { data: ids });
    return res.data;
  }

  static async find(params?: GymtrainerSearchParams) {
    const res = await get<ApiResponse<Gymtrainer>>('/gymtrainer', { params });
    return res.data.content || [];
  }

  static async findall(params?: GymtrainerSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Gymtrainer>>('/gymtrainer', { params });
    return res.data.content || [];
  }

  static async findpage(params?: GymtrainerSearchParams) {
    const res = await get<ApiResponse<Gymtrainer>>('/gymtrainer', { params });
    return res.data
  }

  static async count(params?: GymtrainerSearchParams) {
    const res = await get<{ count: number }>('/gymtrainer/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Gymtrainer>>(`/gymtrainer/${id}`);
    return res.data;
  }
}
