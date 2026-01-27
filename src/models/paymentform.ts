import { get, post, put, patch, del } from '../services/api';
import type {
  Paymentform,
  ApiResponse,
  ApiSingleResponse,
  PaymentformSearchParams,
} from '../types/paymentform';

export default class PaymentformModel {
  // CRUD operations
  static async insert(item: Partial<Paymentform>) {
    const res = await post<Paymentform>('/paymentform', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Paymentform>[]) {
    const res = await post<Paymentform[]>('/paymentform/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Paymentform>) {
    const res = await put<Paymentform>(`/paymentform/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Paymentform>) {
    const res = await patch<Paymentform>(`/paymentform/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/paymentform/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/paymentform/batch', { data: ids });
    return res.data;
  }

  static async find(params?: PaymentformSearchParams) {
    const res = await get<ApiResponse<Paymentform>>('/paymentform', { params });
    return res.data.content || [];
  }

  static async findall(params?: PaymentformSearchParams) {
    params!.page = 0;
    params!.pagesize = 9999;
    const res = await get<ApiResponse<Paymentform>>('/paymentform', { params });
    return res.data.content || [];
  }

  static async findpage(params?: PaymentformSearchParams) {
    const res = await get<ApiResponse<Paymentform>>('/paymentform', { params });
    return res.data
  }

  static async count(params?: PaymentformSearchParams) {
    const res = await get<{ count: number }>('/paymentform/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Paymentform>>(`/paymentform/${id}`);
    return res.data;
  }
}
