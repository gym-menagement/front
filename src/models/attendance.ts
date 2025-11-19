import { get, post, put, del } from '../services/api';
import type { Attendance, ApiResponse, ApiSingleResponse } from '../types';

export default class AttendanceModel {
  static async insert(item: Partial<Attendance>) {
    const res = await post<Attendance>('/attendance', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Attendance>[]) {
    const res = await post<Attendance[]>('/attendance/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Attendance>) {
    const res = await put<Attendance>(`/attendance/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/attendance/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/attendance/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Attendance>>('/attendance', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/attendance/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Attendance>>(`/attendance/${id}`);
    return res.data.item;
  }

  static async searchByUserId(userId: number, params?: any) {
    const res = await get<ApiResponse<Attendance>>(
      `/attendance/search/userId?userId=${userId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByGymId(gymId: number, params?: any) {
    const res = await get<ApiResponse<Attendance>>(
      `/attendance/search/gymId?gymId=${gymId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByMembershipId(membershipId: number, params?: any) {
    const res = await get<ApiResponse<Attendance>>(
      `/attendance/search/membershipId?membershipId=${membershipId}`,
      { params }
    );
    return res.data.items || [];
  }
}
