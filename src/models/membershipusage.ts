import { get, post, put, del } from '../services/api';
import type {
  Membershipusage,
  ApiResponse,
  ApiSingleResponse,
  MembershipusageSearchParams,
} from '../types/membershipusage';

export default class MembershipusageModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    PERIOD_BASED: 1,
    COUNT_BASED: 2,
  };
  static readonly types = [
    '',
    '기간제',
    '횟수제',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    IN_USE: 1,
    PAUSED: 2,
    EXPIRED: 3,
    REFUNDED: 4,
  };
  static readonly statuss = [
    '',
    '사용중',
    '일시정지',
    '만료',
    '환불',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Membershipusage>) {
    const res = await post<Membershipusage>('/membershipusage', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Membershipusage>[]) {
    const res = await post<Membershipusage[]>('/membershipusage/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Membershipusage>) {
    const res = await put<Membershipusage>(`/membershipusage/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/membershipusage/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/membershipusage/batch', { data: ids });
    return res.data;
  }

  static async find(params?: MembershipusageSearchParams) {
    const res = await get<ApiResponse<Membershipusage>>('/membershipusage', { params });
    return res.data.content || [];
  }

  static async count(params?: MembershipusageSearchParams) {
    const res = await get<{ count: number }>('/membershipusage/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Membershipusage>>(`/membershipusage/${id}`);
    return res.data;
  }
}
