import { get, post, put, del } from '../services/api';
import type {
  Paymenttype,
  ApiResponse,
  ApiSingleResponse,
  PaymenttypeSearchParams,
} from '../types/paymenttype';

export default class PaymenttypeModel {
  // CRUD operations
  static async insert(item: Partial<Paymenttype>) {
    const res = await post<Paymenttype>('/paymenttype', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Paymenttype>[]) {
    const res = await post<Paymenttype[]>('/paymenttype/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Paymenttype>) {
    const res = await put<Paymenttype>(`/paymenttype/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/paymenttype/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/paymenttype/batch', { data: ids });
    return res.data;
  }

  static async find(params?: PaymenttypeSearchParams) {
    const res = await get<ApiResponse<Paymenttype>>('/paymenttype', { params });
    return res.data.items || [];
  }

  static async count(params?: PaymenttypeSearchParams) {
    const res = await get<{ count: number }>('/paymenttype/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Paymenttype>>(`/paymenttype/${id}`);
    return res.data.item;
  }
}
