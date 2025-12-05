import { get, post, put, patch, del } from '../services/api';
import type {
  Attendance,
  ApiResponse,
  ApiSingleResponse,
  AttendanceSearchParams,
} from '../types/attendance';

export default class AttendanceModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    ENTRY: 1,
    EXIT: 2,
  };
  static readonly types = [
    '',
    '입장',
    '퇴장',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Method constants (from backend: enums/method/Enums.kt)
  static readonly method = {
    QR_CODE: 1,
    MANUAL: 2,
    CARD: 3,
  };
  static readonly methods = [
    '',
    'QR코드',
    '수동',
    '카드',
  ];

  static getMethod(value: number): string {
    return this.methods[value] || String(value);
  }

  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    NORMAL: 1,
    LATE: 2,
    UNAUTHORIZED: 3,
  };
  static readonly statuss = [
    '',
    '정상',
    '지각',
    '무단입장',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Attendance>) {
    const res = await post<Attendance>('/attendance', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Attendance>[]) {
    const res = await post<Attendance[]>('/attendance/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Attendance>) {
    const res = await put<Attendance>(`/attendance/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Attendance>) {
    const res = await patch<Attendance>(`/attendance/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/attendance/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/attendance/batch', { data: ids });
    return res.data;
  }

  static async find(params?: AttendanceSearchParams) {
    const res = await get<ApiResponse<Attendance>>('/attendance', { params });
    return res.data.content || [];
  }

  static async findall(params?: AttendanceSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Attendance>>('/attendance', { params });
    return res.data.content || [];
  }

  static async findpage(params?: AttendanceSearchParams) {
    const res = await get<ApiResponse<Attendance>>('/attendance', { params });
    return res.data
  }

  static async count(params?: AttendanceSearchParams) {
    const res = await get<{ count: number }>('/attendance/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Attendance>>(`/attendance/${id}`);
    return res.data;
  }
}
