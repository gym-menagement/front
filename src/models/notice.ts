import { get, post, put, del } from '../services/api';
import type { Notice, ApiResponse, ApiSingleResponse, Status } from '../types';

export default class NoticeModel {
  static readonly status = {
    ACTIVE: 'ACTIVE' as const,
    INACTIVE: 'INACTIVE' as const,
  };

  static readonly statuses: Record<Status, string> = {
    ACTIVE: '게시중',
    INACTIVE: '비공개',
    PENDING: '대기',
    COMPLETED: '완료',
    CANCELLED: '취소',
    EXPIRED: '만료',
  };

  static getStatus(value: Status): string {
    return this.statuses[value] || value;
  }

  static async insert(item: Partial<Notice>) {
    const res = await post<Notice>('/notice', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Notice>[]) {
    const res = await post<Notice[]>('/notice/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Notice>) {
    const res = await put<Notice>(`/notice/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/notice/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/notice/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Notice>>('/notice', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/notice/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Notice>>(`/notice/${id}`);
    return res.data.item;
  }

  static async searchByGymId(gymId: number, params?: any) {
    const res = await get<ApiResponse<Notice>>(
      `/notice/search/gymId?gymId=${gymId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<Notice>>(
      `/notice/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}
