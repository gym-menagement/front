import { get, post, put, del } from '../services/api';
import type {
  Qrcode,
  ApiResponse,
  ApiSingleResponse,
  QrcodeSearchParams,
} from '../types/qrcode';

export default class QrcodeModel {
  // Isactive constants (from backend: enums/isactive/Enums.kt)
  static readonly isactive = {
    INACTIVE: 1,
    ACTIVE: 2,
  };
  static readonly isactives = [
    '',
    '비활성',
    '활성',
  ];

  static getIsactive(value: number): string {
    return this.isactives[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Qrcode>) {
    const res = await post<Qrcode>('/qrcode', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Qrcode>[]) {
    const res = await post<Qrcode[]>('/qrcode/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Qrcode>) {
    const res = await put<Qrcode>(`/qrcode/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/qrcode/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/qrcode/batch', { data: ids });
    return res.data;
  }

  static async find(params?: QrcodeSearchParams) {
    const res = await get<ApiResponse<Qrcode>>('/qrcode', { params });
    return res.data.content || [];
  }

  static async count(params?: QrcodeSearchParams) {
    const res = await get<{ count: number }>('/qrcode/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Qrcode>>(`/qrcode/${id}`);
    return res.data;
  }
}
