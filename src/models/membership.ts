import { get, post, put, del } from '../services/api';
import type { Membership, ApiResponse, ApiSingleResponse, Status } from '../types';

export default class MembershipModel {
  static readonly status = {
    ACTIVE: 'ACTIVE' as const,
    INACTIVE: 'INACTIVE' as const,
    PENDING: 'PENDING' as const,
    EXPIRED: 'EXPIRED' as const,
  };

  static readonly statuses: Record<Status, string> = {
    ACTIVE: '활성',
    INACTIVE: '비활성',
    PENDING: '대기',
    COMPLETED: '완료',
    CANCELLED: '취소',
    EXPIRED: '만료',
  };

  static getStatus(value: Status): string {
    return this.statuses[value] || value;
  }

  static async insert(item: Partial<Membership>) {
    const res = await post<Membership>('/membership', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Membership>[]) {
    const res = await post<Membership[]>('/membership/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Membership>) {
    const res = await put<Membership>(`/membership/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/membership/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/membership/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Membership>>('/membership', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/membership/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Membership>>(`/membership/${id}`);
    return res.data.item;
  }

  static async searchByUserId(userId: number, params?: any) {
    const res = await get<ApiResponse<Membership>>(
      `/membership/search/userId?userId=${userId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByGymId(gymId: number, params?: any) {
    const res = await get<ApiResponse<Membership>>(
      `/membership/search/gymId?gymId=${gymId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<Membership>>(
      `/membership/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}
