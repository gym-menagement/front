import { get, post, put, patch, del } from '../services/api';
import type {
  Discount,
  ApiResponse,
  ApiSingleResponse,
  DiscountSearchParams,
} from '../types/discount';

export default class DiscountModel {
  // CRUD operations
  static async insert(item: Partial<Discount>) {
    const res = await post<Discount>('/discount', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Discount>[]) {
    const res = await post<Discount[]>('/discount/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Discount>) {
    const res = await put<Discount>(`/discount/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Discount>) {
    const res = await patch<Discount>(`/discount/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/discount/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/discount/batch', { data: ids });
    return res.data;
  }

  static async find(params?: DiscountSearchParams) {
    const res = await get<ApiResponse<Discount>>('/discount', { params });
    return res.data.content || [];
  }

  static async findall(params?: DiscountSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Discount>>('/discount', { params });
    return res.data.content || [];
  }

  static async count(params?: DiscountSearchParams) {
    const res = await get<{ count: number }>('/discount/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Discount>>(`/discount/${id}`);
    return res.data;
  }
}
