import { get, post, put, del } from '../services/api';
import type {
  Trainermember,
  ApiResponse,
  ApiSingleResponse,
  TrainermemberSearchParams,
} from '../types/trainermember';

export default class TrainermemberModel {
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
  static async insert(item: Partial<Trainermember>) {
    const res = await post<Trainermember>('/trainermember', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Trainermember>[]) {
    const res = await post<Trainermember[]>('/trainermember/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Trainermember>) {
    const res = await put<Trainermember>(`/trainermember/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/trainermember/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/trainermember/batch', { data: ids });
    return res.data;
  }

  static async find(params?: TrainermemberSearchParams) {
    const res = await get<ApiResponse<Trainermember>>('/trainermember', { params });
    return res.data.content || [];
  }

  static async count(params?: TrainermemberSearchParams) {
    const res = await get<{ count: number }>('/trainermember/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Trainermember>>(`/trainermember/${id}`);
    return res.data;
  }
}
