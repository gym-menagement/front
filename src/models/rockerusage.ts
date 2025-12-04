import { get, post, put, patch, del } from '../services/api';
import type {
  Rockerusage,
  ApiResponse,
  ApiSingleResponse,
  RockerusageSearchParams,
} from '../types/rockerusage';

export default class RockerusageModel {
  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    TERMINATED: 1,
    IN_USE: 2,
    OVERDUE: 3,
  };
  static readonly statuss = [
    '',
    '종료',
    '사용중',
    '연체',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Rockerusage>) {
    const res = await post<Rockerusage>('/rockerusage', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Rockerusage>[]) {
    const res = await post<Rockerusage[]>('/rockerusage/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Rockerusage>) {
    const res = await put<Rockerusage>(`/rockerusage/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Rockerusage>) {
    const res = await patch<Rockerusage>(`/rockerusage/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/rockerusage/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/rockerusage/batch', { data: ids });
    return res.data;
  }

  static async find(params?: RockerusageSearchParams) {
    const res = await get<ApiResponse<Rockerusage>>('/rockerusage', { params });
    return res.data.content || [];
  }

  static async findall(params?: RockerusageSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Rockerusage>>('/rockerusage', { params });
    return res.data.content || [];
  }

  static async count(params?: RockerusageSearchParams) {
    const res = await get<{ count: number }>('/rockerusage/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Rockerusage>>(`/rockerusage/${id}`);
    return res.data;
  }
}
