import { get, post, put, patch, del } from '../services/api';
import type {
  Role,
  ApiResponse,
  ApiSingleResponse,
  RoleSearchParams,
} from '../types/role';

export default class RoleModel {
  // Roleid constants (from backend: enums/roleid/Enums.kt)
  static readonly roleid = {
    MEMBER: 1,
    TRAINER: 2,
    STAFF: 3,
    GYM_ADMIN: 4,
    PLATFORM_ADMIN: 5,
  };
  static readonly roleids = [
    '',
    '회원',
    '트레이너',
    '직원',
    '헬스장관리자',
    '플랫폼관리자',
  ];

  static getRoleid(value: number): string {
    return this.roleids[value] || String(value);
  }

  // CRUD operations
  static async insert(item: Partial<Role>) {
    const res = await post<Role>('/role', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Role>[]) {
    const res = await post<Role[]>('/role/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Role>) {
    const res = await put<Role>(`/role/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Role>) {
    const res = await patch<Role>(`/role/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/role/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/role/batch', { data: ids });
    return res.data;
  }

  static async find(params?: RoleSearchParams) {
    const res = await get<ApiResponse<Role>>('/role', { params });
    return res.data.content || [];
  }

  static async findall(params?: RoleSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Role>>('/role', { params });
    return res.data.content || [];
  }

  static async findpage(params?: RoleSearchParams) {
    const res = await get<ApiResponse<Role>>('/role', { params });
    return res.data
  }

  static async count(params?: RoleSearchParams) {
    const res = await get<{ count: number }>('/role/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Role>>(`/role/${id}`);
    return res.data;
  }
}
