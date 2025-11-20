import { get, post, put, del } from '../services/api';
import type {
  Membership,
  ApiResponse,
  ApiSingleResponse,
  MembershipSearchParams,
} from '../types/membership';

export default class MembershipModel {
  // Sex constants (from backend: enums/sex/Enums.kt)
  static readonly sex = {
    MALE: 1,
    FEMALE: 2,
  };
  static readonly sexs = [
    '',
    '남성',
    '여성',
  ];

  static getSex(value: number): string {
    return this.sexs[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Membership>) {
    const res = await post<Membership>('/membership', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Membership>[]) {
    const res = await post<Membership[]>('/membership/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Membership>) {
    const res = await put<Membership>(`/membership/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/membership/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/membership/batch', { data: ids });
    return res.data;
  }

  static async find(params?: MembershipSearchParams) {
    const res = await get<ApiResponse<Membership>>('/membership', { params });
    return res.data.items || [];
  }

  static async count(params?: MembershipSearchParams) {
    const res = await get<{ count: number }>('/membership/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Membership>>(`/membership/${id}`);
    return res.data.item;
  }
}
