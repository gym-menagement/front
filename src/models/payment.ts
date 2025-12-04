import { get, post, put, patch, del } from '../services/api';
import type {
  Payment,
  ApiResponse,
  ApiSingleResponse,
  PaymentSearchParams,
} from '../types/payment';

export default class PaymentModel {
  // CRUD operations
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

  static async patch(id: number, item: Partial<Payment>) {
    const res = await patch<Payment>(`/payment/${id}`, item);
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

  static async find(params?: PaymentSearchParams) {
    const res = await get<ApiResponse<Payment>>('/payment', { params });
    return res.data.content || [];
  }

  static async findall(params?: PaymentSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Payment>>('/payment', { params });
    return res.data.content || [];
  }

  static async count(params?: PaymentSearchParams) {
    const res = await get<{ count: number }>('/payment/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Payment>>(`/payment/${id}`);
    return res.data;
  }
}
