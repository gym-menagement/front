import { get, post, put, patch, del } from '../services/api';
import type {
  Inquiry,
  ApiResponse,
  ApiSingleResponse,
  InquirySearchParams,
} from '../types/inquiry';

export default class InquiryModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    GENERAL: 1,
    MEMBERSHIP: 2,
    REFUND: 3,
    FACILITY: 4,
    OTHER: 5,
  };
  static readonly types = [
    '',
    '일반',
    '회원권',
    '환불',
    '시설',
    '기타',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    WAITING: 1,
    ANSWERED: 2,
  };
  static readonly statuss = [
    '',
    '대기',
    '답변완료',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Inquiry>) {
    const res = await post<Inquiry>('/inquiry', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Inquiry>[]) {
    const res = await post<Inquiry[]>('/inquiry/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Inquiry>) {
    const res = await put<Inquiry>(`/inquiry/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Inquiry>) {
    const res = await patch<Inquiry>(`/inquiry/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/inquiry/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/inquiry/batch', { data: ids });
    return res.data;
  }

  static async find(params?: InquirySearchParams) {
    const res = await get<ApiResponse<Inquiry>>('/inquiry', { params });
    return res.data.content || [];
  }

  static async findall(params?: InquirySearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Inquiry>>('/inquiry', { params });
    return res.data.content || [];
  }

  static async findpage(params?: InquirySearchParams) {
    const res = await get<ApiResponse<Inquiry>>('/inquiry', { params });
    return res.data
  }

  static async count(params?: InquirySearchParams) {
    const res = await get<{ count: number }>('/inquiry/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Inquiry>>(`/inquiry/${id}`);
    return res.data;
  }
}
