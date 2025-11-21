import { get, post, put, del } from '../services/api';
import type {
  Role,
  ApiResponse,
  ApiSingleResponse,
  RoleSearchParams,
} from '../types/role';

export default class RoleModel {
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

  static async count(params?: RoleSearchParams) {
    const res = await get<{ count: number }>('/role/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Role>>(`/role/${id}`);
    return res.data;
  }
}
