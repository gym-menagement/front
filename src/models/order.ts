import { get, post, put, del } from '../services/api';
import type { Order, ApiResponse, ApiSingleResponse, Status } from '../types';

export default class OrderModel {
  static readonly status = {
    PENDING: 'PENDING' as const,
    COMPLETED: 'COMPLETED' as const,
    CANCELLED: 'CANCELLED' as const,
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

  static async insert(item: Partial<Order>) {
    const res = await post<Order>('/order', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Order>[]) {
    const res = await post<Order[]>('/order/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Order>) {
    const res = await put<Order>(`/order/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/order/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/order/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Order>>('/order', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/order/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Order>>(`/order/${id}`);
    return res.data.item;
  }

  static async searchByUserId(userId: number, params?: any) {
    const res = await get<ApiResponse<Order>>(
      `/order/search/userId?userId=${userId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<Order>>(
      `/order/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}
