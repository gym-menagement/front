import { get, post, put, del } from '../services/api';
import type { MemberQR, ApiResponse, ApiSingleResponse } from '../types';

export default class MemberQRModel {
  static async insert(item: Partial<MemberQR>) {
    const res = await post<MemberQR>('/memberqr', item);
    return res.data;
  }

  static async insertBatch(items: Partial<MemberQR>[]) {
    const res = await post<MemberQR[]>('/memberqr/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<MemberQR>) {
    const res = await put<MemberQR>(`/memberqr/${id}`, item);
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

  static async find(params?: any) {
    const res = await get<ApiResponse<MemberQR>>('/memberqr', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/memberqr/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<MemberQR>>(`/memberqr/${id}`);
    return res.data.item;
  }

  static async searchByUserId(userId: number, params?: any) {
    const res = await get<ApiResponse<MemberQR>>(
      `/memberqr/search/userId?userId=${userId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByMembershipId(membershipId: number, params?: any) {
    const res = await get<ApiResponse<MemberQR>>(
      `/memberqr/search/membershipId?membershipId=${membershipId}`,
      { params }
    );
    return res.data.items || [];
  }
}
