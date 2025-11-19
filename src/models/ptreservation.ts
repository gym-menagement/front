import { get, post, put, del } from '../services/api';
import type { PTReservation, ApiResponse, ApiSingleResponse } from '../types';

export default class PTReservationModel {
  // Status constants (from backend: enums/ptreservation/Enums.kt)
  static readonly status = {
    NONE: 'NONE' as const,
    RESERVED: 'RESERVED' as const,
    COMPLETED: 'COMPLETED' as const,
    CANCELLED: 'CANCELLED' as const,
    NO_SHOW: 'NO_SHOW' as const,
  };

  static readonly statuses = {
    NONE: '',
    RESERVED: '예약',
    COMPLETED: '완료',
    CANCELLED: '취소',
    NO_SHOW: '노쇼',
  };

  static getStatus(value: string): string {
    return this.statuses[value as keyof typeof this.statuses] || value;
  }

  static async insert(item: Partial<PTReservation>) {
    const res = await post<PTReservation>('/ptreservation', item);
    return res.data;
  }

  static async insertBatch(items: Partial<PTReservation>[]) {
    const res = await post<PTReservation[]>('/ptreservation/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<PTReservation>) {
    const res = await put<PTReservation>(`/ptreservation/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/ptreservation/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/ptreservation/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<PTReservation>>('/ptreservation', {
      params,
    });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/ptreservation/count', {
      params,
    });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<PTReservation>>(
      `/ptreservation/${id}`
    );
    return res.data.item;
  }

  static async searchByUserId(userId: number, params?: any) {
    const res = await get<ApiResponse<PTReservation>>(
      `/ptreservation/search/userId?userId=${userId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByTrainerId(trainerId: number, params?: any) {
    const res = await get<ApiResponse<PTReservation>>(
      `/ptreservation/search/trainerId?trainerId=${trainerId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByGymId(gymId: number, params?: any) {
    const res = await get<ApiResponse<PTReservation>>(
      `/ptreservation/search/gymId?gymId=${gymId}`,
      { params }
    );
    return res.data.items || [];
  }
}
