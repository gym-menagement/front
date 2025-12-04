import { get, post, put, patch, del } from '../services/api';
import type {
  Appversion,
  ApiResponse,
  ApiSingleResponse,
  AppversionSearchParams,
} from '../types/appversion';

export default class AppversionModel {
  // Forceupdate constants (from backend: enums/forceupdate/Enums.kt)
  static readonly forceupdate = {
    NO: 1,
    YES: 2,
  };
  static readonly forceupdates = [
    '',
    '아니오',
    '예',
  ];

  static getForceupdate(value: number): string {
    return this.forceupdates[value] || String(value);
  }

  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    INACTIVE: 1,
    ACTIVE: 2,
  };
  static readonly statuss = [
    '',
    '비활성',
    '활성',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Appversion>) {
    const res = await post<Appversion>('/appversion', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Appversion>[]) {
    const res = await post<Appversion[]>('/appversion/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Appversion>) {
    const res = await put<Appversion>(`/appversion/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Appversion>) {
    const res = await patch<Appversion>(`/appversion/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/appversion/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/appversion/batch', { data: ids });
    return res.data;
  }

  static async find(params?: AppversionSearchParams) {
    const res = await get<ApiResponse<Appversion>>('/appversion', { params });
    return res.data.content || [];
  }

  static async findall(params?: AppversionSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Appversion>>('/appversion', { params });
    return res.data.content || [];
  }

  static async count(params?: AppversionSearchParams) {
    const res = await get<{ count: number }>('/appversion/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Appversion>>(`/appversion/${id}`);
    return res.data;
  }
}
