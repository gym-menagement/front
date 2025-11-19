import { get, post, put, del } from '../services/api';
import type { Payment, ApiResponse, ApiSingleResponse, Status } from '../types';

export default class PaymentModel {
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

  static async insert(item: Partial<Payment>) {
    const res = await post<Payment>('/payment', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Payment>[]) {
    const res = await post<Payment[]>('/payment/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Payment>) {
    const res = await put<Payment>(`/payment/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/payment/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/payment/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Payment>>('/payment', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/payment/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Payment>>(`/payment/${id}`);
    return res.data.item;
  }

  static async searchByOrderId(orderId: number, params?: any) {
    const res = await get<ApiResponse<Payment>>(
      `/payment/search/orderId?orderId=${orderId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<Payment>>(
      `/payment/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}
