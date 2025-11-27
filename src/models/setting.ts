import { get, post, put, patch, del } from '../services/api';
import type {
  Setting,
  ApiResponse,
  ApiSingleResponse,
  SettingSearchParams,
} from '../types/setting';

export default class SettingModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    STRING: 1,
    NUMBER: 2,
    BOOLEAN: 3,
  };
  static readonly types = [
    '',
    '문자열',
    '숫자',
    '참거짓',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Setting>) {
    const res = await post<Setting>('/setting', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Setting>[]) {
    const res = await post<Setting[]>('/setting/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Setting>) {
    const res = await put<Setting>(`/setting/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Setting>) {
    const res = await patch<Setting>(`/setting/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/setting/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/setting/batch', { data: ids });
    return res.data;
  }

  static async find(params?: SettingSearchParams) {
    const res = await get<ApiResponse<Setting>>('/setting', { params });
    return res.data.content || [];
  }

  static async count(params?: SettingSearchParams) {
    const res = await get<{ count: number }>('/setting/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Setting>>(`/setting/${id}`);
    return res.data;
  }
}
