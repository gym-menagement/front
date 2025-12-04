import { get, post, put, patch, del } from '../services/api';
import type {
  Ptreservation,
  ApiResponse,
  ApiSingleResponse,
  PtreservationSearchParams,
} from '../types/ptreservation';

export default class PtreservationModel {
  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    RESERVED: 1,
    COMPLETED: 2,
    CANCELLED: 3,
    NO_SHOW: 4,
  };
  static readonly statuss = [
    '',
    '예약',
    '완료',
    '취소',
    '노쇼',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Ptreservation>) {
    const res = await post<Ptreservation>('/ptreservation', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Ptreservation>[]) {
    const res = await post<Ptreservation[]>('/ptreservation/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Ptreservation>) {
    const res = await put<Ptreservation>(`/ptreservation/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Ptreservation>) {
    const res = await patch<Ptreservation>(`/ptreservation/${id}`, item);
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

  static async find(params?: PtreservationSearchParams) {
    const res = await get<ApiResponse<Ptreservation>>('/ptreservation', { params });
    return res.data.content || [];
  }

  static async findall(params?: PtreservationSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Ptreservation>>('/ptreservation', { params });
    return res.data.content || [];
  }

  static async count(params?: PtreservationSearchParams) {
    const res = await get<{ count: number }>('/ptreservation/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Ptreservation>>(`/ptreservation/${id}`);
    return res.data;
  }
}
