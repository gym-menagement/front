import { get, post, put, del } from '../services/api';
import type { Locker, LockerUsage, ApiResponse, ApiSingleResponse, Status } from '../types';

export class LockerModel {
  // Available constants (from backend: enums/rocker/Enums.kt)
  static readonly available = {
    NONE: 'NONE' as const,
    IN_USE: 'IN_USE' as const,
    AVAILABLE: 'AVAILABLE' as const,
  };

  static readonly availables = {
    NONE: '',
    IN_USE: '사용중',
    AVAILABLE: '사용가능',
  };

  static getAvailable(value: string): string {
    return this.availables[value as keyof typeof this.availables] || value;
  }

  static async insert(item: Partial<Locker>) {
    const res = await post<Locker>('/rocker', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Locker>[]) {
    const res = await post<Locker[]>('/rocker/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Locker>) {
    const res = await put<Locker>(`/rocker/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/rocker/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/rocker/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<Locker>>('/rocker', { params });
    return res.data.items || [];
  }

  static async findall(params?: any) {
    params = params || {};
    params.page = 0;
    params.pageSize = 9999;
    const res = await get<ApiResponse<Locker>>('/rocker', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/rocker/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Locker>>(`/rocker/${id}`);
    return res.data.item;
  }

  static async searchByGymId(gymId: number, params?: any) {
    const res = await get<ApiResponse<Locker>>(
      `/rocker/search/gymId?gymId=${gymId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<Locker>>(
      `/rocker/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}

export class LockerUsageModel {
  static readonly status = {
    ACTIVE: 'ACTIVE' as const,
    INACTIVE: 'INACTIVE' as const,
    EXPIRED: 'EXPIRED' as const,
  };

  static readonly statuses: Record<Status, string> = {
    ACTIVE: '사용중',
    INACTIVE: '사용종료',
    PENDING: '대기',
    COMPLETED: '완료',
    CANCELLED: '취소',
    EXPIRED: '만료',
  };

  static getStatus(value: Status): string {
    return this.statuses[value] || value;
  }

  static async insert(item: Partial<LockerUsage>) {
    const res = await post<LockerUsage>('/rockerusage', item);
    return res.data;
  }

  static async insertBatch(items: Partial<LockerUsage>[]) {
    const res = await post<LockerUsage[]>('/rockerusage/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<LockerUsage>) {
    const res = await put<LockerUsage>(`/rockerusage/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/rockerusage/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/rockerusage/batch', { data: ids });
    return res.data;
  }

  static async find(params?: any) {
    const res = await get<ApiResponse<LockerUsage>>('/rockerusage', { params });
    return res.data.items || [];
  }

  static async count(params?: any) {
    const res = await get<{ count: number }>('/rockerusage/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<LockerUsage>>(`/rockerusage/${id}`);
    return res.data.item;
  }

  static async searchByUserId(userId: number, params?: any) {
    const res = await get<ApiResponse<LockerUsage>>(
      `/rockerusage/search/userId?userId=${userId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByLockerId(lockerId: number, params?: any) {
    const res = await get<ApiResponse<LockerUsage>>(
      `/rockerusage/search/lockerId?lockerId=${lockerId}`,
      { params }
    );
    return res.data.items || [];
  }

  static async searchByStatus(status: Status, params?: any) {
    const res = await get<ApiResponse<LockerUsage>>(
      `/rockerusage/search/status?status=${status}`,
      { params }
    );
    return res.data.items || [];
  }
}

export default LockerModel;
