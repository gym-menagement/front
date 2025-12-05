import { get, post, put, patch, del } from '../services/api';
import type {
  Pushtoken,
  ApiResponse,
  ApiSingleResponse,
  PushtokenSearchParams,
} from '../types/pushtoken';

export default class PushtokenModel {
  // Isactive constants (from backend: enums/isactive/Enums.kt)
  static readonly isactive = {
    INACTIVE: 1,
    ACTIVE: 2,
  };
  static readonly isactives = [
    '',
    '비활성',
    '활성',
  ];

  static getIsactive(value: number): string {
    return this.isactives[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Pushtoken>) {
    const res = await post<Pushtoken>('/pushtoken', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Pushtoken>[]) {
    const res = await post<Pushtoken[]>('/pushtoken/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Pushtoken>) {
    const res = await put<Pushtoken>(`/pushtoken/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Pushtoken>) {
    const res = await patch<Pushtoken>(`/pushtoken/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/pushtoken/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/pushtoken/batch', { data: ids });
    return res.data;
  }

  static async find(params?: PushtokenSearchParams) {
    const res = await get<ApiResponse<Pushtoken>>('/pushtoken', { params });
    return res.data.content || [];
  }

  static async findall(params?: PushtokenSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Pushtoken>>('/pushtoken', { params });
    return res.data.content || [];
  }

  static async findpage(params?: PushtokenSearchParams) {
    const res = await get<ApiResponse<Pushtoken>>('/pushtoken', { params });
    return res.data
  }

  static async count(params?: PushtokenSearchParams) {
    const res = await get<{ count: number }>('/pushtoken/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Pushtoken>>(`/pushtoken/${id}`);
    return res.data;
  }
}
