import { get, post, put, del } from '../services/api';
import type {
  Systemlog,
  ApiResponse,
  ApiSingleResponse,
  SystemlogSearchParams,
} from '../types/systemlog';

export default class SystemlogModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    LOGIN: 1,
    CRAWLING: 2,
  };
  static readonly types = [
    '',
    '로그인',
    '크롤링',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Result constants (from backend: enums/result/Enums.kt)
  static readonly result = {
    SUCCESS: 1,
    FAIL: 2,
  };
  static readonly results = [
    '',
    '성공',
    '실패',
  ];

  static getResult(value: number): string {
    return this.results[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Systemlog>) {
    const res = await post<Systemlog>('/systemlog', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Systemlog>[]) {
    const res = await post<Systemlog[]>('/systemlog/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Systemlog>) {
    const res = await put<Systemlog>(`/systemlog/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/systemlog/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/systemlog/batch', { data: ids });
    return res.data;
  }

  static async find(params?: SystemlogSearchParams) {
    const res = await get<ApiResponse<Systemlog>>('/systemlog', { params });
    return res.data.items || [];
  }

  static async count(params?: SystemlogSearchParams) {
    const res = await get<{ count: number }>('/systemlog/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Systemlog>>(`/systemlog/${id}`);
    return res.data.item;
  }
}
