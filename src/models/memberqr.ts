import { get, post, put, del } from '../services/api';
import type {
  Memberqr,
  ApiResponse,
  ApiSingleResponse,
  MemberqrSearchParams,
} from '../types/memberqr';

export default class MemberqrModel {
  // CRUD operations
  static async insert(item: Partial<Memberqr>) {
    const res = await post<Memberqr>('/memberqr', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Memberqr>[]) {
    const res = await post<Memberqr[]>('/memberqr/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Memberqr>) {
    const res = await put<Memberqr>(`/memberqr/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/memberqr/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/memberqr/batch', { data: ids });
    return res.data;
  }

  static async find(params?: MemberqrSearchParams) {
    const res = await get<ApiResponse<Memberqr>>('/memberqr', { params });
    return res.data.content || [];
  }

  static async findall(params?: MemberqrSearchParams) {
    params = params || {};
    params.page = 0;
    params.pageSize = 9999;
    const res = await get<ApiResponse<Memberqr>>('/memberqr', { params });
    return res.data.content || [];
  }

  static async count(params?: MemberqrSearchParams) {
    const res = await get<{ count: number }>('/memberqr/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Memberqr>>(`/memberqr/${id}`);
    return res.data;
  }
}
