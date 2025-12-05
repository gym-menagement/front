import { get, post, put, patch, del } from '../services/api';
import type {
  Alarm,
  ApiResponse,
  ApiSingleResponse,
  AlarmSearchParams,
} from '../types/alarm';

export default class AlarmModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    NOTICE: 1,
    WARNING: 2,
    ERROR: 3,
    INFO: 4,
  };
  static readonly types = [
    '',
    '공지',
    '경고',
    '에러',
    '정보',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    SUCCESS: 1,
    FAIL: 2,
    PENDING: 3,
  };
  static readonly statuss = [
    '',
    '성공',
    '실패',
    '대기',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Alarm>) {
    const res = await post<Alarm>('/alarm', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Alarm>[]) {
    const res = await post<Alarm[]>('/alarm/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Alarm>) {
    const res = await put<Alarm>(`/alarm/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Alarm>) {
    const res = await patch<Alarm>(`/alarm/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/alarm/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/alarm/batch', { data: ids });
    return res.data;
  }

  static async find(params?: AlarmSearchParams) {
    const res = await get<ApiResponse<Alarm>>('/alarm', { params });
    return res.data.content || [];
  }

  static async findall(params?: AlarmSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Alarm>>('/alarm', { params });
    return res.data.content || [];
  }

  static async findpage(params?: AlarmSearchParams) {
    const res = await get<ApiResponse<Alarm>>('/alarm', { params });
    return res.data
  }

  static async count(params?: AlarmSearchParams) {
    const res = await get<{ count: number }>('/alarm/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Alarm>>(`/alarm/${id}`);
    return res.data;
  }
}
