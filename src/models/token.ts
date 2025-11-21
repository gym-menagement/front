import { get, post, put, del } from '../services/api';
import type {
  Token,
  ApiResponse,
  ApiSingleResponse,
  TokenSearchParams,
} from '../types/token';

export default class TokenModel {
  // Status constants (from backend: enums/status/Enums.kt)
  static readonly status = {
    ACTIVE: 1,
    EXPIRED: 2,
    REVOKED: 3,
  };
  static readonly statuss = [
    '',
    '활성',
    '만료',
    '폐기',
  ];

  static getStatus(value: number): string {
    return this.statuss[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Token>) {
    const res = await post<Token>('/token', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Token>[]) {
    const res = await post<Token[]>('/token/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Token>) {
    const res = await put<Token>(`/token/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/token/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/token/batch', { data: ids });
    return res.data;
  }

  static async find(params?: TokenSearchParams) {
    const res = await get<ApiResponse<Token>>('/token', { params });
    return res.data.content || [];
  }

  static async count(params?: TokenSearchParams) {
    const res = await get<{ count: number }>('/token/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Token>>(`/token/${id}`);
    return res.data;
  }
}
