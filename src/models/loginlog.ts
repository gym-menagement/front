import { get, post, put, patch, del } from '../services/api';
import type {
  Loginlog,
  ApiResponse,
  ApiSingleResponse,
  LoginlogSearchParams,
} from '../types/loginlog';

export default class LoginlogModel {
  // CRUD operations
  static async insert(item: Partial<Loginlog>) {
    const res = await post<Loginlog>('/loginlog', item);
    return res.data;
  }

  static async insertBatch(items: Partial<Loginlog>[]) {
    const res = await post<Loginlog[]>('/loginlog/batch', items);
    return res.data;
  }

  static async update(id: number, item: Partial<Loginlog>) {
    const res = await put<Loginlog>(`/loginlog/${id}`, item);
    return res.data;
  }

  static async patch(id: number, item: Partial<Loginlog>) {
    const res = await patch<Loginlog>(`/loginlog/${id}`, item);
    return res.data;
  }

  static async remove(id: number) {
    const res = await del<void>(`/loginlog/${id}`);
    return res.data;
  }

  static async removeBatch(ids: number[]) {
    const res = await del<void>('/loginlog/batch', { data: ids });
    return res.data;
  }

  static async find(params?: LoginlogSearchParams) {
    const res = await get<ApiResponse<Loginlog>>('/loginlog', { params });
    return res.data.content || [];
  }

  static async findall(params?: LoginlogSearchParams) {
    params!.page = 0;
    params!.pageSize = 9999;
    const res = await get<ApiResponse<Loginlog>>('/loginlog', { params });
    return res.data.content || [];
  }

  static async findpage(params?: LoginlogSearchParams) {
    const res = await get<ApiResponse<Loginlog>>('/loginlog', { params });
    return res.data
  }

  static async count(params?: LoginlogSearchParams) {
    const res = await get<{ count: number }>('/loginlog/count', { params });
    return res.data.count || 0;
  }

  static async get(id: number) {
    const res = await get<ApiSingleResponse<Loginlog>>(`/loginlog/${id}`);
    return res.data;
  }
}
