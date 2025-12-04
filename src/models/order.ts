import { get, post, put, patch, del } from '../services/api';
import type {
  Order,
  ApiResponse,
  ApiSingleResponse,
  OrderSearchParams,
} from '../types/order';

export default class OrderModel {
  // CRUD operations
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

  static async patch(id: number, item: Partial<Order>) {
    const res = await patch<Order>(`/order/${id}`, item);
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

  static async find(params?: OrderSearchParams) {
    const res = await get<ApiResponse<Order>>('/order', { params });
    return res.data.content || [];
  }

  static async findall(params?: OrderSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Order>>('/order', { params });
    return res.data.content || [];
  }

  static async count(params?: OrderSearchParams) {
    const res = await get<{ count: number }>('/order/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Order>>(`/order/${id}`);
    return res.data;
  }
}
