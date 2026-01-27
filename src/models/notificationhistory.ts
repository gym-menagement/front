import { get, post, put, patch, del } from '../services/api';
import type {
  Notificationhistory,
  ApiResponse,
  ApiSingleResponse,
  NotificationhistorySearchParams,
} from '../types/notificationhistory';

export default class NotificationhistoryModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    GENERAL: 1,
    MEMBERSHIP_EXPIRY: 2,
    MEMBERSHIP_NEAR_EXPIRY: 3,
    ATTENDANCE_ENCOURAGE: 4,
    GYM_ANNOUNCEMENT: 5,
    SYSTEM_NOTICE: 6,
    PAYMENT_CONFIRM: 7,
    PAUSE_EXPIRY: 8,
    WEEKLY_GOAL_ACHIEVED: 9,
    PERSONAL_RECORD: 10,
  };
  static readonly types = [
    '',
    '일반',
    '이용권만료',
    '이용권임박',
    '출석독려',
    '체육관공지',
    '시스템공지',
    '결제확인',
    '일시정지만료',
    '주간목표달성',
    '개인기록갱신',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    PENDING: 1,
    SUCCESS: 2,
    FAILED: 3,
  };
  static readonly statuss = [
    '',
    '대기중',
    '성공',
    '실패',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Notificationhistory>) {
    const res = await post<Notificationhistory>('/notificationhistory', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Notificationhistory>[]) {
    const res = await post<Notificationhistory[]>('/notificationhistory/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Notificationhistory>) {
    const res = await put<Notificationhistory>(`/notificationhistory/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Notificationhistory>) {
    const res = await patch<Notificationhistory>(`/notificationhistory/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/notificationhistory/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/notificationhistory/batch', { data: ids });
    return res.data;
  }

  static async find(params?: NotificationhistorySearchParams) {
    const res = await get<ApiResponse<Notificationhistory>>('/notificationhistory', { params });
    return res.data.content || [];
  }

  static async findall(params?: NotificationhistorySearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<Notificationhistory>>('/notificationhistory', { params });
    return res.data.content || [];
  }

  static async findpage(params?: NotificationhistorySearchParams) {
    const res = await get<ApiResponse<Notificationhistory>>('/notificationhistory', { params });
    return res.data
  }

  static async count(params?: NotificationhistorySearchParams) {
    const res = await get<{ count: number }>('/notificationhistory/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Notificationhistory>>(`/notificationhistory/${id}`);
    return res.data;
  }
}
