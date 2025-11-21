import { get, post, put, del } from '../services/api';
import type {
  Ipblock,
  ApiResponse,
  ApiSingleResponse,
  IpblockSearchParams,
} from '../types/ipblock';

export default class IpblockModel {
  // Type constants (from backend: enums/type/Enums.kt)
  static readonly type = {
    ADMIN: 1,
    NORMAL: 2,
  };
  static readonly types = [
    '',
    '관리자 접근',
    '일반 접근',
  ];

  static getType(value: number): string {
    return this.types[value] || String(value);
  }

  // Policy constants (from backend: enums/policy/Enums.kt)
  static readonly policy = {
    GRANT: 1,
    DENY: 2,
  };
  static readonly policys = [
    '',
    '허용',
    '거부',
  ];

  static getPolicy(value: number): string {
    return this.policys[value] || String(value);
  }

  // Use constants (from backend: enums/use/Enums.kt)
  static readonly use = {
    USE: 1,
    NOTUSE: 2,
  };
  static readonly uses = [
    '',
    '사용',
    '사용안함',
  ];

  static getUse(value: number): string {
    return this.uses[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Ipblock>) {
    const res = await post<Ipblock>('/ipblock', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Ipblock>[]) {
    const res = await post<Ipblock[]>('/ipblock/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Ipblock>) {
    const res = await put<Ipblock>(`/ipblock/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/ipblock/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/ipblock/batch', { data: ids });
    return res.data;
  }

  static async find(params?: IpblockSearchParams) {
    const res = await get<ApiResponse<Ipblock>>('/ipblock', { params });
    return res.data.content || [];
  }

  static async count(params?: IpblockSearchParams) {
    const res = await get<{ count: number }>('/ipblock/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Ipblock>>(`/ipblock/${id}`);
    return res.data;
  }
}
