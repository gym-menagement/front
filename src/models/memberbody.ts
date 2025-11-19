import { get, post, put, del } from '../services/api';
import type { MemberBody, ApiResponse, ApiSingleResponse } from '../types';

export default class MemberBodyModel {
  static async insert(item: Partial<MemberBody>) {
    const res = await post<MemberBody>('/memberbody', item);
    return res.data;
  }

  static async insertBatch(items: Partial<MemberBody>[]) {
    const res = await post<MemberBody[]>('/memberbody/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<MemberBody>) {
    const res = await put<MemberBody>(`/memberbody/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/memberbody/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/memberbody/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<MemberBody>>('/memberbody', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/memberbody/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<MemberBody>>(`/memberbody/${id}`);
    return res.data.item;
  }

  static async searchByUserId(userId: number, params?: any) {
    const res = await get<ApiResponse<MemberBody>>(
      `/memberbody/search/userId?userId=${userId}`,
      { params }
    );
    return res.data.items || [];
  }
}
